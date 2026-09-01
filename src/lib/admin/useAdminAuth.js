import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

// Session admin (Supabase Auth). `session === undefined` = encore en train de
// vérifier ; `null` = pas connecté ; objet = connecté.
export const useAdminAuth = () => {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    if (!supabase) { setSession(null); return }
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
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

  return { session, loading: session === undefined, signIn, signOut }
}
