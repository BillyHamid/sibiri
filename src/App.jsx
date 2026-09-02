import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import { LogoParticlesHero } from './components/LogoParticles'
import { ParticleHeroBanner } from './components/ParticleHeroBanner'
import { SubsidiariesReel } from './components/SubsidiariesReel'
import { OrgChart } from './components/OrgChart'
import { PartnersSection } from './components/PartnersSection'
import { PresidentMessage } from './components/PresidentMessage'

import { NeoMinimalFooter } from './components/NeoMinimalFooter'
import { ScrollToTopButton } from './components/ScrollToTopButton'
import { MedicalPage }             from './pages/MedicalPage'
import { MedicalRealisationsPage } from './pages/MedicalRealisationsPage'
import { MedicalActualitePage }    from './pages/MedicalActualitePage'
import { MedicalFormationPage }    from './pages/MedicalFormationPage'
import { EnergyLayout } from './pages/energy/EnergyLayout'
import { EnergyHome } from './pages/energy/EnergyHome'
import { EnergyServices } from './pages/energy/EnergyServices'
import { EnergyAbout } from './pages/energy/EnergyAbout'
import { EnergyActualite } from './pages/energy/EnergyActualite'
import { EnergyContact } from './pages/energy/EnergyContact'
import { AgroChemicalPage } from './pages/AgroChemicalPage'
import { GlobalConstructionPage } from './pages/GlobalConstructionPage'
import { TransportLogisticPage } from './pages/TransportLogisticPage'
import { GroupePage } from './pages/GroupePage'
import { ContactPage } from './pages/ContactPage'
import { NewsPage } from './pages/NewsPage'
import { ContentProvider } from './lib/content/ContentProvider'
import { AdminLayout } from './pages/admin/AdminLayout'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AdminDashboard } from './pages/admin/AdminDashboard'

// ─── Page d'accueil ───────────────────────────────────────────────────────────
const HomePage = () => (
  <>
    <Navbar />
    <ParticleHeroBanner />
    <SubsidiariesReel />
    <PresidentMessage />
    <OrgChart />
    <PartnersSection />
    <NeoMinimalFooter variant="home" />
  </>
)

// L'admin saute l'écran de chargement animé — on veut y accéder immédiatement.
const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')

// Le routing est en SPA (pas de rechargement de page entre les liens internes) :
// on gère nous-mêmes le scroll — vers l'ancre demandée, sinon en haut de page.
const ScrollManager = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

// Le bouton "remonter en haut" s'affiche partout sauf dans le back-office.
const GlobalScrollToTop = () => {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) return null
  return <ScrollToTopButton />
}

// ─── App avec routing ─────────────────────────────────────────────────────────
function App() {
  const [loaded, setLoaded] = useState(false)
  const ready = loaded || isAdminRoute

  return (
    <ContentProvider>
      {!ready && <Loader onDone={() => setLoaded(true)} />}

      {ready && (
        <BrowserRouter>
          <ScrollManager />
          <GlobalScrollToTop />
          <Routes>
            <Route path="/"                    element={<HomePage />} />
            <Route path="/groupe"              element={<GroupePage />} />
            <Route path="/actualites"          element={<NewsPage />} />
            <Route path="/contact"             element={<ContactPage />} />
            <Route path="/medical"                element={<MedicalPage />} />
            <Route path="/medical/realisations"   element={<MedicalRealisationsPage />} />
            <Route path="/medical/actualite"      element={<MedicalActualitePage />} />
            <Route path="/medical/formation"      element={<MedicalFormationPage />} />
            <Route path="/energy" element={<EnergyLayout />}>
              <Route index                    element={<EnergyHome />} />
              <Route path="services"          element={<EnergyServices />} />
              <Route path="a-propos"          element={<EnergyAbout />} />
              <Route path="actualite"         element={<EnergyActualite />} />
              <Route path="projets"           element={<Navigate to="/energy/actualite" replace />} />
              <Route path="pourquoi-nous"     element={<Navigate to="/energy/a-propos" replace />} />
              <Route path="contact"           element={<EnergyContact />} />
            </Route>
            <Route path="/agro-chemical"       element={<AgroChemicalPage />} />
            <Route path="/global-construction" element={<GlobalConstructionPage />} />
            <Route path="/transport-logistic"  element={<TransportLogisticPage />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="login"  element={<AdminLogin />} />
              <Route index         element={<AdminDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </ContentProvider>
  )
}

export default App
