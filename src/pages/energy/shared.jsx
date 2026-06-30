import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

// ── Palette ──────────────────────────────────────────────────────────────────
export const RED   = '#E62630'
export const RED_D = '#b01c26'
export const DARK  = '#060608'
export const DARK2 = '#0e0e12'
export const DARK3 = '#17171c'
export const GRAY  = '#9ca3af'

export const ENERGY_LOGO = '/LOGO_Sibiri_Energy_20-05-2022-1-removebg-preview%20(1).png'

// ── Polices (Inter + Playfair) — injection idempotente ───────────────────────
export const useEnergyFonts = () => {
  useEffect(() => {
    const id = 'energy-fonts'
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@600;700&display=swap'
    document.head.appendChild(link)
  }, [])
}

// ── Fade-in helper ───────────────────────────────────────────────────────────
export const Reveal = ({ children, delay = 0, x = 0, y = 24 }) => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  )
}

// ── CountUp ──────────────────────────────────────────────────────────────────
export const CountUp = ({ target, suffix = '', duration = 2200, start = false }) => {
  const [count, setCount] = useState(0)
  const raf = useRef(null)
  useEffect(() => {
    if (!start) return
    const t0 = performance.now()
    const tick = now => {
      const p = Math.min((now - t0) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target))
      if (p < 1) raf.current = requestAnimationFrame(tick)
      else setCount(target)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [start, target, duration])
  return <span>{count}{suffix}</span>
}

// ── Section label ────────────────────────────────────────────────────────────
export const SectionLabel = ({ children }) => (
  <p style={{
    fontSize: 10, fontWeight: 800, letterSpacing: '0.34em',
    textTransform: 'uppercase', color: RED,
    fontFamily: "'Inter', sans-serif", margin: '0 0 14px',
  }}>{children}</p>
)

// ── Diaporama de l'accueil ───────────────────────────────────────────────────
export const HERO_SLIDES = [
  { src: '/energy/SIBIRI%20ENERGY-6.JPG.jpeg',  alt: 'Station-service Sibiri Energy — vue générale' },
  { src: '/energy/SIBIRI%20ENERGY-8.JPG.jpeg',  alt: 'Entrée de la station Sibiri Energy' },
  { src: '/energy/SIBIRI%20ENERGY-10.JPG.jpeg', alt: 'Ravitaillement en carburant Sibiri Energy' },
  { src: '/energy/SIBIRI%20ENERGY-15.JPG.jpeg', alt: 'Pompe de distribution Sibiri Energy' },
  { src: '/energy/SIBIRI%20ENERGY-12.JPG.jpeg', alt: 'Enseigne Sibiri Energy — Quality Only' },
]
export const SLIDE_DWELL = 5500 // ms d'affichage par image
export const SLIDE_FADE  = 1.8  // s de fondu enchaîné

// ── Hero-bannière compact des pages internes ─────────────────────────────────
export const PageHero = ({ title, accent, subtitle, image, current }) => (
  <section style={{
    position: 'relative', width: '100%', minHeight: '54vh',
    background: DARK, overflow: 'hidden',
    display: 'flex', alignItems: 'center',
  }}>
    {/* Image de fond */}
    <motion.img
      src={image}
      alt={title}
      initial={{ scale: 1.06 }}
      animate={{ scale: 1 }}
      transition={{ duration: 12, ease: 'easeOut' }}
      style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
    {/* Voile dégradé directionnel */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
      background: `linear-gradient(110deg, rgba(6,6,8,0.90) 0%, rgba(6,6,8,0.74) 50%, rgba(6,6,8,0.52) 100%)`,
    }} />
    {/* Texture grille */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
      backgroundImage: `linear-gradient(rgba(230,38,48,0.06) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(230,38,48,0.06) 1px, transparent 1px)`,
      backgroundSize: '64px 64px',
    }} />
    {/* Fondu bas vers la section suivante */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
      background: `linear-gradient(180deg, transparent 78%, ${DARK} 100%)`,
    }} />

    {/* Contenu */}
    <div style={{
      position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280,
      margin: '0 auto', padding: '140px 40px 70px',
    }}>
      {/* Fil d'Ariane */}
      <motion.nav
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22,
          fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <Link to="/energy" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Accueil</Link>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
        <span style={{ color: RED }}>{current}</span>
      </motion.nav>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.2rem, 4.4vw, 4rem)',
          fontWeight: 700, lineHeight: 1.12,
          color: '#ffffff', margin: '0 0 18px', maxWidth: 820,
        }}
      >
        {title}{accent && ' '}
        {accent && (
          <span style={{
            background: `linear-gradient(90deg, ${RED}, #ff6b74)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>{accent}</span>
        )}
      </motion.h1>

      {/* Sous-titre */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.7,
            color: 'rgba(255,255,255,0.66)', maxWidth: 540, margin: 0,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  </section>
)
