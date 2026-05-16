import { SubsidiaryShowcasePage } from "../components/SubsidiaryShowcasePage"

const config = {
  shortName: "SIBIRI AGRO",
  highlight: "CHEMICAL",
  footerVariant: "agro",
  colors: {
    bg: "#0b1a12",
    sectionA: "#102319",
    sectionB: "#0f2017",
    primary: "#1f9d55",
    accent: "#7ee787",
    glow: "#1f9d5542",
  },
  hero: {
    badge: "Agriculture & intrants",
    title: "SIBIRI AGRO CHEMICAL",
    subtitle:
      "Une filiale orientee vers la performance agricole durable: intrants de qualite, accompagnement technique terrain et distribution fiable pour les producteurs et cooperatives.",
    ctas: [
      { label: "Voir nos solutions", href: "#agro-services", focus: "Intrants adaptes aux cultures locales" },
      { label: "Notre impact", href: "#agro-realisations", focus: "Accompagnement agronomique continu" },
      { label: "Contact", href: "#agro-contact", focus: "Appui technique et commercial rapide" },
    ],
  },
  anchors: {
    home: "agro-home",
    about: "agro-about",
    services: "agro-services",
    realisations: "agro-realisations",
    contact: "agro-contact",
  },
  about: {
    description:
      "SIBIRI AGRO CHEMICAL accompagne les exploitants agricoles, cooperatives et distributeurs avec des solutions intrants performantes, un appui technique de proximite et une logique de production durable.",
    points: [
      "Approche adaptee aux filieres locales et aux saisons agricoles.",
      "Appui terrain pour des protocoles de traitement mieux maitrises.",
      "Partenariats de distribution pour garantir disponibilite et continuite.",
    ],
  },
  services: {
    title: "Nos solutions agrochimiques",
    items: [
      { icon: "🌱", title: "Nutrition des sols", desc: "Gammes fertilisantes selon le type de culture et le cycle de production." },
      { icon: "🧪", title: "Protection phytosanitaire", desc: "Produits de traitement homologues avec recommandations d'usage securisees." },
      { icon: "📦", title: "Distribution terrain", desc: "Approvisionnement rapide en zones rurales avec stocks planifies par saison." },
    ],
  },
  realisations: {
    title: "Realisations & impact terrain",
    items: [
      { icon: "📊", title: "Suivi de rendement", desc: "Mesure des performances parcelle par parcelle pour ajuster les protocoles." },
      { icon: "🤝", title: "Formation producteurs", desc: "Sensibilisation aux bonnes pratiques de dosage, stockage et application." },
      { icon: "♻️", title: "Approche responsable", desc: "Promotion de pratiques qui preservent sols, eau et biodiversite." },
    ],
  },
  contacts: [
    { icon: "📍", label: "Zone d'intervention", value: "Burkina Faso\nBassins agricoles prioritaires" },
    { icon: "📞", label: "Service commercial", value: "Ligne filiale AGRO\nSIBIRI GROUP" },
    { icon: "✉️", label: "Email", value: "agro@sibiri.group" },
  ],
}

export const AgroChemicalPage = () => <SubsidiaryShowcasePage config={config} />
