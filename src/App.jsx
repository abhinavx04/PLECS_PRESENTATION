import HeroSection from './sections/Hero/HeroSection'
import CircuitSection from './sections/Circuit/CircuitSection'
import DerivationSection from './sections/Derivation/DerivationSection'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <CircuitSection />
      <DerivationSection />
    </div>
  )
}

export default App
