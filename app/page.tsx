import Nav               from '@/components/Nav'
import Hero              from '@/components/Hero'
import TrustBar          from '@/components/TrustBar'
import ProblemSection    from '@/components/ProblemSection'
import HowItWorks        from '@/components/HowItWorks'
import SplatViewer       from '@/components/SplatViewer'
import UseCases          from '@/components/UseCases'
import TechSection       from '@/components/TechSection'
import Pricing           from '@/components/Pricing'
import LeadForm          from '@/components/LeadForm'
import FAQ               from '@/components/FAQ'
import Footer            from '@/components/Footer'
import MobileStickyCTA   from '@/components/MobileStickyCTA'

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <TrustBar />
      <ProblemSection />
      <HowItWorks />
      <SplatViewer />
      <UseCases />
      <TechSection />
      <Pricing />
      <LeadForm />
      <FAQ />
      <Footer />
      <MobileStickyCTA />
    </main>
  )
}
