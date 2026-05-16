import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { NeoMinimalFooter } from '../components/NeoMinimalFooter'

// ── Palette ──────────────────────────────────────────────────────────────────
const RED   = '#E62630'
const RED_D = '#b01c26'
const DARK  = '#060608'
const DARK2 = '#0e0e12'
const DARK3 = '#17171c'
const GRAY  = '#9ca3af'

// ── Fade-in helper ───────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, x = 0, y = 24 }) => {
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
const CountUp = ({ target, suffix = '', duration = 2200, start = false }) => {
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
const SectionLabel = ({ children }) => (
  <p style={{
    fontSize: 10, fontWeight: 800, letterSpacing: '0.34em',
    textTransform: 'uppercase', color: RED,
    fontFamily: "'Inter', sans-serif", margin: '0 0 14px',
  }}>{children}</p>
)

// ══════════════════════════════════════════════════════════════════════════════
// 1. NAVBAR
// ══════════════════════════════════════════════════════════════════════════════
const NAV_LINKS = [
  { label: 'Services',  href: '#services' },
  { label: 'À Propos',  href: '#apropos'  },
  { label: 'Projets',   href: '#projets'  },
  { label: 'Pourquoi nous', href: '#why'  },
  { label: 'Contact',   href: '#contact'  },
]

const EnergyNav = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: 70,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          background: scrolled ? 'rgba(6,6,8,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? `1px solid rgba(230,38,48,0.18)` : '1px solid transparent',
          transition: 'all 0.35s ease',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 9,
            background: `linear-gradient(135deg, ${RED}, ${RED_D})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 16px ${RED}50`,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" fill="white" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ lineHeight: 1 }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#fff', fontFamily: "'Inter', sans-serif", letterSpacing: '0.04em' }}>
              SIBIRI <span style={{ color: RED }}>ENERGY</span>
            </p>
            <p style={{ margin: 0, fontSize: 9, color: 'rgba(255,255,255,0.38)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.15em', textTransform: 'uppercase' }}>Groupe Sibiri Holding</p>
          </div>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hidden md:flex">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} style={{
              color: 'rgba(255,255,255,0.65)', fontSize: 12.5, fontWeight: 500,
              fontFamily: "'Inter', sans-serif", textDecoration: 'none',
              letterSpacing: '0.02em', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
            >{l.label}</a>
          ))}
          <a href="#contact" style={{
            background: RED, color: '#fff', padding: '9px 22px',
            borderRadius: 8, fontSize: 12.5, fontWeight: 700,
            fontFamily: "'Inter', sans-serif", textDecoration: 'none',
            letterSpacing: '0.02em', transition: 'all 0.2s',
            boxShadow: `0 4px 16px ${RED}40`,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = RED_D; e.currentTarget.style.transform = 'scale(1.03)' }}
            onMouseLeave={e => { e.currentTarget.style.background = RED; e.currentTarget.style.transform = 'scale(1)' }}
          >Nous contacter</a>
        </div>

        {/* Burger */}
        <button className="md:hidden" onClick={() => setMobile(true)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobile(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.75)' }} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
                width: 280, background: DARK2, borderLeft: `1px solid ${RED}25`,
                display: 'flex', flexDirection: 'column', padding: 24,
              }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 32 }}>
                <button onClick={() => setMobile(false)} style={{ background: 'none', border: 'none', color: GRAY, cursor: 'pointer' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {NAV_LINKS.map(l => (
                  <a key={l.href} href={l.href} onClick={() => setMobile(false)} style={{
                    color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif", padding: '13px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                  }}>{l.label}</a>
                ))}
                <a href="#contact" onClick={() => setMobile(false)} style={{
                  background: RED, color: '#fff', padding: '14px',
                  borderRadius: 8, fontSize: 14, fontWeight: 700,
                  fontFamily: "'Inter', sans-serif", textDecoration: 'none',
                  textAlign: 'center', marginTop: 20,
                }}>Nous contacter</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. HERO
// ══════════════════════════════════════════════════════════════════════════════
const CornerBracket = ({ pos }) => {
  const styles = {
    'tl': { top: 32, left: 32 },
    'tr': { top: 32, right: 32 },
    'bl': { bottom: 48, left: 32 },
    'br': { bottom: 48, right: 32 },
  }
  const rotate = { tl: 0, tr: 90, bl: 270, br: 180 }
  return (
    <div style={{
      position: 'absolute', ...styles[pos], zIndex: 10,
      transform: `rotate(${rotate[pos]}deg)`,
      opacity: 0.5,
    }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M2 26V4a2 2 0 012-2h22" stroke={RED} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

const HeroSection = () => (
  <section id="hero" style={{
    position: 'relative', width: '100%', minHeight: '100vh',
    background: DARK, overflow: 'hidden',
    display: 'flex', alignItems: 'center',
  }}>
    {/* Animated red glow bg */}
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      {/* Main glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-10%', left: '10%',
          width: '55%', height: '70%',
          background: `radial-gradient(ellipse, ${RED}1e 0%, transparent 70%)`,
        }}
      />
      {/* Secondary glow right */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', bottom: '5%', right: '0%',
          width: '45%', height: '60%',
          background: `radial-gradient(ellipse, ${RED}14 0%, transparent 70%)`,
        }}
      />
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(230,38,48,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(230,38,48,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 50%, transparent 30%, ${DARK} 100%)`,
      }} />
    </div>

    {/* Corner brackets */}
    {['tl','tr','bl','br'].map(p => <CornerBracket key={p} pos={p} />)}

    {/* Index label left */}
    <div style={{
      position: 'absolute', left: 36, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: 10, zIndex: 10,
    }}>
      {['A01','A02','A03'].map((l, i) => (
        <motion.div key={l}
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 + i * 0.2 }}
          style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.12em',
            color: i === 0 ? RED : 'rgba(255,255,255,0.25)',
            fontFamily: "'Inter', sans-serif",
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
          {i === 0 && <div style={{ width: 20, height: 1.5, background: RED, borderRadius: 99 }} />}
          {l}
        </motion.div>
      ))}
    </div>

    {/* Main content — 2-column grid */}
    <div style={{
      position: 'relative', zIndex: 10,
      maxWidth: 1280, margin: '0 auto',
      padding: '110px 48px 80px 80px',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      alignItems: 'center',
    }} className="hero-grid">

      {/* ── LEFT: text ── */}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: RED, fontFamily: "'Inter', sans-serif", margin: '0 0 24px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}
        >
          <span style={{ display: 'inline-block', width: 28, height: 1.5, background: RED, borderRadius: 99 }} />
          Sibiri Energy SA — Groupe Sibiri Holding
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(36px, 5vw, 78px)', fontWeight: 900,
            color: '#ffffff', margin: '0 0 20px',
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.0, letterSpacing: '-0.03em',
          }}
        >
          <span style={{
            background: `linear-gradient(90deg, ${RED}, #ff6b74)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>QUALITY ONLY</span><br />
          L'avenir énergétique<br/>commence ici.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          style={{
            fontSize: 'clamp(14px, 1.4vw, 16px)', color: 'rgba(255,255,255,0.52)',
            lineHeight: 1.8, margin: '0 0 40px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Spécialiste de la distribution de produits pétroliers, des travaux énergétiques
          et des solutions solaires au Burkina Faso. Partenaire de confiance des grandes
          entreprises des secteurs Transport, BTP et Industrie.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
        >
          <a href="#services" style={{
            background: RED, color: '#fff', padding: '13px 28px',
            borderRadius: 9, fontSize: 14, fontWeight: 700,
            fontFamily: "'Inter', sans-serif", textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            boxShadow: `0 8px 28px ${RED}45`, transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 36px ${RED}55` }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 28px ${RED}45` }}
          >
            Nos services
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#projets" style={{
            background: 'transparent', color: '#fff',
            padding: '13px 28px', borderRadius: 9, fontSize: 14, fontWeight: 600,
            fontFamily: "'Inter', sans-serif", textDecoration: 'none',
            border: '1.5px solid rgba(255,255,255,0.18)', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' }}
          >Voir nos réalisations</a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{
            marginTop: 52, paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', gap: 36, flexWrap: 'wrap',
          }}
        >
          {[
            { value: '4',    label: 'Stations-service'        },
            { value: '2022', label: 'Réseau grand public'     },
            { value: '2025', label: 'Exclusivité WOLF Lubric.'},
            { value: '100%', label: 'Satisfaction client'     },
          ].map(({ value, label }) => (
            <div key={label}>
              <p style={{
                margin: 0, fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 900,
                color: '#fff', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em',
              }}>{value}</p>
              <p style={{
                margin: '3px 0 0', fontSize: 10, color: GRAY,
                fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT: image gallery ── */}
      <motion.div
        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative' }}
      >
        {/* Main photo */}
        <div style={{
          position: 'relative', borderRadius: 20, overflow: 'hidden',
          border: `1.5px solid ${RED}35`,
          boxShadow: `0 0 80px ${RED}20, 0 40px 80px rgba(0,0,0,0.55)`,
          marginBottom: 10,
          aspectRatio: '4/3',
        }}>
          <img
            src="/energy/SIBIRI%20ENERGY-6.JPG.jpeg"
            alt="Station-service Sibiri Energy — vue générale"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
            background: `linear-gradient(transparent, rgba(6,6,8,0.78))`,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${RED}, ${RED}60, transparent)`,
          }} />
          <div style={{
            position: 'absolute', bottom: 18, left: 18,
            background: RED, color: '#fff', borderRadius: 99,
            padding: '6px 16px', fontSize: 10, fontWeight: 800,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
            boxShadow: `0 4px 16px ${RED}50`,
          }}>Quality Only</div>
          <div style={{
            position: 'absolute', top: 18, right: 18,
            background: 'rgba(6,6,8,0.75)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.75)', borderRadius: 8,
            padding: '5px 12px', fontSize: 10, fontWeight: 600,
            fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em',
          }}>Station Kouba — KOUBRI</div>
        </div>

        {/* 2 smaller photos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { src: '/energy/SIBIRI%20ENERGY-8.JPG.jpeg',  label: 'Enseigne · Ouagadougou' },
            { src: '/energy/SIBIRI%20ENERGY-10.JPG.jpeg', label: 'Ravitaillement B2B'     },
          ].map(({ src, label }) => (
            <div key={label} style={{
              position: 'relative', borderRadius: 14, overflow: 'hidden',
              border: '1px solid rgba(230,38,48,0.18)',
              aspectRatio: '4/3',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}>
              <img src={src} alt={label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(transparent 35%, rgba(6,6,8,0.82))`,
                pointerEvents: 'none',
              }} />
              <p style={{
                position: 'absolute', bottom: 12, left: 14, right: 8,
                margin: 0, fontSize: 10, fontWeight: 600,
                color: 'rgba(255,255,255,0.78)', fontFamily: "'Inter', sans-serif",
                lineHeight: 1.3,
              }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -24, right: -24, width: 88, height: 88,
          border: `1px solid ${RED}25`, borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: -12, right: -12, width: 44, height: 44,
          border: `1px solid ${RED}45`, borderRadius: '50%', pointerEvents: 'none',
        }} />
      </motion.div>
    </div>

    {/* Scroll cue */}
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 10,
      }}
    >
      <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', fontFamily: "'Inter', sans-serif", margin: 0 }}>Défiler</p>
      <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 6l5 5 5-5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </motion.div>

    <style>{`
      @media (max-width: 900px) {
        .hero-grid { grid-template-columns: 1fr !important; padding: 100px 24px 60px !important; gap: 40px !important; }
      }
    `}</style>
  </section>
)

// ══════════════════════════════════════════════════════════════════════════════
// 3. SERVICES
// ══════════════════════════════════════════════════════════════════════════════
const SERVICES = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M3 12h2m14 0h2M12 3v2m0 14v2M5.6 5.6l1.4 1.4m9.9 9.9 1.4 1.4M5.6 18.4l1.4-1.4m9.9-9.9 1.4-1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    title: 'Distribution Produits Pétroliers',
    desc: 'Ravitaillement en carburant des grandes entreprises des secteurs Transport, BTP et Industrie. Location et mise à disposition de cuves portatives.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Réseau de Stations-Service',
    desc: 'Quatre stations-service dans la zone de Ouagadougou, dont la première à Kouba (commune de KOUBRI), ouverte en 2022.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M7 17l1.5-1.5M15.5 8.5 17 7M7 7l1.5 1.5M15.5 15.5 17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Centrale & Éclairage Solaire',
    desc: 'Étude et réalisation de centrales solaires et systèmes d\'éclairage solaire pour particuliers, entreprises et institutions.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Travaux Électriques & Mécaniques',
    desc: 'Étude et réalisation de travaux électriques, mécaniques et de génie civil. Commerce de matériels électriques et mécaniques.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.67 1.14 2 2 0 012.66 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.68a16 16 0 006.41 6.41l1.04-1.04a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Réseaux Téléphoniques & Internet',
    desc: 'Étude et réalisation de réseaux téléphoniques et internet pour entreprises, sites industriels et infrastructures publiques.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Forages & Consulting',
    desc: 'Étude et réalisation de forages. Consulting en solutions énergétiques, accompagnement stratégique et technique des entreprises.',
  },
]

const ServicesSection = () => {
  return (
    <section id="services" style={{ background: DARK2, padding: '100px 0 108px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(230,38,48,0.04) 1px, transparent 1px)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionLabel>Nos Services</SectionLabel>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, color: '#fff', margin: '0 0 16px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Une expertise énergétique<br />complète et intégrée
          </h2>
          <p style={{ fontSize: 15, color: GRAY, maxWidth: 480, lineHeight: 1.75, margin: '0 0 56px', fontFamily: "'Inter', sans-serif" }}>
            De la distribution pétrolière aux solutions solaires, en passant par les travaux électriques et le consulting, nous couvrons tous les domaines de l'énergie.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}

const ServiceCard = ({ icon, title, desc, delay }) => {
  const [hov, setHov] = useState(false)
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: '32px 28px',
          borderRadius: 18,
          background: hov ? DARK3 : 'rgba(255,255,255,0.03)',
          border: `1.5px solid ${hov ? `${RED}45` : 'rgba(255,255,255,0.07)'}`,
          boxShadow: hov ? `0 24px 60px -12px ${RED}22` : '0 2px 16px rgba(0,0,0,0.2)',
          transform: hov ? 'translateY(-5px)' : 'translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
          cursor: 'default', position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: hov ? `linear-gradient(90deg, ${RED}, ${RED}50)` : 'transparent',
          transition: 'all 0.3s ease',
        }} />

        <div style={{
          width: 52, height: 52, borderRadius: 13,
          background: hov ? `${RED}20` : 'rgba(255,255,255,0.05)',
          border: `1px solid ${hov ? `${RED}40` : 'rgba(255,255,255,0.08)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: hov ? RED : GRAY,
          marginBottom: 20, transition: 'all 0.3s ease',
          boxShadow: hov ? `0 6px 20px ${RED}28` : 'none',
        }}>{icon}</div>

        <h3 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 700, color: '#fff', fontFamily: "'Inter', sans-serif' " }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 13.5, color: GRAY, lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{desc}</p>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          marginTop: 20, fontSize: 12, fontWeight: 600, color: hov ? RED : 'rgba(255,255,255,0.3)',
          fontFamily: "'Inter', sans-serif", transition: 'color 0.25s',
        }}>
          En savoir plus
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 6.5h9M7.5 3L11 6.5 7.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Reveal>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. À PROPOS
// ══════════════════════════════════════════════════════════════════════════════
const STATS_ABOUT = [
  { target: 4,    suffix: '',  label: 'Stations-service'        },
  { target: 2022, suffix: '',  label: 'Réseau grand public'     },
  { target: 70,   suffix: '+', label: 'Clients entreprises'     },
  { target: 2025, suffix: '',  label: 'Exclusivité WOLF Lubric.'},
]

const AboutSection = () => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [counting, setCounting] = useState(false)

  useEffect(() => {
    if (inView) setTimeout(() => setCounting(true), 400)
  }, [inView])

  return (
    <section id="apropos" style={{ background: DARK, padding: '108px 0', position: 'relative', overflow: 'hidden' }}>
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
              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, color: '#fff', margin: '0 0 24px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.12 }}>
                Le partenaire énergétique de référence au Burkina Faso
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
              <a href="#contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', border: `1.5px solid ${RED}`,
                color: RED, padding: '12px 28px', borderRadius: 9,
                fontSize: 13, fontWeight: 700, fontFamily: "'Inter', sans-serif",
                textDecoration: 'none', transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = RED; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = RED }}
              >
                Découvrir notre histoire
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
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

      <style>{`.about-grid { @media (max-width: 768px) { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 5. PROJETS
// ══════════════════════════════════════════════════════════════════════════════
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

const ProjectsSection = () => (
  <section id="projets" style={{ background: DARK2, padding: '100px 0 108px' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
      <Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <SectionLabel>Réalisations</SectionLabel>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Nos projets phares
            </h2>
          </div>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            color: RED, fontSize: 13, fontWeight: 600,
            fontFamily: "'Inter', sans-serif", textDecoration: 'none',
          }}>
            Voir tous les projets
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3 7.5h9M8 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.title} {...p} delay={i * 0.1} />)}
      </div>
    </div>
  </section>
)

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
          {/* Industrial decoration */}
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

          {/* Category tag */}
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

// ══════════════════════════════════════════════════════════════════════════════
// 6. POURQUOI NOUS
// ══════════════════════════════════════════════════════════════════════════════
const WHY = [
  { icon: '🏆', title: '"Quality Only"', desc: 'Notre slogan est notre engagement. La satisfaction client est un devoir, qui place le professionnalisme au cœur de chaque action.' },
  { icon: '⛽', title: 'Spécialiste Hydrocarbures', desc: 'Années d\'expérience dans la distribution de carburant aux grandes entreprises avec des solutions adaptées à chaque secteur.' },
  { icon: '☀️', title: 'Solutions Solaires', desc: 'Conception et réalisation de centrales solaires et éclairage solaire pour accompagner la transition énergétique.' },
  { icon: '🤝', title: 'Soutien Sibiri Holding', desc: 'Bénéficie de l\'assistance technique permanente du Groupe Sibiri Holding : juridique, RH, financement et garantie.' },
  { icon: '🌍', title: 'Ancrage Local Fort', desc: 'Profonde connaissance du marché burkinabè et adaptation constante aux réalités techniques et économiques locales.' },
  { icon: '📋', title: 'Politique QHSE', desc: 'Engagement qualité, hygiène, sécurité et environnement comme preuve concrète de notre adaptation aux mutations du monde.' },
]

const WhySection = () => (
  <section id="why" style={{ background: DARK, padding: '108px 0', position: 'relative' }}>
    <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 400, background: `radial-gradient(ellipse, ${RED}08, transparent 70%)`, pointerEvents: 'none' }} />

    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionLabel>Pourquoi Nous</SectionLabel>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 14px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Ce qui nous distingue
          </h2>
          <p style={{ fontSize: 15, color: GRAY, maxWidth: 440, margin: '0 auto', lineHeight: 1.75, fontFamily: "'Inter', sans-serif" }}>
            Des valeurs fortes, une méthode éprouvée et une passion pour l'excellence énergétique.
          </p>
        </div>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {WHY.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.07}>
            <div style={{
              padding: '28px 26px', borderRadius: 16,
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', gap: 18, alignItems: 'flex-start',
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
)

// ══════════════════════════════════════════════════════════════════════════════
// 7. CONTACT
// ══════════════════════════════════════════════════════════════════════════════
const ContactSection = () => {
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
    <section id="contact" style={{ background: DARK2, padding: '108px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-15%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: `radial-gradient(ellipse, ${RED}10, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <SectionLabel>Contact</SectionLabel>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 14px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
              Parlons de votre projet
            </h2>
            <p style={{ fontSize: 15, color: GRAY, maxWidth: 420, margin: '0 auto', lineHeight: 1.75, fontFamily: "'Inter', sans-serif" }}>
              Notre équipe est disponible pour étudier vos besoins et vous proposer des solutions adaptées.
            </p>
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
      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// 8. FOOTER
// ══════════════════════════════════════════════════════════════════════════════
const EnergyFooter = () => (
  <footer style={{ background: '#030305', borderTop: `1px solid rgba(230,38,48,0.12)`, padding: '64px 40px 32px' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 52 }} className="footer-grid">
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" fill="white"/>
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: "'Inter', sans-serif" }}>SIBIRI <span style={{ color: RED }}>ENERGY</span></p>
              <p style={{ margin: 0, fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase' }}>Groupe Sibiri Holding</p>
            </div>
          </div>
          <p style={{ fontSize: 13.5, color: GRAY, lineHeight: 1.75, maxWidth: 280, fontFamily: "'Inter', sans-serif", margin: '0 0 24px' }}>
            Pionnier de l'énergie industrielle en Afrique subsaharienne depuis plus de 15 ans.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {['in', 'tw', 'fb'].map(s => (
              <a key={s} href="#" style={{
                width: 36, height: 36, borderRadius: 9,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: GRAY, fontSize: 12, fontWeight: 700, textDecoration: 'none',
                fontFamily: "'Inter', sans-serif", transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = `${RED}20`; e.currentTarget.style.color = RED; e.currentTarget.style.borderColor = `${RED}40` }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = GRAY; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
              >{s.toUpperCase()}</a>
            ))}
          </div>
        </div>

        {/* Links */}
        {[
          { title: 'Services', items: ['Distribution Pétroliers', 'Stations-Service', 'Éclairage Solaire', 'Travaux Électriques', 'Forages & Consulting'] },
          { title: 'Entreprise', items: ['À Propos', 'Nos Projets', 'Pourquoi Nous', 'Contact'] },
          { title: 'Groupe', items: ['Sibiri Holding', 'Global Construction', 'Bio Medical', 'Agro Chemical'] },
        ].map(col => (
          <div key={col.title}>
            <p style={{ margin: '0 0 18px', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>{col.title}</p>
            {col.items.map(item => (
              <a key={item} href="#" style={{
                display: 'block', fontSize: 13.5, color: GRAY,
                fontFamily: "'Inter', sans-serif", textDecoration: 'none',
                marginBottom: 10, transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = GRAY}
              >{item}</a>
            ))}
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.28)', fontFamily: "'Inter', sans-serif" }}>
          © {new Date().getFullYear()} Sibiri Energy — Groupe Sibiri Holding. Tous droits réservés.
        </p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Mentions légales', 'Confidentialité', 'CGU'].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', fontFamily: "'Inter', sans-serif", textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </div>
    </div>
    <style>{`@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } }`}</style>
  </footer>
)

// ══════════════════════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ══════════════════════════════════════════════════════════════════════════════
export const EnergyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [])

  return (
    <div style={{ background: DARK, minHeight: '100vh' }}>
      <EnergyNav />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ProjectsSection />
      <WhySection />
      <ContactSection />
      <NeoMinimalFooter variant="energy" />
    </div>
  )
}
