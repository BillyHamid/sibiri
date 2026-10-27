import { CONTENT_FIELDS } from './catalog'

export const CONTENT_BY_KEY = new Map(CONTENT_FIELDS.map(field => [field.key, field]))
const ALIASES = new Map()
for (const field of CONTENT_FIELDS) if (field.aliasOf) ALIASES.set(field.aliasOf, [...(ALIASES.get(field.aliasOf) || []), field.key])

export const readContentValue = (content, key, fallback) => {
  const field = CONTENT_BY_KEY.get(key)
  const canonicalKey = field?.aliasOf || key
  const value = [canonicalKey, ...(ALIASES.get(canonicalKey) || [])]
    .map(candidate => content[candidate]).find(item => item !== undefined && item !== null)
  if (value === undefined) return fallback
  if (field?.type === 'list') return Array.isArray(value) ? value : fallback
  if (field?.type === 'image' && (!value || !validateContentValue(value, 'image'))) return fallback
  return typeof value === 'string' ? value : fallback
}

export const isConnectedField = key => CONTENT_BY_KEY.get(key)?.connected === true

export const editableRows = storedRows => {
  const byKey = new Map(storedRows.map(row => [row.key, row]))
  const registered = CONTENT_FIELDS.filter(field => !field.aliasOf).map(field => {
    const stored = byKey.get(field.key)
    const legacy = (ALIASES.get(field.key) || []).find(key => byKey.has(key))
    return { ...field, ...stored, page: field.page, section: field.section, type: field.type, label: field.label,
      value: stored?.value ?? (legacy ? byKey.get(legacy).value : field.value),
      persisted: Boolean(stored), connected: field.connected }
  })
  return [...registered, ...storedRows.filter(row => !CONTENT_BY_KEY.has(row.key)).map(row => ({ ...row, persisted: true, connected: false }))]
}

export const validateContentValue = (value, type) => {
  if (type === 'list') return Array.isArray(value)
  if (typeof value !== 'string') return false
  if (type !== 'image' || value === '') return true
  return /^\/(?!\/)/.test(value) || /^https?:\/\//i.test(value)
}

export const splitContent = (value, separator = ';') => String(value).split(separator).map(part => part.trim()).filter(Boolean)
export const splitPair = (value, separator = '—') => {
  const [first = '', ...rest] = String(value).split(separator)
  return [first.trim(), rest.join(separator).trim()]
}

export const contentStatistic = value => {
  const [display, label] = splitPair(value)
  const numeric = display.match(/^([0-9]+(?:[.,][0-9]+)?)(.*)$/)
  return { target: numeric ? Number(numeric[1].replace(',', '.')) : 0, suffix: numeric ? numeric[2] : display, label }
}
