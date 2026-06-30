import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RED, RED_D, DARK, DARK2, GRAY,
  Reveal, CountUp, SectionLabel,
  HERO_SLIDES, SLIDE_DWELL, SLIDE_FADE,
} from './shared'

// ══════════════════════════════════════════════════════════════════════════════
// HERO — diaporama plein écran
// ══════════════════════════════════════════════════════════════════════════════
const HeroSection = () => {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(
      () => setSlide(s => (s + 1) % HERO_SLIDES.length),
      SLIDE_DWELL,
    )
    return () => clearInterval(t)
  }, [])

  return (
    <section id="hero" style={{
      position: 'relative', width: '100%', minHeight: '100vh',
      background: DARK, overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* ── Diaporama plein cadre (fondu enchaîné + léger zoom) ── */}
      {HERO_SLIDES.map((img, i) => {
        const active = i === slide
        return (
          <motion.img
            key={img.src}
            src={img.src}
            alt={img.alt}
            initial={false}
            animate={{ opacity: active ? 1 : 0, scale: active ? 1.08 : 1 }}
            transition={{
              opacity: { duration: SLIDE_FADE, ease: 'easeInOut' },
              scale:   { duration: SLIDE_DWELL / 1000 + SLIDE_FADE, ease: 'linear' },
            }}
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              width: '100%', height: '100%', objectFit: 'cover',
            }}
          />
        )
      })}

      {/* ── Voile dégradé directionnel (plus sombre à gauche) ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: `linear-gradient(110deg, rgba(6,6,8,0.88) 0%, rgba(6,6,8,0.70) 48%, rgba(6,6,8,0.48) 100%)`,
      }} />
      {/* Texture grille */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(230,38,48,0.06) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(230,38,48,0.06) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
      }} />
      {/* Glow rouge ambiant (gauche) */}
      <motion.div
        animate={{ opacity: [0.18, 0.3, 0.18], scale: [1, 1.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-12%', left: '-8%',
          width: '52%', height: '72%', zIndex: 2, pointerEvents: 'none',
          background: `radial-gradient(ellipse, ${RED}44 0%, transparent 70%)`,
          borderRadius: '50%', filter: 'blur(90px)',
        }}
      />
      {/* Fondu vers la section suivante */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: `linear-gradient(180deg, transparent 82%, ${DARK} 100%)`,
      }} />

      {/* ── Contenu aligné à gauche ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: 1280,
        margin: '0 auto', padding: '130px 40px 80px',
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 4.6vw, 4.4rem)',
            fontWeight: 700, lineHeight: 1.12,
            color: '#ffffff', margin: '0 0 24px', maxWidth: 760,
          }}
        >
          L'avenir énergétique{' '}
          <span style={{
            background: `linear-gradient(90deg, ${RED}, #ff6b74)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            commence ici.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 17, lineHeight: 1.78,
            color: 'rgba(255,255,255,0.7)',
            maxWidth: 560, margin: '0 0 40px',
          }}
        >
          Distribution de produits pétroliers, travaux énergétiques et solutions
          solaires — au service des entreprises et des collectivités du Burkina Faso
          depuis <strong style={{ color: 'rgba(255,255,255,0.92)' }}>2022</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
        >
          <Link to="/energy/services" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 32px', borderRadius: 99,
            background: `linear-gradient(135deg, ${RED}, ${RED_D})`,
            color: '#fff', fontWeight: 700, fontSize: 15,
            fontFamily: "'Inter', sans-serif", textDecoration: 'none',
            boxShadow: `0 10px 36px ${RED}55`,
          }}>
            Nos services →
          </Link>
          <Link to="/energy/contact" style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '14px 32px', borderRadius: 99,
            border: '1px solid rgba(255,255,255,0.22)',
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
            color: '#fff', fontWeight: 600, fontSize: 15,
            fontFamily: "'Inter', sans-serif", textDecoration: 'none',
          }}>
            Nous contacter
          </Link>
        </motion.div>
      </div>

      {/* ── Indicateurs du diaporama (discrets, cliquables) ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{ position: 'absolute', bottom: 38, left: 40, display: 'flex', gap: 9, zIndex: 10 }}
      >
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} aria-label={`Image ${i + 1}`}
            style={{
              width: i === slide ? 28 : 16, height: 3,
              borderRadius: 99, border: 'none', padding: 0, cursor: 'pointer',
              background: i === slide ? RED : 'rgba(255,255,255,0.28)',
              transition: 'width 0.4s ease, background 0.4s ease',
            }}
          />
        ))}
      </motion.div>

      {/* ── Indicateur de défilement discret ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{
          position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10,
        }}
      >
        <p style={{ fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.34)', fontFamily: "'Inter', sans-serif", margin: 0 }}>Défiler</p>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 6l5 5 5-5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// APERÇUS — chiffres clés + accès rapide
// ══════════════════════════════════════════════════════════════════════════════
const HIGHLIGHTS = [
  { target: 4,    suffix: '',  label: 'Stations-service'      },
  { target: 2022, suffix: '',  label: 'Réseau grand public'   },
  { target: 70,   suffix: '+', label: 'Clients entreprises'   },
  { target: 6,    suffix: '',  label: 'Domaines d\'expertise' },
]

const HighlightsSection = () => {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(false)
  useEffect(() => { if (inView) setTimeout(() => setCount(true), 300) }, [inView])

  return (
    <section style={{ background: DARK2, padding: '90px 0 100px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(230,38,48,0.04) 1px, transparent 1px)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      <div ref={ref} style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel>Sibiri Energy en bref</SectionLabel>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, color: '#fff', margin: '0 0 14px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.12 }}>
              Le partenaire énergétique de référence
            </h2>
            <p style={{ fontSize: 15, color: GRAY, maxWidth: 460, margin: '0 auto', lineHeight: 1.75, fontFamily: "'Inter', sans-serif" }}>
              Une expertise complète, du carburant aux solutions solaires, au service du développement du Burkina Faso.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 52 }}>
          {HIGHLIGHTS.map(({ target, suffix, label }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <div style={{ padding: '28px 24px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
                <p style={{ margin: '0 0 6px', fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 900, color: '#fff', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em', lineHeight: 1 }}>
                  <CountUp target={target} suffix={suffix} start={count} />
                </p>
                <p style={{ margin: 0, fontSize: 11, color: GRAY, fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
                <div style={{ width: 28, height: 2, background: RED, borderRadius: 99, margin: '12px auto 0' }} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/energy/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 28px', borderRadius: 9, background: RED,
              color: '#fff', fontWeight: 700, fontSize: 14,
              fontFamily: "'Inter', sans-serif", textDecoration: 'none',
              boxShadow: `0 8px 28px ${RED}45`,
            }}>
              Découvrir nos services
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/energy/contact" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '13px 28px', borderRadius: 9,
              border: '1.5px solid rgba(255,255,255,0.18)', background: 'transparent',
              color: '#fff', fontWeight: 600, fontSize: 14,
              fontFamily: "'Inter', sans-serif", textDecoration: 'none',
            }}>
              Nous contacter
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export const EnergyHome = () => (
  <>
    <HeroSection />
    <HighlightsSection />
  </>
)
