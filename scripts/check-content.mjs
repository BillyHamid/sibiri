import { createServer } from 'vite'
import { createElement as h } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import assert from 'node:assert/strict'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', plugins: [{
  name: 'content-check-interaction-states', enforce: 'pre',
  transform(code, id) {
    if (!id.includes('content-check-expanded')) return
    // Render the real expanded/next-page branches without writing any remote content.
    return code.replace(/(\[expanded,\s*setExpanded\]\s*=\s*useState\()false\)/, '$1true)')
      .replace(/(\[current,\s*setCurrent\]\s*=\s*useState\()0\)/, '$11)')
      .replace(/(\[page,\s*setPage\]\s*=\s*useState\()1\)/, '$12)')
  },
}] })
try {
  const { CONTENT_FIELDS } = await server.ssrLoadModule('/src/lib/content/catalog.js')
  const { ContentContext } = await server.ssrLoadModule('/src/lib/content/ContentContext.js')
  const { editableRows, readContentValue, validateContentValue } = await server.ssrLoadModule('/src/lib/content/contentModel.js')
  assert.equal(new Set(CONTENT_FIELDS.map(field => field.key)).size, CONTENT_FIELDS.length, 'Duplicate content keys')
  for (const field of CONTENT_FIELDS) {
    assert.ok(field.connected, `Unconnected catalog field: ${field.key}`)
    if (field.aliasOf) assert.ok(CONTENT_FIELDS.some(item => item.key === field.aliasOf && !item.aliasOf), `Invalid alias: ${field.key}`)
  }
  assert.equal(readContentValue({ 'home.hero.title': '' }, 'home.hero.title', 'fallback'), '')
  assert.equal(readContentValue({ 'home.hero.title': {} }, 'home.hero.title', 'fallback'), 'fallback')
  assert.equal(validateContentValue('javascript:alert(1)', 'image'), false)
  const unpublished = editableRows([])
  assert.ok(unpublished.every(row => row.connected && !row.persisted))
  for (const field of CONTENT_FIELDS.filter(field => field.aliasOf)) {
    const legacyValue = field.type === 'image' ? '/legacy-image.png' : 'Legacy value'
    assert.equal(readContentValue({ [field.key]: legacyValue }, field.aliasOf, 'fallback'), legacyValue)
  }
  const { readPublishedContent, createLocalEditorialStore } = await server.ssrLoadModule('/src/lib/content/contentRepository.js')
  const { buildContactMailto } = await server.ssrLoadModule('/src/lib/contact/emailDraft.js')
  const memory = new Map()
  const storage = { getItem: key => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value) }
  const localA = createLocalEditorialStore(storage, 'account-a')
  const localB = createLocalEditorialStore(storage, 'account-b')
  localA.saveDraft({ key: 'home.hero.title', value: 'Private draft', updated_at: '2026-10-27' })
  assert.equal(localA.drafts()[0].value, 'Private draft')
  assert.deepEqual(localB.drafts(), [], 'Drafts must be scoped to the signed-in account')
  localA.deleteDraft('home.hero.title')
  assert.deepEqual(localA.drafts(), [])
  localA.addRevision({ key: 'home.hero.title', value: 'Before', persisted: true }, 'After')
  assert.deepEqual(localA.revisions('home.hero.title').map(item => item.value), ['After', 'Before'])
  const queueClient = results => {
    const calls = []
    return { calls, from(table) {
      const query = { table }
      const chain = { select(columns) { query.columns = columns; return chain }, eq(key, value) { query.filter = [key, value]; return chain }, then(resolve, reject) { calls.push(query); return Promise.resolve(results.shift()).then(resolve, reject) } }
      return chain
    } }
  }
  const legacyClient = queueClient([{ error: { code: '42703', message: 'column content.is_public does not exist' } }, { data: [{ key: 'home.hero.title', value: 'Published' }] }])
  assert.equal((await readPublishedContent(legacyClient)).data[0].value, 'Published')
  assert.equal(legacyClient.calls.length, 2)
  const forbidden = queueClient([{ error: { code: '42501', message: 'permission denied' } }])
  assert.equal((await readPublishedContent(forbidden)).error.code, '42501')
  assert.equal(forbidden.calls.length, 1, 'Do not bypass visibility on permission failures')
  const modernClient = queueClient([{ data: [] }])
  await readPublishedContent(modernClient)
  assert.deepEqual(modernClient.calls[0].filter, ['is_public', true])
  const mailto = buildContactMailto('contact@example.com', { nom: 'Test', prenom: 'QA', email: 'qa@example.com', sujet: 'Essai & détails', message: 'Texte avec accents : é\nDeuxième ligne' })
  assert.ok(mailto.startsWith('mailto:contact@example.com?subject=Essai%20%26%20'))
  assert.ok(decodeURIComponent(mailto).includes('Deuxième ligne'))
  assert.throws(() => buildContactMailto('contact@example.com?bcc=other@example.com', {}))

  const pages = {
    Accueil: [['components/ParticleHeroBanner','ParticleHeroBanner'],['components/SubsidiariesReel','SubsidiariesReel'],['components/PresidentMessage','PresidentMessage'],['components/OrgChart','OrgChart'],['components/PartnersSection','PartnersSection']],
    Groupe: [['pages/GroupePage','GroupePage']],
    Actualités: [['pages/NewsPage','NewsPage']],
    Contact: [['pages/ContactPage','ContactPage']],
    Medical: [['pages/MedicalPage','MedicalPage']],
    'Medical Réalisations': [['pages/MedicalRealisationsPage','MedicalRealisationsPage']],
    'Medical Actualité': [['pages/MedicalActualitePage','MedicalActualitePage']],
    'Medical Formation': [['pages/MedicalFormationPage','MedicalFormationPage']],
    Energy: [['pages/energy/EnergyHome','EnergyHome']],
    'Energy Produits': [['pages/energy/EnergyServices','EnergyServices']],
    'Energy À propos': [['pages/energy/EnergyAbout','EnergyAbout']],
    'Energy Actualité': [['pages/energy/EnergyActualite','EnergyActualite']],
    'Energy Contact': [['pages/energy/EnergyContact','EnergyContact']],
    'Global Construction': [['pages/GlobalConstructionPage','GlobalConstructionPage']],
    'Transport & Logistic': [['pages/TransportLogisticPage','TransportLogisticPage']],
    'Agro Chemical': [['pages/AgroChemicalPage','AgroChemicalPage']],
  }
  const missing = []
  let checked = 0
  for (const [page, modules] of Object.entries(pages)) {
    const fields = CONTENT_FIELDS.filter(field => field.page === page && !field.aliasOf)
    const marker = field => `CMS_CHECK_${CONTENT_FIELDS.indexOf(field)}`
    const content = Object.fromEntries(fields.map(field => [field.key, field.type === 'image' ? `https://example.invalid/${marker(field)}.png` : field.key.includes('stat-') ? `987 — ${marker(field)}` : field.key.endsWith('-details') || field.key.endsWith('-meta') ? `${marker(field)} · 2026 · Test` : marker(field)]))
    const components = []
    for (const [file, name] of modules) {
      const module = await server.ssrLoadModule(`/src/${file}.jsx`)
      components.push(h(module[name], { key: name }))
    }
    const render = children => renderToStaticMarkup(h(ContentContext.Provider, { value: { content, loading: false, refresh: async () => {}, update: () => {} } }, h(MemoryRouter, null, children)))
    let html = render(components)
    for (const [file, name] of modules.filter(([file]) => file.includes('PresidentMessage') || file.includes('NewsPage'))) {
      const expandedModule = await server.ssrLoadModule(`/src/${file}.jsx?content-check-expanded`)
      html += render(h(expandedModule[name]))
    }
    if (page === 'Contact' || page === 'Energy Contact') {
      const { EmailDraftNotice } = await server.ssrLoadModule('/src/components/EmailDraftNotice.jsx')
      html += render(h(EmailDraftNotice, { draftHref: 'mailto:test@example.com', variant: page === 'Contact' ? 'holding' : 'energy' }))
    }
    for (const field of fields) {
      checked++
      if (!html.includes(marker(field))) missing.push({ page, key: field.key, label: field.label })
    }
    console.log(`${page}: ${fields.length} fields rendered`)
  }
  console.log(JSON.stringify({ checked, missing }, null, 2))
  if (missing.length) process.exitCode = 1
} finally { await server.close() }
