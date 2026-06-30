import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { RED, DARK, GRAY, Reveal, CountUp, SectionLabel, PageHero } from './shared'

const STATS_ABOUT = [
  { target: 4,    suffix: '',  label: 'Stations-service'        },
  { target: 2022, suffix: '',  label: 'Réseau grand public'     },
  { target: 70,   suffix: '+', label: 'Clients entreprises'     },
  { target: 2025, suffix: '',  label: 'Exclusivité WOLF Lubric.'},
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
    </>
  )
}
