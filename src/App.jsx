import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import { LogoParticlesHero } from './components/LogoParticles'
import { ParticleHeroBanner } from './components/ParticleHeroBanner'
import { LogosTransition } from './components/FilialesLogoCarousel'
import { SubsidiariesReel } from './components/SubsidiariesReel'
import { OrgChart } from './components/OrgChart'
import { PartnersSection } from './components/PartnersSection'
import { PresidentMessage } from './components/PresidentMessage'

import { NeoMinimalFooter } from './components/NeoMinimalFooter'
import { MedicalPage }             from './pages/MedicalPage'
import { MedicalRealisationsPage } from './pages/MedicalRealisationsPage'
import { MedicalActualitePage }    from './pages/MedicalActualitePage'
import { MedicalFormationPage }    from './pages/MedicalFormationPage'
import { EnergyPage } from './pages/EnergyPage'
import { AgroChemicalPage } from './pages/AgroChemicalPage'
import { GlobalConstructionPage } from './pages/GlobalConstructionPage'
import { TransportLogisticPage } from './pages/TransportLogisticPage'
import { GroupePage } from './pages/GroupePage'
import { ContactPage } from './pages/ContactPage'
import { NewsPage } from './pages/NewsPage'

// ─── Page d'accueil ───────────────────────────────────────────────────────────
const HomePage = () => (
  <>
    <Navbar />
    <ParticleHeroBanner />
    <LogosTransition />
    <SubsidiariesReel />
    <PresidentMessage />
    <OrgChart />
    <PartnersSection />
    <NeoMinimalFooter variant="home" />
  </>
)

// ─── App avec routing ─────────────────────────────────────────────────────────
function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      {loaded && (
        <BrowserRouter>
          <Routes>
            <Route path="/"                    element={<HomePage />} />
            <Route path="/groupe"              element={<GroupePage />} />
            <Route path="/actualites"          element={<NewsPage />} />
            <Route path="/contact"             element={<ContactPage />} />
            <Route path="/medical"                element={<MedicalPage />} />
            <Route path="/medical/realisations"   element={<MedicalRealisationsPage />} />
            <Route path="/medical/actualite"      element={<MedicalActualitePage />} />
            <Route path="/medical/formation"      element={<MedicalFormationPage />} />
            <Route path="/energy"              element={<EnergyPage />} />
            <Route path="/agro-chemical"       element={<AgroChemicalPage />} />
            <Route path="/global-construction" element={<GlobalConstructionPage />} />
            <Route path="/transport-logistic"  element={<TransportLogisticPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}

export default App
