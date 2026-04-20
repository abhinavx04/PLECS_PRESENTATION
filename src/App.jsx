import { useEffect, useRef, useCallback } from 'react'
import HeroSection from './sections/Hero/HeroSection'
import DesignObjectivesSection from './sections/DesignObjectives/DesignObjectivesSection'
import CircuitSection from './sections/Circuit/CircuitSection'
import SpecificationsSection from './sections/Specifications/SpecificationsSection'
import DerivationSection from './sections/Derivation/DerivationSection'

function App() {
  const containerRef = useRef(null)
  const sectionsRef = useRef([])

  const scrollToSection = useCallback((direction) => {
    const container = containerRef.current
    if (!container) return

    const sections = container.querySelectorAll('[data-section]')
    const scrollTop = container.scrollTop
    const viewportHeight = window.innerHeight

    let currentIndex = 0
    sections.forEach((section, index) => {
      if (section.offsetTop <= scrollTop + viewportHeight / 2) {
        currentIndex = index
      }
    })

    const nextIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, sections.length - 1)
      : Math.max(currentIndex - 1, 0)

    sections[nextIndex]?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only use ArrowUp/ArrowDown for section navigation
      // ArrowLeft/ArrowRight are reserved for derivation equations
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        scrollToSection('next')
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        scrollToSection('prev')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scrollToSection])

  return (
    <div 
      ref={containerRef}
      className="h-screen snap-y snap-mandatory overflow-y-auto bg-background scroll-smooth"
    >
      <HeroSection />
      <DesignObjectivesSection />
      <CircuitSection />
      <SpecificationsSection />
      <DerivationSection />
    </div>
  )
}

export default App
