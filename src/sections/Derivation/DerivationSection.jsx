import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ── tiny math helpers ── */
const S = (t) => <sub className="text-[0.65em]">{t}</sub>
const P = (t) => <sup className="text-[0.65em]">{t}</sup>
const I = (t) => <span className="italic">{t}</span>

function Frac({ top, bottom }) {
  return (
    <span className="inline-flex flex-col items-center mx-1 -my-2 align-middle">
      <span className="px-1 leading-tight">{top}</span>
      <span className="h-px w-full bg-current opacity-50" />
      <span className="px-1 leading-tight">{bottom}</span>
    </span>
  )
}

/* ── equation steps data (strict order) ── */
const EQUATION_STEPS = [
  {
    id: 1,
    label: 'Fundamental inductor equation',
    equation: (
      <span className="inline-flex items-center flex-wrap gap-x-2">
        {I('V')}{S('L')} <span>=</span> {I('L')}
        <Frac top={<>{I('di')}</>} bottom={<>{I('dt')}</>} />
      </span>
    ),
    detail: 'Voltage across an inductor equals inductance times rate of current change.',
  },
  {
    id: 2,
    label: 'Applied to inverter-side inductor',
    equation: (
      <span className="inline-flex items-center flex-wrap gap-x-2">
        {I('V')}{S(<>L{S('1')}</>)} <span>=</span> {I('L')}{S('1')}
        <Frac top={<>{I('di')}{S(<>L{S('1')}</>)}</>} bottom={<>{I('dt')}</>} />
      </span>
    ),
    detail: 'Applying the fundamental equation to the inverter-side inductor L₁.',
  },
  {
    id: 3,
    label: 'Current ripple in L₁',
    equation: (
      <span className="inline-flex items-center flex-wrap gap-x-2">
        Δ{I('i')}{S(<>L{S('1')}</>)} <span>=</span>
        <Frac top={<>{I('V')}{S('dc')}</>} bottom={<>4 · {I('f')}{S('sw')} · {I('L')}{S('1')}</>} />
      </span>
    ),
    detail: 'Peak-to-peak current ripple depends on DC voltage, switching frequency, and inductance.',
  },
  {
    id: 4,
    label: 'Ripple attenuation through LCL',
    equation: (
      <span className="inline-flex items-center flex-wrap gap-x-2">
        Δ{I('i')}{S(<>L{S('2')}</>)} <span>≈</span>
        <Frac top={<>Δ{I('i')}{S(<>L{S('1')}</>)}</>} bottom={<>{I('ω')}{P('2')} · {I('L')}{S('2')} · {I('C')}</>} />
      </span>
    ),
    detail: 'The LC section attenuates ripple current reaching the grid-side inductor.',
  },
  {
    id: 5,
    label: 'Output voltage ripple',
    equation: (
      <span className="inline-flex items-center flex-wrap gap-x-2">
        Δ{I('V')}{S('out')} <span>=</span> Δ{I('i')}{S(<>L{S('2')}</>)} <span>×</span> {I('R')}
      </span>
    ),
    detail: 'Output voltage ripple is the attenuated current ripple times load resistance.',
  },
  {
    id: 6,
    label: 'Combined proportionality',
    equation: (
      <span className="inline-flex items-center flex-wrap gap-x-2">
        Δ{I('V')}{S('out')} <span>∝</span>
        <Frac top={<>{I('V')}{S('dc')}</>} bottom={<>{I('f')}{S('sw')}{P('3')} · {I('L')}{S('1')} · {I('L')}{S('2')} · {I('C')}</>} />
      </span>
    ),
    detail: 'Combining all steps reveals inverse cubic dependence on switching frequency.',
  },
  {
    id: 7,
    label: 'Design objective',
    isHighlight: true,
    equation: (
      <span className="inline-flex items-center flex-wrap gap-x-2">
        <span>Minimize THD</span> <span>⇒</span> <span>Maximize</span>
        <span className="text-amber-200">
          {I('f')}{S('sw')}{P('3')} · {I('L')}{S('1')} · {I('L')}{S('2')} · {I('C')}
        </span>
      </span>
    ),
    detail: 'To minimize THD, maximize the product of f³ₛw and filter component values.',
  },
]

const TOTAL_STEPS = EQUATION_STEPS.length

/* ── Vertical connecting line ── */
function ConnectingLine({ isVisible, isHighlight }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'absolute left-3 top-full h-8 w-px origin-top',
        isHighlight ? 'bg-gradient-to-b from-amber-400/50 to-amber-400/10' : 'bg-gradient-to-b from-blue-400/40 to-blue-400/10'
      )}
    />
  )
}

/* ── Single equation step ── */
function EquationStep({ step, isVisible, isCurrentStep, stepIndex, showConnector }) {
  const isHighlight = step.isHighlight
  
  return (
    <motion.div
      initial={{ opacity: 0.15 }}
      animate={{ opacity: isVisible ? 1 : 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative"
    >
      {/* Step indicator dot */}
      <div className="absolute left-0 top-0 flex flex-col items-center">
        <motion.div
          animate={{
            scale: isCurrentStep ? [1, 1.15, 1] : 1,
            boxShadow: isCurrentStep 
              ? isHighlight
                ? '0 0 14px rgba(251,191,36,0.6)'
                : '0 0 12px rgba(96,165,250,0.5)'
              : 'none'
          }}
          transition={{ duration: 2, repeat: isCurrentStep ? Infinity : 0, ease: 'easeInOut' }}
          className={cn(
            'h-6 w-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-300',
            isCurrentStep
              ? isHighlight
                ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                : 'border-blue-400 bg-blue-500/20 text-blue-300'
              : isVisible
                ? 'border-slate-600 bg-slate-800 text-slate-400'
                : 'border-slate-700 bg-slate-900 text-slate-600'
          )}
        >
          {step.id}
        </motion.div>
        
        {/* Connecting line to next step */}
        {showConnector && <ConnectingLine isVisible={isVisible} isHighlight={isHighlight} />}
      </div>

      {/* Content */}
      <div className="pl-10">
        {/* Label */}
        <motion.p
          animate={{ opacity: isVisible ? 1 : 0.35 }}
          className={cn(
            'mb-2 text-xs font-medium uppercase tracking-wider transition-colors duration-300',
            isCurrentStep
              ? isHighlight
                ? 'text-amber-300/90'
                : 'text-blue-300/90'
              : 'text-slate-500'
          )}
        >
          {step.label}
        </motion.p>

        {/* Equation */}
        <div
          className={cn(
            'font-mono text-xl tracking-wide transition-all duration-300 sm:text-2xl lg:text-3xl min-h-[2.5rem]',
            isCurrentStep
              ? isHighlight
                ? 'text-amber-100'
                : 'text-slate-100'
              : isVisible
                ? 'text-slate-400/70'
                : 'text-slate-600/30'
          )}
        >
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {step.equation}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Detail text */}
        <AnimatePresence>
          {isVisible && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={cn(
                'mt-2 text-sm max-w-xl',
                isHighlight ? 'text-amber-200/60' : 'text-slate-400/70'
              )}
            >
              {step.detail}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Highlight badge for final result */}
        {isHighlight && isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-3 inline-flex items-center gap-2"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-2 w-2 rounded-full bg-amber-400"
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300/70">
              Core design insight
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

/* ── Progress indicator ── */
function ProgressIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: i === current - 1 ? 1.3 : 1,
            backgroundColor: i < current 
              ? i === total - 1 && i === current - 1
                ? 'rgb(251, 191, 36)'
                : 'rgb(59, 130, 246)' 
              : 'rgb(51, 65, 85)'
          }}
          className="h-1.5 w-1.5 rounded-full"
        />
      ))}
      <span className="ml-3 text-xs font-medium text-slate-500">
        {current} / {total}
      </span>
    </div>
  )
}

/* ── Keyboard hint ── */
function KeyboardHint() {
  return (
    <div className="flex items-center gap-4 text-xs text-slate-500">
      <div className="flex items-center gap-1.5">
        <kbd className="rounded border border-slate-700 bg-slate-800/50 px-2 py-0.5 font-mono">←</kbd>
        <span>Back</span>
      </div>
      <div className="flex items-center gap-1.5">
        <kbd className="rounded border border-slate-700 bg-slate-800/50 px-2 py-0.5 font-mono">→</kbd>
        <span>Next</span>
      </div>
      <span className="text-slate-600">|</span>
      <div className="flex items-center gap-1.5">
        <kbd className="rounded border border-slate-700 bg-slate-800/50 px-2 py-0.5 font-mono">↑↓</kbd>
        <span>Sections</span>
      </div>
    </div>
  )
}

/* ── main section ── */
export default function DerivationSection() {
  const containerRef = useRef(null)
  const [currentStep, setCurrentStep] = useState(0) // 0 = none visible, 1-7 = steps visible
  const [isInView, setIsInView] = useState(false)

  // Handle keyboard navigation - one press = one full equation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isInView) return
      
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        e.stopPropagation()
        setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        e.stopPropagation()
        setCurrentStep((prev) => Math.max(prev - 1, 0))
      }
    }

    // Use capture phase to handle before App.jsx
    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [isInView])

  // Intersection observer to detect when section is in view
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen snap-start bg-gradient-to-b from-[#111827] via-background to-background"
      data-section="derivation"
    >
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.1),transparent)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-16 md:px-10">
        {/* Header */}
        <div className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue-300/70"
          >
            Mathematical Derivation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-3xl font-bold text-slate-100 sm:text-4xl lg:text-5xl"
          >
            Ripple &amp; THD Reduction
          </motion.h2>
        </div>

        {/* Equations - vertical flow */}
        <div className="flex-1">
          <div className="flex flex-col gap-8">
            {EQUATION_STEPS.map((step, stepIndex) => (
              <EquationStep
                key={step.id}
                step={step}
                stepIndex={stepIndex}
                isVisible={stepIndex < currentStep}
                isCurrentStep={stepIndex === currentStep - 1}
                showConnector={stepIndex < EQUATION_STEPS.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Footer controls */}
        <div className="mt-10 flex items-center justify-between border-t border-slate-800/50 pt-6">
          <ProgressIndicator current={currentStep} total={TOTAL_STEPS} />
          <KeyboardHint />
        </div>
      </div>
    </section>
  )
}
