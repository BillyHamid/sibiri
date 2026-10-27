import { useCallback, useEffect, useMemo, useState } from 'react'
import { ExternalLink, Search, Upload, RotateCcw, Clock3 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { CONTENT_FIELDS } from '../../lib/content/catalog'
import { editableRows, validateContentValue } from '../../lib/content/contentModel'
import { useContentStore } from '../../lib/content/useContent'
import { createLocalEditorialStore, detectEditorialStorage } from '../../lib/content/contentRepository'
import './AdminEditor.css'

const TYPES = { text: 'Texte', richtext: 'Paragraphe', image: 'Image', list: 'Liste JSON' }
const serialize = value => typeof value === 'string' ? value : JSON.stringify(value, null, 2)
const payloadFor = (row, value, isPublic, visibility) => ({ key: row.key, value, type: row.type, page: row.page, section: row.section, label: row.label, ...(visibility ? { is_public: isPublic } : {}), updated_at: new Date().toISOString() })

function ContentEditor({ row, draft, onChange, onDraft, onReset, capabilities, localStore }) {
  const [value, setValue] = useState(() => serialize(draft?.value ?? row.value))
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [history, setHistory] = useState(null)
  const { update } = useContentStore()
  const parse = () => {
    const parsed = row.type === 'list' ? JSON.parse(value) : value
    if (!validateContentValue(parsed, row.type)) throw new Error('Valeur invalide : vérifiez le format du champ.')
    return parsed
  }
  const run = async action => {
    setBusy(true); setError(''); setMessage('')
    try { await action() } catch (failure) { setError(failure.message || 'L’opération a échoué. Réessayez.') }
    finally { setBusy(false) }
  }
  const publish = () => run(async () => {
    const parsed = parse()
    const payload = payloadFor(row, parsed, true, capabilities.visibility)
    const { error: saveError } = await supabase.from('content').upsert(payload, { onConflict: 'key' })
    if (saveError) throw saveError
    update(row.key, parsed)
    onChange({ ...payload, is_public: true })
    if (!capabilities.revisions) localStore.addRevision(row, parsed, row.persisted ? 'UPDATE' : 'INSERT')
    if (draft) {
      const { error: draftError } = capabilities.drafts && !draft.local ? await supabase.from('content_drafts').delete().eq('key', row.key) : {}
      if (draftError) { setMessage('Publié sur le site.'); throw new Error('Le contenu est publié, mais le brouillon n’a pas pu être retiré. Réessayez.') }
      localStore.deleteDraft(row.key)
      onDraft(row.key, null)
    }
    setMessage('Publié sur le site.')
  })
  const saveDraft = () => run(async () => {
    const parsed = parse()
    const nextDraft = { key: row.key, value: parsed, updated_at: new Date().toISOString(), local: !capabilities.drafts }
    if (!capabilities.drafts) {
      localStore.saveDraft(nextDraft)
      onDraft(row.key, nextDraft)
      setMessage('Brouillon enregistré sur cet appareil. Le site public reste inchangé.')
      return
    }
    if (!row.persisted) {
      // The draft foreign key needs a parent. Keep it PRIVATE until publication.
      const parent = payloadFor(row, row.value, false, capabilities.visibility)
      const { error: parentError } = await supabase.from('content').upsert(parent, { onConflict: 'key', ignoreDuplicates: true })
      if (parentError) throw parentError
      onChange(parent)
    }
    const { error: draftError } = await supabase.from('content_drafts').upsert({ key: nextDraft.key, value: nextDraft.value, updated_at: nextDraft.updated_at })
    if (draftError) throw draftError
    onDraft(row.key, nextDraft)
    setMessage('Brouillon enregistré. Le site public reste inchangé.')
  })
  const discardDraft = () => run(async () => {
    const { error: discardError } = capabilities.drafts && !draft?.local ? await supabase.from('content_drafts').delete().eq('key', row.key) : {}
    if (discardError) throw discardError
    localStore.deleteDraft(row.key)
    onDraft(row.key, null); setValue(serialize(row.value)); setMessage('Brouillon abandonné.')
  })
  const reset = () => {
    if (!window.confirm(`Rétablir la valeur d’origine de « ${row.label} » ?`)) return
    run(async () => {
      const keys = [row.key, ...CONTENT_FIELDS.filter(field => field.aliasOf === row.key).map(field => field.key)]
      const { error: resetError } = await supabase.from('content').delete().in('key', keys)
      if (resetError) throw resetError
      for (const key of keys) localStore.deleteDraft(key)
      for (const key of keys) update(key, undefined)
      onReset(keys)
    })
  }
  const upload = file => {
    if (!file) return
    run(async () => {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) throw new Error('Choisissez une image JPG, PNG ou WebP de 5 Mo maximum.')
      const path = `${row.key}/${crypto.randomUUID()}.${file.type.split('/')[1]}`
      const { error: uploadError } = await supabase.storage.from('content-images').upload(path, file)
      if (uploadError) throw uploadError
      const { data } = supabase.storage.from('content-images').getPublicUrl(path)
      setValue(data.publicUrl); setMessage('Image prête. Publiez le champ pour la mettre en ligne.')
    })
  }
  const showHistory = () => run(async () => {
    if (history !== null) { setHistory(null); return }
    if (!capabilities.revisions) { setHistory(localStore.revisions(row.key)); return }
    const { data, error: historyError } = await supabase.from('content_revisions').select('id, value, action, changed_at').eq('content_key', row.key).order('changed_at', { ascending: false }).limit(5)
    if (historyError) throw historyError
    setHistory(data || [])
  })
  const id = `field-${row.key}`
  const isLong = row.type === 'richtext' || row.type === 'list' || value.length > 110 || value.includes('\n')
  return <article className={`content-editor ${draft ? 'has-draft' : ''}`} data-content-key={row.key}>
    <div className="content-editor__heading">
      <div><label htmlFor={id}>{row.label}</label><p>{TYPES[row.type]} · {row.connected ? draft ? draft.local ? 'Brouillon sur cet appareil' : 'Brouillon en attente' : row.persisted && row.is_public !== false ? 'Publié · Relié au site' : 'Relié au site · Valeur d’origine' : 'Champ non utilisé par le site'}</p></div>
      {row.persisted && <button className="admin-icon" type="button" onClick={reset} disabled={busy} title="Rétablir la valeur d’origine" aria-label={`Rétablir ${row.label}`}><RotateCcw size={15} /></button>}
    </div>
    {!row.connected && <p className="admin-error">Ce champ personnalisé n’a pas d’emplacement dans les pages publiques. Sa publication est désactivée.</p>}
    {row.type === 'image' ? <div className="content-editor__image">
      {value && <img src={value} alt={`Aperçu — ${row.label}`} />}
      <input id={id} value={value} onChange={event => setValue(event.target.value)} placeholder="Adresse de l’image" disabled={busy || !row.connected} />
      <label className="admin-button"><Upload size={14} /> Choisir une image<input type="file" accept="image/jpeg,image/png,image/webp" hidden disabled={busy || !row.connected} onChange={event => { upload(event.target.files[0]); event.target.value = '' }} /></label>
    </div> : isLong ? <textarea id={id} value={value} onChange={event => setValue(event.target.value)} rows={row.type === 'list' ? 6 : 3} disabled={busy || !row.connected} /> : <input id={id} value={value} onChange={event => setValue(event.target.value)} disabled={busy || !row.connected} />}
    <div className="content-editor__actions">
      <button type="button" onClick={saveDraft} disabled={busy || !row.connected}>{capabilities.drafts ? 'Enregistrer en brouillon' : 'Enregistrer un brouillon local'}</button>
      <button className="admin-primary" type="button" onClick={publish} disabled={busy || !row.connected}>{busy ? 'En cours…' : 'Publier'}</button>
      {draft && <button type="button" onClick={discardDraft} disabled={busy}>Abandonner le brouillon</button>}
      <button type="button" onClick={showHistory} disabled={busy}><Clock3 size={13} /> {capabilities.revisions ? 'Historique' : 'Historique local'}</button>
    </div>
    {message && <p className="admin-success" role="status">{message}</p>}
    {error && <p className="admin-error" role="alert">{error}</p>}
    {history && <div className="content-editor__history">{history.length ? history.map(revision => <div key={revision.id}><small>{new Date(revision.changed_at).toLocaleString('fr-FR')} · {revision.action}</small><p>{serialize(revision.value)}</p>{revision.action !== 'DELETE' && <button type="button" disabled={busy} onClick={() => { setValue(serialize(revision.value)); setMessage('Version chargée dans l’éditeur. Publiez pour la restaurer.') }}>Charger cette version</button>}</div>) : <p>Aucune version enregistrée.</p>}</div>}
  </article>
}

export function AdminEditor({ filiales }) {
  const [storedRows, setStoredRows] = useState([])
  const [drafts, setDrafts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filialeId, setFilialeId] = useState('holding')
  const [pageId, setPageId] = useState('accueil')
  const [query, setQuery] = useState('')
  const [navigationOpen, setNavigationOpen] = useState(false)
  const [capabilities, setCapabilities] = useState(null)
  const [localStore, setLocalStore] = useState(null)
  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const [contentResult, available, sessionResult] = await Promise.all([supabase.from('content').select('*'), detectEditorialStorage(supabase), supabase.auth.getSession()])
      if (contentResult.error) throw contentResult.error
      if (sessionResult.error) throw sessionResult.error
      const account = sessionResult.data.session?.user.id
      if (!account) throw new Error('La session a expiré. Reconnectez-vous.')
      const local = createLocalEditorialStore(window.localStorage, `sibiri-editor:${import.meta.env.VITE_SUPABASE_URL}:${account}`)
      setStoredRows(contentResult.data || [])
      const draftResult = available.drafts ? await supabase.from('content_drafts').select('*') : { data: [] }
      if (draftResult.error) throw draftResult.error
      setDrafts([...local.drafts(), ...(draftResult.data || [])].filter((item, index, all) => all.findIndex(other => other.key === item.key) === index))
      setCapabilities(available)
      setLocalStore(local)
    } catch (failure) { setError(failure.message || 'Impossible de charger les contenus.') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { Promise.resolve().then(load) }, [load])
  const rows = useMemo(() => editableRows(storedRows), [storedRows])
  const filiale = filiales.find(item => item.id === filialeId) || filiales[0]
  const page = filiale.pages.find(item => item.id === pageId) || filiale.pages[0]
  const pageRows = rows.filter(row => row.page === page.dbPage)
  const sections = [...new Set([...page.sections, ...pageRows.map(row => row.section)])]
  const search = query.toLocaleLowerCase('fr')
  const filtered = pageRows.filter(row => `${row.label} ${row.section} ${serialize(row.value)}`.toLocaleLowerCase('fr').includes(search))
  const change = row => setStoredRows(current => [...current.filter(item => item.key !== row.key), row])
  const changeDraft = (key, draft) => setDrafts(current => [...current.filter(item => item.key !== key), ...(draft ? [draft] : [])])
  const reset = keys => { setStoredRows(current => current.filter(row => !keys.includes(row.key))); setDrafts(current => current.filter(row => !keys.includes(row.key))) }
  return <div className="admin-editor">
    <aside className="admin-editor__sidebar">
      <button className="admin-editor__mobile-menu" onClick={() => setNavigationOpen(open => !open)} aria-expanded={navigationOpen}>{filiale.label} — {page.label}<span>☰</span></button>
      <nav className={navigationOpen ? 'is-open' : ''} aria-label="Navigation du back-office">
        <p className="admin-eyebrow">Filiales</p>
        {filiales.map(item => <button key={item.id} className={item.id === filiale.id ? 'is-active' : ''} onClick={() => { setFilialeId(item.id); setPageId(item.pages[0].id); setQuery('') }}><item.Icon size={16} color={item.color} />{item.label}</button>)}
        <p className="admin-eyebrow">Pages — {filiale.label}</p>
        {filiale.pages.map(item => <button key={item.id} className={`admin-page-link ${item.id === page.id ? 'is-active' : ''}`} onClick={() => { setPageId(item.id); setQuery(''); setNavigationOpen(false) }}><span>{item.label}</span><small>{item.path}</small></button>)}
      </nav>
    </aside>
    <main className="admin-editor__main">
      <section className="admin-overview"><p className="admin-eyebrow">Centre éditorial</p><h2>Pilotez les contenus du site.</h2><div className="admin-stats">
        <div><strong>{rows.filter(row => row.connected).length}</strong><span>champs reliés au site</span></div>
        <div><strong>{storedRows.filter(row => row.is_public !== false).length}</strong><span>champs publiés</span></div>
        <div><strong>{drafts.length}</strong><span>brouillons à valider</span></div>
      </div></section>
      <div className="admin-page-heading"><div><p>{filiale.label}</p><h1>{page.label}</h1><small>{page.path} · {pageRows.filter(row => row.connected).length} champs reliés</small></div><a className="admin-button" href={page.path} target="_blank" rel="noreferrer">Voir la page <ExternalLink size={13} /></a></div>
      <p className="admin-help">Modifiez une valeur puis publiez-la pour mettre le site à jour. Les brouillons restent privés.</p>
      {capabilities && (!capabilities.drafts || !capabilities.revisions) && <p className="admin-help">Les brouillons et l’historique local sont conservés uniquement dans ce navigateur, pour votre compte. Les publications sont enregistrées sur le site et visibles par tous.</p>}
      <label className="admin-search"><Search size={16} /><input aria-label="Rechercher un champ" placeholder="Rechercher un champ sur cette page…" value={query} onChange={event => setQuery(event.target.value)} /></label>
      {error && <div className="admin-error" role="alert">{error} <button onClick={load}>Réessayer</button></div>}
      {loading ? <p role="status">Chargement…</p> : capabilities && localStore && sections.map(section => {
        const entries = filtered.filter(row => row.section === section)
        if (!entries.length) return null
        return <section key={section} className="admin-section"><h2>{section}</h2>{entries.map(row => {
          const draft = drafts.find(item => item.key === row.key)
          return <ContentEditor key={`${row.key}:${row.persisted}:${row.updated_at || ''}:${draft?.updated_at || ''}`} row={row} draft={draft} onChange={change} onDraft={changeDraft} onReset={reset} capabilities={capabilities} localStore={localStore} />
        })}</section>
      })}
      {!loading && !filtered.length && <p>Aucun champ ne correspond à cette recherche.</p>}
    </main>
  </div>
}
