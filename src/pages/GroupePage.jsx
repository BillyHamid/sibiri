import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { NeoMinimalFooter } from '../components/NeoMinimalFooter'

// ─── Palette ──────────────────────────────────────────────────────────────────
const GOLD   = '#C9A84C'
const GOLD_L = '#E6C76B'
const DARK   = '#070707'
const DARK2  = '#0D0D0D'
const DARK3  = '#111111'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 30, className = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.2, 0.65, 0.3, 0.9] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const GoldLine = ({ width = 56 }) => (
  <div style={{
    width, height: 2, borderRadius: 2,
    background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L}, transparent)`,
    margin: '20px 0',
  }} />
)

const GoldTag = ({ children }) => (
  <span style={{
    display: 'inline-block',
    padding: '5px 16px', borderRadius: 99,
    background: `${GOLD}18`,
    border: `1px solid ${GOLD}44`,
    color: GOLD_L,
    fontSize: 11, fontWeight: 700,
    letterSpacing: '0.18em', textTransform: 'uppercase',
    fontFamily: "'Inter', sans-serif",
    marginBottom: 20,
  }}>
    {children}
  </span>
)

const G = ({ children }) => (
  <span style={{
    background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    fontWeight: 700,
  }}>{children}</span>
)

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const videoY  = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <section ref={ref} style={{
      position: 'relative', width: '100%', minHeight: '100vh',
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>

      {/* ── Vidéo background avec parallax léger ── */}
      <motion.div style={{ y: videoY, position: 'absolute', inset: '-15% 0', zIndex: 0 }}>
        <video
          autoPlay loop muted playsInline
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          src="/groupe/istockphoto-2203607162-640_adpp_is.mp4"
        />
      </motion.div>

      {/* ── Overlay 1 : gradient cinématique profond ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `linear-gradient(
          170deg,
          rgba(5,4,2,0.78) 0%,
          rgba(7,5,2,0.62) 45%,
          rgba(10,7,2,0.80) 100%
        )`,
      }} />

      {/* ── Overlay 2 : fondu bas fort (lisibilité stats) ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: `linear-gradient(
          to top,
          rgba(5,4,2,0.92) 0%,
          rgba(5,4,2,0.5) 25%,
          transparent 55%
        )`,
      }} />

      {/* ── Overlay 3 : vignette bords ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(5,4,2,0.75) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Grille texture or subtile ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        backgroundImage: `linear-gradient(${GOLD}06 1px, transparent 1px), linear-gradient(90deg, ${GOLD}06 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      {/* ── Glow or animé — halo titre ── */}
      <motion.div
        animate={{ opacity: [0.18, 0.35, 0.18], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '20%', left: '50%',
          transform: 'translateX(-50%)',
          width: '60%', height: '50%',
          background: `radial-gradient(ellipse, ${GOLD}28 0%, transparent 65%)`,
          filter: 'blur(90px)', zIndex: 3, pointerEvents: 'none',
        }}
      />

      {/* ── Contenu principal avec parallax ── */}
      <motion.div style={{ y, opacity, position: 'relative', zIndex: 10, textAlign: 'center', padding: '120px 24px 80px' }}>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.2, 0.65, 0.3, 0.9] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 6vw, 6.2rem)',
            fontWeight: 700, color: 'white',
            lineHeight: 1.08, margin: '0 0 26px',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 40px rgba(0,0,0,0.6)',
          }}
        >
          Un Groupe Africain<br />
          <G>d'Excellence</G>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.78 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 17.5, color: 'rgba(255,255,255,0.55)',
            maxWidth: 520, margin: '0 auto 60px', lineHeight: 1.75,
          }}
        >
          Investissements, gestion et contrôle d'actifs —<br />
          au service des économies africaines depuis sa fondation.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
        >
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: 9,
            color: 'rgba(255,255,255,0.28)', letterSpacing: '0.28em', textTransform: 'uppercase',
          }}>Découvrir</span>
          <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={`${GOLD}99`} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>


      {/* ── Badge bas gauche — fondation ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        style={{
          position: 'absolute', bottom: 64, left: 52, zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 20px', borderRadius: 14,
          background: 'rgba(5,4,2,0.72)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${GOLD}30`,
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `${GOLD}20`, border: `1px solid ${GOLD}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD_L} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: GOLD_L, margin: 0 }}>Fondé en 2012</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.38)', margin: 0 }}>Ouagadougou, Burkina Faso</p>
        </div>
      </motion.div>

    </section>
  )
}

// ─── Second Banner ────────────────────────────────────────────────────────────
const SecondBanner = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const videoY  = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} style={{
      position: 'relative', width: '100%', height: '100vh',
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>

      {/* ── Vidéo avec parallax ── */}
      <motion.div style={{ y: videoY, position: 'absolute', inset: '-15% 0', zIndex: 0 }}>
        <video
          autoPlay loop muted playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          src="/groupe/DJI_0263.MP4"
        />
      </motion.div>

      {/* ── Overlay cinématique ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(160deg, rgba(4,3,1,0.82) 0%, rgba(6,4,1,0.55) 50%, rgba(4,3,1,0.84) 100%)',
      }} />
      {/* Vignette bords */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(4,3,1,0.72) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Séparateur doré haut ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 5,
        background: `linear-gradient(90deg, transparent 0%, ${GOLD}88 30%, ${GOLD} 50%, ${GOLD}88 70%, transparent 100%)`,
      }} />
      {/* ── Séparateur doré bas ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, zIndex: 5,
        background: `linear-gradient(90deg, transparent 0%, ${GOLD}88 30%, ${GOLD} 50%, ${GOLD}88 70%, transparent 100%)`,
      }} />

      {/* ── Contenu ── */}
      <motion.div style={{ opacity, position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px' }}>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 6vw, 6.2rem)',
            fontWeight: 700, color: 'white',
            lineHeight: 1.08, margin: '0 0 26px',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 40px rgba(0,0,0,0.6)',
          }}
        >
          Un Groupe Africain<br />
          <G>d'Excellence</G>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.45 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 17.5, color: 'rgba(255,255,255,0.55)',
            maxWidth: 520, margin: '0 auto 52px',
            lineHeight: 1.75,
          }}
        >
          Investissements, gestion et contrôle d'actifs —<br />
          au service des économies africaines depuis sa fondation.
        </motion.p>

        {/* Bouton Découvrir */}
        <motion.a
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.65 }}
          href="#presentation"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 36px', borderRadius: 99, textDecoration: 'none',
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_L})`,
            color: 'rgba(5,4,2,0.92)', fontFamily: "'Inter', sans-serif",
            fontSize: 14, fontWeight: 700,
            boxShadow: `0 12px 32px ${GOLD}44`,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = `0 16px 48px ${GOLD}66`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = `0 12px 32px ${GOLD}44`
          }}
        >
          Découvrir
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </motion.a>
      </motion.div>

      {/* ── Badge bas gauche — fondation ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.35 }}
        style={{
          position: 'absolute', bottom: 64, left: 52, zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 20px', borderRadius: 14,
          background: 'rgba(5,4,2,0.72)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${GOLD}30`,
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `${GOLD}20`, border: `1px solid ${GOLD}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD_L} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: GOLD_L, margin: 0 }}>Fondé en 2002</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.38)', margin: 0 }}>Ouagadougou, Burkina Faso</p>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Défilement d'images Histoire ────────────────────────────────────────────
const HISTOIRE_IMGS = [
  '/groupe/histoire/DJI_0229.JPG',
  '/groupe/histoire/DJI_0235.JPG',
  '/groupe/histoire/DJI_0241.JPG',
  '/groupe/histoire/DJI_0244.JPG',
]
// Hauteur d'un item (img + marge) : 244px × 4 = 976px → translateY parfait pour boucle
const IMG_H   = 230
const IMG_GAP = 14
const STRIP_HALF = (IMG_H + IMG_GAP) * HISTOIRE_IMGS.length // 976px

const HistoireScroller = () => (
  <Reveal>
    <div style={{
      position: 'relative',
      height: 520, borderRadius: 20,
      overflow: 'hidden',
      border: `1px solid ${GOLD}28`,
      boxShadow: `0 8px 40px rgba(0,0,0,0.08)`,
    }}>
      {/* Fondu haut */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 90, zIndex: 2,
        background: 'linear-gradient(to bottom, #FAFAF8 20%, transparent)',
        pointerEvents: 'none',
      }} />
      {/* Fondu bas */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, zIndex: 2,
        background: 'linear-gradient(to top, #FAFAF8 20%, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Bande défilante verticale — original + doublon pour boucle sans saut */}
      <div style={{ animation: 'histoireScrollV 14s linear infinite' }}>
        {[...HISTOIRE_IMGS, ...HISTOIRE_IMGS].map((src, i) => (
          <div key={i} style={{
            height: IMG_H, marginBottom: IMG_GAP,
            borderRadius: 12, overflow: 'hidden',
          }}>
            <img
              src={src}
              alt={`SIBIRI Groupe - histoire ${(i % HISTOIRE_IMGS.length) + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>
    </div>

    <style>{`
      @keyframes histoireScrollV {
        0%   { transform: translateY(0); }
        100% { transform: translateY(-${STRIP_HALF}px); }
      }
    `}</style>
  </Reveal>
)

// ─── Notre Histoire ────────────────────────────────────────────────────────────
const Histoire = () => (
  <section id="histoire" style={{
    position: 'relative', overflow: 'hidden',
    background: '#FAFAF8', padding: '120px 40px',
  }}>
    {/* Déco */}
    <div style={{
      position: 'absolute', top: '5%', right: '-2%',
      fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(8rem, 20vw, 18rem)', fontWeight: 900,
      color: 'rgba(180,140,50,0.07)', userSelect: 'none', lineHeight: 1,
      letterSpacing: '-0.04em', pointerEvents: 'none',
    }}>HISTOIRE</div>
    <div style={{
      position: 'absolute', top: '-5%', left: '-5%', zIndex: 0,
      width: '40%', height: '50%',
      background: `radial-gradient(ellipse, ${GOLD}0A 0%, transparent 65%)`,
      filter: 'blur(80px)', pointerEvents: 'none',
    }} />

    <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'center' }} className="histoire-grid">

        {/* LEFT : images défilantes histoire */}
        <HistoireScroller />

        {/* RIGHT : texte histoire */}
        <div>
          <Reveal delay={0.1}>
            <GoldTag>Notre Histoire</GoldTag>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
              fontWeight: 700, color: '#0D1117', lineHeight: 1.15, margin: '0 0 4px',
            }}>
              L'héritage d'une<br /><G>vision familiale</G>
            </h2>
            <GoldLine />
          </Reveal>

          <Reveal delay={0.2}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: '#4B5563', marginBottom: 20 }}>
              <strong style={{ color: '#0D1117' }}>SIBIRI Holding SA</strong> est une société Anonyme de droit Burkinabé au capital de{' '}
              <strong style={{ color: GOLD }}>cent soixante-quinze millions cinq cent mille (175 500 000) FCFA</strong>, avec Administrateur Général en la personne de son Fondateur,{' '}
              <strong style={{ color: '#0D1117' }}>Monsieur Mahamadou Lamine OUEDRAOGO</strong>, actionnaire principal, Consul Honoraire du Burkina en République du Bénin et Officier de l'Ordre National du Burkina Faso.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: '#4B5563', marginBottom: 20 }}>
              Elle est une <strong style={{ color: '#0D1117' }}>société d'investissements, de gestion et de contrôle</strong> d'actifs mobiliers et immobiliers. SIBIRI Group est né d'une stratégie d'unité d'actions impulsée par Monsieur OUEDRAOGO Mahamadou Lamine, bien connu du milieu des Affaires au Burkina Faso et dans la sous-région.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.85, color: '#4B5563', marginBottom: 36 }}>
              Lui-même fils du <strong style={{ color: GOLD }}>premier Président de la Chambre de Commerce et d'Industrie de la Haute Volta</strong> (Feu El Hadj Ousmane <em>Sibiri</em> OUEDRAOGO) — d'où le nom de la Holding —, il porte et défend l'ensemble des intérêts du Groupe SIBIRI. Présent dans le <strong style={{ color: '#0D1117' }}>BTP, les Hydrocarbures, le Négoce international</strong> et le commerce général.
            </p>
          </Reveal>

          {/* Secteurs pills */}
          <Reveal delay={0.5}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['BTP & Génie Civil', 'Hydrocarbures', 'Négoce international', 'Commerce général', 'Représentation exclusive'].map(s => (
                <span key={s} style={{
                  padding: '7px 16px', borderRadius: 99,
                  background: `${GOLD}18`, border: `1px solid ${GOLD}44`,
                  color: '#7A5010', fontSize: 12, fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                }}>{s}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>

    <style>{`@media(max-width:900px){.histoire-grid{grid-template-columns:1fr !important;}}`}</style>
  </section>
)

// ─── Notre Vision ──────────────────────────────────────────────────────────────
const VISION_ITEMS = [
  { icon: '🏷️', text: 'Créer une identité en devenant un label de service et de produits de qualité' },
  { icon: '📈', text: "Devenir un acteur du développement économique" },
  { icon: '🏆', text: "Bâtir une réputation d'excellence" },
  { icon: '💡', text: "Apporter des solutions innovantes" },
  { icon: '🤝', text: "Créer une culture d'entreprise soutenue par des valeurs et principes propres" },
  { icon: '🌿', text: "Respecter l'environnement" },
  { icon: '👥', text: "Investir dans les Ressources Humaines" },
  { icon: '🌍', text: "Participer au renforcement de la citoyenneté" },
]

const Vision = () => (
  <section id="vision" style={{
    position: 'relative', overflow: 'hidden',
    background: DARK, padding: '120px 40px',
  }}>
    <div style={{
      position: 'absolute', inset: 0, zIndex: 0,
      backgroundImage: `linear-gradient(${GOLD}06 1px, transparent 1px), linear-gradient(90deg, ${GOLD}06 1px, transparent 1px)`,
      backgroundSize: '80px 80px', pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute', bottom: '-10%', right: '-5%', zIndex: 0,
      width: '45%', height: '60%',
      background: `radial-gradient(ellipse, ${GOLD}15 0%, transparent 65%)`,
      filter: 'blur(90px)', pointerEvents: 'none',
    }} />

    <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>

      {/* Header centré */}
      <Reveal className="text-center mb-20">
        <GoldTag>Notre Vision</GoldTag>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 700, color: 'white', lineHeight: 1.15, margin: '0 0 20px',
        }}>
          Devenir un Groupe<br /><G>Respecté et de Référence</G><br />en Afrique
        </h2>
        <div style={{
          width: 60, height: 2, borderRadius: 2, margin: '0 auto',
          background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
        }} />
      </Reveal>

      {/* Grille 4 × 2 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
      }} className="vision-grid">
        {VISION_ITEMS.map((item, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <motion.div
              whileHover={{ y: -6, boxShadow: `0 20px 60px ${GOLD}22` }}
              transition={{ duration: 0.25 }}
              style={{
                borderRadius: 20, padding: '32px 24px',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${GOLD}28`,
                position: 'relative', overflow: 'hidden',
                height: '100%',
              }}
            >
              {/* Accent top */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: i % 2 === 0
                  ? `linear-gradient(90deg, ${GOLD}, transparent)`
                  : `linear-gradient(90deg, ${GOLD_L}, transparent)`,
              }} />
              {/* Numéro fané */}
              <div style={{
                position: 'absolute', bottom: 8, right: 12,
                fontFamily: "'Playfair Display', serif",
                fontSize: 64, fontWeight: 900,
                color: `${GOLD}0C`, lineHeight: 1, userSelect: 'none',
              }}>{String(i + 1).padStart(2, '0')}</div>

              <div style={{
                width: 48, height: 48, borderRadius: 14, marginBottom: 20,
                background: `${GOLD}18`, border: `1px solid ${GOLD}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>{item.icon}</div>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13, lineHeight: 1.72,
                color: 'rgba(255,255,255,0.65)',
                margin: 0,
              }}>{item.text}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>

    <style>{`@media(max-width:1024px){.vision-grid{grid-template-columns:repeat(2,1fr) !important;}}
             @media(max-width:600px){.vision-grid{grid-template-columns:1fr !important;}}`}</style>
  </section>
)

// ─── Nos Missions ──────────────────────────────────────────────────────────────
const MISSIONS = [
  { num: '01', title: 'Orientations stratégiques', desc: "Identifier, proposer et mettre en œuvre des orientations stratégiques susceptibles d'influencer durablement le groupe ou une filiale." },
  { num: '02', title: 'Axes de croissance', desc: "Prospecter et identifier des axes de croissance pour le groupe dans la sous-région africaine." },
  { num: '03', title: 'Appui opérationnel', desc: "Mettre en place un mécanisme d'appui opérationnel aux filiales en création, en réorganisation ou en difficulté." },
  { num: '04', title: 'Suivi & Contrôle', desc: "Mettre en place un dispositif de suivi et contrôle de l'ensemble des filiales du groupe." },
  { num: '05', title: "Identité & Appartenance", desc: "Renforcer l'identité du groupe et cultiver un sentiment d'appartenance fort parmi les équipes." },
]

const Missions = () => (
  <section id="missions" style={{
    position: 'relative', overflow: 'hidden',
    background: '#F8F7F4', padding: '120px 40px',
  }}>
    <div style={{
      position: 'absolute', top: '5%', left: '-2%',
      fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(8rem, 18vw, 16rem)', fontWeight: 900,
      color: 'rgba(180,140,50,0.07)', userSelect: 'none', lineHeight: 1,
      letterSpacing: '-0.04em', pointerEvents: 'none',
    }}>MISSIONS</div>
    <div style={{
      position: 'absolute', top: '20%', right: '-5%', zIndex: 0,
      width: '35%', height: '50%',
      background: `radial-gradient(ellipse, ${GOLD}08 0%, transparent 65%)`,
      filter: 'blur(80px)', pointerEvents: 'none',
    }} />

    <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }} className="missions-grid">

        {/* LEFT : header */}
        <div style={{ position: 'sticky', top: 120 }}>
          <Reveal>
            <GoldTag>Nos Missions</GoldTag>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 3vw, 3rem)',
              fontWeight: 700, color: '#0D1117', lineHeight: 1.15, margin: '0 0 4px',
            }}>
              Organiser.<br /><G>Appuyer.</G><br />Suivre.
            </h2>
            <GoldLine />
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14, lineHeight: 1.8,
              color: '#4B5563',
              marginBottom: 32,
            }}>
              SIBIRI Holding SA porte les aspirations du Consul Lamine OUEDRAOGO : bâtir un groupe de sociétés Burkinabé, respecté et de dimension internationale, orienté vers l'excellence au service des économies africaines.
            </p>
            {/* Ligne accent */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 20px', borderRadius: 14,
              background: `${GOLD}14`, border: `1px solid ${GOLD}44`,
            }}>
              <span style={{ fontSize: 22 }}>🌍</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7A5010', fontWeight: 600 }}>
                Dimension internationale
              </span>
            </div>
          </Reveal>
        </div>

        {/* RIGHT : liste missions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {MISSIONS.map((m, i) => (
            <Reveal key={m.num} delay={i * 0.1}>
              <motion.div
                whileHover={{ x: 8, borderColor: `${GOLD}66` }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'flex', gap: 28, alignItems: 'flex-start',
                  padding: '28px 32px', borderRadius: 16,
                  background: 'white',
                  border: `1px solid ${GOLD}28`,
                  boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                  marginBottom: 12,
                  cursor: 'default',
                }}
              >
                {/* Numéro */}
                <div style={{
                  flexShrink: 0,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 42, fontWeight: 900, lineHeight: 1,
                  background: `linear-gradient(135deg, ${GOLD}88, ${GOLD_L}44)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>{m.num}</div>

                <div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 19, fontWeight: 700, color: '#0D1117',
                    margin: '0 0 10px',
                  }}>{m.title}</h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14, lineHeight: 1.75,
                    color: '#4B5563',
                    margin: 0,
                  }}>{m.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>

    <style>{`@media(max-width:900px){.missions-grid{grid-template-columns:1fr !important;} .missions-grid>div:first-child{position:static !important;}}`}</style>
  </section>
)

// ─── Nos Valeurs ───────────────────────────────────────────────────────────────
const VALEURS = [
  { icon: '🏛️', title: 'Confiance',     desc: "Bâtir des entreprises de confiance dans tous les secteurs d'activités à travers l'Afrique." },
  { icon: '⭐', title: 'Qualité',        desc: "Offrir des services modernes, de qualité et adaptés aux besoins des marchés africains." },
  { icon: '📊', title: 'Croissance',     desc: "Créer des entreprises axées sur la croissance, dynamiques et attractives pour les investisseurs." },
  { icon: '♾️', title: 'Durabilité',    desc: "Offrir des avantages durables à nos partenaires, clients et communautés." },
  { icon: '🌿', title: 'Environnement', desc: "Assurer et veiller au respect de l'environnement dans chacune de nos activités." },
  { icon: '❤️', title: 'Fidélité',      desc: "Fidéliser nos clients par l'excellence et la constance de la qualité de nos services." },
]

const Valeurs = () => (
  <section id="valeurs" style={{
    position: 'relative', overflow: 'hidden',
    background: DARK3, padding: '120px 40px 0',
  }}>
    <div style={{
      position: 'absolute', top: '-5%', right: '10%', zIndex: 0,
      width: '40%', height: '50%',
      background: `radial-gradient(ellipse, ${GOLD}12 0%, transparent 65%)`,
      filter: 'blur(80px)', pointerEvents: 'none',
    }} />

    <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>

      <Reveal className="text-center mb-16">
        <GoldTag>Nos Valeurs</GoldTag>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 700, color: 'white', lineHeight: 1.15, margin: '0 0 20px',
        }}>
          Les Principes qui<br /><G>Nous Définissent</G>
        </h2>
        <div style={{
          width: 60, height: 2, borderRadius: 2, margin: '0 auto',
          background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
        }} />
      </Reveal>

      {/* Grille 3×2 */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 0,
      }} className="valeurs-grid">
        {VALEURS.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -8, boxShadow: `0 24px 64px ${GOLD}20` }}
              transition={{ duration: 0.25 }}
              style={{
                borderRadius: 20, padding: '36px 30px',
                background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)`,
                border: `1px solid ${GOLD}22`,
                position: 'relative', overflow: 'hidden',
                backdropFilter: 'blur(4px)',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${GOLD}${['AA', '88', 'BB', '77', 'CC', '99'][i]}, transparent)`,
              }} />
              <div style={{
                position: 'absolute', bottom: -10, right: -4,
                fontSize: 80, fontWeight: 900, fontFamily: "'Playfair Display', serif",
                color: `${GOLD}08`, lineHeight: 1, userSelect: 'none',
              }}>{String(i + 1).padStart(2, '0')}</div>

              <div style={{
                width: 52, height: 52, borderRadius: 15, marginBottom: 24,
                background: `${GOLD}18`, border: `1px solid ${GOLD}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24,
              }}>{v.icon}</div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20, fontWeight: 700, color: 'white', margin: '0 0 12px',
              }}>{v.title}</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13, lineHeight: 1.75,
                color: 'rgba(255,255,255,0.55)', margin: 0,
              }}>{v.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>

    </div>

    <style>{`
      @media(max-width:900px){
        .valeurs-grid{grid-template-columns:repeat(2,1fr) !important;}
      }
      @media(max-width:580px){
        .valeurs-grid{grid-template-columns:1fr !important;}
      }
    `}</style>
  </section>
)

// ─── Page principale ──────────────────────────────────────────────────────────
export const GroupePage = () => (
  <div className="w-full" style={{ background: DARK }}>
    <Navbar />
    <SecondBanner />
    <Histoire />
    <Vision />
    <Missions />
    <Valeurs />
    <NeoMinimalFooter variant="home" />
  </div>
)
