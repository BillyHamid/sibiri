import { useState } from 'react'
import { useAdminAuth } from '../../lib/admin/useAdminAuth'

const GOLD = '#B8923E'
const INK  = '#18181B'
const LINE = '#E7E5DF'

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

  const inputStyle = {
    width: '100%', boxSizing: 'border-box', padding: '10px 13px', borderRadius: 8,
    border: `1.5px solid ${LINE}`, background: '#fff', color: INK, fontSize: 14,
    marginBottom: 16, fontFamily: "'Inter', sans-serif",
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Inter', sans-serif" }}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 28 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: GOLD, display: 'inline-block' }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: INK, letterSpacing: '-0.01em' }}>
            SIBIRI <span style={{ fontWeight: 500, color: '#71717A' }}>Back-office</span>
          </span>
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 700, color: INK, margin: '0 0 4px' }}>Connexion</h1>
        <p style={{ fontSize: 13.5, color: '#71717A', margin: '0 0 24px' }}>Accès réservé aux administrateurs.</p>

        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#3F3F46', marginBottom: 6 }}>Email</label>
        <input
          type="email" required value={email} onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />

        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#3F3F46', marginBottom: 6 }}>Mot de passe</label>
        <input
          type="password" required value={password} onChange={e => setPassword(e.target.value)}
          style={inputStyle}
        />

        {error && (
          <p style={{ color: '#B4453A', fontSize: 12.5, margin: '0 0 16px' }}>{error}</p>
        )}

        <button
          type="submit" disabled={busy}
          style={{
            width: '100%', padding: '11px', borderRadius: 8, border: 'none',
            background: busy ? '#D9D6CC' : GOLD, color: '#fff', fontWeight: 600, fontSize: 14,
            cursor: busy ? 'default' : 'pointer', fontFamily: "'Inter', sans-serif",
          }}
        >
          {busy ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}
