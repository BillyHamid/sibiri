import { useEffect } from 'react'
import { motion } from 'framer-motion'

const GREEN       = '#00A99D'
const GREEN_LIGHT = '#8DC63F'
const GREEN_PALE  = '#b8e8e6'
const DARK        = '#03201F'

export function MedicalTailarkHeroSection() {
  useEffect(() => {
    const id = 'medical-hero-fonts'
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600;700&display=swap'
    document.head.appendChild(link)
  }, [])

  return (
    <>
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* ── Vidéo background ── */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
          src="/medical/136458-764399870_medium.mp4"
        />

        {/* ── Overlay dark teal dégradé ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `linear-gradient(
            135deg,
            rgba(3,32,31,0.88) 0%,
            rgba(3,32,31,0.72) 50%,
            rgba(0,60,55,0.60) 100%
          )`,
        }} />

        {/* ── Grille texture ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          backgroundImage: `linear-gradient(rgba(0,169,157,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,169,157,0.06) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }} />

        {/* ── Glow ambiant gauche ── */}
        <motion.div
          animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-10%', left: '-8%',
            width: '50%', height: '70%',
            background: `radial-gradient(ellipse, ${GREEN}55 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(80px)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* ── Contenu ── */}
        <div
          style={{
            position: 'relative', zIndex: 10,
            width: '100%', maxWidth: 1280,
            margin: '0 auto',
            padding: '130px 40px 70px',
          }}
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <span style={{
              display: 'inline-block',
              padding: '6px 18px',
              borderRadius: 99,
              background: `${GREEN}33`,
              border: `1px solid ${GREEN_LIGHT}66`,
              color: GREEN_PALE,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
              marginBottom: 28,
            }}>
              Sibiri Bio Médical
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
              fontWeight: 700,
              lineHeight: 1.12,
              color: 'white',
              margin: '0 0 24px',
              maxWidth: 720,
            }}
          >
            La santé de qualité,{' '}
            <span style={{
              background: `linear-gradient(90deg, ${GREEN_LIGHT}, #6DE8E0)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              au cœur du Burkina.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 17,
              lineHeight: 1.78,
              color: 'rgba(255,255,255,0.68)',
              maxWidth: 560,
              margin: '0 0 40px',
            }}
          >
            Importation et distribution de produits pharmaceutiques, matériels et équipements médicaux
            — au service des acteurs publics et privés de santé depuis{' '}
            <strong style={{ color: 'rgba(255,255,255,0.9)' }}>2018</strong>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}
          >
            <a
              href="#services"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 99,
                background: `linear-gradient(135deg, ${GREEN}, ${GREEN_LIGHT})`,
                color: 'white', fontWeight: 700, fontSize: 15,
                fontFamily: "'Inter', sans-serif",
                textDecoration: 'none',
                boxShadow: `0 10px 36px ${GREEN}55`,
              }}
            >
              Nos prestations →
            </a>
            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '14px 32px', borderRadius: 99,
                border: '1px solid rgba(255,255,255,0.22)',
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
                color: 'white', fontWeight: 600, fontSize: 15,
                fontFamily: "'Inter', sans-serif",
                textDecoration: 'none',
              }}
            >
              Nous contacter
            </a>
          </motion.div>

        </div>

        {/* Responsive */}
        <style>{`
          @media (max-width: 768px) {
            .medical-hero-content { padding: 110px 24px 60px !important; }
          }
        `}</style>
      </section>

      {/* Transition vers blanc */}
      <div style={{ position: 'relative', zIndex: 20, lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: 60 }}
          aria-hidden
        >
          <path
            d="M0,30 C360,55 720,5 1080,30 C1260,43 1380,20 1440,28 L1440,60 L0,60 Z"
            fill="white"
          />
        </svg>
      </div>
    </>
  )
}
