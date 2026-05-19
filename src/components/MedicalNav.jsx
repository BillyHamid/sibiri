import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'

const GREEN = '#00A99D'
const GREEN_LIGHT = '#8DC63F'

const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)
const IconX = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const IconArrowLeft = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
)

const navLinks = [
  { label: 'Présentation',     href: '/medical#presentation' },
  { label: 'Nos prestations',  href: '/medical#services'      },
  { label: 'Nos réalisations', href: '/medical/realisations'  },
  { label: 'Actualité',        href: '/medical/actualite'     },
  { label: 'Formation',        href: '/medical/formation'     },
]

export const MedicalNav = () => {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setScrolled(v > 0.03))
    return unsub
  }, [scrollYProgress])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-2">
      <nav
        className="mx-auto max-w-7xl rounded-3xl px-6 lg:px-10 transition-all duration-300"
        style={scrolled ? {
          background: 'rgba(15,31,20,0.72)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
        } : {}}
      >
        <div className={`flex items-center justify-between gap-6 py-3 transition-all duration-200 ${scrolled ? 'lg:py-3' : 'lg:py-5'}`}>

          {/* Logo + retour */}
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              <IconArrowLeft size={14} />
              <span className="hidden sm:inline">SIBIRI GROUP</span>
            </a>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-sm font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
              Bio <span style={{ color: '#6DE8E0' }}>Médical</span>
            </span>
          </div>

          {/* Desktop links */}
          <ul className="hidden lg:flex gap-7 text-sm">
            {navLinks.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-white/60 hover:text-white transition-colors duration-150"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/medical#contact"
              className="text-sm font-semibold px-5 py-2 rounded-full transition-all hover:brightness-110 hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${GREEN}, ${GREEN_LIGHT})`, color: 'white', fontFamily: "'Inter', sans-serif" }}
            >
              Nous contacter
            </a>
          </div>

          {/* Burger */}
          <button onClick={() => setOpen(!open)} className="lg:hidden relative z-20 p-2 text-white">
            {open ? <IconX /> : <IconMenu />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="lg:hidden pb-6">
            <ul className="flex flex-col gap-4">
              {navLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block text-white/70 hover:text-white text-sm py-1 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="/medical#contact" className="inline-flex mt-4 text-sm font-semibold px-5 py-2.5 rounded-full" style={{ background: `linear-gradient(135deg, ${GREEN}, ${GREEN_LIGHT})`, color: 'white', fontFamily: "'Inter', sans-serif" }}>
              Nous contacter
            </a>
          </motion.div>
        )}
      </nav>
    </header>
  )
}
