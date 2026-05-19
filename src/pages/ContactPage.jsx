import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { NeoMinimalFooter } from '../components/NeoMinimalFooter'

// ─── Palette ──────────────────────────────────────────────────────────────────
const GOLD   = '#C9A84C'
const GOLD_L = '#E6C76B'
const DARK   = '#070707'

// ─── Infos de contact ─────────────────────────────────────────────────────────
const CONTACT_INFOS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Siège Social',
    value: 'Ouagadougou, Burkina Faso',
    sub: 'Secteur 15, Avenue Kwamé N\'Krumah',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'Téléphone',
    value: '+226 25 36 XX XX',
    sub: 'Lun – Ven, 08h – 17h',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'contact@sibiriholding.com',
    sub: 'Réponse sous 24h ouvrées',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Horaires',
    value: 'Lun – Ven : 08h00 – 17h00',
    sub: 'Samedi : 09h00 – 13h00',
  },
]

const FILIALES_OPTIONS = [
  'SIBIRI Holding (Général)',
  'Sibiri Global Construction et Rénovation',
  'Sibiri Bio Medical Services',
  'Sibiri Energy',
  'Sibiri Transport & Logistics',
  'Sibiri Agro Chemical',
]

const SUJETS = [
  'Demande d\'information générale',
  'Partenariat & investissement',
  'Recrutement & candidature',
  'Appel d\'offres & marchés publics',
  'Service après-vente',
  'Médias & presse',
  'Autre',
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 24 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Carte info contact ───────────────────────────────────────────────────────
const InfoCard = ({ info, delay }) => (
  <Reveal delay={delay}>
    <div style={{
      display: 'flex', gap: 16, alignItems: 'flex-start',
      padding: '20px 24px', borderRadius: 16,
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${GOLD}22`,
      transition: 'border-color .25s',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${GOLD}55`}
      onMouseLeave={e => e.currentTarget.style.borderColor = `${GOLD}22`}
    >
      <div style={{
        width: 46, height: 46, borderRadius: 12, flexShrink: 0,
        background: `${GOLD}18`, border: `1px solid ${GOLD}33`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: GOLD_L,
      }}>
        {info.icon}
      </div>
      <div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 4px' }}>
          {info.label}
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, fontWeight: 600, color: 'white', margin: '0 0 2px' }}>
          {info.value}
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.38)', margin: 0 }}>
          {info.sub}
        </p>
      </div>
    </div>
  </Reveal>
)

// ─── Champ de formulaire ──────────────────────────────────────────────────────
const Field = ({ label, required, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: 12, fontWeight: 600,
      color: '#374151',
      letterSpacing: '0.04em',
    }}>
      {label}{required && <span style={{ color: GOLD, marginLeft: 4 }}>*</span>}
    </label>
    {children}
  </div>
)

const inputStyle = (focused) => ({
  width: '100%', padding: '12px 16px',
  borderRadius: 10,
  border: `1.5px solid ${focused ? GOLD : 'rgba(0,0,0,0.12)'}`,
  outline: 'none',
  fontFamily: "'Inter', sans-serif",
  fontSize: 14, color: '#111827',
  background: focused ? `${GOLD}05` : 'white',
  transition: 'all 0.2s',
  boxSizing: 'border-box',
  boxShadow: focused ? `0 0 0 3px ${GOLD}18` : 'none',
})

// ─── Formulaire ───────────────────────────────────────────────────────────────
const ContactForm = () => {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', filiale: '', sujet: '', message: '' })
  const [focused, setFocused] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 1800)
  }

  if (sent) return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        textAlign: 'center', padding: '64px 40px',
        borderRadius: 24, background: 'white',
        border: `1px solid ${GOLD}28`,
        boxShadow: '0 4px 40px rgba(0,0,0,0.07)',
      }}
    >
      <div style={{
        width: 72, height: 72, borderRadius: '50%', margin: '0 auto 24px',
        background: `${GOLD}18`, border: `2px solid ${GOLD}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#0D1117', margin: '0 0 12px' }}>
        Message envoyé !
      </h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#6B7280', lineHeight: 1.7, margin: 0 }}>
        Merci pour votre message. Notre équipe reviendra vers vous dans les <strong style={{ color: '#0D1117' }}>24 heures ouvrées</strong>.
      </p>
    </motion.div>
  )

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Nom / Prénom */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-name-grid">
        <Field label="Nom" required>
          <input
            type="text" required value={form.nom}
            onChange={handle('nom')}
            onFocus={() => setFocused('nom')} onBlur={() => setFocused('')}
            placeholder="OUEDRAOGO"
            style={inputStyle(focused === 'nom')}
          />
        </Field>
        <Field label="Prénom" required>
          <input
            type="text" required value={form.prenom}
            onChange={handle('prenom')}
            onFocus={() => setFocused('prenom')} onBlur={() => setFocused('')}
            placeholder="Mahamadou"
            style={inputStyle(focused === 'prenom')}
          />
        </Field>
      </div>

      {/* Email / Téléphone */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-name-grid">
        <Field label="Email" required>
          <input
            type="email" required value={form.email}
            onChange={handle('email')}
            onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
            placeholder="votre@email.com"
            style={inputStyle(focused === 'email')}
          />
        </Field>
        <Field label="Téléphone">
          <input
            type="tel" value={form.telephone}
            onChange={handle('telephone')}
            onFocus={() => setFocused('telephone')} onBlur={() => setFocused('')}
            placeholder="+226 XX XX XX XX"
            style={inputStyle(focused === 'telephone')}
          />
        </Field>
      </div>

      {/* Filiale */}
      <Field label="Filiale concernée">
        <select
          value={form.filiale}
          onChange={handle('filiale')}
          onFocus={() => setFocused('filiale')} onBlur={() => setFocused('')}
          style={{ ...inputStyle(focused === 'filiale'), cursor: 'pointer' }}
        >
          <option value="">— Sélectionner une filiale —</option>
          {FILIALES_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </Field>

      {/* Sujet */}
      <Field label="Objet du message" required>
        <select
          required value={form.sujet}
          onChange={handle('sujet')}
          onFocus={() => setFocused('sujet')} onBlur={() => setFocused('')}
          style={{ ...inputStyle(focused === 'sujet'), cursor: 'pointer' }}
        >
          <option value="">— Sélectionner un objet —</option>
          {SUJETS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>

      {/* Message */}
      <Field label="Message" required>
        <textarea
          required value={form.message}
          onChange={handle('message')}
          onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
          placeholder="Décrivez votre demande en détail..."
          rows={5}
          style={{ ...inputStyle(focused === 'message'), resize: 'vertical', minHeight: 130 }}
        />
      </Field>

      {/* Politique */}
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11.5, color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>
        En soumettant ce formulaire, vous acceptez que vos données soient traitées par SIBIRI Holding SA dans le cadre de votre demande, conformément à notre politique de confidentialité.
      </p>

      {/* Bouton */}
      <motion.button
        type="submit"
        disabled={sending}
        whileHover={{ scale: sending ? 1 : 1.02, boxShadow: `0 14px 40px ${GOLD}44` }}
        whileTap={{ scale: 0.97 }}
        style={{
          padding: '15px 40px', borderRadius: 99,
          background: sending ? `${GOLD}88` : `linear-gradient(135deg, ${GOLD}, ${GOLD_L})`,
          border: 'none', cursor: sending ? 'not-allowed' : 'pointer',
          color: '#0A0A0A', fontFamily: "'Inter', sans-serif",
          fontWeight: 700, fontSize: 15,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: `0 8px 28px ${GOLD}33`,
          transition: 'background 0.3s',
          alignSelf: 'flex-start',
        }}
      >
        {sending ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ width: 16, height: 16, border: `2px solid #0A0A0A`, borderTopColor: 'transparent', borderRadius: '50%' }}
            />
            Envoi en cours…
          </>
        ) : (
          <>
            Envoyer le message
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </>
        )}
      </motion.button>
    </form>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section style={{ position: 'relative', background: DARK, padding: '150px 40px 90px', overflow: 'hidden' }}>
    {/* Grille */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 0,
      backgroundImage: `linear-gradient(${GOLD}07 1px, transparent 1px), linear-gradient(90deg, ${GOLD}07 1px, transparent 1px)`,
      backgroundSize: '80px 80px',
    }} />
    {/* Glows */}
    <motion.div animate={{ opacity: [0.12, 0.28, 0.12] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', top: '-15%', left: '30%', width: '50%', height: '70%', background: `radial-gradient(ellipse, ${GOLD}20 0%, transparent 65%)`, filter: 'blur(90px)', zIndex: 0, pointerEvents: 'none' }}
    />
    <motion.div animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '35%', height: '60%', background: `radial-gradient(ellipse, ${GOLD}18 0%, transparent 65%)`, filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }}
    />

    <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="hero-contact-grid">

        {/* Gauche — titre */}
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ marginBottom: 20 }}>
            <span style={{
              display: 'inline-block', padding: '5px 18px', borderRadius: 99,
              background: `${GOLD}18`, border: `1px solid ${GOLD}44`,
              color: GOLD_L, fontSize: 11, fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
            }}>Contactez-Nous</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.2, 0.65, 0.3, 0.9] }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', fontWeight: 700, color: 'white', lineHeight: 1.12, margin: '0 0 24px' }}>
            Parlons de votre{' '}
            <span style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              projet
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.78, margin: '0 0 48px', maxWidth: 480 }}>
            Que vous soyez partenaire, investisseur, client ou candidat, notre équipe est à votre écoute pour répondre à toutes vos sollicitations.
          </motion.p>

          {/* Infos contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CONTACT_INFOS.map((info, i) => (
              <InfoCard key={i} info={info} delay={0.5 + i * 0.08} />
            ))}
          </div>
        </div>

        {/* Droite — réseaux + accroche visuelle */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
          {/* Carte centrale déco */}
          <div style={{
            borderRadius: 28, padding: '48px 40px',
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${GOLD}22`,
            backdropFilter: 'blur(20px)',
            textAlign: 'center',
          }}>
            <img src="/SIBIRI%20Holding.png" alt="SIBIRI Holding" style={{ height: 100, width: 'auto', margin: '0 auto 32px', display: 'block' }} />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: 'white', margin: '0 0 10px' }}>SIBIRI Holding SA</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.38)', margin: '0 0 32px', lineHeight: 1.6 }}>
              Société Anonyme de droit Burkinabé<br />Capital social : 175 500 000 FCFA
            </p>

            {/* Ligne séparatrice */}
            <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}44, transparent)`, marginBottom: 28 }} />

            {/* Réseaux sociaux */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', margin: '0 0 16px' }}>Suivez-nous</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              {[
                { label: 'LinkedIn', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { label: 'Facebook', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                { label: 'Twitter', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label}
                  style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${GOLD}12`, border: `1px solid ${GOLD}28`,
                    color: GOLD_L, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${GOLD}28`; e.currentTarget.style.borderColor = `${GOLD}55` }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${GOLD}12`; e.currentTarget.style.borderColor = `${GOLD}28` }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
)

// ─── Section formulaire ───────────────────────────────────────────────────────
const FormSection = () => (
  <section style={{ background: '#F8F7F4', padding: '80px 40px 100px' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-block', padding: '5px 18px', borderRadius: 99,
            background: `${GOLD}18`, border: `1px solid ${GOLD}44`,
            color: '#7A5010', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif", marginBottom: 16,
          }}>Formulaire de contact</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: '#0D1117', margin: '0 0 14px' }}>
            Envoyez-nous un message
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#6B7280', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Remplissez le formulaire ci-dessous et notre équipe vous contactera dans les meilleurs délais.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{
          maxWidth: 780, margin: '0 auto',
          background: 'white', borderRadius: 24,
          padding: '52px 56px',
          border: '1px solid rgba(0,0,0,0.07)',
          boxShadow: '0 8px 60px rgba(0,0,0,0.08)',
        }} className="contact-form-card">
          <ContactForm />
        </div>
      </Reveal>
    </div>
  </section>
)

// ─── Section Carte ────────────────────────────────────────────────────────────
const MapSection = () => (
  <section style={{ background: DARK, padding: '80px 40px 0', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 40 }}>
          <div>
            <span style={{
              display: 'inline-block', padding: '5px 16px', borderRadius: 99,
              background: `${GOLD}18`, border: `1px solid ${GOLD}44`,
              color: GOLD_L, fontSize: 11, fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif", marginBottom: 14,
            }}>Notre Localisation</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 700, color: 'white', margin: 0, lineHeight: 1.2,
            }}>
              Nous trouver à{' '}
              <span style={{
                background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Ouagadougou</span>
            </h2>
          </div>

          {/* Adresse rapide */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 20px', borderRadius: 14,
            background: `${GOLD}12`, border: `1px solid ${GOLD}28`,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD_L} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
              Secteur 15, Avenue Kwamé N'Krumah<br />
              <strong style={{ color: GOLD_L }}>Ouagadougou, Burkina Faso</strong>
            </span>
          </div>
        </div>
      </Reveal>

      {/* Carte */}
      <Reveal delay={0.15}>
        <div style={{
          position: 'relative', borderRadius: 20, overflow: 'hidden',
          border: `1px solid ${GOLD}22`,
          boxShadow: `0 0 60px ${GOLD}15`,
        }}>
          {/* Overlay coin supérieur gauche */}
          <div style={{
            position: 'absolute', top: 16, left: 16, zIndex: 10,
            background: 'rgba(7,7,7,0.88)', backdropFilter: 'blur(12px)',
            border: `1px solid ${GOLD}33`, borderRadius: 12,
            padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: GOLD, animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: GOLD_L, letterSpacing: '0.1em' }}>
              SIBIRI HOLDING SA
            </span>
          </div>

          {/* iframe OpenStreetMap — Ouagadougou */}
          <iframe
            title="SIBIRI Holding — Localisation Ouagadougou"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-1.5837%2C12.3415%2C-1.4637%2C12.4015&layer=mapnik&marker=12.3715%2C-1.5237"
            style={{
              width: '100%',
              height: 460,
              border: 'none',
              display: 'block',
              filter: 'grayscale(30%) contrast(1.05)',
            }}
            loading="lazy"
            allowFullScreen
          />

          {/* Bouton ouvrir dans Maps */}
          <div style={{
            position: 'absolute', bottom: 16, right: 16, zIndex: 10,
          }}>
            <a
              href="https://www.openstreetmap.org/?mlat=12.3715&mlon=-1.5237#map=14/12.3715/-1.5237"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 18px', borderRadius: 99,
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_L})`,
                color: '#0A0A0A', fontFamily: "'Inter', sans-serif",
                fontWeight: 700, fontSize: 12,
                textDecoration: 'none',
                boxShadow: `0 6px 20px ${GOLD}44`,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Ouvrir dans Maps
            </a>
          </div>
        </div>
      </Reveal>

      {/* Barre infos rapides sous la carte */}
      <Reveal delay={0.25}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1, marginTop: 1,
          borderRadius: '0 0 20px 20px', overflow: 'hidden',
          border: `1px solid ${GOLD}18`, borderTop: 'none',
        }} className="map-info-bar">
          {[
            { icon: '🚗', label: 'En voiture', val: 'Accès facile depuis le centre-ville' },
            { icon: '🕐', label: 'Horaires d\'accueil', val: 'Lun – Ven : 08h00 → 17h00' },
            { icon: '📞', label: 'Rendez-vous', val: '+226 25 36 XX XX' },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '20px 24px',
              background: 'rgba(255,255,255,0.03)',
              borderRight: i < 2 ? `1px solid ${GOLD}14` : 'none',
              display: 'flex', gap: 12, alignItems: 'center',
            }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 3px' }}>{item.label}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

    </div>

    <style>{`
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      @media(max-width:700px){ .map-info-bar{grid-template-columns:1fr !important;} }
    `}</style>
  </section>
)

// ─── Page principale ──────────────────────────────────────────────────────────
export const ContactPage = () => (
  <div style={{ minHeight: '100vh' }}>
    <Navbar />
    <Hero />
    <FormSection />
    <MapSection />
    <NeoMinimalFooter variant="home" />

    <style>{`
      @media (max-width: 900px) {
        .hero-contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        .form-name-grid { grid-template-columns: 1fr !important; }
        .contact-form-card { padding: 36px 28px !important; }
      }
    `}</style>
  </div>
)
