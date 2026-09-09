import { useState } from 'react'
import { RED, RED_D, PAPER, ON_PAPER, Reveal, SectionLabel, PageHero } from './shared'

const Ico = ({ d }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    {d.map((path, i) => (
      <path key={i} d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ))}
  </svg>
)

// ─── Parcours de contact (structure inspirée de wolflubes.com/fr-fr/contactez-nous) ─
const PATHWAYS = [
  {
    icon: <Ico d={['M3 22V6a2 2 0 012-2h6a2 2 0 012 2v16', 'M3 22h10M13 11h2a2 2 0 012 2v2.5a1.5 1.5 0 003 0V9.5a2 2 0 00-.586-1.414L17 6', 'M6 6h4']} />,
    title: 'Stations-service & Grand public',
    desc: "Vous êtes un particulier ? Retrouvez nos stations-service à Ouagadougou pour vos besoins en carburant et lubrifiants.",
  },
  {
    icon: <Ico d={['M3 21h18', 'M5 21V5a1 1 0 011-1h8a1 1 0 011 1v16', 'M15 21V10h3a1 1 0 011 1v10', 'M8 8h2M8 12h2M8 16h2']} />,
    title: 'Entreprises & B2B',
    desc: "Ravitaillement, cuves portatives, solutions de stockage : parlons de vos besoins en carburant et lubrifiants pour votre activité.",
  },
  {
    icon: <Ico d={['M11 17l-2.5 2.5a2 2 0 01-2.8-2.8L8 14.5', 'M3 11l4-4 3.5 3.5a2 2 0 002.8 0L15 9l6 6-3 3-3-2', 'M14 5l3-2 4 4-2 3']} />,
    title: 'Devenir partenaire / revendeur',
    desc: "Vous souhaitez rejoindre notre réseau de distribution de carburant ou de lubrifiants WOLF ? Contactez notre équipe partenariats.",
  },
]

// ─── Contacts par service ──────────────────────────────────────────────────────
const DEPARTMENTS = [
  { icon: <Ico d={['M3 7l9 6 9-6', 'M3 5h18v14H3V5z']} />, label: 'Renseignements généraux', val: 'energy@sibiri.group' },
  { icon: <Ico d={['M4 4h16v16H4V4z', 'M8 8h8M8 12h8M8 16h4']} />, label: 'Presse & partenariats', val: 'presse@sibiri.group' },
  { icon: <Ico d={['M14.7 6.3a4 4 0 01-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 015.4-5.4l-2.5 2.5-1.4-1.4 2.5-2.5z']} />, label: 'Support technique / SAV', val: 'support@sibiri.group' },
]

// ─── Coordonnées ───────────────────────────────────────────────────────────────
const COORDONNEES = [
  { icon: <Ico d={['M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z', 'M12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z']} />, label: 'Adresse', val: 'Ouagadougou, Burkina Faso\nAfrique de l\'Ouest' },
  { icon: <Ico d={['M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1A19.5 19.5 0 015 10.8 19.8 19.8 0 011.9 2.2 2 2 0 013.9 0h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8 8.7a16 16 0 006.4 6.4l1-1a2 2 0 012.1-.5c.9.3 1.9.6 2.8.7a2 2 0 011.7 2z']} />, label: 'Téléphone', val: '+226 XX XX XX XX' },
  { icon: <Ico d={['M12 22a10 10 0 100-20 10 10 0 000 20z', 'M12 6v6l4 2']} />, label: 'Disponibilité', val: 'Lun – Ven : 08h00 – 18h00' },
]

export const EnergyContact = () => {
  const [form, setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent]   = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = e => { e.preventDefault(); setSent(true) }

  const inputStyle = {
    width: '100%', background: '#FFFFFF',
    border: `1.5px solid ${ON_PAPER.line}`,
    borderRadius: 10, padding: '13px 16px',
    color: ON_PAPER.title, fontSize: 14, fontFamily: "'Inter', sans-serif",
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  return (
    <>
      <PageHero
        current="Contact"
        title="Parlons de votre"
        accent="projet énergétique"
        subtitle="Notre équipe est disponible pour étudier vos besoins et vous proposer des solutions adaptées."
        image="/energy/SIBIRI%20ENERGY-10.JPG.jpeg"
      />

      {/* ── Comment pouvons-nous vous aider ? ─────────────────────────────── */}
      {/* Chapitre clair : l'orientation se fait en pleine lumière, le formulaire
          reprend ensuite le registre sombre de la filiale. */}
      <section style={{ background: PAPER, padding: '104px 0 112px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
          <Reveal>
            <SectionLabel>Comment pouvons-nous vous aider ?</SectionLabel>
            <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 800, color: ON_PAPER.title, margin: '0 0 48px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Trois façons de nous contacter
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {PATHWAYS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <a href="#formulaire" style={{
                  display: 'block', height: '100%', textDecoration: 'none',
                  padding: '30px 26px', borderRadius: 18,
                  background: ON_PAPER.card, border: `1px solid ${ON_PAPER.line}`,
                  boxShadow: '0 1px 3px rgba(12,12,15,0.05)',
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${RED}55`; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = ON_PAPER.line; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{
                    width: 50, height: 50, borderRadius: 14,
                    background: `${RED}12`, border: `1px solid ${RED}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: RED, marginBottom: 18,
                  }}>{p.icon}</div>
                  <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 700, color: ON_PAPER.title, fontFamily: "'Inter', sans-serif" }}>{p.title}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: ON_PAPER.body, lineHeight: 1.7 }}>{p.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulaire + coordonnées ───────────────────────────────────────── */}
      <section id="formulaire" style={{ background: PAPER, padding: '104px 0 112px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '-15%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: `radial-gradient(ellipse, ${RED}10, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={{ marginBottom: 56 }}>
              <SectionLabel>Contact</SectionLabel>
              <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', fontWeight: 800, color: ON_PAPER.title, margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
                Écrivez-nous
              </h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56, alignItems: 'start' }} className="contact-grid">
            {/* Infos */}
            <Reveal x={-20} delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 32 }}>
                {COORDONNEES.map(({ icon, label, val }) => (
                  <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 11,
                      background: `${RED}12`, border: `1px solid ${RED}28`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: RED, flexShrink: 0,
                    }}>{icon}</div>
                    <div>
                      <p style={{ margin: '0 0 3px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: RED, fontFamily: "'Inter', sans-serif" }}>{label}</p>
                      <p style={{ margin: 0, fontSize: 14, color: ON_PAPER.title, fontFamily: "'Inter', sans-serif", lineHeight: 1.6, whiteSpace: 'pre-line' }}>{val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contacts par service */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, paddingTop: 24, borderTop: `1px solid ${ON_PAPER.line}` }}>
                <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: ON_PAPER.muted, fontFamily: "'Inter', sans-serif" }}>Contacts par service</p>
                {DEPARTMENTS.map(d => (
                  <a key={d.label} href={`mailto:${d.val}`} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', borderRadius: 10,
                    background: ON_PAPER.card, border: `1px solid ${ON_PAPER.line}`, textDecoration: 'none',
                  }}>
                    <span style={{ display: 'inline-flex', color: RED }}>{d.icon}</span>
                    <span style={{ fontSize: 12.5, color: ON_PAPER.title, fontFamily: "'Inter', sans-serif" }}>{d.label}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 12, color: RED, fontFamily: "'Inter', sans-serif" }}>{d.val}</span>
                  </a>
                ))}
              </div>

              {/* Carte (placeholder — à remplacer par Google Maps) */}
              <div style={{ borderRadius: 16, overflow: 'hidden', minHeight: 180 }}>
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?fm=jpg&q=80&w=800&auto=format&fit=crop"
                  alt="Localisation Sibiri Energy — Ouagadougou"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </Reveal>

            {/* Form */}
            <Reveal x={20} delay={0.15}>
              {sent ? (
                <div style={{ padding: '48px 32px', borderRadius: 20, background: `${RED}10`, border: `1.5px solid ${RED}35`, textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, color: RED }}>
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 style={{ color: ON_PAPER.title, fontFamily: "'Inter', sans-serif", margin: '0 0 10px' }}>Message envoyé !</h3>
                  <p style={{ color: ON_PAPER.body, fontFamily: "'Inter', sans-serif", fontSize: 14 }}>Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <input style={inputStyle} name="name" placeholder="Votre nom" value={form.name} onChange={handle}
                      onFocus={e => e.target.style.borderColor = RED}
                      onBlur={e => e.target.style.borderColor = ON_PAPER.line}
                      required />
                    <input style={inputStyle} name="email" type="email" placeholder="Votre email" value={form.email} onChange={handle}
                      onFocus={e => e.target.style.borderColor = RED}
                      onBlur={e => e.target.style.borderColor = ON_PAPER.line}
                      required />
                  </div>
                  <input style={inputStyle} name="subject" placeholder="Sujet" value={form.subject} onChange={handle}
                    onFocus={e => e.target.style.borderColor = RED}
                    onBlur={e => e.target.style.borderColor = ON_PAPER.line}
                  />
                  <textarea style={{ ...inputStyle, height: 130, resize: 'vertical' }} name="message" placeholder="Décrivez votre projet..." value={form.message} onChange={handle}
                    onFocus={e => e.target.style.borderColor = RED}
                    onBlur={e => e.target.style.borderColor = ON_PAPER.line}
                    required />
                  <button type="submit" style={{
                    background: RED, color: '#fff', border: 'none',
                    padding: '15px 32px', borderRadius: 10,
                    fontSize: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif",
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 8, transition: 'all 0.25s',
                    boxShadow: `0 8px 28px ${RED}40`,
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = RED_D; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = RED; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    Envoyer le message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </>
  )
}
