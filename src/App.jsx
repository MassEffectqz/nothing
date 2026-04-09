import Header from './components/Header'
import RecIndicator from './components/RecIndicator'
import Hero from './components/Hero'
import ColorsSection from './components/ColorsSection'
import WorkSection from './components/WorkSection'
import './index.css'

function App() {
  return (
    <>
      <Header />
      <RecIndicator />
      <main className="main-content">
        <Hero />
        <ColorsSection />
        <WorkSection />
      </main>
    </>
  )
}

export default App
