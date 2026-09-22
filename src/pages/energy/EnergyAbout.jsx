import { useRef } from 'react'
import { useInView } from 'framer-motion'
import './EnergyEditorial.css'
import { Link } from 'react-router-dom'
import { Reveal, CountUp, SectionLabel, EditablePageHero } from './shared'

const STATS_ABOUT = [
  { target: 4,    suffix: '',  label: 'Stations-service'        },
  { target: 2022, suffix: '',  label: 'Réseau grand public'     },
  { target: 70,   suffix: '+', label: 'Clients entreprises'     },
  { target: 2025, suffix: '',  label: 'Exclusivité WOLF Lubric.'},
]

// Icônes SVG au trait (mêmes réglages que le reste d'Energy : 24×24, stroke 1.8).
// Remplacent les emojis d'origine, qui juraient sur les cartes claires et
// n'appartenaient pas au langage graphique de la filiale.
const Ico = ({ d }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    {d.map((path, i) => (
      <path key={i} d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ))}
  </svg>
)

const WHY = [
  {
    icon: <Ico d={['M7 4h10v5a5 5 0 01-10 0V4z', 'M17 5h2.5a2.5 2.5 0 01-2.5 4.5M7 5H4.5A2.5 2.5 0 007 9.5', 'M12 14v4M9 21h6l-.5-3h-5L9 21z']} />,
    title: '"Quality Only"',
    desc: 'Notre slogan est notre engagement. La satisfaction client est un devoir, qui place le professionnalisme au cœur de chaque action.',
  },
  {
    icon: <Ico d={['M3 22V6a2 2 0 012-2h6a2 2 0 012 2v16', 'M3 22h10M13 11h2a2 2 0 012 2v2.5a1.5 1.5 0 003 0V9.5a2 2 0 00-.586-1.414L17 6', 'M6 6h4']} />,
    title: 'Spécialiste Hydrocarbures',
    desc: 'Années d\'expérience dans la distribution de carburant aux grandes entreprises avec des solutions adaptées à chaque secteur.',
  },
  {
    icon: <Ico d={['M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4', 'M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z']} />,
    title: 'Solutions Solaires',
    desc: 'Conception et réalisation de centrales solaires et éclairage solaire pour accompagner la transition énergétique.',
  },
  {
    icon: <Ico d={['M11 17l-2.5 2.5a2 2 0 01-2.8-2.8L8 14.5', 'M3 11l4-4 3.5 3.5a2 2 0 002.8 0L15 9l6 6-3 3-3-2', 'M14 5l3-2 4 4-2 3']} />,
    title: 'Soutien Sibiri Holding',
    desc: 'Bénéficie de l\'assistance technique permanente du Groupe Sibiri Holding : juridique, RH, financement et garantie.',
  },
  {
    icon: <Ico d={['M12 2a10 10 0 100 20 10 10 0 000-20z', 'M2 12h20', 'M12 2a15 15 0 010 20a15 15 0 010-20z']} />,
    title: 'Ancrage Local Fort',
    desc: 'Profonde connaissance du marché burkinabè et adaptation constante aux réalités techniques et économiques locales.',
  },
  {
    icon: <Ico d={['M9 3h6a1 1 0 011 1v1H8V4a1 1 0 011-1z', 'M8 5H6a2 2 0 00-2 2v13a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2', 'M8.5 12.5l2 2 4.5-4.5']} />,
    title: 'Politique QHSE',
    desc: 'Engagement qualité, hygiène, sécurité et environnement comme preuve concrète de notre adaptation aux mutations du monde.',
  },
]

export const EnergyAbout = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div className="energy-editorial">
      <EditablePageHero
        contentKey="energy.about.hero"
        current="À propos"
        title="Ancrés ici."
        accent="Tournés vers demain."
        subtitle="L’énergie, une expertise. La proximité, un engagement. Découvrez la filiale énergétique du Groupe Sibiri Holding."
        image="/energy/SIBIRI%20ENERGY-6.JPG.jpeg"
      />

      <section className="ee-section">
        <div className="ee-container ee-about-intro">
          <Reveal>
            <figure className="ee-about-photo">
              <img src="/energy/SIBIRI%20ENERGY-5.JPG.jpeg" alt="Station Sibiri Energy et ses installations au Burkina Faso" loading="lazy" />
              <figcaption><span>Notre ancrage</span>Burkina Faso <span aria-hidden="true">↗</span></figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLabel>Qui nous sommes</SectionLabel>
            <h2>Une énergie qui nous <em>rapproche.</em></h2>
            <p className="ee-lead">Au service des entreprises et du grand public, SIBIRI ENERGY SA relie les besoins du quotidien aux projets qui font avancer le territoire.</p>
            <p>Filiale du Groupe Sibiri Holding, nous intervenons dans la distribution de produits pétroliers, les travaux électriques, mécaniques et de génie civil, ainsi que les réseaux téléphoniques et internet.</p>
            <p>Notre expertise s’étend aux centrales et à l’éclairage solaires, aux forages et au conseil en solutions énergétiques. Une diversité de métiers, portée par une même exigence : la qualité du service.</p>
            <Link className="ee-link" to="/energy/services">Explorer nos expertises <span aria-hidden="true">↗</span></Link>
          </Reveal>
        </div>
        <dl ref={ref} className="ee-container ee-stats">
          {STATS_ABOUT.map(({ target, suffix, label }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd><CountUp target={target} suffix={suffix} start={inView} /></dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="ee-section ee-tinted">
        <div className="ee-container">
          <div className="ee-section-heading">
            <Reveal><SectionLabel>Notre parcours</SectionLabel><h2>Grandir, étape <em>par étape.</em></h2></Reveal>
            <p>Des jalons qui racontent notre développement et notre engagement au Burkina Faso.</p>
          </div>
          <ol className="ee-timeline">
            {[
              { year: '2016', title: 'La naissance d’une ambition', desc: 'Création de Sibiri Energy, la filiale énergétique du Groupe Sibiri Holding.' },
              { year: '2022', title: 'Plus proches du grand public', desc: 'Ouverture de la première station à Kouba, dans la commune de Koubri. Une nouvelle étape pour le réseau.' },
              { year: '2025', title: 'Un partenariat avec WOLF', desc: 'Exclusivité de distribution au Burkina Faso de WOLF LUBRICANTS, marque de WOLF OIL CORPORATION.' },
            ].map(item => (
              <li key={item.year}><span className="ee-year">{item.year}</span><h3>{item.title}</h3><p>{item.desc}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ee-section">
        <div className="ee-container">
          <Reveal>
            <div id="proximite" className="ee-welcome" aria-labelledby="ee-welcome-title">
              <div className="ee-welcome-copy">
                <SectionLabel>Le sens du service</SectionLabel>
                <h2 id="ee-welcome-title">L’énergie commence<br />par <em>un sourire.</em></h2>
                <p>Être proches de vous, c’est aussi vous accueillir, vous écouter et vous accompagner. Pour un passage en station comme pour un besoin professionnel, la qualité de la relation fait partie de notre engagement.</p>
                <Link className="ee-link" to="/energy/contact">Échanger avec notre équipe <span aria-hidden="true">↗</span></Link>
              </div>
              <div className="ee-welcome-art">
                <img
                  src="/energy/olenchic-cartoon-9972771_1920.png"
                  alt="Illustration d’un pompiste souriant devant une station-service"
                  width="1920"
                  height="1920"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </Reveal>
          <div className="ee-section-heading">
            <Reveal><SectionLabel>Nos engagements</SectionLabel><h2>« Quality Only ».<br /><em>Chaque jour.</em></h2></Reveal>
            <p>Une signature qui se traduit dans nos métiers, nos relations et notre manière d’accompagner chaque client.</p>
          </div>
          <div className="ee-values">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.04}>
                <article className="ee-value">
                  <div className="ee-value-top"><span>{w.icon}</span><span className="ee-number">0{i + 1}</span></div>
                  <h3>{w.title}</h3><p>{w.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ee-container ee-closing">
        <div><SectionLabel>Construisons la suite</SectionLabel><h2>Votre projet mérite<br /><em>la bonne énergie.</em></h2></div>
        <Link to="/energy/contact" className="ee-button">Parlons de votre besoin <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  )
}
