import Header from '../components/Header'
import Hero from '../components/Hero'
import ColorsSection from '../components/ColorsSection'
import LifestyleSection from '../components/LifestyleSection'
import AboutSection from '../components/AboutSection'
import WorkSection from '../components/WorkSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Hero />
        <ColorsSection />
        <LifestyleSection />
        <AboutSection />
        <WorkSection />
      </main>
      <Footer />
    </>
  )
}
