import { useState } from 'react'
import { useAdminAuth } from '../../lib/admin/useAdminAuth'

const GOLD = '#C9A84C'
const DARK = '#1D1D1B'

export const AdminLogin = () => {
  const { signIn } = useAdminAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error } = await signIn(email, password)
    setBusy(false)
    if (error) setError(error.message)
  }

  return (
    <div style={{ minHeight: '100vh', background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 380, background: '#252523', borderRadius: 20, padding: '40px 32px', border: `1px solid ${GOLD}25` }}>
        <img src="/SIBIRI%20Holding.png" alt="SIBIRI Holding" style={{ height: 48, width: 'auto', margin: '0 auto 24px', display: 'block' }} />
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#fff', textAlign: 'center', margin: '0 0 6px' }}>Back-office</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)', textAlign: 'center', margin: '0 0 28px' }}>Connexion administrateur</p>

        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 6, fontFamily: "'Inter', sans-serif" }}>Email</label>
        <input
          type="email" required value={email} onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 14, marginBottom: 16, fontFamily: "'Inter', sans-serif" }}
        />

        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 6, fontFamily: "'Inter', sans-serif" }}>Mot de passe</label>
        <input
          type="password" required value={password} onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 10, border: '1.5px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 14, marginBottom: 20, fontFamily: "'Inter', sans-serif" }}
        />

        {error && (
          <p style={{ color: '#f87171', fontSize: 12.5, margin: '0 0 16px', fontFamily: "'Inter', sans-serif" }}>{error}</p>
        )}

        <button
          type="submit" disabled={busy}
          style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', background: GOLD, color: '#1D1D1B', fontWeight: 700, fontSize: 14, cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.6 : 1, fontFamily: "'Inter', sans-serif" }}
        >
          {busy ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
