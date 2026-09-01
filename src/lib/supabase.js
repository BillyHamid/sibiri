import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// `supabase` reste `null` tant que le projet n'est pas configuré (voir .env.example).
// Le reste de l'app doit tolérer ce cas — le site continue de fonctionner avec le
// contenu codé en dur tant que le back-office n'est pas branché.
export const supabase = (url && anonKey) ? createClient(url, anonKey) : null

export const isBackofficeConfigured = () => supabase !== null
