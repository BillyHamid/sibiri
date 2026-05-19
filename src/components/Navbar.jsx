import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Données de navigation ───────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Accueil',           href: '/'          },
  { label: 'A propos de nous',  href: '/groupe'    },
  { label: 'Actualités',        href: '/actualites'},
];

// ─── Couleurs brand ──────────────────────────────────────────────────────────
const GOLD   = '#C9A84C';
const GOLD_L = '#e6c76b';

// ─── Item desktop ────────────────────────────────────────────────────────────
const NavItem = ({ item }) => (
  <li className="relative">
    <a
      href={item.href}
      className="flex items-center px-3 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors select-none"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {item.label}
    </a>
  </li>
);

// ─── Menu mobile ─────────────────────────────────────────────────────────────
const MobileMenu = ({ open, onClose }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col"
          style={{ background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderLeft: `1px solid ${GOLD}20` }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <img src="/SIBIRI%20Holding.png" alt="SIBIRI Holding" className="h-14 w-auto" />
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="p-5 border-t border-white/10">
            <a
              href="/contact"
              className="block w-full text-center py-3 rounded-full text-sm font-semibold text-black transition-all hover:brightness-110"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_L})`, fontFamily: "'Inter', sans-serif" }}
            >
              Nous contacter
            </a>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// ─── Navbar principale ───────────────────────────────────────────────────────
export const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="fixed top-0 left-0 right-0 z-50 pt-3 transition-all duration-300"
      >
        <nav
          className="mx-auto max-w-7xl rounded-3xl px-6 lg:px-8 transition-all duration-300"
          style={{
            background: scrolled ? 'rgba(29, 29, 27, 0.86)' : 'transparent',
            backdropFilter: scrolled ? 'blur(18px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
            border: scrolled ? `1.5px solid ${GOLD}28` : '1.5px solid transparent',
            boxShadow: scrolled ? `0 8px 32px rgba(201, 168, 76, 0.12)` : 'none',
          }}
        >
          <div className={`flex items-center justify-between gap-6 transition-all duration-200 ${scrolled ? 'py-3' : 'py-5 lg:py-6'}`}>

            {/* Logo + retour */}
            <div className="flex items-center gap-3 shrink-0">
              <a href="/" className="flex items-center gap-2">
                <img
                  src="/SIBIRI%20Holding.png"
                  alt="SIBIRI Holding"
                  className="w-auto select-none"
                  style={{ height: scrolled ? 65 : 130, transition: 'height 0.3s ease' }}
                  draggable={false}
                />
              </a>
            </div>

            {/* Nav desktop */}
            <ul className="hidden lg:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-slate-200 hover:text-white transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA desktop + Burger mobile */}
            <div className="flex items-center gap-3">
              <a
                href="/contact"
                className="hidden lg:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold text-black transition-all hover:brightness-110 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_L})`,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Nous contacter
              </a>

              {/* Burger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
                aria-label="Ouvrir le menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};
