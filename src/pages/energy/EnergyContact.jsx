import { useState } from 'react'
import { RED, RED_D, DARK2, GRAY, Reveal, SectionLabel, PageHero } from './shared'

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

      <section style={{ background: DARK2, padding: '96px 0 108px', position: 'relative', overflow: 'hidden' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {[
                  { icon: '📍', label: 'Adresse', val: 'Ouagadougou, Burkina Faso\nAfrique de l\'Ouest' },
                  { icon: '📞', label: 'Téléphone', val: '+226 XX XX XX XX' },
                  { icon: '✉️', label: 'Email', val: 'energy@sibiriholding.com' },
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
