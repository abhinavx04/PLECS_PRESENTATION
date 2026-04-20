import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import ImageModal from '@/components/ui/ImageModal'

const SLIDES = [
  {
    id: 1,
    image: '/proposed-design-1.png',
    title: 'Output Voltage Ripple (ΔVout)',
    subtitle: 'Deriving the voltage ripple expression through LCL filter analysis',
  },
  {
    id: 2,
    image: '/proposed-design-2.png',
    title: 'Output Voltage Magnitude |Vout|',
    subtitle: 'Transfer function derivation and given design conditions',
  },
  {
    id: 3,
    image: '/proposed-design-3.png',
    title: 'Filter Component Calculation',
    subtitle: 'Resonant frequency constraints and L, C value determination',
  },
]

const TOTAL_SLIDES = SLIDES.length

export default function DerivationSection() {
  const containerRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isInView, setIsInView] = useState(false)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isInView) return

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        e.stopPropagation()
        setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES - 1))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        e.stopPropagation()
        setCurrentSlide((prev) => Math.max(prev - 1, 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [isInView])

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.3)
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const slide = SLIDES[currentSlide]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen snap-start overflow-hidden bg-gradient-to-b from-[#0a0f1a] via-[#0d1320] to-background"
      data-section="derivation"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Top glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]" />
        {/* Corner accents */}
        <div className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 md:px-10">
        {/* Header */}
        <div className="mb-4 flex items-end justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-300/70"
            >
              Section 03 — Proposed Design
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-2xl font-bold text-slate-100 sm:text-3xl lg:text-4xl"
            >
              LCL Filter Design & Analysis
            </motion.h2>
          </div>

          {/* Slide indicator - top right */}
          <div className="flex items-center gap-3">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(i)}
                className={cn(
                  'group relative flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-300',
                  i === currentSlide
                    ? 'bg-blue-500/20 ring-1 ring-blue-400/50'
                    : 'hover:bg-slate-800/50'
                )}
              >
                <span
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all',
                    i === currentSlide
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'
                  )}
                >
                  {i + 1}
                </span>
                <span
                  className={cn(
                    'hidden text-xs font-medium sm:block',
                    i === currentSlide ? 'text-blue-300' : 'text-slate-500'
                  )}
                >
                  {i === 0 ? 'ΔVout' : i === 1 ? '|Vout|' : 'L, C'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main slide content */}
        <div className="relative flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex h-full flex-col"
            >
              {/* Slide title bar */}
              <div className="mb-4 flex items-center gap-4 border-l-2 border-blue-400 pl-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100 sm:text-xl">
                    {slide.title}
                  </h3>
                  <p className="text-sm text-slate-400">{slide.subtitle}</p>
                </div>
              </div>

              {/* Image container */}
              <div className="relative flex-1 overflow-hidden rounded-2xl border border-slate-700/50 bg-white/95 shadow-2xl shadow-blue-500/5">
                {/* Subtle frame effect */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                
                {/* The image - clickable for zoom */}
                <ImageModal
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-contain p-2"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer controls */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-800/50 pt-4">
          {/* Progress dots */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    i === currentSlide
                      ? 'w-8 bg-blue-500'
                      : 'w-2 bg-slate-700 hover:bg-slate-600'
                  )}
                />
              ))}
            </div>
            <span className="ml-2 text-xs font-medium text-slate-500">
              {currentSlide + 1} / {TOTAL_SLIDES}
            </span>
          </div>

          {/* Navigation hints */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="hidden text-slate-600 sm:block">
              Click image to zoom
            </span>
            <span className="hidden text-slate-700 sm:block">|</span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-slate-700 bg-slate-800/50 px-2 py-0.5 font-mono">
                ←
              </kbd>
              <kbd className="rounded border border-slate-700 bg-slate-800/50 px-2 py-0.5 font-mono">
                →
              </kbd>
              <span className="ml-1">Slides</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-slate-700 bg-slate-800/50 px-2 py-0.5 font-mono">
                ↑
              </kbd>
              <kbd className="rounded border border-slate-700 bg-slate-800/50 px-2 py-0.5 font-mono">
                ↓
              </kbd>
              <span className="ml-1">Sections</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
