import { Link } from 'react-router-dom'
import { Reveal, SectionLabel, EditablePageHero } from './shared'
import './EnergyEditorial.css'

const ACTUS = [
  {
    id: 'station-kouba',
    date: '2022',
    tag: 'Inauguration',
    title: 'Kouba–Koubri : le début d’une nouvelle proximité.',
    desc: 'Inaugurée en 2022 dans la commune de Koubri, la première station grand public de SIBIRI ENERGY SA marque le point de départ du développement de notre réseau dans la zone de Ouagadougou, aujourd’hui composé de quatre stations-service.',
    image: '/energy/SIBIRI%20ENERGY-5.JPG.jpeg',
    alt: 'Vue de la station-service Sibiri Energy à Kouba–Koubri',
    link: '/energy/a-propos',
    linkLabel: 'Découvrir notre parcours',
  },
  {
    id: 'approvisionnement-b2b',
    date: '2022',
    tag: 'Partenariat B2B',
    title: 'Accompagner l’énergie des entreprises.',
    desc: 'Transport, BTP et industrie : Sibiri Energy accompagne les professionnels dans leur approvisionnement en produits pétroliers. La location et la mise à disposition de cuves portatives complètent les solutions de ravitaillement selon les besoins de chaque activité.',
    image: '/energy/SIBIRI%20ENERGY-27.JPG.jpeg',
    alt: 'Équipement de distribution de carburant Sibiri Energy',
    link: '/energy/services#services-list',
    linkLabel: 'Explorer nos services B2B',
  },
]

export const EnergyActualite = () => (
  <div className="energy-editorial">
    <EditablePageHero
      contentKey="energy.news.hero"
      current="Actualités"
      title="L’énergie avance."
      accent="Notre histoire aussi."
      subtitle="Partenariats, ouvertures et vie du réseau : les temps forts de Sibiri Energy au Burkina Faso."
      image="/energy/SIBIRI%20ENERGY-10.JPG.jpeg"
    />

    <section className="ee-section">
      <div className="ee-container">
        <div className="ee-journal-heading">
          <Reveal><SectionLabel>Le journal Energy</SectionLabel><h2>À la <em>une.</em></h2></Reveal>
          <span className="ee-edition">Partenariats &amp; vie du réseau</span>
        </div>
        <Reveal>
          <article className="ee-feature" aria-labelledby="wolf-news-title">
            <div className="ee-feature-image">
              <img src="/energy/wolf-officialtech-hd.png" alt="Lubrifiant WOLF Official Tech" loading="lazy" />
              <span className="ee-image-label">Partenariat · WOLF Lubricants</span>
            </div>
            <div className="ee-feature-copy">
              <div className="ee-meta"><time dateTime="2025">2025</time><span>Exclusivité</span></div>
              <h3 id="wolf-news-title">WOLF Lubricants.<br />Une nouvelle dimension pour Sibiri Energy.</h3>
              <p>En 2025, Sibiri Energy obtient l’exclusivité de distribution au Burkina Faso de la marque belge WOLF LUBRICANTS, de WOLF OIL CORPORATION.</p>
              <p>Une marque présente depuis 1955, avec une gamme de lubrifiants pour véhicules de tourisme, bus, camions et engins miniers.</p>
              <Link className="ee-link" to="/energy/services#lubrifiant">Découvrir les lubrifiants <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        </Reveal>
      </div>
    </section>

    <section className="ee-section ee-tinted">
      <div className="ee-container">
        <div className="ee-section-heading">
          <Reveal><SectionLabel>Dans nos archives</SectionLabel><h2>Les étapes qui <em>comptent.</em></h2></Reveal>
          <p>Retour sur les initiatives qui accompagnent le développement de notre réseau et de nos services.</p>
        </div>
        <div className="ee-news-grid">
          {ACTUS.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <article className="ee-news-card" aria-labelledby={item.id}>
                <div className="ee-news-image"><img src={item.image} alt={item.alt} loading="lazy" /></div>
                <div className="ee-news-copy">
                  <div className="ee-meta"><time dateTime={item.date}>{item.date}</time><span>{item.tag}</span></div>
                  <h3 id={item.id}>{item.title}</h3>
                  <p>{item.desc}</p>
                  <Link className="ee-link" to={item.link}>{item.linkLabel} <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="ee-container ee-closing">
      <div><SectionLabel>Restons en contact</SectionLabel><h2>Une question,<br /><em>un projet à partager ?</em></h2></div>
      <Link className="ee-button" to="/energy/contact">Échanger avec notre équipe <span aria-hidden="true">↗</span></Link>
    </section>
  </div>
)
