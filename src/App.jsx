import Header from './components/Header'
import Hero from './components/Hero'
import ColorsSection from './components/ColorsSection'
import LifestyleSection from './components/LifestyleSection'
import WorkSection from './components/WorkSection'
import './index.css'

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Hero />
        <ColorsSection />
        <LifestyleSection />
        <WorkSection />
      </main>
    </>
  )
}

export default App
