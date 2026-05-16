import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const GOLD = '#C9A84C'
const DARK = '#1D1D1B'

const PARTNERS = [
  { id: 1, name: 'Partenaire 1', logo: '/partner1.png' },
  { id: 2, name: 'Partenaire 2', logo: '/partner2.png' },
  { id: 3, name: 'Partenaire 3', logo: '/partner3.png' },
  { id: 4, name: 'Partenaire 4', logo: '/partner4.png' },
  { id: 5, name: 'Partenaire 5', logo: '/partner5.png' },
  { id: 6, name: 'Partenaire 6', logo: '/partner6.png' },
]

export const PartnersSection = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ background: 'linear-gradient(160deg, #faf8f3 0%, #fff 55%, #faf8f3 100%)', padding: '100px 0 100px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.12) 1px, transparent 1px)', backgroundSize: '36px 36px', opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(201,168,76,0.08), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 64, padding: '0 24px' }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.9)', fontFamily: "'Inter', sans-serif", margin: '0 0 14px' }}>Partenariats</p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 700, color: DARK, margin: '0 0 14px', fontFamily: "'Playfair Display', serif", lineHeight: 1.15 }}>Nos Partenaires</h2>
          <p style={{ fontSize: 14.5, color: '#9ca3af', maxWidth: 480, margin: '0 auto', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>En collaboration avec des acteurs clés du secteur pour une meilleure efficacité et un impact durable.</p>
          <div style={{ width: 48, height: 2, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, margin: '20px auto 0', borderRadius: 99 }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', overflow: 'hidden', padding: '0 24px' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 200, background: 'linear-gradient(90deg, #faf8f3 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 200, background: 'linear-gradient(90deg, transparent 0%, #faf8f3 100%)', zIndex: 10, pointerEvents: 'none' }} />
          <div style={{ display: 'flex', gap: 48, overflow: 'hidden' }}>
            <motion.div animate={{ x: ['0%', '-100%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex', gap: 48, minWidth: '100%' }}>
              {PARTNERS.map((partner) => (
                <motion.div key={`${partner.id}-1`} whileHover={{ scale: 1.08, y: -8 }} transition={{ duration: 0.3 }} style={{ minWidth: 180, height: 120, borderRadius: 20, background: 'white', border: `1.5px solid ${GOLD}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
                  <img src={partner.logo} alt={partner.name} style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex' }} />
                  <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: 48, color: GOLD }}>🤝</div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div animate={{ x: ['0%', '-100%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex', gap: 48, minWidth: '100%' }}>
              {PARTNERS.map((partner) => (
                <div key={`${partner.id}-2`} style={{ minWidth: 180, height: 120, borderRadius: 20, background: 'white', border: `1.5px solid ${GOLD}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <img src={partner.logo} alt={partner.name} style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex' }} />
                  <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: 48, color: GOLD }}>🤝</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }} style={{ textAlign: 'center', marginTop: 56 }}>
          <p style={{ fontSize: 13, color: '#9ca3af', fontFamily: "'Inter', sans-serif", margin: 0 }}>Intéressé par un partenariat ? <span style={{ color: GOLD, fontWeight: 600, cursor: 'pointer' }}> Contactez-nous</span></p>
        </motion.div>
      </div>
    </section>
  )
}
