import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const GOLD = '#C9A84C'

// ─── Bouton flottant "remonter en haut" ────────────────────────────────────
// Affiché sur toutes les pages dès qu'on a suffisamment défilé vers le bas.
export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Remonter en haut de la page"
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            right: 'clamp(16px, 4vw, 32px)',
            bottom: 'clamp(16px, 4vw, 32px)',
            zIndex: 45,
            width: 46,
            height: 46,
            borderRadius: '50%',
            border: `1.5px solid ${GOLD}55`,
            background: 'rgba(20,20,18,0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: `0 8px 28px rgba(0,0,0,0.35), 0 0 0 1px ${GOLD}12`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 19V5M5 12l7-7 7 7" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
