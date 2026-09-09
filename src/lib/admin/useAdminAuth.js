import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

// Session admin (Supabase Auth). `session === undefined` = encore en train de
// vérifier ; `null` = pas connecté ; objet = connecté.
export const useAdminAuth = () => {
  const [session, setSession] = useState(() => supabase ? undefined : null)
  const [isAdmin, setIsAdmin] = useState(() => supabase ? undefined : false)

  useEffect(() => {
    if (!supabase) return

    const applySession = async (nextSession) => {
      setSession(nextSession)
      if (!nextSession) { setIsAdmin(false); return }
      setIsAdmin(undefined)
      const { data, error } = await supabase.rpc('is_admin')
      setIsAdmin(!error && data === true)
    }

    supabase.auth.getSession().then(({ data }) => applySession(data.session ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => applySession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    if (!supabase) return { error: { message: "Back-office non configuré (voir .env.example)." } }
    return supabase.auth.signInWithPassword({ email, password })
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  return { session, isAdmin, loading: session === undefined || (session && isAdmin === undefined), signIn, signOut }
}
