import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"

const ORANGE      = "#E62630"
const ORANGE_DARK = "#B01E27"

// ─── Icônes SVG ───────────────────────────────────────────────────────────────
const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

const IconX = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

// ─── Liens de navigation ──────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Accueil",             href: "#energy-hero"         },
  { label: "À Propos",            href: "#energy-about"        },
  { label: "Services / Produits", href: "#energy-content"      },
  { label: "Réalisations",        href: "#energy-realisations" },
  { label: "Contact",             href: "#energy-contact"      },
]

// ─── EnergyNavbar ─────────────────────────────────────────────────────────────
export const EnergyNavbar = () => {
  const [open,    setOpen]    = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => setScrolled(v > 0.03))
    return unsub
  }, [scrollYProgress])

  const handleNav = (e, href) => {
    e.preventDefault()
    setOpen(false)
    if (href === "#energy-hero") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-2">
      <nav
        className="mx-auto max-w-7xl rounded-3xl px-5 lg:px-10 transition-all duration-300"
        style={
          scrolled
            ? {
                background: "rgba(10, 8, 5, 0.80)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(249,115,22,0.15)",
              }
            : {}
        }
      >
        <div
          className={`flex items-center justify-between gap-6 transition-all duration-200 ${
            scrolled ? "py-3" : "py-4 lg:py-5"
          }`}
        >
          {/* ── Logo ── */}
          <a
            href="#energy-hero"
            onClick={e => handleNav(e, "#energy-hero")}
            className="flex items-center gap-3 group"
          >
            <img
              src="/Sibiri-Energy.png"
              alt="Sibiri Energy"
              className="h-10 w-auto select-none sm:h-11"
              draggable={false}
            />
            <div className="flex flex-col leading-none">
              <span
                className="text-xs text-white/50 font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                SIBIRI GROUP
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}
              >
                Energy
              </span>
            </div>
          </a>

          {/* ── Liens desktop ── */}
          <ul className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={e => handleNav(e, l.href)}
                  className="relative text-sm text-white/55 hover:text-white transition-colors duration-150 group"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {l.label}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                    style={{ background: ORANGE }}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* ── CTA + burger ── */}
          <div className="flex items-center gap-3">
            <a
              href="#energy-contact"
              onClick={e => handleNav(e, "#energy-contact")}
              className="hidden lg:inline-flex items-center h-9 px-5 rounded-full text-sm font-semibold text-white transition-all hover:brightness-110 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${ORANGE_DARK}, ${ORANGE})`,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Nous contacter
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Menu"
            >
              {open ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </div>

        {/* ── Menu mobile ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden lg:hidden"
            >
              <div className="pb-6 pt-2">
                {/* Séparateur */}
                <div
                  className="w-full h-px mb-5"
                  style={{ background: `${ORANGE}22` }}
                />

                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map(l => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        onClick={e => handleNav(e, l.href)}
                        className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm text-white/65 hover:text-white hover:bg-white/5 transition-all"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: ORANGE }}
                        />
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <a
                  href="#energy-contact"
                  onClick={e => handleNav(e, "#energy-contact")}
                  className="inline-flex mt-4 h-10 px-6 rounded-full text-sm font-semibold text-white items-center"
                  style={{
                    background: `linear-gradient(135deg, ${ORANGE_DARK}, ${ORANGE})`,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Nous contacter
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
