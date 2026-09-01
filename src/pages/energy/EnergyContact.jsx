import { useState } from 'react'
import { RED, RED_D, DARK, DARK2, GRAY, Reveal, SectionLabel, PageHero } from './shared'

// ─── Parcours de contact (structure inspirée de wolflubes.com/fr-fr/contactez-nous) ─
const PATHWAYS = [
  {
    icon: '⛽',
    title: 'Stations-service & Grand public',
    desc: "Vous êtes un particulier ? Retrouvez nos stations-service à Ouagadougou pour vos besoins en carburant et lubrifiants.",
  },
  {
    icon: '🏢',
    title: 'Entreprises & B2B',
    desc: "Ravitaillement, cuves portatives, solutions de stockage : parlons de vos besoins en carburant et lubrifiants pour votre activité.",
  },
  {
    icon: '🤝',
    title: 'Devenir partenaire / revendeur',
    desc: "Vous souhaitez rejoindre notre réseau de distribution de carburant ou de lubrifiants WOLF ? Contactez notre équipe partenariats.",
  },
]

// ─── Contacts par service ──────────────────────────────────────────────────────
const DEPARTMENTS = [
  { icon: '✉️', label: 'Renseignements généraux', val: 'energy@sibiri.group' },
  { icon: '📰', label: 'Presse & partenariats',    val: 'presse@sibiri.group' },
  { icon: '🛠️', label: 'Support technique / SAV',  val: 'support@sibiri.group' },
]

export const EnergyContact = () => {
  const [form, setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent]   = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = e => { e.preventDefault(); setSent(true) }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: 10, padding: '13px 16px',
    color: '#fff', fontSize: 14, fontFamily: "'Inter', sans-serif",
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
      <section style={{ background: DARK, padding: '90px 0 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
          <Reveal>
            <SectionLabel>Comment pouvons-nous vous aider ?</SectionLabel>
            <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 800, color: '#fff', margin: '0 0 48px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Trois façons de nous contacter
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {PATHWAYS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <a href="#formulaire" style={{
                  display: 'block', height: '100%', textDecoration: 'none',
                  padding: '30px 26px', borderRadius: 18,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${RED}55`; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{
                    width: 50, height: 50, borderRadius: 14,
                    background: `${RED}18`, border: `1px solid ${RED}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, marginBottom: 18,
                  }}>{p.icon}</div>
                  <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: "'Inter', sans-serif" }}>{p.title}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: GRAY, lineHeight: 1.7 }}>{p.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulaire + coordonnées ───────────────────────────────────────── */}
      <section id="formulaire" style={{ background: DARK2, padding: '96px 0 108px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '-15%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: `radial-gradient(ellipse, ${RED}10, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={{ marginBottom: 56 }}>
              <SectionLabel>Contact</SectionLabel>
              <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', fontWeight: 800, color: '#fff', margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
                Écrivez-nous
              </h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56, alignItems: 'start' }} className="contact-grid">
            {/* Infos */}
            <Reveal x={-20} delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 32 }}>
                {[
                  { icon: '📍', label: 'Adresse', val: 'Ouagadougou, Burkina Faso\nAfrique de l\'Ouest' },
                  { icon: '📞', label: 'Téléphone', val: '+226 XX XX XX XX' },
                  { icon: '🕐', label: 'Disponibilité', val: 'Lun – Ven : 08h00 – 18h00' },
                ].map(({ icon, label, val }) => (
                  <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 11,
                      background: `${RED}15`, border: `1px solid ${RED}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, flexShrink: 0,
                    }}>{icon}</div>
                    <div>
                      <p style={{ margin: '0 0 3px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: RED, fontFamily: "'Inter', sans-serif" }}>{label}</p>
                      <p style={{ margin: 0, fontSize: 14, color: '#fff', fontFamily: "'Inter', sans-serif", lineHeight: 1.6, whiteSpace: 'pre-line' }}>{val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contacts par service */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif" }}>Contacts par service</p>
                {DEPARTMENTS.map(d => (
                  <a key={d.label} href={`mailto:${d.val}`} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', borderRadius: 10,
                    background: 'rgba(255,255,255,0.03)', textDecoration: 'none',
                  }}>
                    <span style={{ fontSize: 15 }}>{d.icon}</span>
                    <span style={{ fontSize: 12.5, color: '#fff', fontFamily: "'Inter', sans-serif" }}>{d.label}</span>
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
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3 style={{ color: '#fff', fontFamily: "'Inter', sans-serif", margin: '0 0 10px' }}>Message envoyé !</h3>
                  <p style={{ color: GRAY, fontFamily: "'Inter', sans-serif", fontSize: 14 }}>Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <input style={inputStyle} name="name" placeholder="Votre nom" value={form.name} onChange={handle}
                      onFocus={e => e.target.style.borderColor = RED}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      required />
                    <input style={inputStyle} name="email" type="email" placeholder="Votre email" value={form.email} onChange={handle}
                      onFocus={e => e.target.style.borderColor = RED}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      required />
                  </div>
                  <input style={inputStyle} name="subject" placeholder="Sujet" value={form.subject} onChange={handle}
                    onFocus={e => e.target.style.borderColor = RED}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                  <textarea style={{ ...inputStyle, height: 130, resize: 'vertical' }} name="message" placeholder="Décrivez votre projet..." value={form.message} onChange={handle}
                    onFocus={e => e.target.style.borderColor = RED}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
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
