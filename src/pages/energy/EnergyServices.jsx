import { useState } from 'react'
import { RED, DARK, DARK2, DARK3, GRAY, Reveal, SectionLabel, PageHero } from './shared'

// ─── Produits (Carburant / Lubrifiant) ─────────────────────────────────────────
const PRODUITS = [
  {
    id: 'carburant',
    title: 'Carburant',
    tagline: 'Essence · Gasoil · Cuves portatives',
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
const ProduitCard = ({ id, title, tagline, desc, icon, delay }) => {
  const [hov, setHov] = useState(false)
  return (
    <Reveal delay={delay}>
      <a
        href={`#${id}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: 'block', padding: '36px 32px', borderRadius: 20, textDecoration: 'none',
          background: hov ? DARK3 : 'rgba(255,255,255,0.03)',
          border: `1.5px solid ${hov ? `${RED}55` : 'rgba(255,255,255,0.08)'}`,
          boxShadow: hov ? `0 28px 64px -14px ${RED}30` : '0 2px 16px rgba(0,0,0,0.2)',
          transform: hov ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div style={{
          width: 60, height: 60, borderRadius: 16,
          background: hov ? `${RED}22` : 'rgba(255,255,255,0.05)',
          border: `1px solid ${hov ? `${RED}45` : 'rgba(255,255,255,0.08)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: hov ? RED : GRAY, marginBottom: 22, transition: 'all 0.3s ease',
        }}>{icon}</div>
        <h3 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: "'Inter', sans-serif" }}>{title}</h3>
        <p style={{ margin: '0 0 12px', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: RED }}>{tagline}</p>
        <p style={{ margin: 0, fontSize: 13.5, color: GRAY, lineHeight: 1.7 }}>{desc}</p>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 18, fontSize: 12.5, fontWeight: 700, color: hov ? RED : 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}>
          En savoir plus
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </a>
    </Reveal>
  )
}

// ─── Carte service (petite, grille de 5) ───────────────────────────────────────
const ServiceMiniCard = ({ title, desc, delay }) => (
  <Reveal delay={delay}>
    <div style={{
      padding: '24px 22px', borderRadius: 16,
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
      height: '100%',
    }}>
      <h4 style={{ margin: '0 0 8px', fontSize: 14.5, fontWeight: 700, color: '#fff', fontFamily: "'Inter', sans-serif" }}>{title}</h4>
      <p style={{ margin: 0, fontSize: 12.5, color: GRAY, lineHeight: 1.65 }}>{desc}</p>
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
          background: hov ? DARK3 : 'rgba(255,255,255,0.03)',
          border: `1.5px solid ${hov ? `${RED}45` : 'rgba(255,255,255,0.07)'}`,
          boxShadow: hov ? `0 24px 60px -12px ${RED}22` : '0 2px 16px rgba(0,0,0,0.2)',
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
          background: hov ? `${RED}20` : 'rgba(255,255,255,0.05)',
          border: `1px solid ${hov ? `${RED}40` : 'rgba(255,255,255,0.08)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: hov ? RED : GRAY,
          marginBottom: 20, transition: 'all 0.3s ease',
          boxShadow: hov ? `0 6px 20px ${RED}28` : 'none',
        }}>{icon}</div>

        <h3 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 700, color: '#fff', fontFamily: "'Inter', sans-serif" }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 13.5, color: GRAY, lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{desc}</p>
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
      image="/energy/SIBIRI%20ENERGY-15.JPG.jpeg"
    />

    {/* ── Nos Produits (Carburant / Lubrifiant) ─────────────────────────── */}
    <section id="produits" style={{ background: DARK2, padding: '90px 0 100px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(230,38,48,0.04) 1px, transparent 1px)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionLabel>Nos Produits</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 800, color: '#fff', margin: '0 0 48px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Carburant &amp; Lubrifiant
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {PRODUITS.map((p, i) => (
            <ProduitCard key={p.id} {...p} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>

    {/* ── Détail Carburant ──────────────────────────────────────────────── */}
    <section id="carburant" style={{ background: DARK, padding: '90px 0 100px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
        <Reveal>
          <SectionLabel>Produit</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 36px)', fontWeight: 800, color: '#fff', margin: '0 0 20px', fontFamily: "'Inter', sans-serif" }}>Carburant</h2>
          <p style={{ fontSize: 15, color: GRAY, lineHeight: 1.85, maxWidth: 700 }}>
            Ravitaillement en carburant (essence, gasoil) des grandes entreprises des secteurs Transport, BTP et Industrie,
            ainsi que du grand public via notre réseau de stations-service à Ouagadougou. Location et mise à disposition
            de cuves portatives pour vos besoins spécifiques.
          </p>
        </Reveal>
      </div>
    </section>

    {/* ── Détail Lubrifiant ─────────────────────────────────────────────── */}
    <section id="lubrifiant" style={{ background: DARK2, padding: '90px 0 100px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
        <Reveal>
          <SectionLabel>Produit</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 36px)', fontWeight: 800, color: '#fff', margin: '0 0 20px', fontFamily: "'Inter', sans-serif" }}>Lubrifiant</h2>
          <p style={{ fontSize: 15, color: GRAY, lineHeight: 1.85, maxWidth: 700 }}>
            Distribution de lubrifiants pour véhicules de tourisme, bus, camions et engins miniers, en partenariat avec{' '}
            <strong style={{ color: '#fff' }}>Wolf Lubricants</strong> — une marque internationale de référence pour la
            performance et la protection moteur.
          </p>
        </Reveal>
      </div>
    </section>

    {/* ── Nos Services ──────────────────────────────────────────────────── */}
    <section id="services-list" style={{ background: DARK, padding: '90px 0 108px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(230,38,48,0.04) 1px, transparent 1px)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionLabel>Nos Services</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 800, color: '#fff', margin: '0 0 48px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Un accompagnement à chaque étape
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
          {SERVICES_LIST.map((s, i) => (
            <ServiceMiniCard key={s.id} {...s} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>

    {/* ── Autres domaines d'expertise ───────────────────────────────────── */}
    <section style={{ background: DARK2, padding: '90px 0 108px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionLabel>Autres domaines</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 800, color: '#fff', margin: '0 0 48px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Une expertise énergétique élargie
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
          {AUTRES_EXPERTISES.map((s, i) => (
            <ServiceCard key={s.title} {...s} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  </>
)
