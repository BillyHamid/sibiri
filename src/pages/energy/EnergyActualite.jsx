import { motion } from 'framer-motion'
import { RED, DARK2, DARK3, GRAY, Reveal, SectionLabel, PageHero } from './shared'

// ─── Actualités (structure inspirée de wolflubes.com/fr-fr/actualites) ────────
const ACTUS = [
  {
    date: '2025',
    tag: 'Exclusivité',
    accent: '#00C878',
    title: 'WOLF LUBRICANTS — Distribution Nationale',
    desc: "Exclusivité de distribution au Burkina Faso de la marque belge WOLF LUBRICANTS (WOLF OIL CORPORATION). Une gamme premium de lubrifiants pour véhicules de tourisme, bus, camions et engins miniers, disponible depuis 1955.",
    gradient: `linear-gradient(135deg, #001a0a 0%, #003020 40%, #004d32 100%)`,
  },
  {
    date: '2022',
    tag: 'Inauguration',
    accent: RED,
    title: 'Station-service Kouba — KOUBRI',
    desc: "Première station grand public de SIBIRI ENERGY SA, inaugurée en 2022 dans la commune de KOUBRI. Point de départ de l'expansion du réseau dans la zone de Ouagadougou, aujourd'hui composé de quatre stations-service.",
    gradient: `linear-gradient(135deg, #1a0500 0%, #3d1000 40%, #7a2000 100%)`,
  },
  {
    date: '2022',
    tag: 'Partenariat B2B',
    accent: '#7B9FFF',
    title: 'Ravitaillement Grandes Entreprises',
    desc: "Distribution et approvisionnement en produits pétroliers des grandes entreprises des secteurs Transport, BTP et Industrie. Solutions de cuves portatives sur mesure pour accompagner nos clients professionnels.",
    gradient: `linear-gradient(135deg, #0a0a1a 0%, #12122a 40%, #1e1e40 100%)`,
  },
]

const ActuRow = ({ date, tag, accent, title, desc, gradient, delay }) => (
  <Reveal delay={delay}>
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.25 }}
      style={{
        display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 40,
        padding: '40px 0', borderBottom: '1px solid rgba(255,255,255,0.08)',
        alignItems: 'start',
      }}
      className="actu-row"
    >
      {/* Vignette + meta */}
      <div>
        <div style={{
          borderRadius: 16, overflow: 'hidden', marginBottom: 16, height: 180,
          background: gradient, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }} />
          <span style={{ fontSize: 30, position: 'relative', opacity: 0.7 }}>⚡</span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: GRAY, fontWeight: 600, letterSpacing: '0.05em' }}>{date}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
          <span style={{
            padding: '3px 10px', borderRadius: 99,
            background: `${accent}18`, border: `1px solid ${accent}44`,
            fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 700, color: accent,
          }}>{tag}</span>
        </div>
      </div>

      {/* Contenu */}
      <div style={{ paddingTop: 8 }}>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 14px', lineHeight: 1.3 }}>{title}</h3>
        <div style={{ width: 44, height: 2, borderRadius: 2, marginBottom: 16, background: RED }} />
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: GRAY, lineHeight: 1.78, margin: 0 }}>{desc}</p>
      </div>
    </motion.div>
  </Reveal>
)

export const EnergyActualite = () => (
  <>
    <PageHero
      current="Actualité"
      title="Nos dernières"
      accent="actualités"
      subtitle="Inaugurations, partenariats et exclusivités qui structurent le développement de Sibiri Energy."
      image="/energy/SIBIRI%20ENERGY-8.JPG.jpeg"
    />

    <section style={{ background: DARK2, padding: '90px 0 108px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
        <Reveal>
          <div style={{ marginBottom: 20 }}>
            <SectionLabel>Actualité</SectionLabel>
            <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', fontWeight: 800, color: '#fff', margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.12 }}>
              Toutes les actualités
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {ACTUS.map((a, i) => <ActuRow key={a.title} {...a} delay={i * 0.08} />)}
        </div>
      </div>

      <style>{`@media (max-width: 700px) { .actu-row { grid-template-columns: 1fr !important; gap: 20px !important; } }`}</style>
    </section>
  </>
)
