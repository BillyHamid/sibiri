import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RED, DARK, PAPER, ON_PAPER,
  Reveal, CountUp, SectionLabel,
  HERO_SLIDES, SLIDE_DWELL, SLIDE_FADE,
} from './shared'

// ══════════════════════════════════════════════════════════════════════════════
// HERO — repris du langage de Sibiri Bio Médical
//
// Même grammaire que MedicalTailarkHeroSection, transposée aux couleurs et aux
// médias d'Energy : média plein cadre, dégradé diagonal, trame fine, halo
// ambiant qui respire, contenu calé à gauche (pastille → titre Playfair dont la
// fin est en dégradé → texte → deux boutons), puis vague SVG vers le blanc.
//
// Deux écarts assumés :
//   · Energy n'a pas de vidéo : c'est le diaporama de stations qui joue ce rôle,
//     d'où les cinq repères en bas.
//   · le voile est plus clair que celui de Bio (consigne : éclaircir les images
//     de fond) — dense uniquement à gauche, sous le texte.
// ══════════════════════════════════════════════════════════════════════════════

const HeroSection = () => {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), SLIDE_DWELL)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <section id="hero" style={{
        position: 'relative', width: '100%', minHeight: '100vh',
        background: DARK, overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}>
        {/* ── Média : diaporama plein cadre ─────────────────────────────── */}
        {HERO_SLIDES.map((img, i) => (
          <motion.img
            key={img.src}
            src={img.src}
            alt={img.alt}
            initial={false}
            animate={{ opacity: i === slide ? 1 : 0, scale: i === slide ? 1.07 : 1 }}
            transition={{
              opacity: { duration: SLIDE_FADE, ease: 'easeInOut' },
              scale:   { duration: SLIDE_DWELL / 1000 + SLIDE_FADE, ease: 'linear' },
            }}
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'brightness(1.14) contrast(0.96)',  // consigne : éclaircir les images
            }}
          />
        ))}

        {/* ── Dégradé diagonal ──────────────────────────────────────────── */}
        <div className="hero-bio__scrim" />

        {/* ── Trame ─────────────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(230,38,48,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(230,38,48,0.06) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }} />

        {/* ── Halo ambiant ──────────────────────────────────────────────── */}
        <motion.div
          animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-10%', left: '-8%',
            width: '50%', height: '70%',
            background: `radial-gradient(ellipse, ${RED}55 0%, transparent 70%)`,
            borderRadius: '50%', filter: 'blur(80px)',
            zIndex: 2, pointerEvents: 'none',
          }}
        />

        {/* ── Contenu ───────────────────────────────────────────────────── */}
        <div className="hero-bio">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <span className="hero-bio__tag">Sibiri Energy</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="hero-bio__title"
          >
            QUALITY <span className="hero-bio__accent">ONLY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hero-bio__lead"
          >
            Distribution de carburants et de lubrifiants, solutions solaires et travaux
            énergétiques — au service des entreprises et du grand public depuis{' '}
            <strong>plus de 10 ans</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            className="hero-bio__actions"
          >
            <Link to="/energy/services" className="hero-bio__cta">Nos produits →</Link>
            <Link to="/energy/contact" className="hero-bio__ghost">Nous contacter</Link>
          </motion.div>

          {/* Repères du diaporama — Bio n'en a pas besoin (vidéo unique),
              Energy si : cinq stations défilent. */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="hero-bio__dots"
          >
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.src} type="button" onClick={() => setSlide(i)}
                aria-label={s.label} aria-current={i === slide}
                className={`hero-bio__dot${i === slide ? ' is-active' : ''}`}
              />
            ))}
          </motion.div>

          {/* Repère éditorial : le diaporama devient une lecture de l'activité,
              et non un simple défilement d'images. */}
          <motion.div
            initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="hero-bio__signal"
          >
            <span className="hero-bio__signal-index">0{slide + 1}</span>
            <span className="hero-bio__signal-line"><i key={slide} /></span>
            <span>{HERO_SLIDES[slide].label}</span>
          </motion.div>
        </div>

        <style>{`
          /* Dégradé diagonal volontairement LÉGER : la photo doit rester claire.
             La lisibilité n'est plus obtenue en assombrissant tout le cadre mais
             par l'ombre portée sur le texte lui-même (voir --shadow plus bas) —
             on ne paie plus la lisibilité du titre avec la luminosité de la
             station. */
          .hero-bio__scrim {
            position: absolute; inset: 0; z-index: 1; pointer-events: none;
            background: linear-gradient(125deg,
              rgba(29,29,27,0.66) 0%, rgba(29,29,27,0.38) 40%,
              rgba(29,29,27,0.12) 70%, rgba(29,29,27,0.02) 100%);
          }

          .hero-bio {
            position: relative; z-index: 10;
            width: 100%; max-width: 1280px; margin: 0 auto;
            padding: 130px 40px 70px;
          }

          .hero-bio__tag {
            display: inline-block; padding: 6px 18px; border-radius: 99px;
            background: rgba(230,38,48,0.20);
            border: 1px solid rgba(230,38,48,0.55);
            color: #ffd9db;
            font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700;
            letter-spacing: 0.14em; text-transform: uppercase;
            margin-bottom: 28px;
            backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
            box-shadow: 0 4px 18px rgba(0,0,0,0.35);
          }

          /* drop-shadow et non text-shadow : « ONLY » est un dégradé découpé au
             texte, une ombre de texte transparaîtrait à travers les lettres. */
          .hero-bio__title {
            margin: 0 0 24px; max-width: 720px;
            font-family: 'Playfair Display', serif; font-weight: 700;
            font-size: clamp(2.8rem, 6.2vw, 5.6rem);
            line-height: 1.05; letter-spacing: -0.02em; color: #fff;
            filter: drop-shadow(0 3px 22px rgba(0,0,0,0.62));
          }
          .hero-bio__accent {
            background: linear-gradient(90deg, #E62630, #ff6b74);
            -webkit-background-clip: text; background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .hero-bio__lead {
            margin: 0 0 40px; max-width: 560px;
            font-family: 'Inter', sans-serif; font-size: 17px; line-height: 1.78;
            color: rgba(255,255,255,0.86);
            /* Double ombre : une courte pour détacher la lettre du fond, une
               large pour poser le paragraphe. Nécessaire sur la diapositive du
               totem, très chargée en typographie rouge. */
            text-shadow: 0 1px 3px rgba(0,0,0,0.55), 0 2px 20px rgba(0,0,0,0.70);
          }
          .hero-bio__lead strong { color: #fff; font-weight: 600; }

          .hero-bio__actions { display: flex; gap: 14px; flex-wrap: wrap; }
          .hero-bio__cta {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 14px 32px; border-radius: 99px;
            background: linear-gradient(135deg, #E62630, #b01c26);
            color: #fff; text-decoration: none;
            font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700;
            box-shadow: 0 10px 36px rgba(230,38,48,0.34);
            transition: filter .2s, transform .2s;
          }
          .hero-bio__cta:hover { filter: brightness(1.08); transform: translateY(-1px); }
          .hero-bio__ghost {
            display: inline-flex; align-items: center;
            padding: 14px 32px; border-radius: 99px;
            border: 1px solid rgba(255,255,255,0.22);
            background: rgba(255,255,255,0.07);
            backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            color: #fff; text-decoration: none;
            font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600;
            transition: background .2s;
          }
          .hero-bio__ghost:hover { background: rgba(255,255,255,0.14); }

          .hero-bio__dots { display: flex; gap: 10px; margin-top: 56px; }
          .hero-bio__dot {
            width: 26px; height: 3px; padding: 0; border: 0; border-radius: 2px;
            background: rgba(255,255,255,0.28); cursor: pointer;
            transition: width .45s cubic-bezier(.22,1,.36,1), background .45s ease;
          }
          .hero-bio__dot.is-active { width: 46px; background: #E62630; }

          .hero-bio__signal {
            display: flex; align-items: center; gap: 12px; margin-top: 22px;
            color: rgba(255,255,255,0.72); font-family: 'Inter', sans-serif;
            font-size: 10px; font-weight: 700; letter-spacing: .16em;
            text-transform: uppercase;
          }
          .hero-bio__signal-index { color: #fff; }
          .hero-bio__signal-line { position: relative; display: block; width: 70px; height: 2px; overflow: hidden; background: rgba(255,255,255,.2); }
          .hero-bio__signal-line i { position: absolute; inset: 0 auto 0 0; display: block; width: 100%; background: #E62630; transform-origin: left; animation: energy-slide-progress ${SLIDE_DWELL}ms linear forwards; }
          @keyframes energy-slide-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

          @media (max-width: 768px) {
            /* En portrait le texte descend jusqu'au bas du cadre : la diagonale
               ne le couvre plus, on redresse le dégradé. */
            .hero-bio__scrim {
              background: linear-gradient(165deg,
                rgba(29,29,27,0.70) 0%, rgba(29,29,27,0.50) 48%, rgba(29,29,27,0.34) 100%);
            }
            .hero-bio { padding: 110px 24px 60px; }
            .hero-bio__lead { font-size: 15.5px; margin-bottom: 32px; }
            .hero-bio__cta, .hero-bio__ghost { padding: 13px 26px; font-size: 14px; }
            .hero-bio__dots { margin-top: 42px; }
            .hero-bio__signal { margin-top: 18px; }
          }
        `}</style>
      </section>

      {/* ── Vague de transition vers le blanc — signature de Bio Médical ─── */}
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
}

// ══════════════════════════════════════════════════════════════════════════════
// REPÈRES — frise éditoriale
// ══════════════════════════════════════════════════════════════════════════════
const HIGHLIGHTS = [
  { target: 2016, suffix: '', label: 'Création de Sibiri Energy', kicker: 'Le départ' },
  { target: 2022, suffix: '', label: 'Station Kouba — Koubri', kicker: 'Le réseau' },
  { target: 2025, suffix: '', label: 'Exclusivité WOLF Lubricants', kicker: 'La qualité' },
  { target: 6, suffix: '', label: 'Domaines d\'expertise', kicker: 'L’étendue' },
]

const HighlightsSection = () => {
  const [count, setCount] = useState(false)

  return (
    <section className="energy-milestones" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="energy-milestones__glow" aria-hidden="true" />

      <motion.div
        onViewportEnter={() => setTimeout(() => setCount(true), 300)}
        viewport={{ once: true, margin: '-80px' }}
        className="energy-milestones__wrap">
        <Reveal>
          <div className="energy-milestones__intro">
            <div>
              <p className="energy-milestones__label">Sibiri Energy · Depuis 2016</p>
              <h2>L’énergie avance<br /><em>avec les territoires.</em></h2>
            </div>
            <p>Des repères concrets qui traduisent une ambition : être présent, fiable et utile à chaque étape.</p>
          </div>
        </Reveal>

        <div className="energy-milestones__track" aria-label="Repères de Sibiri Energy">
          <div className="energy-milestones__line" aria-hidden="true"><span /></div>
          {HIGHLIGHTS.map(({ target, suffix, label, kicker }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <article className="energy-milestones__item">
                <span className="energy-milestones__dot" aria-hidden="true" />
                <p className="energy-milestones__kicker">{kicker}</p>
                <p className="energy-milestones__number">
                  <CountUp target={target} suffix={suffix} start={count} />
                </p>
                <p className="energy-milestones__text">{label}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="energy-milestones__footer">
            <span>Carburants · Lubrifiants · Solutions énergétiques</span>
            <Link to="/energy/services">Explorer nos solutions <span aria-hidden="true">→</span></Link>
          </div>
        </Reveal>
      </motion.div>

      <style>{`
        .energy-milestones { background: #fff; color: #1d1d1b; padding: 112px 0 82px; }
        .energy-milestones__glow { position: absolute; width: min(60vw, 780px); aspect-ratio: 1; top: -52%; right: -16%; border-radius: 50%; background: radial-gradient(circle, rgba(230,38,48,.12), transparent 66%); filter: blur(14px); pointer-events: none; }
        .energy-milestones__wrap { max-width: 1180px; margin: 0 auto; padding: 0 40px; position: relative; z-index: 1; }
        .energy-milestones__intro { display: flex; justify-content: space-between; gap: 36px; align-items: flex-end; margin-bottom: 76px; }
        .energy-milestones__label { margin: 0 0 16px; color: #e62630; font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 800; letter-spacing: .22em; text-transform: uppercase; }
        .energy-milestones h2 { margin: 0; font-family: 'Playfair Display', serif; font-size: clamp(34px, 4.2vw, 58px); font-weight: 600; line-height: 1.02; letter-spacing: -.035em; }.energy-milestones h2 em { color: #e62630; font-style: italic; }
        .energy-milestones__intro > p { max-width: 340px; margin: 0 0 4px; color: #646363; font: 15px/1.7 'Inter', sans-serif; }
        .energy-milestones__track { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 26px; }
        .energy-milestones__line { position: absolute; left: 0; right: 0; top: 18px; height: 1px; background: #dedede; }.energy-milestones__line span { display: block; height: 100%; width: 56%; background: #e62630; }
        .energy-milestones__item { position: relative; padding-top: 48px; }.energy-milestones__dot { position: absolute; top: 11px; left: 0; width: 14px; height: 14px; border-radius: 50%; background: #e62630; box-shadow: 0 0 0 7px rgba(230,38,48,.10); }
        .energy-milestones__kicker { margin: 0 0 10px; color: #8e8d8d; font: 700 10px/1 'Inter', sans-serif; letter-spacing: .14em; text-transform: uppercase; }.energy-milestones__number { margin: 0 0 8px; color: #1d1d1b; font: 700 clamp(37px,4.2vw,60px)/.9 'Inter', sans-serif; letter-spacing: -.055em; }.energy-milestones__text { max-width: 165px; margin: 0; color: #646363; font: 600 13px/1.45 'Inter', sans-serif; }
        .energy-milestones__footer { display:flex; justify-content:space-between; align-items:center; gap:24px; margin-top:72px; padding-top:23px; border-top:1px solid #e2e2e1; color:#8e8d8d; font:600 11px/1.4 'Inter',sans-serif; letter-spacing:.08em; text-transform:uppercase; }.energy-milestones__footer a { color:#1d1d1b; text-decoration:none; letter-spacing:0; text-transform:none; font-size:13px; }.energy-milestones__footer a span { color:#e62630; padding-left:6px; font-size:18px; vertical-align:-1px; }
        @media (max-width: 760px) { .energy-milestones { padding: 82px 0 58px; }.energy-milestones__wrap { padding: 0 24px; }.energy-milestones__intro { display:block; margin-bottom:52px; }.energy-milestones__intro > p { margin-top:22px; }.energy-milestones__track { grid-template-columns:1fr 1fr; row-gap:34px; }.energy-milestones__line { display:none; }.energy-milestones__footer { align-items:flex-start; flex-direction:column; gap:14px; margin-top:46px; } }
      `}</style>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PRÉSENTATION — teaser
// ══════════════════════════════════════════════════════════════════════════════
const PresentationTeaser = () => (
  <section className="energy-story">
    <div className="energy-story__wrap">
      <Reveal>
        <div className="energy-story__visual">
          <img src="/energy/SIBIRI%20ENERGY-12.JPG.jpeg" alt="Station Sibiri Energy" />
          <span className="energy-story__index" aria-hidden="true">01</span>
          <div className="energy-story__caption"><span>Opérer · Servir · Développer</span></div>
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <div className="energy-story__content">
          <p className="energy-story__label">Notre rôle</p>
          <h2>Faire circuler<br /><em>l’énergie utile.</em></h2>
          <p className="energy-story__lead">SIBIRI ENERGY accompagne les entreprises comme le grand public avec des solutions pensées pour les réalités du terrain.</p>
          <p className="energy-story__body">Distribution de produits pétroliers, travaux électriques, mécaniques et de génie civil, réseaux téléphoniques et internet : notre expertise relie les besoins d’aujourd’hui aux ambitions de demain.</p>
          <Link to="/energy/a-propos" className="energy-story__link">Découvrir SIBIRI Energy <span aria-hidden="true">→</span></Link>
        </div>
      </Reveal>
    </div>
    <style>{`
      .energy-story { background:#fafafa; padding:118px 0; overflow:hidden; }
      .energy-story__wrap { max-width:1180px; margin:0 auto; padding:0 40px; display:grid; grid-template-columns:minmax(0,1.12fr) minmax(290px,.88fr); gap:clamp(38px,7vw,104px); align-items:center; }
      .energy-story__visual { position:relative; min-height:480px; overflow:hidden; border-radius:2px; background:#e8e8e7; }.energy-story__visual::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg,transparent 42%,rgba(0,0,0,.45) 100%); pointer-events:none; }.energy-story__visual img { width:100%; height:100%; position:absolute; inset:0; object-fit:cover; display:block; transition:transform .7s cubic-bezier(.22,1,.36,1); }.energy-story__visual:hover img { transform:scale(1.04); }
      .energy-story__index { position:absolute; top:24px; right:28px; z-index:1; color:rgba(255,255,255,.94); font:600 clamp(58px,8vw,110px)/.8 'Playfair Display',serif; letter-spacing:-.08em; }.energy-story__caption { position:absolute; z-index:1; left:26px; right:26px; bottom:23px; color:#fff; font:700 10px/1.4 'Inter',sans-serif; letter-spacing:.18em; text-transform:uppercase; }
      .energy-story__label { margin:0 0 17px; color:#e62630; font:800 10px/1 'Inter',sans-serif; letter-spacing:.24em; text-transform:uppercase; }.energy-story h2 { margin:0; color:#1d1d1b; font:600 clamp(34px,4vw,54px)/1.04 'Playfair Display',serif; letter-spacing:-.04em; }.energy-story h2 em { color:#e62630; font-style:italic; }.energy-story__lead { margin:27px 0 16px; color:#1d1d1b; font:500 18px/1.55 'Inter',sans-serif; }.energy-story__body { margin:0; color:#646363; font:15px/1.8 'Inter',sans-serif; }.energy-story__link { display:inline-flex; align-items:center; gap:10px; margin-top:30px; color:#1d1d1b; font:700 13px/1 'Inter',sans-serif; text-decoration:none; border-bottom:1px solid #e62630; padding-bottom:8px; }.energy-story__link span { color:#e62630; font-size:18px; line-height:0; }
      @media (max-width:760px) { .energy-story { padding:76px 0; }.energy-story__wrap { display:flex; flex-direction:column; padding:0 24px; gap:38px; }.energy-story__visual { width:100%; min-height:350px; }.energy-story__content { width:100%; }.energy-story__lead { font-size:17px; } }
    `}</style>
  </section>
)

// ══════════════════════════════════════════════════════════════════════════════
// PRODUITS — teaser (Carburant / Lubrifiant)
// ══════════════════════════════════════════════════════════════════════════════
// Icônes SVG (mêmes tracés que la page Produits) — les emojis d'origine
// détonnaient sur fond clair et sortaient du langage graphique d'Energy.
const PRODUITS_TEASER = [
  {
    title: 'Carburant',
    desc: "Essence, gasoil et cuves portatives pour entreprises et grand public.",
    href: '/energy/services#carburant',
    image: '/energy/sibiristation.jpeg',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M3 22V6a2 2 0 012-2h6a2 2 0 012 2v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 22h10M13 11h2a2 2 0 012 2v2.5a1.5 1.5 0 003 0V9.5a2 2 0 00-.586-1.414L17 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Lubrifiant',
    desc: "Distribution WOLF LUBRICANTS pour véhicules, bus, camions et engins miniers.",
    href: '/energy/services#lubrifiant',
    image: '/energy/wolf-officialtech-hd.png',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2c2 3 5 6.5 5 10.5A5 5 0 017 12.5C7 8.5 10 5 12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 15v6M9 21h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const ProduitsTeaser = () => (
  <section className="energy-solutions">
    <div className="energy-solutions__wrap">
      <Reveal>
        <div className="energy-solutions__intro">
          <div><p>Nos solutions</p><h2>La bonne énergie,<br /><em>au bon moment.</em></h2></div>
          <span>Deux expertises, une même exigence de qualité et de disponibilité.</span>
        </div>
      </Reveal>
      <div className="energy-solutions__grid">
        {PRODUITS_TEASER.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <Link to={p.href} className={`energy-solution energy-solution--${i + 1}`}>
              <div className="energy-solution__copy">
                <span className="energy-solution__icon">{p.icon}</span>
                <p className="energy-solution__number">0{i + 1}</p>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="energy-solution__action">Découvrir <b aria-hidden="true">→</b></span>
              </div>
              <img src={p.image} alt="" />
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
    <style>{`
      .energy-solutions { background:#fff; padding:112px 0; }.energy-solutions__wrap { max-width:1180px; margin:0 auto; padding:0 40px; }.energy-solutions__intro { display:flex; justify-content:space-between; align-items:flex-end; gap:28px; margin-bottom:52px; }.energy-solutions__intro p { margin:0 0 15px; color:#e62630; font:800 10px/1 'Inter',sans-serif; letter-spacing:.24em; text-transform:uppercase; }.energy-solutions__intro h2 { margin:0; color:#1d1d1b; font:600 clamp(34px,4vw,54px)/1.04 'Playfair Display',serif; letter-spacing:-.04em; }.energy-solutions__intro h2 em { color:#e62630; font-style:italic; }.energy-solutions__intro > span { max-width:290px; color:#646363; font:15px/1.7 'Inter',sans-serif; }
      .energy-solutions__grid { display:grid; grid-template-columns:1fr 1fr; gap:22px; }.energy-solution { position:relative; min-height:390px; overflow:hidden; display:block; background:#f7f7f6; color:#1d1d1b; text-decoration:none; }.energy-solution__copy { position:relative; z-index:2; width:52%; min-height:390px; box-sizing:border-box; padding:31px; background:rgba(255,255,255,.94); }.energy-solution__icon { display:grid; place-items:center; width:43px; height:43px; color:#e62630; border:1px solid #e4e3e2; border-radius:50%; }.energy-solution__number { margin:30px 0 4px; color:#e62630; font:700 11px/1 'Inter',sans-serif; letter-spacing:.12em; }.energy-solution h3 { margin:0 0 12px; font:600 clamp(26px,3vw,36px)/1 'Playfair Display',serif; letter-spacing:-.035em; }.energy-solution__copy > p:not(.energy-solution__number) { margin:0; color:#646363; font:13px/1.7 'Inter',sans-serif; }.energy-solution__action { display:inline-flex; gap:9px; margin-top:26px; color:#1d1d1b; border-bottom:1px solid #e62630; padding-bottom:7px; font:700 12px/1 'Inter',sans-serif; }.energy-solution__action b { color:#e62630; font-size:17px; line-height:8px; }.energy-solution img { position:absolute; inset:0 0 0 auto; width:58%; height:100%; object-fit:cover; transition:transform .65s cubic-bezier(.22,1,.36,1); }.energy-solution--2 img { object-position:center; }.energy-solution:hover img { transform:scale(1.05); }
      @media(max-width:760px) { .energy-solutions { padding:76px 0; }.energy-solutions__wrap { padding:0 24px; }.energy-solutions__intro { display:block; margin-bottom:36px; }.energy-solutions__intro > span { display:block; margin-top:18px; }.energy-solutions__grid { grid-template-columns:1fr; }.energy-solution,.energy-solution__copy { min-height:350px; }.energy-solution__copy { width:61%; padding:25px; }.energy-solution img { width:58%; }.energy-solution__number { margin-top:22px; } }
    `}</style>
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
  <section className="energy-journal">
    <div className="energy-journal__wrap">
      <Reveal>
        <div className="energy-journal__heading"><div><p>Actualités</p><h2>Ce qui fait<br /><em>avancer Energy.</em></h2></div><Link to="/energy/actualite">Toutes les actualités <span aria-hidden="true">→</span></Link></div>
      </Reveal>
      <div className="energy-journal__list">
        {ACTUS_TEASER.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.1}>
            <Link to="/energy/actualite" className="energy-journal__article">
              <span className="energy-journal__date">{a.date}</span>
              <div><p>{a.tag}</p><h3>{a.title}</h3></div>
              <p className="energy-journal__description">{a.desc}</p>
              <span className="energy-journal__arrow" aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
    <style>{`
      .energy-journal { background:#f6f6f5; padding:112px 0; }.energy-journal__wrap { max-width:1180px; margin:0 auto; padding:0 40px; }.energy-journal__heading { display:flex; justify-content:space-between; align-items:flex-end; gap:26px; margin-bottom:50px; }.energy-journal__heading p { margin:0 0 15px; color:#e62630; font:800 10px/1 'Inter',sans-serif; letter-spacing:.24em; text-transform:uppercase; }.energy-journal__heading h2 { margin:0; color:#1d1d1b; font:600 clamp(34px,4vw,54px)/1.04 'Playfair Display',serif; letter-spacing:-.04em; }.energy-journal__heading h2 em { color:#e62630; font-style:italic; }.energy-journal__heading > a { color:#1d1d1b; text-decoration:none; border-bottom:1px solid #e62630; padding-bottom:8px; white-space:nowrap; font:700 13px/1 'Inter',sans-serif; }.energy-journal__heading > a span { color:#e62630; font-size:18px; padding-left:5px; }
      .energy-journal__list { border-top:1px solid #dedede; }.energy-journal__article { position:relative; display:grid; grid-template-columns:120px minmax(220px,1.1fr) minmax(220px,.9fr) 32px; align-items:center; gap:26px; padding:30px 8px 30px 0; color:#1d1d1b; text-decoration:none; border-bottom:1px solid #dedede; transition:padding .25s ease,background .25s ease; }.energy-journal__article:hover { padding-left:18px; background:rgba(230,38,48,.035); }.energy-journal__date { color:#e62630; font:600 clamp(30px,3vw,44px)/1 'Playfair Display',serif; letter-spacing:-.04em; }.energy-journal__article div > p { margin:0 0 9px; color:#8e8d8d; font:800 10px/1 'Inter',sans-serif; letter-spacing:.14em; text-transform:uppercase; }.energy-journal__article h3 { margin:0; font:600 clamp(19px,2vw,26px)/1.16 'Playfair Display',serif; letter-spacing:-.025em; }.energy-journal__description { margin:0; color:#646363; font:13px/1.65 'Inter',sans-serif; }.energy-journal__arrow { color:#e62630; font:400 26px/1 'Inter',sans-serif; justify-self:end; }
      @media(max-width:760px) { .energy-journal { padding:76px 0; }.energy-journal__wrap { padding:0 24px; }.energy-journal__heading { align-items:flex-start; flex-direction:column; margin-bottom:36px; }.energy-journal__article { grid-template-columns:74px 1fr 25px; gap:13px; padding:24px 0; }.energy-journal__description { grid-column:2 / 4; }.energy-journal__date { font-size:28px; }.energy-journal__article h3 { font-size:20px; } }
    `}</style>
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
