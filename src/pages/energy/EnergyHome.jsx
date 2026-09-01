import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
        background: `linear-gradient(110deg, rgba(6,6,8,0.52) 0%, rgba(6,6,8,0.36) 48%, rgba(6,6,8,0.20) 100%)`,
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
          QUALITY{' '}
          <span style={{
            background: `linear-gradient(90deg, ${RED}, #ff6b74)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            ONLY
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
          <strong style={{ color: 'rgba(255,255,255,0.92)' }}>10 ans d'expertise</strong> dans le secteur pétrolier.
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
  { target: 2024, suffix: '',  label: 'Lubrifiant WOLF'         },
  { target: 2022, suffix: '',  label: 'Réseau de station service' },
  { target: 2016, suffix: '',  label: 'Clients Entreprise'      },
  { target: 6,    suffix: '',  label: 'Domaines d\'expertise'   },
]

const HighlightsSection = () => {
  const [count, setCount] = useState(false)

  return (
    <section style={{ background: '#ffffff', padding: '90px 0 100px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(230,38,48,0.06) 1px, transparent 1px)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      <motion.div
        onViewportEnter={() => setTimeout(() => setCount(true), 300)}
        viewport={{ once: true, margin: '-80px' }}
        style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel>Sibiri Energy en bref</SectionLabel>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, color: '#0c0c0e', margin: '0 0 14px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.12 }}>
              Le partenaire énergétique de référence
            </h2>
            <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 460, margin: '0 auto', lineHeight: 1.75, fontFamily: "'Inter', sans-serif" }}>
              Une expertise complète, du carburant aux solutions solaires.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 52 }}>
          {HIGHLIGHTS.map(({ target, suffix, label }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <div style={{ padding: '28px 24px', borderRadius: 16, background: '#faf9f9', border: '1px solid rgba(0,0,0,0.06)', textAlign: 'center' }}>
                <p style={{ margin: '0 0 6px', fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 900, color: '#0c0c0e', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em', lineHeight: 1 }}>
                  <CountUp target={target} suffix={suffix} start={count} />
                </p>
                <p style={{ margin: 0, fontSize: 11, color: '#6b7280', fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
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
          </div>
        </Reveal>
      </motion.div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PRÉSENTATION — teaser
// ══════════════════════════════════════════════════════════════════════════════
const PresentationTeaser = () => (
  <section style={{ background: DARK, padding: '90px 0 100px' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="presentation-teaser">
      <Reveal>
        <SectionLabel>À propos</SectionLabel>
        <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', fontWeight: 800, color: '#fff', margin: '0 0 20px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          Une expertise énergétique étendue
        </h2>
        <p style={{ fontSize: 15, color: GRAY, lineHeight: 1.8, margin: '0 0 28px' }}>
          SIBIRI ENERGY SA est la filiale énergétique du Groupe Sibiri Holding, opérant au Burkina Faso avec une expertise
          étendue couvrant la distribution de produits pétroliers, les travaux électriques, mécaniques et de génie civil,
          ainsi que les réseaux téléphoniques et internet.
        </p>
        <Link to="/energy/a-propos" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: RED, fontSize: 13, fontWeight: 700, fontFamily: "'Inter', sans-serif", textDecoration: 'none',
        }}>
          En savoir plus
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      </Reveal>
      <Reveal delay={0.1}>
        <div style={{ borderRadius: 20, overflow: 'hidden', minHeight: 260 }}>
          <img src="/energy/SIBIRI%20ENERGY-12.JPG.jpeg" alt="Sibiri Energy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </Reveal>
    </div>
    <style>{`@media (max-width: 768px) { .presentation-teaser { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
  </section>
)

// ══════════════════════════════════════════════════════════════════════════════
// PRODUITS — teaser (Carburant / Lubrifiant)
// ══════════════════════════════════════════════════════════════════════════════
const PRODUITS_TEASER = [
  { icon: '⛽', title: 'Carburant', desc: "Essence, gasoil et cuves portatives pour entreprises et grand public.", href: '/energy/services#carburant' },
  { icon: '🛢️', title: 'Lubrifiant', desc: "Distribution WOLF LUBRICANTS pour véhicules, bus, camions et engins miniers.", href: '/energy/services#lubrifiant' },
]

const ProduitsTeaser = () => (
  <section style={{ background: DARK2, padding: '90px 0 100px' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
      <Reveal>
        <SectionLabel>Nos produits</SectionLabel>
        <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 800, color: '#fff', margin: '0 0 48px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          Carburant &amp; Lubrifiant
        </h2>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {PRODUITS_TEASER.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <Link to={p.href} style={{
              display: 'block', padding: '30px 26px', borderRadius: 18, textDecoration: 'none',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{ fontSize: 28 }}>{p.icon}</span>
              <h3 style={{ margin: '16px 0 8px', fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: "'Inter', sans-serif" }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 13.5, color: GRAY, lineHeight: 1.7 }}>{p.desc}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

// ══════════════════════════════════════════════════════════════════════════════
// ACTUALITÉS — teaser
// ══════════════════════════════════════════════════════════════════════════════
const ACTUS_TEASER = [
  { date: '2025', tag: 'Exclusivité', title: 'WOLF LUBRICANTS — Distribution Nationale', desc: "Exclusivité de distribution au Burkina Faso de la marque belge WOLF LUBRICANTS, une gamme premium depuis 1955." },
  { date: '2022', tag: 'Inauguration', title: 'Station-service Kouba — KOUBRI', desc: "Première station grand public de SIBIRI ENERGY SA, point de départ de l'expansion du réseau à Ouagadougou." },
]

const ActualiteTeaser = () => (
  <section style={{ background: DARK, padding: '90px 0 108px' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
      <Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <SectionLabel>Actualité</SectionLabel>
            <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 800, color: '#fff', margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Nos dernières actualités
            </h2>
          </div>
          <Link to="/energy/actualite" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: RED, fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif", textDecoration: 'none' }}>
            Toutes les actualités
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 7.5h9M8 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {ACTUS_TEASER.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.1}>
            <Link to="/energy/actualite" style={{
              display: 'block', padding: '28px 26px', borderRadius: 18, textDecoration: 'none',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: GRAY, fontWeight: 600 }}>{a.date}</span>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
                <span style={{ padding: '3px 10px', borderRadius: 99, background: `${RED}18`, border: `1px solid ${RED}44`, fontSize: 10.5, fontWeight: 700, color: RED }}>{a.tag}</span>
              </div>
              <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: "'Inter', sans-serif", lineHeight: 1.35 }}>{a.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: GRAY, lineHeight: 1.7 }}>{a.desc}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export const EnergyHome = () => (
  <>
    <HeroSection />
    <HighlightsSection />
    <PresentationTeaser />
    <ProduitsTeaser />
    <ActualiteTeaser />
  </>
)
