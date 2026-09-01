import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { RED, DARK, DARK2, GRAY, Reveal, CountUp, SectionLabel, PageHero } from './shared'

const STATS_ABOUT = [
  { target: 4,    suffix: '',  label: 'Stations-service'        },
  { target: 2022, suffix: '',  label: 'Réseau grand public'     },
  { target: 70,   suffix: '+', label: 'Clients entreprises'     },
  { target: 2025, suffix: '',  label: 'Exclusivité WOLF Lubric.'},
]

const WHY = [
  { icon: '🏆', title: '"Quality Only"', desc: 'Notre slogan est notre engagement. La satisfaction client est un devoir, qui place le professionnalisme au cœur de chaque action.' },
  { icon: '⛽', title: 'Spécialiste Hydrocarbures', desc: 'Années d\'expérience dans la distribution de carburant aux grandes entreprises avec des solutions adaptées à chaque secteur.' },
  { icon: '☀️', title: 'Solutions Solaires', desc: 'Conception et réalisation de centrales solaires et éclairage solaire pour accompagner la transition énergétique.' },
  { icon: '🤝', title: 'Soutien Sibiri Holding', desc: 'Bénéficie de l\'assistance technique permanente du Groupe Sibiri Holding : juridique, RH, financement et garantie.' },
  { icon: '🌍', title: 'Ancrage Local Fort', desc: 'Profonde connaissance du marché burkinabè et adaptation constante aux réalités techniques et économiques locales.' },
  { icon: '📋', title: 'Politique QHSE', desc: 'Engagement qualité, hygiène, sécurité et environnement comme preuve concrète de notre adaptation aux mutations du monde.' },
]

export const EnergyAbout = () => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [counting, setCounting] = useState(false)

  useEffect(() => {
    if (inView) setTimeout(() => setCounting(true), 400)
  }, [inView])

  return (
    <>
      <PageHero
        current="À Propos"
        title="Le partenaire énergétique de"
        accent="référence au Burkina Faso"
        subtitle="Filiale énergétique du Groupe Sibiri Holding, alliant expertise B2B et accès grand public."
        image="/energy/SIBIRI%20ENERGY-6.JPG.jpeg"
      />

      <section style={{ background: DARK, padding: '96px 0 108px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', right: '-10%',
          width: 600, height: 600, transform: 'translateY(-50%)',
          background: `radial-gradient(circle, ${RED}0d 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div ref={ref} style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="about-grid">
            {/* Left */}
            <div>
              <Reveal>
                <SectionLabel>À Propos</SectionLabel>
                <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', fontWeight: 800, color: '#fff', margin: '0 0 24px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.14 }}>
                  Une expertise énergétique étendue
                </h2>
                <p style={{ fontSize: 15, color: GRAY, lineHeight: 1.8, margin: '0 0 16px', fontFamily: "'Inter', sans-serif" }}>
                  SIBIRI ENERGY SA est la filiale énergétique du Groupe Sibiri Holding, opérant au Burkina Faso avec une expertise étendue couvrant la distribution de produits pétroliers, les travaux électriques, mécaniques et de génie civil, ainsi que les réseaux téléphoniques et internet.
                </p>
                <p style={{ fontSize: 15, color: GRAY, lineHeight: 1.8, margin: '0 0 16px', fontFamily: "'Inter', sans-serif" }}>
                  Pionnière dans l'accès à l'énergie solaire, la société réalise des centrales solaires et systèmes d'éclairage solaire, des forages et offre du consulting en solutions énergétiques. Avec quatre stations-service dans la zone de Ouagadougou depuis 2022, elle combine expertise B2B et accès grand public.
                </p>
                <p style={{ fontSize: 15, color: GRAY, lineHeight: 1.8, margin: '0 0 32px', fontFamily: "'Inter', sans-serif" }}>
                  En 2025, la société a obtenu l'<strong style={{ color: '#fff' }}>exclusivité de distribution au Burkina Faso de WOLF LUBRICANTS</strong> de WOLF OIL CORPORATION, partenaire stratégique dans les lubrifiants premium depuis 1955, renforçant sa position de leader énergétique régional.
                </p>
                <Link to="/energy/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent', border: `1.5px solid ${RED}`,
                  color: RED, padding: '12px 28px', borderRadius: 9,
                  fontSize: 13, fontWeight: 700, fontFamily: "'Inter', sans-serif",
                  textDecoration: 'none', transition: 'all 0.25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = RED; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = RED }}
                >
                  Nous contacter
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </Reveal>
            </div>

            {/* Right: stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {STATS_ABOUT.map(({ target, suffix, label }, i) => (
                <Reveal key={label} delay={i * 0.1}>
                  <div style={{
                    padding: '28px 24px', borderRadius: 16,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    <p style={{ margin: '0 0 6px', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, color: '#fff', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em', lineHeight: 1 }}>
                      <CountUp target={target} suffix={suffix} start={counting} />
                    </p>
                    <p style={{ margin: 0, fontSize: 11, color: GRAY, fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
                    <div style={{ width: 28, height: 2, background: RED, borderRadius: 99, marginTop: 12 }} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <style>{`@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
      </section>

      {/* ── Pourquoi nous (fusionné) ─────────────────────────────────────── */}
      <section style={{ background: DARK2, padding: '96px 0 108px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 400, background: `radial-gradient(ellipse, ${RED}08, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={{ marginBottom: 56 }}>
              <SectionLabel>Pourquoi Nous</SectionLabel>
              <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', fontWeight: 800, color: '#fff', margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.12 }}>
                Six raisons de nous faire confiance
              </h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.07}>
                <div style={{
                  padding: '28px 26px', borderRadius: 16,
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', gap: 18, alignItems: 'flex-start', height: '100%',
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `${RED}15`, border: `1px solid ${RED}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, flexShrink: 0,
                  }}>{w.icon}</div>
                  <div>
                    <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: "'Inter', sans-serif" }}>{w.title}</h3>
                    <p style={{ margin: 0, fontSize: 13.5, color: GRAY, lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{w.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
