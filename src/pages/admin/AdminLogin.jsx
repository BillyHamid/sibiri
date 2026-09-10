import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { useAdminAuth } from '../../lib/admin/useAdminAuth'
import './AdminLogin.css'

export const AdminLogin = () => {
  const { signIn } = useAdminAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    const { error: signInError } = await signIn(email, password)
    setBusy(false)
    if (signInError) setError(signInError.message)
  }

  return (
    <main className="admin-login">
      <section className="admin-login__identity" aria-label="SIBIRI Holding">
        <Link to="/" className="admin-login__back"><ArrowLeft size={15} /> Retour au site</Link>
        <div className="admin-login__identity-content">
          <img src="/logo.png" alt="Logo SIBIRI Holding" className="admin-login__logo" />
          <p className="admin-login__kicker">SIBIRI HOLDING</p>
          <h1>L’exigence au<br /><em>cœur de l’action.</em></h1>
          <p className="admin-login__statement">Un espace sécurisé, conçu pour piloter les contenus et préserver la cohérence de l’ensemble du Groupe.</p>
        </div>
        <div className="admin-login__identity-footer"><span /> <p>Administration · Accès réservé</p></div>
      </section>

      <section className="admin-login__panel">
        <div className="admin-login__form-wrap">
          <div className="admin-login__panel-top"><span>ESPACE ADMINISTRATEUR</span><ShieldCheck size={18} aria-hidden="true" /></div>
          <div className="admin-login__heading">
            <p>Bon retour</p>
            <h2>Connectez-vous<br />à votre espace.</h2>
            <span>Utilisez vos identifiants administrateur pour accéder au tableau de bord.</span>
          </div>

          <form onSubmit={submit}>
            <div className="admin-login__field">
              <label htmlFor="admin-email">Adresse e-mail</label>
              <div className="admin-login__input"><Mail size={17} aria-hidden="true" /><input id="admin-email" type="email" autoComplete="email" placeholder="vous@entreprise.com" required value={email} onChange={(event) => setEmail(event.target.value)} /></div>
            </div>
            <div className="admin-login__field">
              <label htmlFor="admin-password">Mot de passe</label>
              <div className="admin-login__input"><LockKeyhole size={17} aria-hidden="true" /><input id="admin-password" type="password" autoComplete="current-password" placeholder="Votre mot de passe" required value={password} onChange={(event) => setPassword(event.target.value)} /></div>
            </div>
            {error && <p className="admin-login__error" role="alert">{error}</p>}
            <button type="submit" disabled={busy} className="admin-login__submit"><span>{busy ? 'Vérification en cours…' : 'Accéder au tableau de bord'}</span><ArrowUpRight size={18} aria-hidden="true" /></button>
          </form>

          <p className="admin-login__notice"><LockKeyhole size={13} aria-hidden="true" /> Connexion sécurisée · accès strictement réservé</p>
        </div>
      </section>
    </main>
  )
}
