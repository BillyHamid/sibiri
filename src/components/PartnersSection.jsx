import { motion } from 'framer-motion'

const GOLD = '#C9A84C'
const DARK = '#1D1D1B'

const PARTNERS = [
  { id: 1, name: 'Partner Medical', logo: '/partners/medical-logo.svg' },
  { id: 2, name: 'Arrefour Medical', logo: '/partners/arrefour-medical.svg' },
  { id: 3, name: 'MILS', logo: '/partners/mils-logo.svg' },
  { id: 4, name: 'Wolf Lubricant', logo: '/partners/wolf.jpeg' },
  { id: 5, name: 'NIPRO', logo: '/partners/nipro.jpg' },
  { id: 6, name: 'SORUBAT', logo: '/partners/Soroubat-logo.png' },
]

export const PartnersSection = () => {
  return (
    <section style={{ background: 'linear-gradient(160deg, #faf8f3 0%, #fff 55%, #faf8f3 100%)', padding: '100px 0 100px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.12) 1px, transparent 1px)', backgroundSize: '36px 36px', opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(201,168,76,0.08), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 64, padding: '0 24px' }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.9)', fontFamily: "'Inter', sans-serif", margin: '0 0 14px' }}>Partenariats</p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 700, color: DARK, margin: '0 0 14px', fontFamily: "'Playfair Display', serif", lineHeight: 1.15 }}>Nos Partenaires</h2>
          <div style={{ width: 48, height: 2, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, margin: '20px auto 0', borderRadius: 99 }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            maxWidth: 1200, margin: '0 auto', padding: '0 24px',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 28,
          }}
        >
          {PARTNERS.map((partner) => (
            <motion.div
              key={partner.id}
              whileHover={{ scale: 1.06, y: -6 }}
              transition={{ duration: 0.25 }}
              style={{ width: 220, height: 150, borderRadius: 22, background: 'white', border: `1.5px solid ${GOLD}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 26, boxShadow: '0 2px 12px rgba(0,0,0,0.05)', cursor: 'pointer' }}
            >
              <img src={partner.logo} alt={partner.name} style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex' }} />
              <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: 48, color: GOLD }}>🤝</div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.4 }} style={{ textAlign: 'center', marginTop: 56 }}>
          <p style={{ fontSize: 13, color: '#9ca3af', fontFamily: "'Inter', sans-serif", margin: 0 }}>Intéressé par un partenariat ? <span style={{ color: GOLD, fontWeight: 600, cursor: 'pointer' }}> Contactez-nous</span></p>
        </motion.div>
      </div>
    </section>
  )
}
