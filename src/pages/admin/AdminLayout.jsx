import { Navigate, Outlet, Link, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../../lib/admin/useAdminAuth'
import { isBackofficeConfigured } from '../../lib/supabase'

const GOLD = '#C9A84C'
const DARK = '#1D1D1B'

export const AdminLayout = () => {
  const { session, loading, signOut } = useAdminAuth()
  const { pathname } = useLocation()

  if (!isBackofficeConfigured()) {
    return (
      <div style={{ minHeight: '100vh', background: DARK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Inter', sans-serif" }}>
        <div style={{ maxWidth: 480, textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, marginBottom: 14 }}>Back-office non configuré</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: 14 }}>
            Il manque les variables <code>VITE_SUPABASE_URL</code> et <code>VITE_SUPABASE_ANON_KEY</code> (voir le fichier <code>.env.example</code> à la racine du projet).
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div style={{ minHeight: '100vh', background: DARK }} />
  }

  if (!session && pathname !== '/admin/login') {
    return <Navigate to="/admin/login" replace />
  }

  if (session && pathname === '/admin/login') {
    return <Navigate to="/admin" replace />
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f3f0' }}>
      {session && (
        <header style={{ background: DARK, padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: '#fff' }}>SIBIRI <span style={{ color: GOLD }}>Back-office</span></span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>Voir le site ↗</Link>
            <button
              onClick={signOut}
              style={{ background: 'transparent', border: `1px solid ${GOLD}55`, color: GOLD, borderRadius: 99, padding: '7px 16px', fontSize: 13, fontFamily: "'Inter', sans-serif", cursor: 'pointer' }}
            >
              Se déconnecter
            </button>
          </div>
        </header>
      )}
      <Outlet />
    </div>
  )
}
