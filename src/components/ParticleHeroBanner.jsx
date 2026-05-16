import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// ─── Styles globaux injectés une seule fois ───────────────────────────────────
const BANNER_STYLES = `
  @property --phb-p {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%;
  }
  @keyframes phb-fadein {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes phb-up {
    0%   { transform: translateY(1em); }
    100% { transform: translateY(0); }
  }
  @keyframes phb-pulse {
    0%   { --phb-p: 0%; }
    50%  { --phb-p: 300%; }
    100% { --phb-p: 300%; }
  }
  @keyframes phb-spotlight {
    0%   { transform: rotateZ(0deg)  scale(1);   filter: blur(14px) opacity(.45); }
    20%  { transform: rotateZ(-1deg) scale(1.2); filter: blur(16px) opacity(.55); }
    40%  { transform: rotateZ(2deg)  scale(1.3); filter: blur(13px) opacity(.38); }
    60%  { transform: rotateZ(-2deg) scale(1.2); filter: blur(15px) opacity(.55); }
    80%  { transform: rotateZ(1deg)  scale(1.1); filter: blur(12px) opacity(.38); }
    100% { transform: rotateZ(0deg)  scale(1);   filter: blur(14px) opacity(.45); }
  }
  @keyframes phb-loadrot {
    0%   { transform: rotate(0deg) scale(0); }
    100% { transform: scale(1); }
  }
  @keyframes phb-accentline {
    0%   { opacity: 0; transform: scaleX(0); }
    100% { opacity: 1; transform: scaleX(1); }
  }
  @keyframes phb-accentcol {
    0%   { opacity: 0; transform: scaleY(0); }
    100% { opacity: 1; transform: scaleY(1); }
  }

  .phb-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(40px, 5.5vw, 84px);
    font-weight: 700;
    margin: 0;
    background:
      radial-gradient(2em 2em at 50% 50%,
        transparent                    calc(var(--phb-p) - 2em),
        #fff                           calc(var(--phb-p) - 1em),
        #fff                           calc(var(--phb-p) - 0.4em),
        transparent                    var(--phb-p)
      ),
      linear-gradient(0deg, #C9A84C 20%, #F5E6C0 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 32px rgba(201,168,76,.18);
    animation: phb-pulse 9s linear 1.2s infinite;
    line-height: 1.12;
  }

  .phb-tagline {
    opacity: 0;
    transform: translateY(-0.8em);
    animation: phb-fadein 1.8s ease-out 2.2s forwards, phb-up 1.2s ease-out 2.2s forwards;
  }
  .phb-heading {
    opacity: 0;
    transform: translateY(-0.5em);
    animation: phb-fadein 2s ease-in-out 0.5s forwards, phb-up 1.4s ease-out 0.5s forwards;
  }
  .phb-subtitle {
    opacity: 0;
    transform: translateY(0.8em);
    animation: phb-fadein 2s ease-out 2s forwards, phb-up 1.4s ease-out 2s forwards;
  }
  .phb-cta {
    opacity: 0;
    animation: phb-fadein 2s ease-out 2.6s forwards;
  }
  .phb-stats {
    opacity: 0;
    animation: phb-fadein 2s ease-out 3s forwards;
  }
`

// ─── Injecteur de styles ──────────────────────────────────────────────────────
let stylesInjected = false
function injectStyles() {
  if (stylesInjected) return
  const tag = document.createElement('style')
  tag.textContent = BANNER_STYLES
  document.head.appendChild(tag)
  stylesInjected = true
}

// ─── Données stats ────────────────────────────────────────────────────────────
const STATS = [
  { target: 5,   suffix: '',  label: 'Filiales actives'     },
  { target: 15,  suffix: '+', label: "Années d'expérience"  },
  { target: 3,   suffix: '',  label: "Pays d'implantation"  },
  { target: 500, suffix: '+', label: 'Collaborateurs'       },
]

// ─── Compteur animé ───────────────────────────────────────────────────────────
// `start` est contrôlé par le parent (IntersectionObserver sur la section)
const CountUp = ({ target, suffix = '', duration = 1800, start = false }) => {
  const [count, setCount] = useState(0)
  const rafRef            = useRef(null)

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 4) // ease-out quart
      setCount(Math.floor(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
      else setCount(target)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [start, target, duration])

  return <span>{count}{suffix}</span>
}

// ─── ParticleHeroBanner ───────────────────────────────────────────────────────
export const ParticleHeroBanner = () => {
  const canvasRef    = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const sectionRef   = useRef(null)
  const mountTime    = useRef(Date.now())
  const [counting, setCounting] = useState(false)

  // ── Observer : synchronise le compteur avec le fade-in CSS des stats ────────
  // .phb-stats a animation-delay: 3s depuis le montage du composant.
  // On calcule le temps restant avant ce délai et on attend exactement ce moment.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          const elapsed   = Date.now() - mountTime.current
          const remaining = Math.max(0, 3000 - elapsed) // délai restant avant stats visibles
          setTimeout(() => setCounting(true), remaining)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    injectStyles()

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── Création d'une particule ──────────────────────────────────────────────
    const createParticle = () => {
      const p = {
        x: 0, y: 0, speed: 0, opacity: 1,
        fadeDelay: 0, fadeStart: 0, fadingOut: false,

        reset() {
          this.x         = Math.random() * canvas.width
          this.y         = Math.random() * canvas.height
          this.speed     = Math.random() / 5 + 0.08
          this.opacity   = 1
          this.fadeDelay = Math.random() * 700 + 100
          this.fadeStart = Date.now() + this.fadeDelay
          this.fadingOut = false
        },
        update() {
          this.y -= this.speed
          if (this.y < 0) this.reset()
          if (!this.fadingOut && Date.now() > this.fadeStart) this.fadingOut = true
          if (this.fadingOut) {
            this.opacity -= 0.007
            if (this.opacity <= 0) this.reset()
          }
        },
        draw(ctx) {
          // Particules or ambré montantes
          const rVal = 195 + Math.floor(Math.random() * 20)
          const gVal = 135 + Math.floor(Math.random() * 55)
          ctx.fillStyle = `rgba(${rVal}, ${gVal}, 38, ${this.opacity})`
          ctx.fillRect(this.x, this.y, 0.55, Math.random() * 2.2 + 0.6)
        },
      }
      p.reset()
      p.y = Math.random() * canvas.height
      return p
    }

    // ── Redimensionnement ─────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const count   = Math.floor((canvas.width * canvas.height) / 5500)
      particlesRef.current = Array.from({ length: count }, createParticle)
    }

    resize()

    // ── Boucle d'animation ────────────────────────────────────────────────────
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach(p => { p.update(); p.draw(ctx) })
      animationRef.current = requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      width: '100%',
      height: 700,
      overflow: 'hidden',
      background: '#07080f',
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* ── Cônes de lumière (spotlights) ────────────────────────────────── */}
      <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 0 }}>
        {[
          { rot: 22,  dur: '17s',         delay: '0s'    },
          { rot: -22, dur: '14s',         delay: '0.3s'  },
          { rot: 0,   dur: '21s reverse', delay: '0.6s'  },
        ].map(({ rot, dur, delay }, i) => (
          <div key={i} style={{
            borderRadius: '0 0 50% 50%',
            position: 'absolute',
            left: 0, right: 0, margin: '0 auto',
            top: '1.5em',
            width: 'min(32em, 90vw)',
            height: 'max(42em, 95vh)',
            backgroundImage: 'conic-gradient(from 0deg at 50% -5%, transparent 45%, rgba(201,168,76,.18) 49%, rgba(201,168,76,.30) 50%, rgba(201,168,76,.18) 51%, transparent 55%)',
            transformOrigin: '50% 0',
            transform: `rotate(${rot}deg)`,
            filter: 'blur(15px) opacity(.5)',
            animation: `phb-loadrot 2s ease-in-out forwards, phb-spotlight ${dur} ease-in-out ${delay} infinite`,
          }} />
        ))}
      </div>

      {/* ── Canvas particules ─────────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 1,
          animation: 'phb-fadein .4s ease-in-out forwards',
        }}
      />

      {/* ── Lignes d'accent horizontales ─────────────────────────────────── */}
      <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 2 }}>
        {[100, 185, 275, 390, 490].map((top, i) => (
          <div key={i} style={{
            position: 'absolute', top, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,.14), transparent)',
            transformOrigin: 'center',
            animation: `phb-accentline 1.8s ease-out ${2.2 + i * 0.12}s forwards`,
            opacity: 0,
          }} />
        ))}

        {/* Lignes verticales */}
        {['22%', '50%', '78%'].map((left, i) => (
          <div key={i} style={{
            position: 'absolute', top: 0, bottom: 0, left,
            width: 1,
            background: left === '50%'
              ? 'linear-gradient(to bottom, transparent, rgba(201,168,76,.18), transparent)'
              : 'rgba(201,168,76,.07)',
            transformOrigin: 'center',
            animation: `phb-accentcol 2s ease-out ${2 + i * 0.1}s forwards`,
            opacity: 0,
          }} />
        ))}
      </div>

      {/* ── Contenu central ──────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 28, padding: '0 24px',
        textAlign: 'center',
      }}>

        {/* Étiquette */}
        <p className="phb-tagline" style={{
          fontSize: 10, fontWeight: 800,
          letterSpacing: '0.38em', textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.65)',
        }}>
          SIBIRI GROUP — HOLDING
        </p>

        {/* Titre principal animé */}
        <div className="phb-heading">
          <h2 className="phb-title">Bâtisseurs d'Avenir</h2>
        </div>

        {/* Sous-titre */}
        <p className="phb-subtitle" style={{
          fontSize: 'clamp(13px, 1.4vw, 17px)',
          lineHeight: 1.75, maxWidth: 540,
          background: 'linear-gradient(0deg, #d8ecf8 0%, #C9A84C 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Un groupe multisectoriel engagé pour le<br />
          développement durable de l'Afrique.
        </p>

        {/* CTA */}
        <div className="phb-cta">
          <Link
            to="/global-construction"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 28px', borderRadius: 99,
              background: 'rgba(201,168,76,0.10)',
              border: '1px solid rgba(201,168,76,0.38)',
              color: '#C9A84C',
              fontSize: 13, fontWeight: 600,
              textDecoration: 'none',
              transition: 'all .25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(201,168,76,0.20)'
              e.currentTarget.style.transform = 'scale(1.04)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(201,168,76,0.10)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Explorer nos filiales →
          </Link>
        </div>

        {/* Stats */}
        <div className="phb-stats" style={{
          display: 'flex', gap: 'clamp(24px, 4vw, 64px)',
          marginTop: 12,
        }}>
          {STATS.map(({ target, suffix, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{
                fontSize: 'clamp(22px, 2.8vw, 36px)',
                fontWeight: 700,
                margin: 0,
                background: 'linear-gradient(135deg, #C9A84C, #F5DFA0)',
                backgroundClip: 'text', WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: "'Playfair Display', serif",
              }}>
                <CountUp target={target} suffix={suffix} duration={3200} start={counting} />
              </p>
              <p style={{
                fontSize: 10, color: 'rgba(216,236,248,.5)',
                margin: '4px 0 0', letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Vague de transition → fond blanc (SubsidiariesReel) ──────────── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, zIndex: 20, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}>
          <path
            d="M0,45 C240,20 480,70 720,45 C960,20 1200,70 1440,45 L1440,90 L0,90 Z"
            fill="#ffffff"
          />
          <path
            d="M0,45 C240,20 480,70 720,45 C960,20 1200,70 1440,45"
            fill="none"
            stroke="rgba(201,168,76,0.45)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

    </section>
  )
}
