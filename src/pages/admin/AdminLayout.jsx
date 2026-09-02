import { Navigate, Outlet, Link, useLocation } from 'react-router-dom'
import { ExternalLink, LogOut } from 'lucide-react'
import { useAdminAuth } from '../../lib/admin/useAdminAuth'
import { isBackofficeConfigured } from '../../lib/supabase'

const GOLD = '#B8923E'
const INK  = '#18181B'
const LINE = '#E7E5DF'

export const AdminLayout = () => {
  const { session, loading, signOut } = useAdminAuth()
  const { pathname } = useLocation()

  if (!isBackofficeConfigured()) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Inter', sans-serif" }}>
        <div style={{ maxWidth: 460, textAlign: 'center' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Back-office non configuré</h1>
          <p style={{ color: '#71717A', lineHeight: 1.7, fontSize: 14 }}>
            Il manque les variables <code>VITE_SUPABASE_URL</code> et <code>VITE_SUPABASE_ANON_KEY</code> (voir le fichier <code>.env.example</code> à la racine du projet).
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div style={{ minHeight: '100vh', background: '#fff' }} />
  }

  if (!session && pathname !== '/admin/login') {
    return <Navigate to="/admin/login" replace />
  }

  if (session && pathname === '/admin/login') {
    return <Navigate to="/admin" replace />
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {session && (
        <header style={{
          background: '#fff', borderBottom: `1px solid ${LINE}`, padding: '0 24px', height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40,
        }}>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: GOLD, display: 'inline-block' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: INK, letterSpacing: '-0.01em' }}>
              SIBIRI <span style={{ fontWeight: 500, color: '#71717A' }}>Back-office</span>
            </span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href="/" target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#52525B', textDecoration: 'none',
              fontFamily: "'Inter', sans-serif", padding: '6px 10px', borderRadius: 7,
            }}>
              Voir le site <ExternalLink size={12} />
            </a>
            <button
              onClick={signOut}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'transparent', border: `1px solid ${LINE}`, color: '#3F3F46', borderRadius: 7,
                padding: '6px 12px', fontSize: 12.5, fontFamily: "'Inter', sans-serif", cursor: 'pointer',
              }}
            >
              <LogOut size={13} /> Déconnexion
            </button>
          </div>
        </header>
      )}
      <Outlet />
    </div>
  )
}
