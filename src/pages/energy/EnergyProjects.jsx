import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { RED, DARK2, DARK3, GRAY, Reveal, SectionLabel, PageHero } from './shared'

const PROJECTS = [
  {
    category: 'Réseau de distribution',
    title: 'Station-service Kouba — KOUBRI',
    desc: 'Première station grand public de SIBIRI ENERGY SA, inaugurée en 2022 dans la commune de KOUBRI. Point de départ de l\'expansion du réseau dans la zone de Ouagadougou.',
    gradient: `linear-gradient(135deg, #1a0500 0%, #3d1000 40%, #7a2000 100%)`,
    accent: RED,
  },
  {
    category: 'Approvisionnement B2B',
    title: 'Ravitaillement Grandes Entreprises',
    desc: 'Distribution et approvisionnement en produits pétroliers des grandes entreprises des secteurs Transport, BTP et Industrie. Solutions de cuves portatives sur mesure.',
    gradient: `linear-gradient(135deg, #0a0a1a 0%, #12122a 40%, #1e1e40 100%)`,
    accent: '#7B9FFF',
  },
  {
    category: 'Exclusivité 2025',
    title: 'WOLF LUBRICANTS — Distribution Nationale',
    desc: 'Exclusivité de distribution au Burkina Faso de la marque belge WOLF LUBRICANTS (WOLF OIL CORPORATION). Une gamme premium de lubrifiants depuis 1955.',
    gradient: `linear-gradient(135deg, #001a0a 0%, #003020 40%, #004d32 100%)`,
    accent: '#00C878',
  },
]

const ProjectCard = ({ category, title, desc, gradient, accent, delay }) => {
  const [hov, setHov] = useState(false)
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
          transform: hov ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hov ? `0 28px 64px -12px rgba(0,0,0,0.6)` : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
          border: `1px solid ${hov ? accent + '50' : 'rgba(255,255,255,0.06)'}`,
        }}
      >
        {/* Image area */}
        <div style={{
          height: 220, background: gradient, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }} />
          <motion.div
            animate={hov ? { scale: 1.15, opacity: 0.8 } : { scale: 1, opacity: 0.5 }}
            transition={{ duration: 0.5 }}
            style={{
              width: 80, height: 80, borderRadius: '50%',
              border: `2px solid ${accent}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${accent}15`,
              fontSize: 32,
            }}
          >⚡</motion.div>

          <div style={{
            position: 'absolute', top: 18, left: 18,
            background: `${accent}25`, border: `1px solid ${accent}50`,
            padding: '5px 14px', borderRadius: 99,
            fontSize: 10, fontWeight: 700, color: accent,
            fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>{category}</div>
        </div>

        {/* Text */}
        <div style={{ padding: '24px', background: DARK3 }}>
          <h3 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 700, color: '#fff', fontFamily: "'Inter', sans-serif", lineHeight: 1.3 }}>{title}</h3>
          <p style={{ margin: '0 0 18px', fontSize: 13.5, color: GRAY, lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>{desc}</p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 12, fontWeight: 600, color: accent,
            fontFamily: "'Inter', sans-serif",
            transform: hov ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.25s',
          }}>
            Voir le projet
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M7.5 3L11 6.5 7.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export const EnergyProjects = () => (
  <>
    <PageHero
      current="Réalisations"
      title="Nos projets"
      accent="phares"
      subtitle="Réalisations et partenariats stratégiques qui structurent le développement de Sibiri Energy."
      image="/energy/SIBIRI%20ENERGY-8.JPG.jpeg"
    />

    <section style={{ background: DARK2, padding: '90px 0 108px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <SectionLabel>Réalisations</SectionLabel>
              <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', fontWeight: 800, color: '#fff', margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.12 }}>
                Des projets qui font la différence
              </h2>
            </div>
            <Link to="/energy/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              color: RED, fontSize: 13, fontWeight: 600,
              fontFamily: "'Inter', sans-serif", textDecoration: 'none',
            }}>
              Discuter d'un projet
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 7.5h9M8 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} {...p} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  </>
)
