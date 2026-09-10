import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './EnergyIntro.css'

const INTRO_DURATION = 1750

export const EnergyIntro = ({ onDone }) => {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const startedAt = performance.now()
    let frame

    const update = (now) => {
      const elapsed = Math.min(now - startedAt, INTRO_DURATION)
      // Courbe douce : un départ vif, puis un léger ralentissement avant la fin.
      const ratio = elapsed / INTRO_DURATION
      setProgress(Math.round((1 - Math.pow(1 - ratio, 2.2)) * 100))
      if (elapsed < INTRO_DURATION) frame = requestAnimationFrame(update)
      else window.setTimeout(() => setLeaving(true), 180)
    }

    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!leaving && (
        <motion.div
          className="energy-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          role="status"
          aria-label="Ouverture de Sibiri Energy"
        >
          <div className="energy-intro__noise" aria-hidden="true" />
          <motion.div className="energy-intro__red-glow" aria-hidden="true" animate={{ opacity: [0.28, 0.58, 0.28], scale: [0.9, 1.12, 0.9] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />

          <div className="energy-intro__center">
            <motion.div
              className="energy-intro__logo-wrap"
              initial={{ opacity: 0, y: 18, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src="/Sibiri-Energy.png" alt="Sibiri Energy" />
              <motion.span className="energy-intro__shine" aria-hidden="true" initial={{ x: '-145%' }} animate={{ x: '245%' }} transition={{ duration: 1.15, delay: 0.35, ease: 'easeInOut' }} />
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }}>
              Votre énergie, notre engagement
            </motion.p>
          </div>

          <motion.div className="energy-intro__slash" initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ duration: 0.45, delay: 0.22, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true" />

          <motion.div className="energy-intro__progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}>
            <div className="energy-intro__track"><motion.div className="energy-intro__fill" animate={{ width: `${progress}%` }} transition={{ duration: 0.08, ease: 'easeOut' }} /></div>
            <span>{progress}%</span>
          </motion.div>

          <div className="energy-intro__baseline" aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
