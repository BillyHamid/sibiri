import { useState } from 'react'
import { RED, PAPER, ON_PAPER, Reveal, SectionLabel, PageHero } from './shared'

// ─── Produits (Carburant / Lubrifiant) ─────────────────────────────────────────
const PRODUITS = [
  {
    id: 'carburant',
    title: 'Carburant',
    tagline: 'Essence · Gasoil · Cuves portatives',
    image: '/energy/SIBIRI%20ENERGY-27.JPG.jpeg',
    imageAlt: 'Pompe de distribution Sibiri Energy',
    desc: "Ravitaillement en carburant (essence, gasoil) des grandes entreprises des secteurs Transport, BTP et Industrie, ainsi que du grand public via notre réseau de stations-service à Ouagadougou. Location et mise à disposition de cuves portatives pour vos besoins spécifiques.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path d="M3 22V6a2 2 0 012-2h6a2 2 0 012 2v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 22h10M13 11h2a2 2 0 012 2v2.5a1.5 1.5 0 003 0V9.5a2 2 0 00-.586-1.414L17 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'lubrifiant',
    title: 'Lubrifiant',
    tagline: 'Tourisme · Bus & camions · Engins miniers',
    image: '/energy/wolf-officialtech-hd.png',
    imageAlt: 'Bidon de lubrifiant WOLF Official Tech',
    desc: "Distribution de lubrifiants pour véhicules de tourisme, bus, camions et engins miniers, en partenariat avec Wolf Lubricants — une marque internationale de référence pour la performance et la protection moteur.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path d="M12 2c2 3 5 6.5 5 10.5A5 5 0 017 12.5C7 8.5 10 5 12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 15v6M9 21h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

// ─── Services annexes (B2B, réseaux, stockage...) ─────────────────────────────
const SERVICES_LIST = [
  {
    id: 'b2b',
    title: 'B2B',
    desc: "Solutions de ravitaillement et de fourniture énergétique dédiées aux entreprises des secteurs Transport, BTP et Industrie.",
  },
  {
    id: 'reseau-stations',
    title: 'Réseau de Stations',
    desc: "Quatre stations-service dans la zone de Ouagadougou, dont la première à Kouba (commune de KOUBRI), ouverte en 2022.",
  },
  {
    id: 'reseau-distribution-lubrifiant',
    title: 'Réseau de Distribution Lubrifiant',
    desc: "Un réseau de distribution dédié à l'approvisionnement en lubrifiants auprès de nos partenaires et points de vente.",
  },
  {
    id: 'post-consommateur',
    title: 'Post Consommateur',
    desc: "Accompagnement et service après-vente pour nos clients particuliers et professionnels.",
  },
  {
    id: 'solution-stockage',
    title: 'Solution de Stockage',
    desc: "Location et mise à disposition de cuves portatives et solutions de stockage adaptées à vos besoins.",
  },
]

// ─── Autres domaines d'expertise (hors carburant / lubrifiant) ────────────────
const AUTRES_EXPERTISES = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M7 17l1.5-1.5M15.5 8.5 17 7M7 7l1.5 1.5M15.5 15.5 17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Centrale & Éclairage Solaire',
    desc: 'Étude et réalisation de centrales solaires et systèmes d\'éclairage solaire pour particuliers, entreprises et institutions.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Travaux Électriques & Mécaniques',
    desc: 'Étude et réalisation de travaux électriques, mécaniques et de génie civil. Commerce de matériels électriques et mécaniques.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.67 1.14 2 2 0 012.66 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.68a16 16 0 006.41 6.41l1.04-1.04a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Réseaux Téléphoniques & Internet',
    desc: 'Étude et réalisation de réseaux téléphoniques et internet pour entreprises, sites industriels et infrastructures publiques.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Forages & Consulting',
    desc: 'Étude et réalisation de forages. Consulting en solutions énergétiques, accompagnement stratégique et technique des entreprises.',
  },
]

// ─── Carte produit (grande, Carburant / Lubrifiant) ────────────────────────────
const ProduitCard = ({ id, title, tagline, desc, icon, image, imageAlt, delay, index }) => {
  const [hov, setHov] = useState(false)
  return (
    <Reveal delay={delay}>
      <a
        href={`#${id}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: 'block', borderRadius: 20, textDecoration: 'none', overflow: 'hidden',
          background: ON_PAPER.card,
          border: `1.5px solid ${hov ? `${RED}55` : ON_PAPER.line}`,
          boxShadow: hov ? `0 28px 64px -20px ${RED}30` : '0 1px 3px rgba(12,12,15,0.05)',
          transform: hov ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div style={{ height: 258, position: 'relative', overflow: 'hidden', background: '#e8e6e2' }}>
          <img src={image} alt={imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: id === 'lubrifiant' ? 'center' : 'center 58%', transform: hov ? 'scale(1.055)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(12,12,15,0.48))' }} />
          <span style={{ position: 'absolute', left: 22, bottom: 18, color: '#fff', fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>0{index + 1} · {title}</span>
        </div>
        <div style={{ padding: '28px 30px 30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ margin: '0 0 7px', fontSize: 24, fontWeight: 800, color: ON_PAPER.title, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>{title}</h3>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', color: RED, lineHeight: 1.45 }}>{tagline}</p>
            </div>
            <div style={{ width: 46, height: 46, flex: '0 0 46px', borderRadius: 14, background: hov ? `${RED}16` : 'rgba(12,12,15,0.04)', border: `1px solid ${hov ? `${RED}40` : ON_PAPER.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: RED, transition: 'all 0.3s ease' }}>{icon}</div>
          </div>
          <p style={{ margin: '19px 0 0', fontSize: 13.5, color: ON_PAPER.body, lineHeight: 1.72 }}>{desc}</p>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 19, fontSize: 12.5, fontWeight: 800, color: hov ? RED : ON_PAPER.muted, transition: 'color 0.2s' }}>
            Découvrir l'offre
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
      </a>
    </Reveal>
  )
}

// ─── Carte service (petite, grille de 5) ───────────────────────────────────────
const ServiceMiniCard = ({ title, desc, delay }) => (
  <Reveal delay={delay}>
    <div style={{
      padding: '24px 22px', borderRadius: 16,
      background: ON_PAPER.card, border: `1px solid ${ON_PAPER.line}`,
      height: '100%',
    }}>
      <h4 style={{ margin: '0 0 8px', fontSize: 14.5, fontWeight: 700, color: ON_PAPER.title, fontFamily: "'Inter', sans-serif" }}>{title}</h4>
      <p style={{ margin: 0, fontSize: 12.5, color: ON_PAPER.body, lineHeight: 1.65 }}>{desc}</p>
    </div>
  </Reveal>
)

const ServiceCard = ({ icon, title, desc, delay }) => {
  const [hov, setHov] = useState(false)
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: '32px 28px',
          borderRadius: 18,
          background: ON_PAPER.card,
          border: `1.5px solid ${hov ? `${RED}45` : ON_PAPER.line}`,
          boxShadow: hov ? `0 24px 60px -20px ${RED}26` : '0 1px 3px rgba(12,12,15,0.05)',
          transform: hov ? 'translateY(-5px)' : 'translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
          cursor: 'default', position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: hov ? `linear-gradient(90deg, ${RED}, ${RED}50)` : 'transparent',
          transition: 'all 0.3s ease',
        }} />

        <div style={{
          width: 52, height: 52, borderRadius: 13,
          background: hov ? `${RED}16` : 'rgba(12,12,15,0.04)',
          border: `1px solid ${hov ? `${RED}40` : ON_PAPER.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: RED,
          marginBottom: 20, transition: 'all 0.3s ease',
        }}>{icon}</div>

        <h3 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 700, color: ON_PAPER.title, fontFamily: "'Inter', sans-serif" }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 13.5, color: ON_PAPER.body, lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{desc}</p>
      </div>
    </Reveal>
  )
}

export const EnergyServices = () => (
  <>
    <PageHero
      current="Produits"
      title="Une expertise"
      accent="complète et intégrée"
      subtitle="De la distribution à la proposition de solution, nous couvrons tous les domaines de l'énergie."
      image="/energy/SIBIRI%20ENERGY-21.JPG.jpeg"
    />

    {/* ── Nos Produits (Carburant / Lubrifiant) ─────────────────────────── */}
    <section id="produits" style={{ background: PAPER, padding: '90px 0 100px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(230,38,48,0.04) 1px, transparent 1px)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionLabel>Nos Produits</SectionLabel>
          <h2 style={{ fontSize: 'clamp(26px, 3.8vw, 42px)', fontWeight: 800, color: ON_PAPER.title, margin: '0 0 12px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            L’essentiel, sans compromis.
          </h2>
          <p style={{ maxWidth: 530, margin: '0 0 48px', color: ON_PAPER.body, fontSize: 15, lineHeight: 1.7 }}>Deux expertises complémentaires pour faire avancer les personnes, les flottes et les activités.</p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {PRODUITS.map((p, i) => (
            <ProduitCard key={p.id} {...p} index={i} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>

    {/* ── Chapitre clair : les deux produits en détail ───────────────────── */}
    {/* Anciennement deux sections noires quasi vides (un titre + un paragraphe
        chacune). Fusionnées ici en un seul chapitre clair : c'est la respiration
        de la page, et les produits s'examinent en pleine lumière. Les ancres
        #carburant et #lubrifiant sont conservées pour le menu Produits. */}
    <section style={{ background: PAPER, padding: '104px 0 112px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
        <Reveal>
          <SectionLabel>Nos produits en détail</SectionLabel>
          <h2 style={{
            fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 800, color: ON_PAPER.title,
            margin: '0 0 56px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.15,
            maxWidth: 620,
          }}>
            Deux gammes, une même exigence
          </h2>
        </Reveal>

        <div className="energy-produits-detail">
          <div id="carburant" style={{ scrollMarginTop: 120 }}>
            <Reveal>
              <span style={{
                display: 'block', fontSize: 12, fontWeight: 800, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: RED, marginBottom: 14, fontFamily: "'Inter', sans-serif",
              }}>Carburant</span>
              <h3 style={{
                fontSize: 26, fontWeight: 800, color: ON_PAPER.title, margin: '0 0 8px',
                fontFamily: "'Inter', sans-serif", letterSpacing: '-0.015em',
              }}>Essence, gasoil et cuves portatives</h3>
              <p style={{ margin: 0, fontSize: 15, color: ON_PAPER.body, lineHeight: 1.85, fontFamily: "'Inter', sans-serif" }}>
                Ravitaillement en carburant (essence, gasoil) des grandes entreprises des secteurs Transport, BTP et
                Industrie, ainsi que du grand public via notre réseau de stations-service à Ouagadougou. Location et
                mise à disposition de cuves portatives pour vos besoins spécifiques.
              </p>
            </Reveal>
          </div>

          {/* Filet vertical de séparation (masqué en une colonne) */}
          <div className="energy-rule" style={{ background: ON_PAPER.line, alignSelf: 'stretch' }} />

          <div id="lubrifiant" style={{ scrollMarginTop: 120 }}>
            <Reveal delay={0.08}>
              <span style={{
                display: 'block', fontSize: 12, fontWeight: 800, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: RED, marginBottom: 14, fontFamily: "'Inter', sans-serif",
              }}>Lubrifiant</span>
              <h3 style={{
                fontSize: 26, fontWeight: 800, color: ON_PAPER.title, margin: '0 0 8px',
                fontFamily: "'Inter', sans-serif", letterSpacing: '-0.015em',
              }}>Tourisme, poids lourds et engins miniers</h3>
              <p style={{ margin: 0, fontSize: 15, color: ON_PAPER.body, lineHeight: 1.85, fontFamily: "'Inter', sans-serif" }}>
                Distribution de lubrifiants pour véhicules de tourisme, bus, camions et engins miniers, en partenariat
                avec <strong style={{ color: ON_PAPER.title, fontWeight: 700 }}>Wolf Lubricants</strong> — une marque
                internationale de référence pour la performance et la protection moteur.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.12}>
          <div className="energy-product-note">
            <div className="energy-product-note__image">
              <img src="/energy/SIBIRI%20ENERGY-13.JPG.jpeg" alt="Signalétique d'entrée de la station Sibiri Energy" />
            </div>
            <div className="energy-product-note__copy">
              <span>Notre approche</span>
              <h3>Une offre pensée pour le terrain.</h3>
              <p>Du passage à la pompe à l’approvisionnement des entreprises, Sibiri Energy associe proximité, continuité de service et solutions adaptées aux usages.</p>
              <div className="energy-product-note__tags">
                <b>Grand public</b><b>Professionnels</b><b>Flottes</b>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .energy-produits-detail {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 56px;
          align-items: start;
        }
        .energy-product-note {
          display: grid;
          grid-template-columns: minmax(260px, .92fr) 1.08fr;
          margin-top: 68px;
          min-height: 300px;
          border: 1px solid ${ON_PAPER.line};
          border-radius: 20px;
          overflow: hidden;
          background: ${ON_PAPER.card};
        }
        .energy-product-note__image { min-height: 260px; overflow: hidden; }
        .energy-product-note__image img { width: 100%; height: 100%; object-fit: cover; }
        .energy-product-note__copy { padding: 42px 46px; display: flex; flex-direction: column; justify-content: center; }
        .energy-product-note__copy > span { color: ${RED}; font-size: 11px; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
        .energy-product-note__copy h3 { margin: 12px 0 12px; color: ${ON_PAPER.title}; font: 800 clamp(23px, 2.3vw, 31px)/1.12 'Inter', sans-serif; letter-spacing: -.025em; }
        .energy-product-note__copy p { max-width: 530px; margin: 0; color: ${ON_PAPER.body}; font-size: 14px; line-height: 1.75; }
        .energy-product-note__tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 23px; }
        .energy-product-note__tags b { border: 1px solid ${ON_PAPER.line}; border-radius: 999px; padding: 7px 10px; color: ${ON_PAPER.muted}; font-size: 10px; letter-spacing: .06em; text-transform: uppercase; }
        @media (max-width: 860px) {
          .energy-produits-detail { grid-template-columns: 1fr; gap: 44px; }
          .energy-produits-detail > .energy-rule { display: none; }
          .energy-product-note { grid-template-columns: 1fr; margin-top: 48px; }
          .energy-product-note__image { height: 230px; min-height: 0; }
          .energy-product-note__copy { padding: 31px 28px; }
        }
      `}</style>
    </section>

    {/* ── Nos Services ──────────────────────────────────────────────────── */}
    <section id="services-list" style={{ background: PAPER, padding: '104px 0 112px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(230,38,48,0.04) 1px, transparent 1px)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionLabel>Nos Services</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 800, color: ON_PAPER.title, margin: '0 0 48px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Un accompagnement à chaque étape
          </h2>
        </Reveal>

        {/* 5 services : minmax(180px) permet de tenir la ligne complète en une
            seule rangée (auto-fit à 210px cassait en 4 + 1 orpheline). */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {SERVICES_LIST.map((s, i) => (
            <ServiceMiniCard key={s.id} {...s} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>

    {/* ── Autres domaines d'expertise ───────────────────────────────────── */}
    <section style={{ background: PAPER, padding: '104px 0 112px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionLabel>Autres domaines</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 800, color: ON_PAPER.title, margin: '0 0 48px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Une expertise énergétique élargie
          </h2>
        </Reveal>

        {/* 4 cartes : une grille 2×2 plutôt qu'un auto-fit qui laisse une carte
            orpheline seule sur la seconde ligne. */}
        <div className="energy-autres-grid">
          {AUTRES_EXPERTISES.map((s, i) => (
            <ServiceCard key={s.title} {...s} delay={i * 0.08} />
          ))}
        </div>
      </div>

      <style>{`
        .energy-autres-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }
        @media (max-width: 760px) {
          .energy-autres-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  </>
)
