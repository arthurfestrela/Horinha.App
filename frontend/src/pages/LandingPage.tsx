import { CtaBanner } from '../components/landing/CtaBanner'
import { Features } from '../components/landing/Features'
import { Footer } from '../components/landing/Footer'
import { Hero } from '../components/landing/Hero'
import { HowItWorks } from '../components/landing/HowItWorks'
import { Navbar } from '../components/landing/Navbar'
import { Personas } from '../components/landing/Personas'
import { Pricing } from '../components/landing/Pricing'
import { ProblemSolution } from '../components/landing/ProblemSolution'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <Personas />
        <Pricing />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
