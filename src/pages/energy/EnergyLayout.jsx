import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { NeoMinimalFooter } from '../../components/NeoMinimalFooter'
import { RED, DARK, DARK2, GRAY, ENERGY_LOGO, useEnergyFonts } from './shared'

// ── Liens de navigation (onglet → route) ─────────────────────────────────────
const NAV_LINKS = [
  { label: 'Accueil',       to: '/energy',               end: true  },
  { label: 'Services',      to: '/energy/services'                  },
  { label: 'À Propos',      to: '/energy/a-propos'                  },
  { label: 'Réalisations',  to: '/energy/projets'                   },
  { label: 'Pourquoi nous', to: '/energy/pourquoi-nous'             },
]

const EnergyNav = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: 92,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          background: scrolled
            ? 'rgba(6,6,8,0.94)'
            : 'linear-gradient(180deg, rgba(6,6,8,0.62) 0%, rgba(6,6,8,0.18) 60%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? `1px solid rgba(230,38,48,0.18)` : '1px solid transparent',
          transition: 'all 0.35s ease',
        }}
      >
        {/* Logo officiel */}
        <Link to="/energy" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src={ENERGY_LOGO} alt="SIBIRI Energy" style={{ height: 76, width: 'auto', display: 'block' }} />
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hidden md:flex">
          {NAV_LINKS.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end}
              style={({ isActive }) => ({
                position: 'relative',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
                fontSize: 12.5, fontWeight: isActive ? 700 : 500,
                fontFamily: "'Inter', sans-serif", textDecoration: 'none',
                letterSpacing: '0.02em', transition: 'color 0.2s',
                paddingBottom: 4,
                borderBottom: `2px solid ${isActive ? RED : 'transparent'}`,
              })}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/energy/contact" style={{
            background: RED, color: '#fff', padding: '11px 22px',
            borderRadius: 9, fontSize: 12.5, fontWeight: 700,
            fontFamily: "'Inter', sans-serif", textDecoration: 'none',
            boxShadow: `0 6px 20px ${RED}45`,
          }}>Nous contacter</Link>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden" onClick={() => setMobile(true)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobile(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.75)' }} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
                width: 280, background: DARK2, borderLeft: `1px solid ${RED}25`,
                display: 'flex', flexDirection: 'column', padding: 24,
              }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 32 }}>
                <button onClick={() => setMobile(false)} style={{ background: 'none', border: 'none', color: GRAY, cursor: 'pointer' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {NAV_LINKS.map(l => (
                  <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setMobile(false)}
                    style={({ isActive }) => ({
                      color: isActive ? RED : '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none',
                      fontFamily: "'Inter', sans-serif", padding: '13px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                    })}
                  >{l.label}</NavLink>
                ))}
                <Link to="/energy/contact" onClick={() => setMobile(false)} style={{
                  background: RED, color: '#fff', padding: '14px',
                  borderRadius: 8, fontSize: 14, fontWeight: 700,
                  fontFamily: "'Inter', sans-serif", textDecoration: 'none',
                  textAlign: 'center', marginTop: 20,
                }}>Nous contacter</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Layout : nav + page courante + footer, avec scroll-to-top ─────────────────
export const EnergyLayout = () => {
  const { pathname } = useLocation()
  useEnergyFonts()

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <div style={{ background: DARK, minHeight: '100vh' }}>
      <EnergyNav />
      <Outlet />
      <NeoMinimalFooter variant="energy" />
    </div>
  )
}
