import { createContext, useContext as useReactContext, useEffect, useState, useCallback } from 'react'
import { supabase, isBackofficeConfigured } from '../supabase'

const ContentContext = createContext({ content: {}, loading: false, refresh: () => {} })

// ─── Provider ───────────────────────────────────────────────────────────────
// Charge tout le contenu du back-office en un seul appel au démarrage de l'app,
// et le rend disponible à tous les composants via useContentValue(key, fallback).
// Si Supabase n'est pas configuré (pas de .env.local), le site continue de
// fonctionner normalement avec les valeurs codées en dur (fallback).
export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(isBackofficeConfigured())

  const refresh = useCallback(async () => {
    if (!supabase) { setLoading(false); return }
    setLoading(true)
    const { data, error } = await supabase.from('content').select('key, value, type')
    if (!error && data) {
      const map = {}
      for (const row of data) map[row.key] = row.value
      setContent(map)
    }
    setLoading(false)
  }, [])

  useEffect(() => { refresh() }, [refresh])

  return (
    <ContentContext.Provider value={{ content, loading, refresh }}>
      {children}
    </ContentContext.Provider>
  )
}

// ─── Hook de lecture ────────────────────────────────────────────────────────
// Usage : const title = useContentValue('home.hero.title', 'Un Groupe Multisectoriel')
// Retourne toujours quelque chose d'affichable : la valeur du back-office si
// elle existe, sinon le texte codé en dur fourni en 2e argument.
export const useContentValue = (key, fallback) => {
  const { content } = useReactContext(ContentContext)
  const value = content[key]
  return value === undefined || value === null || value === '' ? fallback : value
}

// ─── Hook d'accès brut (pour l'admin) ───────────────────────────────────────
export const useContentStore = () => useReactContext(ContentContext)
