import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import LoadingScreen    from './components/LoadingScreen'
import Navbar           from './components/Navbar'
import Hero             from './components/Hero'
import MarqueeTicker    from './components/MarqueeTicker'
import Services         from './components/Services'
import TheSystem        from './components/TheSystem'
import WhyUs            from './components/WhyUs'
import HowItWorks       from './components/HowItWorks'
import About            from './components/About'
import ProblemStatement from './components/ProblemStatement'
import EmailCapture     from './components/EmailCapture'
import CTABanner        from './components/CTABanner'
import Footer           from './components/Footer'
import AdminPanel       from './pages/AdminPanel'

// ─── Landing page ────────────────────────────────────────────
function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeTicker />
        <Services />
        <TheSystem />
        <WhyUs />
        <HowItWorks />
        <About />
        <ProblemStatement />
        <EmailCapture />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}

// ─── App root ─────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* 1.5 s branded loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* Main content — hidden until loader finishes */}
      {!loading && (
        <Routes>
          <Route path="/"      element={<LandingPage />} />
          {/* Hidden admin panel — not linked in the UI */}
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      )}
    </>
  )
}
