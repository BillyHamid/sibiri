import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './PartnersSection.css'

const PARTNERS = [
  { id: 1, name: 'Partner Medical', logo: '/partners/medical-logo.svg' },
  { id: 2, name: 'Arrefour Medical', logo: '/partners/arrefour-medical.svg' },
  { id: 3, name: 'MILS', logo: '/partners/mils-logo.svg' },
  { id: 4, name: 'Wolf Lubricant', logo: '/partners/wolf.jpeg' },
  { id: 5, name: 'NIPRO', logo: '/partners/nipro.jpg' },
  { id: 6, name: 'SORUBAT', logo: '/partners/Soroubat-logo.png' },
]

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path d="M3 10h12M10.5 5.5 15 10l-4.5 4.5" />
  </svg>
)

export const PartnersSection = () => (
  <section id="partenariats" className="holding-partners">
    <div className="holding-partners__line holding-partners__line--left" aria-hidden="true" />
    <div className="holding-partners__line holding-partners__line--right" aria-hidden="true" />
    <div className="holding-partners__container">
      <div className="holding-partners__heading">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <p className="holding-partners__eyebrow"><span /> Partenariats</p>
          <h2>Des alliances qui font <em>grandir.</em></h2>
        </motion.div>
        <motion.div className="holding-partners__intro" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.1 }}>
          <p>Des entreprises reconnues qui enrichissent nos métiers et renforcent la qualité des solutions que nous apportons.</p>
          <span className="holding-partners__count">06 partenaires de confiance</span>
        </motion.div>
      </div>
      <motion.div className="holding-partners__grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
        {PARTNERS.map((partner, index) => (
          <motion.article key={partner.id} className="holding-partner-card" variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, ease: 'easeOut' }} whileHover={{ y: -8 }}>
            <span className="holding-partner-card__index">0{index + 1}</span>
            <div className="holding-partner-card__logo"><img src={partner.logo} alt={partner.name} /></div>
            <div className="holding-partner-card__footer"><h3>{partner.name}</h3><span aria-hidden="true"><Arrow /></span></div>
          </motion.article>
        ))}
      </motion.div>
      <motion.div className="holding-partners__cta" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.15 }}>
        <div><p>Construisons ensemble</p><h3>Vous partagez notre exigence de qualité&nbsp;?</h3></div>
        <Link to="/contact">Devenir partenaire <Arrow /></Link>
      </motion.div>
    </div>
  </section>
)
