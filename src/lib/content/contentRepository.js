const missingColumn = error => ['42703', 'PGRST204'].includes(error?.code) && String(error.message).includes('is_public')
const missingTable = error => ['42P01', 'PGRST205'].includes(error?.code)
const visibilitySupport = new WeakMap()

export async function readPublishedContent(client) {
  if (visibilitySupport.get(client) === false) return client.from('content').select('key, value, type')
  let result = await client.from('content').select('key, value, type').eq('is_public', true)
  // The first installed schema predates the visibility column: every row is public.
  // Only retry a missing-column error, never authorization or network failures.
  if (missingColumn(result.error)) { visibilitySupport.set(client, false); result = await client.from('content').select('key, value, type') }
  else if (!result.error) visibilitySupport.set(client, true)
  return result
}

export async function detectEditorialStorage(client) {
  const [visibility, drafts, revisions] = await Promise.all([
    client.from('content').select('is_public').limit(0),
    client.from('content_drafts').select('key').limit(0),
    client.from('content_revisions').select('id').limit(0),
  ])
  if (visibility.error && !missingColumn(visibility.error)) throw visibility.error
  if (drafts.error && !missingTable(drafts.error)) throw drafts.error
  if (revisions.error && !missingTable(revisions.error)) throw revisions.error
  return { visibility: !visibility.error, drafts: !drafts.error && !visibility.error, revisions: !revisions.error }
}

export function createLocalEditorialStore(storage, namespace) {
  const read = kind => {
    const raw = storage.getItem(`${namespace}:${kind}`)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) throw new Error('Les données éditoriales locales sont illisibles.')
    return parsed
  }
  const write = (kind, records) => storage.setItem(`${namespace}:${kind}`, JSON.stringify(records))
  return {
    drafts: () => read('drafts'),
    saveDraft: draft => write('drafts', [...read('drafts').filter(item => item.key !== draft.key), { ...draft, local: true }]),
    deleteDraft: key => write('drafts', read('drafts').filter(item => item.key !== key)),
    revisions: key => read('revisions').filter(item => item.content_key === key).slice(0, 5),
    addRevision: (row, value, action = 'UPDATE') => {
      const all = read('revisions')
      const prior = row.persisted && !all.some(item => item.content_key === row.key)
        ? [{ id: `${row.key}-previous`, content_key: row.key, value: row.value, action: 'PREVIOUS', changed_at: row.updated_at || new Date().toISOString() }] : []
      const latest = { id: crypto.randomUUID(), content_key: row.key, value, action, changed_at: new Date().toISOString() }
      write('revisions', [latest, ...prior, ...all].filter((item, index, records) => records.slice(0, index).filter(other => other.content_key === item.content_key).length < 5))
    },
  }
}
