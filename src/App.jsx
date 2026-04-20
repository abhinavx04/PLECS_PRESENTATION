import HeroSection from './sections/Hero/HeroSection'
import DesignObjectivesSection from './sections/DesignObjectives/DesignObjectivesSection'
import CircuitSection from './sections/Circuit/CircuitSection'
import DerivationSection from './sections/Derivation/DerivationSection'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <DesignObjectivesSection />
      <CircuitSection />
      <DerivationSection />
    </div>
  )
}

export default App
