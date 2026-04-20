import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion'
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

/* key variables (f_sw, L1, L2, C, …): soft glow + faint underline when step is active */
function Glow({ children, active, color = 'blue' }) {
  const amber = color === 'amber'
  return (
    <motion.span
      className={cn(
        'relative inline-block rounded-sm px-[0.04em] transition-colors duration-700',
        active &&
          (amber
            ? 'text-amber-100/90 underline decoration-amber-400/30 underline-offset-[4px]'
            : 'text-sky-100/90 underline decoration-sky-400/25 underline-offset-[4px]'),
      )}
      animate={
        active
          ? {
              textShadow: amber
                ? [
                    '0 0 8px rgba(251,191,36,0.12)',
                    '0 0 16px rgba(251,191,36,0.28)',
                    '0 0 8px rgba(251,191,36,0.12)',
                  ]
                : [
                    '0 0 8px rgba(125,211,252,0.1)',
                    '0 0 14px rgba(125,211,252,0.22)',
                    '0 0 8px rgba(125,211,252,0.1)',
                  ],
            }
          : { textShadow: '0 0 0 transparent' }
      }
      transition={
        active
          ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.35 }
      }
    >
      {children}
    </motion.span>
  )
}

/* ── step data ── */
const STEPS = [
  {
    id: 1,
    equation: (active) => (
      <span className="inline-flex items-center flex-wrap gap-x-1">
        <Glow active={active}>{I('V')}{S('L')}</Glow> <span>=</span>{' '}
        <Glow active={active}>{I('L')}</Glow> ·
        <Frac top={<>{I('di')}</>} bottom={<>{I('dt')}</>} />
      </span>
    ),
    explanation: 'Inductor voltage-current relationship',
    detail:
      'The voltage across an inductor is proportional to the rate of change of current through it. This fundamental law governs how current ripple develops in the switching converter.',
  },
  {
    id: 2,
    equation: (active) => (
      <span className="inline-flex items-center flex-wrap gap-x-1">
        Δ{I('i')}{S(<>L{S('1')}</>)} <span>=</span>
        <Frac
          top={<>{I('V')}{S('dc')}</>}
          bottom={
            <>
              4 · <Glow active={active}>{I('f')}{S('sw')}</Glow> ·{' '}
              <Glow active={active}>{I('L')}{S('1')}</Glow>
            </>
          }
        />
      </span>
    ),
    explanation: 'Ripple in the first inductor',
    detail:
      'During each switching period, the DC bus voltage drives a triangular current ripple through the inverter-side inductor. Higher switching frequency or larger inductance reduces this ripple.',
  },
  {
    id: 3,
    equation: (active) => (
      <span className="inline-flex items-center flex-wrap gap-x-1">
        Δ{I('i')}{S(<>L{S('2')}</>)} <span>≈</span>
        <Frac
          top={
            <>
              Δ{I('i')}
              <Glow active={active}>{S(<>L{S('1')}</>)}</Glow>
            </>
          }
          bottom={
            <>
              {I('ω')}{P('2')} · <Glow active={active}>{I('L')}{S('2')}</Glow> ·{' '}
              <Glow active={active}>{I('C')}</Glow>
            </>
          }
        />
      </span>
    ),
    explanation: 'LCL filter attenuation',
    detail:
      'The LCL filter provides a steep third-order roll-off. The capacitor and grid-side inductor form an impedance divider that dramatically attenuates the switching-frequency ripple reaching the output.',
  },
  {
    id: 4,
    equation: (active) => (
      <span className="inline-flex items-center flex-wrap gap-x-1">
        Δ{I('V')}{S('out')} <span>≈</span>
        <Frac
          top={<>{I('V')}{S('dc')} · {I('R')}</>}
          bottom={
            <>
              16{I('π')}{P('2')} ·{' '}
              <Glow active={active}>{I('f')}{S('sw')}{P('3')}</Glow> ·{' '}
              <Glow active={active}>{I('L')}{S('1')}</Glow> ·{' '}
              <Glow active={active}>{I('L')}{S('2')}</Glow> ·{' '}
              <Glow active={active}>{I('C')}</Glow>
            </>
          }
        />
      </span>
    ),
    explanation: 'Output voltage ripple',
    detail:
      'Combining the ripple chain, the final output voltage distortion depends inversely on the cube of switching frequency and the product of all filter elements — a powerful attenuation mechanism.',
  },
  {
    id: 5,
    equation: (active) => (
      <span className="inline-flex items-center flex-wrap gap-x-2 gap-y-1">
        <span>Minimize THD</span>
        <span>⇒</span>
        <span>Maximize</span>
        <span className="inline-flex flex-wrap items-center gap-x-1.5">
          <Glow active={active} color="amber">
            {I('f')}
            {S('sw')}
            {P('3')}
          </Glow>
          <span>·</span>
          <Glow active={active} color="amber">
            {I('L')}
            {S('1')}
          </Glow>
          <span>·</span>
          <Glow active={active} color="amber">
            {I('L')}
            {S('2')}
          </Glow>
          <span>·</span>
          <Glow active={active} color="amber">
            {I('C')}
          </Glow>
        </span>
      </span>
    ),
    explanation: 'Design objective',
    detail:
      'To achieve the lowest total harmonic distortion, the designer must maximize the product of switching frequency cubed and the LCL component values, balanced against cost, size, and losses.',
    highlight: true,
  },
]

/* ── progress dots ── */
function ProgressBar({ activeStep, total }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1
        const isActive = step === activeStep
        const isPast = step < activeStep
        return (
          <div key={step} className="flex items-center gap-2">
            <motion.div
              animate={
                isActive
                  ? { scale: [1, 1.15, 1] }
                  : { scale: 1 }
              }
              transition={
                isActive
                  ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.3 }
              }
              className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-500 ${
                isActive
                  ? 'border-blue-400 bg-blue-500/20 text-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.35)]'
                  : isPast
                    ? 'border-blue-500/30 bg-blue-500/10 text-blue-400/60'
                    : 'border-slate-700 bg-slate-800/50 text-slate-500'
              }`}
            >
              {step}
            </motion.div>
            {step < total && (
              <div
                className={`h-px w-6 transition-colors duration-500 ${
                  isPast ? 'bg-blue-500/40' : 'bg-slate-700'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── single equation card ── */
function EquationStep({ step, index, isActive, isPast, total }) {
  const isHighlight = step.highlight && isActive
  const isLast = step.id === total

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{
        opacity: isPast || isActive ? 1 : 0.25,
        y: isPast || isActive ? 0 : 28,
      }}
      transition={{
        duration: 0.7,
        delay: isActive ? index * 0.04 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <div
        className={`relative rounded-xl border px-6 transition-all duration-500 ${
          isHighlight
            ? 'border-amber-400/50 bg-amber-500/[0.08] py-7 shadow-[0_0_40px_rgba(251,191,36,0.12),0_0_80px_rgba(251,191,36,0.05)]'
            : isActive
              ? 'border-blue-400/30 bg-blue-500/[0.06] py-5 shadow-[0_0_30px_rgba(96,165,250,0.1)]'
              : isPast
                ? 'border-slate-700/50 bg-slate-800/30 py-5'
                : 'border-slate-800/30 bg-slate-900/10 py-5'
        }`}
      >
        <div className="mb-3 flex items-center gap-3">
          <span
            className={`inline-flex items-center justify-center rounded-full text-[11px] font-bold transition-all duration-500 ${
              isHighlight
                ? 'h-7 w-7 bg-amber-500/25 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                : isActive
                  ? 'h-6 w-6 bg-blue-500/20 text-blue-300'
                  : 'h-6 w-6 bg-slate-700/50 text-slate-500'
            }`}
          >
            {step.id}
          </span>
          <span
            className={`font-semibold tracking-wide transition-all duration-500 ${
              isHighlight
                ? 'text-sm text-amber-200'
                : isActive
                  ? 'text-sm text-blue-200'
                  : isPast
                    ? 'text-xs text-slate-400'
                    : 'text-xs text-slate-600'
            }`}
          >
            {step.explanation}
          </span>
        </div>

        <div
          className={`font-mono leading-relaxed tracking-wide transition-all duration-500 ${
            isHighlight
              ? 'text-xl text-amber-100 sm:text-2xl'
              : isActive
                ? 'text-lg text-slate-100 sm:text-xl'
                : isPast
                  ? 'text-base text-slate-400/60 sm:text-lg'
                  : 'text-base text-slate-600/40 sm:text-lg'
          }`}
        >
          {step.equation(isActive)}
        </div>

        {isHighlight && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300/70"
          >
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400"
            />
            Core design result
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

/* ── vertical flow line ── */
function FlowLine({ activeStep, total }) {
  const progress = ((activeStep - 1) / (total - 1)) * 100

  return (
    <div className="absolute left-6 top-0 bottom-0 w-px">
      <div className="h-full w-full bg-slate-800/60" />
      <motion.div
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500/60 to-blue-400/20"
        animate={{ height: `${progress}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.6)]"
        animate={{ top: `${progress}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

/* ── left explanation panel ── */
function ExplanationPanel({ activeStep }) {
  const step = STEPS[activeStep - 1]
  if (!step) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-6"
      >
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-300/60">
            Step {step.id} of {STEPS.length}
          </p>
          <h3
            className={`font-heading text-2xl font-bold leading-snug lg:text-3xl ${
              step.highlight ? 'text-amber-200' : 'text-slate-100'
            }`}
          >
            {step.explanation}
          </h3>
        </div>

        <p className="max-w-md text-base leading-relaxed text-slate-300/80 lg:text-lg">
          {step.detail}
        </p>

        <div
          className={`mt-2 rounded-lg border px-5 py-4 font-mono text-base tracking-wide lg:text-lg ${
            step.highlight
              ? 'border-amber-500/25 bg-amber-500/[0.06] text-amber-100'
              : 'border-blue-500/20 bg-blue-500/[0.05] text-blue-100'
          }`}
        >
          {step.equation(true)}
        </div>

        {step.highlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex items-center gap-2 text-sm font-medium text-amber-300/80"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block h-2 w-2 rounded-full bg-amber-400"
            />
            Key design insight
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

/* ── main section ── */
export default function DerivationSection() {
  const containerRef = useRef(null)
  const [currentStep, setCurrentStep] = useState(1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const rawStep = useTransform(scrollYProgress, [0, 1], [1, STEPS.length], {
    clamp: true,
  })

  useMotionValueEvent(rawStep, 'change', (v) => {
    const rounded = Math.max(1, Math.min(STEPS.length, Math.round(v)))
    setCurrentStep(rounded)
  })

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-[#111827] via-background to-background"
      style={{ height: `${(STEPS.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 flex min-h-screen flex-col">
        <div className="px-6 pt-16 pb-8 md:px-10">
          <div className="mx-auto max-w-7xl">
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
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-12 px-6 pb-16 md:px-10 lg:flex-row lg:gap-16">
          {/* LEFT — explanation */}
          <div className="flex flex-col justify-center lg:w-5/12">
            <ExplanationPanel activeStep={currentStep} />
            <div className="mt-10">
              <ProgressBar activeStep={currentStep} total={STEPS.length} />
            </div>
          </div>

          {/* RIGHT — equation stack with flow line */}
          <div className="relative flex flex-col justify-center lg:w-7/12">
            <div className="relative pl-10">
              <FlowLine activeStep={currentStep} total={STEPS.length} />
              <div className="flex flex-col gap-4">
                {STEPS.map((s, i) => (
                  <EquationStep
                    key={s.id}
                    step={s}
                    index={i}
                    isActive={s.id === currentStep}
                    isPast={s.id < currentStep}
                    total={STEPS.length}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
