import { RED, DARK, GRAY, Reveal, SectionLabel, PageHero } from './shared'

const WHY = [
  { icon: '🏆', title: '"Quality Only"', desc: 'Notre slogan est notre engagement. La satisfaction client est un devoir, qui place le professionnalisme au cœur de chaque action.' },
  { icon: '⛽', title: 'Spécialiste Hydrocarbures', desc: 'Années d\'expérience dans la distribution de carburant aux grandes entreprises avec des solutions adaptées à chaque secteur.' },
  { icon: '☀️', title: 'Solutions Solaires', desc: 'Conception et réalisation de centrales solaires et éclairage solaire pour accompagner la transition énergétique.' },
  { icon: '🤝', title: 'Soutien Sibiri Holding', desc: 'Bénéficie de l\'assistance technique permanente du Groupe Sibiri Holding : juridique, RH, financement et garantie.' },
  { icon: '🌍', title: 'Ancrage Local Fort', desc: 'Profonde connaissance du marché burkinabè et adaptation constante aux réalités techniques et économiques locales.' },
  { icon: '📋', title: 'Politique QHSE', desc: 'Engagement qualité, hygiène, sécurité et environnement comme preuve concrète de notre adaptation aux mutations du monde.' },
]

export const EnergyWhy = () => (
  <>
    <PageHero
      current="Pourquoi nous"
      title="Ce qui nous"
      accent="distingue"
      subtitle="Des valeurs fortes, une méthode éprouvée et une passion pour l'excellence énergétique."
      image="/energy/SIBIRI%20ENERGY-12.JPG.jpeg"
    />

    <section style={{ background: DARK, padding: '96px 0 108px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 400, background: `radial-gradient(ellipse, ${RED}08, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ marginBottom: 56 }}>
            <SectionLabel>Pourquoi Nous</SectionLabel>
            <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 40px)', fontWeight: 800, color: '#fff', margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.12 }}>
              Six raisons de nous faire confiance
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.07}>
              <div style={{
                padding: '28px 26px', borderRadius: 16,
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', gap: 18, alignItems: 'flex-start', height: '100%',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${RED}15`, border: `1px solid ${RED}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }}>{w.icon}</div>
                <div>
                  <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: "'Inter', sans-serif" }}>{w.title}</h3>
                  <p style={{ margin: 0, fontSize: 13.5, color: GRAY, lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{w.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
)
