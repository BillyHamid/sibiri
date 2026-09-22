import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useContentValue } from '../../lib/content/ContentProvider'
import { Link } from 'react-router-dom'

// ── Palette — charte graphique SIBIRI ENERGY ─────────────────────────────────
// La charte n'autorise que trois couleurs :
//   Rouge  C0 M94 Y80 N0   → #E62630
//   Gris   N75             → #646363
//   Noir   N100            → #1D1D1B
// Tout le reste doit être une teinte de ces trois-là (ou du blanc).
export const RED   = '#E62630'
export const RED_D = '#b01c26'   // rouge assombri, réservé aux états survolés
export const DARK  = '#1D1D1B'   // noir de charte
export const GRAY  = '#646363'   // gris de charte

// ── Surfaces de section ──────────────────────────────────────────────────────
// Consigne client : « Mettre tout le fond en Blanc ». Energy est donc un site
// CLAIR : toutes les sections de contenu sont blanches, et le noir est réservé
// au seul hero photographique. Les gris sombres (DARK2/DARK3) ne servent plus
// de fond de section — uniquement de surfaces de carte sur le hero.
export const INK   = DARK        // noir de charte — hero photo uniquement
export const PAPER = '#FFFFFF'   // fond de toutes les sections de contenu

// Jetons de texte et de surface sur fond blanc.
// Titres = noir de charte, textes = gris de charte, et les valeurs plus
// claires sont des teintes de ce même gris (jamais un gris d'une autre famille).
export const ON_PAPER = {
  title: '#1D1D1B',          // noir de charte
  body:  '#646363',          // gris de charte (contraste 5,9:1 sur blanc)
  muted: '#8E8D8D',          // teinte claire du gris de charte
  line:  '#E2E2E1',          // teinte très claire du gris de charte
  card:  '#FAFAFA',          // blanc cassé neutre
}

// Alias de compatibilité (anciens noms utilisés le temps d'une itération).
export const BONE = PAPER
export const ON_BONE = ON_PAPER

// ── Chrome : barre de navigation + pied de page ──────────────────────────────
// Variantes proposées. Changer CHROME_ACTIVE ci-dessous suffit à basculer
// l'ensemble (nav, menu mobile, pied de page) d'une piste à l'autre.
const CHROME_VARIANTS = {
  // 1 — Encre : l'existant. Nav et pied de page quasi noirs.
  encre: {
    label: 'Encre',
    solid:     'rgba(29,29,27,0.94)',
    scrim:     'linear-gradient(180deg, rgba(29,29,27,0.82) 0%, rgba(29,29,27,0.52) 55%, rgba(29,29,27,0) 100%)',
    fg:        '#FFFFFF',
    muted:     'rgba(255,255,255,0.65)',
    btnBorder: 'rgba(255,255,255,0.35)',
    hairline:  'rgba(230,38,48,0.18)',
    drawer:    '#1D1D1B',
    footer: { bg: '#1D1D1B', fg: '#FFFFFF', muted: 'rgba(255,255,255,0.62)', line: 'rgba(255,255,255,0.10)', light: false },
  },

  // 2 — Blanc : chrome clair, dans la continuité des sections blanches.
  //     Nav translucide givrée sur le héros, texte encre, accent rouge.
  blanc: {
    label: 'Blanc',
    solid:     'rgba(255,255,255,0.92)',
    scrim:     'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.72) 60%, rgba(255,255,255,0) 100%)',
    fg:        '#1D1D1B',
    muted:     '#646363',
    btnBorder: 'rgba(12,12,15,0.22)',
    hairline:  '#E2E2E1',
    drawer:    '#FFFFFF',
    footer: { bg: '#F5F5F4', fg: '#1D1D1B', muted: '#646363', line: '#E2E2E1', light: true },
  },

  // 3 — Rouge de marque : le rouge SIBIRI porte le chrome, comme chez les
  //     grands réseaux pétroliers. Affirmation maximale.
  rouge: {
    label: 'Rouge',
    solid:     'rgba(230,38,48,0.96)',
    scrim:     'linear-gradient(180deg, rgba(230,38,48,0.94) 0%, rgba(230,38,48,0.60) 58%, rgba(230,38,48,0) 100%)',
    fg:        '#FFFFFF',
    muted:     'rgba(255,255,255,0.76)',
    btnBorder: 'rgba(255,255,255,0.5)',
    hairline:  'rgba(255,255,255,0.22)',
    drawer:    '#B01C26',
    footer: { bg: '#8E1720', fg: '#FFFFFF', muted: 'rgba(255,255,255,0.72)', line: 'rgba(255,255,255,0.18)', light: false },
  },

  // 4 — Ardoise : désormais le noir de la charte (#1D1D1B). Plus clair que
  //     le noir brut d'origine, il adoucit le chrome tout en étant conforme.
  ardoise: {
    label: 'Ardoise',
    solid:     'rgba(29,29,27,0.95)',
    scrim:     'linear-gradient(180deg, rgba(29,29,27,0.88) 0%, rgba(29,29,27,0.55) 58%, rgba(29,29,27,0) 100%)',
    fg:        '#FFFFFF',
    muted:     'rgba(255,255,255,0.62)',
    btnBorder: 'rgba(255,255,255,0.32)',
    hairline:  'rgba(230,38,48,0.22)',
    drawer:    '#1D1D1B',
    footer: { bg: '#1D1D1B', fg: '#FFFFFF', muted: 'rgba(255,255,255,0.60)', line: 'rgba(255,255,255,0.12)', light: false },
  },
}

// ⇩ Piste active — remplacer par 'encre' | 'blanc' | 'rouge' | 'ardoise'
export const CHROME_ACTIVE = 'ardoise'
export const CHROME = CHROME_VARIANTS[CHROME_ACTIVE]

// ── Logo ────────────────────────────────────────────────────────────────────
// RÈGLE ABSOLUE : on n'altère JAMAIS le logo. Pas de recolorisation, pas de
// filtre, pas de fichier dérivé. C'est le fichier officiel qui est servi, tel
// qu'il a été livré.
//
// Sa seule particularité : le PNG mesure 594×420 mais la marque n'occupe que
// 527×138 à partir de (40, 119) — le reste est du vide transparent. Demander
// `height: 44px` ne donnait donc qu'un mot « SIBIRI » de 14 px de haut.
// ENERGY_LOGO_BOX décrit cette géométrie ; le recadrage se fait à L'AFFICHAGE
// (background-position/size), le fichier n'est pas touché.
//
// Il est posé sans fond ni plaque, directement sur la barre et le pied de page.
export const ENERGY_LOGO = '/LOGO_Sibiri_Energy_20-05-2022-1-removebg-preview%20(1).png'
export const ENERGY_LOGO_BOX = { W: 594, H: 420, X: 40, Y: 119, MW: 527, MH: 138 }

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
export const Reveal = ({ children, delay = 0, x = 0, y = 24 }) => (
  <motion.div
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
  >{children}</motion.div>
)

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
// `label` nomme la diapositive pour les lecteurs d'écran (les traits de
// navigation du héros n'ont pas de texte visible).
export const HERO_SLIDES = [
  { src: '/energy/Gemini_Generated_Image_fys8a0fys8a0fys8.jpeg', alt: 'Station Kouba–Koubri Sibiri Energy au crépuscule', label: 'Station Kouba' },
  { src: '/energy/SIBIRI%20ENERGY-8.JPG.jpeg',  alt: 'Entrée de la station Sibiri Energy',           label: 'Grand public'   },
  { src: '/energy/sibiristation.jpeg',           alt: 'Pistolet de distribution de carburant',         label: 'Approvisionnement' },
  { src: '/energy/wolf-officialtech-hd.png',     alt: 'Lubrifiant WOLF Official Tech',                  label: 'WOLF Lubricants' },
]
export const SLIDE_DWELL = 5500 // ms d'affichage par image
export const SLIDE_FADE  = 1.8  // s de fondu enchaîné

// ── Hero-bannière compact des pages internes ─────────────────────────────────
// Même grammaire que le héros d'accueil, elle-même reprise de Sibiri Bio
// Médical : dégradé diagonal, trame, halo ambiant, titre Playfair dont la fin
// est en dégradé, puis vague SVG vers le blanc.
export const PageHero = ({ title, accent, subtitle, image, current }) => (
  <>
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
      style={{
        position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%',
        objectFit: 'cover', filter: 'brightness(1.14) contrast(0.96)',
      }}
    />
    {/* Dégradé diagonal volontairement léger : la photo reste claire. C'est
        l'ombre portée sur le texte (plus bas) qui assure la lisibilité, pas
        l'assombrissement de toute l'image. */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
      background: `linear-gradient(125deg, rgba(29,29,27,0.66) 0%, rgba(29,29,27,0.38) 40%, rgba(29,29,27,0.12) 70%, rgba(29,29,27,0.02) 100%)`,
    }} />
    {/* Texture grille */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
      backgroundImage: `linear-gradient(rgba(230,38,48,0.06) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(230,38,48,0.06) 1px, transparent 1px)`,
      backgroundSize: '64px 64px',
    }} />
    {/* Halo ambiant */}
    <motion.div
      animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.06, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute', top: '-16%', left: '-8%',
        width: '50%', height: '90%',
        background: `radial-gradient(ellipse, ${RED}55 0%, transparent 70%)`,
        borderRadius: '50%', filter: 'blur(80px)',
        zIndex: 2, pointerEvents: 'none',
      }}
    />

    {/* Contenu */}
    <div style={{
      position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280,
      // Le bas doit laisser passer la vague sans la faire mordre sur le texte.
      margin: '0 auto', padding: '176px 40px 116px',
    }}>
      {/* Fil d'Ariane */}
      <motion.nav
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22,
          fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
          fontFamily: "'Inter', sans-serif",
          textShadow: '0 1px 12px rgba(0,0,0,0.65)',
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
          // drop-shadow et non text-shadow : le mot accentué est un dégradé
          // découpé au texte, une ombre de texte transparaîtrait à travers.
          filter: 'drop-shadow(0 3px 22px rgba(0,0,0,0.62))',
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
            color: 'rgba(255,255,255,0.86)', maxWidth: 540, margin: 0,
            textShadow: '0 1px 3px rgba(0,0,0,0.55), 0 2px 20px rgba(0,0,0,0.70)',
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  </section>

  {/* Vague de transition vers le blanc — commune à toutes les pages Energy */}
  <div style={{ position: 'relative', zIndex: 20, lineHeight: 0, marginTop: -60 }}>
    <svg
      viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height: 60 }}
      aria-hidden
    >
      <path
        d="M0,30 C360,55 720,5 1080,30 C1260,43 1380,20 1440,28 L1440,60 L0,60 Z"
        fill={PAPER}
      />
    </svg>
  </div>
  </>
)

// Variante éditable : chaque page interne conserve sa mise en page, tandis que
// son texte et son visuel sont gérés avec les mêmes champs simples dans l'admin.
export const EditablePageHero = ({ contentKey, current, title, accent, subtitle, image }) => {
  const editableTitle = useContentValue(`${contentKey}.title`, title)
  const editableAccent = useContentValue(`${contentKey}.accent`, accent)
  const editableSubtitle = useContentValue(`${contentKey}.subtitle`, subtitle)
  const editableImage = useContentValue(`${contentKey}.image`, image)
  return <PageHero current={current} title={editableTitle} accent={editableAccent} subtitle={editableSubtitle} image={editableImage} />
}
