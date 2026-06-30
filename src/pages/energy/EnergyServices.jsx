import { useState } from 'react'
import { RED, DARK2, DARK3, GRAY, Reveal, SectionLabel, PageHero } from './shared'

const SERVICES = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M3 12h2m14 0h2M12 3v2m0 14v2M5.6 5.6l1.4 1.4m9.9 9.9 1.4 1.4M5.6 18.4l1.4-1.4m9.9-9.9 1.4-1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    title: 'Distribution Produits Pétroliers',
    desc: 'Ravitaillement en carburant des grandes entreprises des secteurs Transport, BTP et Industrie. Location et mise à disposition de cuves portatives.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Réseau de Stations-Service',
    desc: 'Quatre stations-service dans la zone de Ouagadougou, dont la première à Kouba (commune de KOUBRI), ouverte en 2022.',
  },
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
      current="Services"
      title="Une expertise énergétique"
      accent="complète et intégrée"
      subtitle="De la distribution pétrolière aux solutions solaires, en passant par les travaux électriques et le consulting, nous couvrons tous les domaines de l'énergie."
      image="/energy/SIBIRI%20ENERGY-15.JPG.jpeg"
    />

    <section style={{ background: DARK2, padding: '90px 0 108px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, rgba(230,38,48,0.04) 1px, transparent 1px)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <SectionLabel>Nos Services</SectionLabel>
          <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 800, color: '#fff', margin: '0 0 48px', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Six pôles d'activité au service de l'énergie
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  </>
)
