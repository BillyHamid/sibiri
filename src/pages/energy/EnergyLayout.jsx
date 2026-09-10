import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { NeoMinimalFooter } from '../../components/NeoMinimalFooter'
import { RED, RED_D, DARK, CHROME, ENERGY_LOGO, ENERGY_LOGO_BOX, useEnergyFonts } from './shared'
import { EnergyIntro } from './EnergyIntro'

// ══════════════════════════════════════════════════════════════════════════════
// NAVIGATION — reprise du langage de Sibiri Bio Médical (MedicalNav)
//
// Îlot arrondi centré, transparent au-dessus du héros et vitré dès qu'on défile.
// À gauche : retour « SIBIRI GROUP », un séparateur, puis le logo de la filiale.
// À droite : les liens en texte simple et un bouton dégradé. Sur mobile le menu
// se déplie DANS l'îlot — pas de tiroir latéral, comme sur Bio.
// ══════════════════════════════════════════════════════════════════════════════

const NAV_LINKS = [
  { label: 'Accueil',   to: '/energy', end: true },
  {
    label: 'Produits', to: '/energy/services',
    dropdown: [
      { label: 'Carburant',   to: '/energy/services#carburant'     },
      { label: 'Lubrifiants', to: '/energy/services#lubrifiant'    },
      { label: 'Services',    to: '/energy/services#services-list' },
    ],
  },
  { label: 'À Propos',  to: '/energy/a-propos'  },
  { label: 'Actualité', to: '/energy/actualite' },
]

const isLinkActive = (link, pathname) =>
  link.end ? pathname === link.to : pathname.startsWith(link.to)

// Recadrage du logo OFFICIEL à l'affichage. Le fichier n'est pas modifié : on
// l'utilise en fond, agrandi et décalé de façon à ne montrer que la marque.
// Tout est exprimé en multiples de la hauteur voulue (--lh), pour que les
// tailles restent pilotables en CSS (défilement, media queries).
const { W, H, X, Y, MW, MH } = ENERGY_LOGO_BOX
const LOGO_VARS = {
  '--logo':  `url("${ENERGY_LOGO}")`,
  '--l-box': MW / MH,     // largeur du cadre visible, en hauteurs de marque
  '--l-w':   W  / MH,     // largeur de l'image entière, idem
  '--l-h':   H  / MH,     // hauteur de l'image entière, idem
  '--l-x':   -X / MH,     // décalage pour amener la marque au bord gauche
  '--l-y':   -Y / MH,     // idem en haut
}

const NavItem = ({ link, active }) => {
  const [open, setOpen] = useState(false)
  const timer = useRef(null)

  const show = () => { clearTimeout(timer.current); setOpen(true) }
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 140) }

  return (
    <div
      className="enav__item"
      onMouseEnter={link.dropdown ? show : undefined}
      onMouseLeave={link.dropdown ? hide : undefined}
    >
      <Link to={link.to} className={`enav__link${active ? ' is-active' : ''}`}>
        {link.label}
        {link.dropdown && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden
            style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .22s' }}>
            <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </Link>

      <AnimatePresence>
        {link.dropdown && open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="enav__menu"
          >
            {link.dropdown.map(d => (
              <Link key={d.label} to={d.to} onClick={() => setOpen(false)} className="enav__menu-link">
                {d.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const EnergyNav = () => {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Le menu déplié se referme quand on change de page.
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`enav${scrolled ? ' is-scrolled' : ''}`}
      style={{ '--fg': CHROME.fg, '--muted': CHROME.muted, '--drawer': CHROME.drawer, ...LOGO_VARS }}
    >
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`enav__island${scrolled || open ? ' is-solid' : ''}`}
      >
        <div className={`enav__bar${scrolled ? ' is-scrolled' : ''}`}>
          {/* Retour groupe + logo filiale */}
          <div className="enav__brand">
            <Link to="/" className="enav__back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              <span>SIBIRI GROUP</span>
            </Link>
            <span className="enav__sep" />
            <Link to="/energy" className="enav__logo" aria-label="Accueil Sibiri Energy">
              <span className="enav__mark" role="img" aria-label="SIBIRI Energy" />
            </Link>
          </div>

          {/* Liens */}
          <nav className="enav__rail">
            {NAV_LINKS.map(l => (
              <NavItem key={l.to} link={l} active={isLinkActive(l, pathname)} />
            ))}
          </nav>

          <Link to="/energy/contact" className="enav__cta">Nous contacter</Link>

          <button
            className="enav__burger" onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18"/>
              </svg>
            )}
          </button>
        </div>

        {/* Menu mobile : il se déplie dans l'îlot */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="enav__panel"
            >
              <div className="enav__panel-inner">
                {NAV_LINKS.map(l => (
                  <div key={l.to}>
                    <Link to={l.to} className={`enav__mlink${isLinkActive(l, pathname) ? ' is-active' : ''}`}>
                      {l.label}
                    </Link>
                    {l.dropdown && (
                      <div className="enav__msub">
                        {l.dropdown.map(d => (
                          <Link key={d.label} to={d.to} className="enav__msublink">{d.label}</Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link to="/energy/contact" className="enav__mcta">Nous contacter</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style>{`
        .enav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 8px clamp(12px, 3vw, 24px) 0;
          pointer-events: none;
        }
        /* Voile de haut de page. Les photos du héros sont désormais claires :
           sans lui, les liens blancs de l'îlot transparent deviennent illisibles.
           Il s'efface dès que l'îlot devient opaque — sinon il poserait une
           bande grise sur les sections blanches. */
        .enav::before {
          content: ''; position: absolute; inset: 0 0 auto 0; height: 170px;
          background: linear-gradient(180deg, rgba(29,29,27,0.60) 0%, rgba(29,29,27,0) 100%);
          pointer-events: none; opacity: 1; transition: opacity .3s ease;
        }
        .enav.is-scrolled::before { opacity: 0; }
        .enav__island {
          pointer-events: auto;
          max-width: 1280px; margin: 0 auto;
          border-radius: 24px; border: 1px solid transparent;
          padding: 0 clamp(16px, 3vw, 40px);
          transition: background .3s ease, border-color .3s ease;
        }
        /* 0,88 et non 0,72 comme Bio : ici l'îlot passe au-dessus de sections
           BLANCHES. À 0,72 il virait au gris et la plaque du logo s'y fondait. */
        .enav__island.is-solid {
          background: rgba(29,29,27,0.88);
          border-color: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        }

        .enav__bar {
          display: flex; align-items: center; justify-content: space-between; gap: 24px;
          padding: 20px 0; transition: padding .2s ease;
        }
        .enav__bar.is-scrolled { padding: 12px 0; }

        /* ── Marque ──────────────────────────────────────────────────────── */
        .enav__brand { display: flex; align-items: center; gap: 16px; min-width: 0; }
        .enav__back {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.60); text-decoration: none; white-space: nowrap;
          transition: color .18s;
        }
        .enav__back:hover { color: #fff; }
        .enav__sep { width: 1px; height: 16px; background: rgba(255,255,255,0.20); }
        /* Logo posé directement sur la barre, sans plaque ni fond. */
        .enav__logo { display: flex; align-items: center; }
        /* --lh est la hauteur de la MARQUE, pas celle du fichier : le reste du
           PNG officiel est du vide transparent, écarté par le recadrage. */
        .enav__mark {
          --lh: 34px;
          display: block;
          width: calc(var(--lh) * var(--l-box));
          height: var(--lh);
          background-image: var(--logo);
          background-repeat: no-repeat;
          background-size: calc(var(--lh) * var(--l-w)) calc(var(--lh) * var(--l-h));
          background-position: calc(var(--lh) * var(--l-x)) calc(var(--lh) * var(--l-y));
          transition: width .25s ease, height .25s ease,
                      background-size .25s ease, background-position .25s ease;
        }
        .enav__bar.is-scrolled .enav__mark { --lh: 28px; }

        /* ── Liens ───────────────────────────────────────────────────────── */
        .enav__rail { display: flex; align-items: center; gap: 28px; }
        .enav__item { position: relative; }
        .enav__link {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.60); text-decoration: none; white-space: nowrap;
          transition: color .15s;
        }
        .enav__link:hover { color: #fff; }
        .enav__link.is-active { color: #fff; }

        .enav__menu {
          position: absolute; top: calc(100% + 16px); left: 50%; translate: -50% 0;
          min-width: 196px; padding: 6px; border-radius: 14px;
          background: rgba(29,29,27,0.94);
          border: 1px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 22px 50px -22px rgba(0,0,0,0.8);
          z-index: 60;
        }
        .enav__menu-link {
          display: block; padding: 10px 14px; border-radius: 9px;
          font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.62); text-decoration: none;
          transition: background .15s, color .15s;
        }
        .enav__menu-link:hover { background: rgba(230,38,48,0.16); color: #fff; }

        /* ── Bouton ──────────────────────────────────────────────────────── */
        .enav__cta {
          display: inline-flex; align-items: center; flex-shrink: 0;
          padding: 9px 22px; border-radius: 99px;
          background: linear-gradient(135deg, ${RED}, ${RED_D});
          color: #fff; text-decoration: none; white-space: nowrap;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
          transition: filter .2s, transform .2s;
        }
        .enav__cta:hover { filter: brightness(1.1); transform: scale(1.04); }

        .enav__burger {
          display: none; padding: 6px; background: none; border: 0;
          color: #fff; cursor: pointer;
        }

        @media (max-width: 1023px) {
          .enav__rail, .enav__cta { display: none; }
          .enav__burger { display: block; }
          .enav__mark { --lh: 28px; }
          .enav__bar.is-scrolled .enav__mark { --lh: 25px; }
        }

        /* ── Menu déplié ─────────────────────────────────────────────────── */
        .enav__panel { overflow: hidden; }
        .enav__panel-inner {
          display: flex; flex-direction: column; gap: 2px; padding-bottom: 22px;
        }
        .enav__mlink {
          display: block; padding: 11px 0;
          font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 500;
          color: rgba(255,255,255,0.72); text-decoration: none;
          transition: color .15s;
        }
        .enav__mlink:hover, .enav__mlink.is-active { color: #fff; }
        .enav__msub { display: flex; flex-direction: column; padding: 0 0 8px 16px; }
        .enav__msublink {
          padding: 7px 0; font-family: 'Inter', sans-serif; font-size: 13px;
          color: rgba(255,255,255,0.48); text-decoration: none;
        }
        .enav__mcta {
          align-self: flex-start; margin-top: 14px;
          padding: 10px 22px; border-radius: 99px;
          background: linear-gradient(135deg, ${RED}, ${RED_D});
          color: #fff; text-decoration: none;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
        }
      `}</style>
    </header>
  )
}

// ── Layout : nav + page courante + footer, avec scroll-to-top / scroll-to-hash ─
export const EnergyLayout = () => {
  const { pathname, hash } = useLocation()
  const [introVisible, setIntroVisible] = useState(true)
  useEnergyFonts()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return (
    <div style={{ background: DARK, minHeight: '100vh' }}>
      {introVisible && <EnergyIntro onDone={() => setIntroVisible(false)} />}
      <EnergyNav />
      <Outlet />
      <NeoMinimalFooter variant="energy" surface={CHROME.footer} />
    </div>
  )
}
