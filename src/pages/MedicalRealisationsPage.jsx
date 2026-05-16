import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MedicalNav } from '../components/MedicalNav'

const GREEN       = '#00A99D'
const GREEN_LIGHT = '#8DC63F'
const GREEN_PALE  = '#E4F7F6'
const DARK        = '#03201F'

const Reveal = ({ children, delay = 0, y = 20, className = '' }) => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.65, 0.3, 0.9] }} className={className}>
      {children}
    </motion.div>
  )
}

const Tag = ({ children, light = false }) => (
  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
    style={light
      ? { background: `${GREEN}55`, color: '#a8e6b8', border: `1px solid ${GREEN_LIGHT}55` }
      : { background: `${GREEN}22`, color: GREEN,     border: `1px solid ${GREEN}44` }}>
    {children}
  </span>
)

// ─── Données ──────────────────────────────────────────────────────────────────
const REALISATIONS = [
  { src: '/medical/IMG_0482.JPG.jpeg', label: "Unité d'hémodialyse — CHU Yalgado",    lieu: 'Ouagadougou',    annee: '2020', cat: 'Dialyse' },
  { src: '/medical/IMG_0495.JPG.jpeg', label: 'Installation générateurs de dialyse',   lieu: 'CHU Bogodogo',   annee: '2021', cat: 'Dialyse' },
  { src: '/medical/IMG_0161.JPG.jpeg', label: "Centrale d'oxygène — CHU Souro Sanou",  lieu: 'Bobo-Dioulasso', annee: '2022', cat: 'Oxygène' },
  { src: '/medical/IMG_0281.JPG.jpeg', label: 'Équipements de laboratoire',             lieu: 'CHR Ouahigouya', annee: '2022', cat: 'Équipements' },
  { src: '/medical/IMG_4221.JPG.jpeg', label: 'Formation des praticiens',               lieu: 'Ouagadougou',    annee: '2023', cat: 'Formation' },
  { src: '/medical/Image1.jpg',        label: "Centre d'hémodialyse — CHU Tengandogo",  lieu: 'Ouagadougou',    annee: '2024', cat: 'Dialyse' },
]

const STATS = [
  { val: '6',     label: 'Centres de dialyse opérationnels' },
  { val: '5',     label: "Centrales d'oxygène installées"   },
  { val: '300K+', label: 'Kits de dialyse fournis'          },
  { val: '2018',  label: 'Année de création'                },
]

// ─── Card image ───────────────────────────────────────────────────────────────
const Card = ({ src, label, lieu, annee, cat }) => {
  const [hov, setHov] = useState(false)
  return (
    <motion.div onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', cursor: 'pointer', height: '100%', minHeight: 260 }}>
      <motion.img src={src} alt={label}
        animate={{ scale: hov ? 1.07 : 1 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />

      {/* Gradient bas permanent */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(3,32,31,0.92) 0%, transparent 100%)', pointerEvents: 'none' }} />

      {/* Overlay hover */}
      <motion.div animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.3 }}
        style={{ position: 'absolute', inset: 0, background: `linear-gradient(160deg, ${GREEN}22 0%, rgba(3,32,31,0.5) 100%)`, pointerEvents: 'none' }} />

      {/* Badge catégorie */}
      <div style={{ position: 'absolute', top: 14, left: 14,
        padding: '4px 12px', borderRadius: 99,
        background: `${GREEN}33`, border: `1px solid ${GREEN}66`,
        fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700,
        color: GREEN_LIGHT, letterSpacing: '0.06em',
      }}>{cat}</div>

      {/* Texte bas */}
      <motion.div animate={{ y: hov ? 0 : 6, opacity: hov ? 1 : 0.9 }} transition={{ duration: 0.3 }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 20px' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, fontWeight: 700, color: 'white', margin: '0 0 5px', lineHeight: 1.3 }}>{label}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: GREEN_LIGHT }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: `${GREEN_LIGHT}CC` }}>{lieu}</span>
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{annee}</span>
        </div>
      </motion.div>

      {/* Icône coin */}
      <motion.div animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0.7 }} transition={{ duration: 0.3 }}
        style={{ position: 'absolute', top: 14, right: 14, width: 32, height: 32, borderRadius: '50%',
          background: `${GREEN}33`, border: `1px solid ${GREEN}66`,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREEN_LIGHT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M7 7h10v10"/>
        </svg>
      </motion.div>
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section style={{ position: 'relative', minHeight: '52vh', background: DARK, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0,
      backgroundImage: `linear-gradient(rgba(0,169,157,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,169,157,0.05) 1px, transparent 1px)`,
      backgroundSize: '64px 64px', pointerEvents: 'none' }} />
    <motion.div animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', top: '-15%', left: '-5%', width: '55%', height: '80%',
        background: `radial-gradient(ellipse, ${GREEN}44 0%, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />

    <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '140px 40px 80px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}>
        <span style={{ display: 'inline-block', padding: '6px 18px', borderRadius: 99,
          background: `${GREEN}33`, border: `1px solid ${GREEN_LIGHT}66`, color: '#b8e8e6',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif", marginBottom: 24 }}>
          Portfolio
        </span>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
        style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
          fontWeight: 700, color: 'white', margin: '0 0 20px', lineHeight: 1.1 }}>
        Nos{' '}
        <span style={{ background: `linear-gradient(90deg, ${GREEN_LIGHT}, #6DE8E0)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          réalisations
        </span>
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
        style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.58)', maxWidth: 520, lineHeight: 1.75, margin: 0 }}>
        Des projets concrets déployés sur l'ensemble du territoire national au service de la santé publique burkinabè.
      </motion.p>
    </div>
  </section>
)

// ─── Page ─────────────────────────────────────────────────────────────────────
export const MedicalRealisationsPage = () => (
  <div className="w-full">
    <MedicalNav />
    <Hero />

    {/* Galerie */}
    <section style={{ background: 'white', padding: '100px 40px 80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', pointerEvents: 'none',
        width: '45%', height: '55%', background: `radial-gradient(ellipse, ${GREEN}09 0%, transparent 65%)`, filter: 'blur(90px)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal className="mb-14">
          <Tag>Nos projets</Tag>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: '#0d1f14', margin: '12px 0 0' }}>
            Projets réalisés
          </h2>
          <div style={{ width: 56, height: 3, borderRadius: 2, marginTop: 20, background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})` }} />
        </Reveal>

        {/* Bento grid */}
        <Reveal delay={0.05}>
          <div className="real-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr 1fr', gridTemplateRows: '300px 300px', gap: 14 }}>
            <div style={{ gridRow: 'span 2' }}><Card {...REALISATIONS[0]} /></div>
            <Card {...REALISATIONS[1]} />
            <Card {...REALISATIONS[2]} />
            <Card {...REALISATIONS[3]} />
            <Card {...REALISATIONS[4]} />
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 860px) { .real-grid { grid-template-columns: 1fr 1fr !important; grid-template-rows: repeat(3, 220px) !important; } .real-grid > :first-child { grid-row: span 1 !important; } }
        @media (max-width: 560px) { .real-grid { grid-template-columns: 1fr !important; grid-template-rows: repeat(5, 200px) !important; } }
      `}</style>
    </section>

    {/* Stats */}
    <section style={{ background: DARK, padding: '80px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 64, flexWrap: 'wrap' }}>
          {STATS.map((s, i) => (
            <Reveal key={s.val} delay={i * 0.1}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 700, margin: '0 0 8px',
                  background: `linear-gradient(90deg, ${GREEN}, ${GREEN_LIGHT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.val}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0,
                  textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Footer contact */}
    <section style={{ background: `linear-gradient(135deg, ${DARK}, #1a3a22)`, padding: '60px 40px', textAlign: 'center' }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>
        Un projet à nous confier ?
      </p>
      <a href="/medical#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 99, textDecoration: 'none',
        background: `linear-gradient(135deg, ${GREEN}, ${GREEN_LIGHT})`, color: 'white',
        fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, boxShadow: `0 8px 28px ${GREEN}44` }}>
        Nous contacter →
      </a>
    </section>
  </div>
)
