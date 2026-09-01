import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'

const GOLD = '#C9A84C'
const DARK = '#1D1D1B'

const TYPE_LABELS = { text: 'Texte court', richtext: 'Paragraphe', image: 'Image', list: 'Liste (JSON)' }

// ─── Une ligne de contenu éditable ─────────────────────────────────────────
const ContentRow = ({ row, onSaved, onDeleted }) => {
  const initial = row.type === 'text' || row.type === 'richtext' || row.type === 'image'
    ? (typeof row.value === 'string' ? row.value : JSON.stringify(row.value))
    : JSON.stringify(row.value, null, 2)

  const [value, setValue] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | saving | saved | error
  const [uploading, setUploading] = useState(false)

  const save = async () => {
    setStatus('saving')
    let parsed = value
    if (row.type === 'list') {
      try { parsed = JSON.parse(value) } catch { setStatus('error'); return }
    }
    const { error } = await supabase.from('content').update({ value: parsed, updated_at: new Date().toISOString() }).eq('key', row.key)
    setStatus(error ? 'error' : 'saved')
    if (!error) { onSaved?.(row.key, parsed); setTimeout(() => setStatus('idle'), 1800) }
  }

  const removeRow = async () => {
    if (!confirm(`Supprimer le champ "${row.label}" ? Cette action est définitive.`)) return
    const { error } = await supabase.from('content').delete().eq('key', row.key)
    if (!error) onDeleted?.(row.key)
  }

  const uploadImage = async (file) => {
    setUploading(true)
    const path = `${row.key}/${Date.now()}-${file.name}`
    const { error: upErr } = await supabase.storage.from('content-images').upload(path, file, { upsert: true })
    if (!upErr) {
      const { data } = supabase.storage.from('content-images').getPublicUrl(path)
      setValue(data.publicUrl)
    }
    setUploading(false)
  }

  return (
    <div style={{ padding: '18px 20px', borderRadius: 14, background: '#fff', border: '1px solid #e3e1db', marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1b1d22', fontFamily: "'Inter', sans-serif" }}>{row.label}</p>
          <p style={{ margin: '2px 0 0', fontSize: 11, color: '#9a9a9a', fontFamily: "'Inter', sans-serif" }}>
            {row.key} · {TYPE_LABELS[row.type] || row.type}
          </p>
        </div>
        <button onClick={removeRow} title="Supprimer" style={{ background: 'transparent', border: 'none', color: '#c1442c', cursor: 'pointer', fontSize: 12, fontFamily: "'Inter', sans-serif" }}>
          Supprimer
        </button>
      </div>

      {row.type === 'image' ? (
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          {value && <img src={value} alt="" style={{ height: 64, borderRadius: 8, border: '1px solid #e3e1db' }} />}
          <input type="file" accept="image/*" onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} style={{ fontSize: 12, fontFamily: "'Inter', sans-serif" }} disabled={uploading} />
          {uploading && <span style={{ fontSize: 12, color: '#9a9a9a' }}>Envoi…</span>}
        </div>
      ) : row.type === 'richtext' || row.type === 'list' ? (
        <textarea
          value={value} onChange={e => setValue(e.target.value)} rows={row.type === 'list' ? 5 : 3}
          style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #e3e1db', fontSize: 13.5, fontFamily: row.type === 'list' ? 'monospace' : "'Inter', sans-serif", resize: 'vertical' }}
        />
      ) : (
        <input
          value={value} onChange={e => setValue(e.target.value)}
          style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #e3e1db', fontSize: 13.5, fontFamily: "'Inter', sans-serif" }}
        />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
        <button
          onClick={save} disabled={status === 'saving'}
          style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: GOLD, color: '#1D1D1B', fontWeight: 700, fontSize: 12.5, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
        >
          {status === 'saving' ? 'Enregistrement…' : 'Enregistrer'}
        </button>
        {status === 'saved' && <span style={{ fontSize: 12, color: '#2e7d32', fontFamily: "'Inter', sans-serif" }}>✓ Enregistré</span>}
        {status === 'error' && <span style={{ fontSize: 12, color: '#c1442c', fontFamily: "'Inter', sans-serif" }}>Erreur — JSON invalide ?</span>}
      </div>
    </div>
  )
}

// ─── Formulaire d'ajout d'un nouveau champ ─────────────────────────────────
const AddFieldForm = ({ onAdded }) => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ key: '', label: '', page: '', section: '', type: 'text', value: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    let value = form.value
    if (form.type === 'list') {
      try { value = JSON.parse(form.value || '[]') } catch { setError('JSON invalide pour une liste.'); setBusy(false); return }
    }
    const { error: err } = await supabase.from('content').insert({
      key: form.key.trim(), label: form.label.trim(), page: form.page.trim(), section: form.section.trim(),
      type: form.type, value,
    })
    setBusy(false)
    if (err) { setError(err.message); return }
    onAdded?.()
    setForm({ key: '', label: '', page: '', section: '', type: 'text', value: '' })
    setOpen(false)
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{ padding: '10px 20px', borderRadius: 99, border: `1.5px solid ${GOLD}`, background: 'transparent', color: '#7A5010', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: "'Inter', sans-serif", marginBottom: 24 }}>
        + Ajouter un champ
      </button>
    )
  }

  return (
    <form onSubmit={submit} style={{ background: '#fff', border: `1.5px solid ${GOLD}55`, borderRadius: 14, padding: 20, marginBottom: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div style={{ gridColumn: '1 / -1', fontSize: 12, color: '#9a9a9a', fontFamily: "'Inter', sans-serif" }}>
        Nouveau champ éditable — sera visible sur le site une fois qu'un développeur l'a relié au composant correspondant via <code>useContentValue("clé", "valeur par défaut")</code>.
      </div>
      {[
        ['key', 'Clé unique (ex: agro.hero.title)'],
        ['label', 'Nom affiché (ex: Titre du hero)'],
        ['page', 'Page (ex: Accueil, Agro Chemical)'],
        ['section', 'Section (ex: Hero, Produits)'],
      ].map(([field, placeholder]) => (
        <input key={field} required placeholder={placeholder} value={form[field]} onChange={set(field)}
          style={{ padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e3e1db', fontSize: 13, fontFamily: "'Inter', sans-serif" }} />
      ))}
      <select value={form.type} onChange={set('type')} style={{ padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e3e1db', fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
        {Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      <input placeholder="Valeur initiale" value={form.value} onChange={set('value')}
        style={{ padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e3e1db', fontSize: 13, fontFamily: "'Inter', sans-serif" }} />
      {error && <p style={{ gridColumn: '1 / -1', color: '#c1442c', fontSize: 12.5, margin: 0 }}>{error}</p>}
      <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 10 }}>
        <button type="submit" disabled={busy} style={{ padding: '9px 20px', borderRadius: 8, border: 'none', background: GOLD, color: '#1D1D1B', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
          {busy ? 'Ajout…' : 'Créer le champ'}
        </button>
        <button type="button" onClick={() => setOpen(false)} style={{ padding: '9px 16px', borderRadius: 8, border: '1px solid #e3e1db', background: 'transparent', fontSize: 13, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
          Annuler
        </button>
      </div>
    </form>
  )
}

// ─── Dashboard principal ────────────────────────────────────────────────────
export const AdminDashboard = () => {
  const [rows, setRows] = useState(null)
  const [activePage, setActivePage] = useState('Tous')

  const load = async () => {
    const { data, error } = await supabase.from('content').select('*').order('page').order('section')
    if (!error) setRows(data)
  }

  useEffect(() => { load() }, [])

  const pages = useMemo(() => {
    if (!rows) return []
    return ['Tous', ...new Set(rows.map(r => r.page))]
  }, [rows])

  const grouped = useMemo(() => {
    if (!rows) return {}
    const filtered = activePage === 'Tous' ? rows : rows.filter(r => r.page === activePage)
    const bySection = {}
    for (const r of filtered) {
      const k = `${r.page} — ${r.section}`
      bySection[k] = bySection[k] || []
      bySection[k].push(r)
    }
    return bySection
  }, [rows, activePage])

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 100px' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#1b1d22', margin: '0 0 6px' }}>Contenu du site</h1>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#6b7280', margin: '0 0 28px' }}>
        Modifie les textes et images ci-dessous, puis clique sur « Enregistrer » — les changements apparaissent sur le site en quelques secondes.
      </p>

      {rows && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {pages.map(p => (
            <button key={p} onClick={() => setActivePage(p)}
              style={{
                padding: '7px 16px', borderRadius: 99, fontSize: 12.5, fontFamily: "'Inter', sans-serif", cursor: 'pointer',
                border: `1px solid ${activePage === p ? GOLD : '#e3e1db'}`,
                background: activePage === p ? `${GOLD}22` : '#fff',
                color: activePage === p ? '#7A5010' : '#4b5563', fontWeight: activePage === p ? 700 : 500,
              }}
            >{p}</button>
          ))}
        </div>
      )}

      <AddFieldForm onAdded={load} />

      {rows === null && <p style={{ fontFamily: "'Inter', sans-serif", color: '#9a9a9a' }}>Chargement…</p>}
      {rows && rows.length === 0 && (
        <p style={{ fontFamily: "'Inter', sans-serif", color: '#9a9a9a' }}>Aucun contenu pour l'instant. Exécute <code>supabase/seed.sql</code> ou ajoute un champ ci-dessus.</p>
      )}

      {Object.entries(grouped).map(([section, sectionRows]) => (
        <div key={section} style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: DARK, marginBottom: 12 }}>{section}</h2>
          {sectionRows.map(row => (
            <ContentRow
              key={row.key}
              row={row}
              onSaved={(key, value) => setRows(rs => rs.map(r => r.key === key ? { ...r, value } : r))}
              onDeleted={(key) => setRows(rs => rs.filter(r => r.key !== key))}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
