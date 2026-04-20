import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const cards = [
  {
    id: 'thd',
    title: 'THD',
    label: 'Critical',
    indicator: '↓↓↓',
    isPrimary: true,
    description: 'Total Harmonic Distortion',
  },
  {
    id: 'efficiency',
    title: 'Efficiency',
    label: 'Secondary',
    indicator: '↓',
    isPrimary: false,
    description: 'Power Conversion Efficiency',
  },
  {
    id: 'temperature',
    title: 'Temperature',
    label: 'Constraint',
    indicator: '↑',
    isPrimary: false,
    description: 'Thermal Management',
  },
]

function PriorityCard({ card, index, isInView }) {
  const baseDelay = 0.2 + index * 0.15

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: card.isPrimary ? 1.05 : 1 }
          : { opacity: 0, y: 40, scale: 0.9 }
      }
      transition={{ duration: 0.7, ease: 'easeOut', delay: baseDelay }}
      className={`relative flex flex-col items-center gap-4 rounded-2xl border p-6 backdrop-blur-md sm:p-8 ${
        card.isPrimary
          ? 'border-blue-400/40 bg-blue-950/30 shadow-[0_0_40px_rgba(59,130,246,0.2)]'
          : 'border-slate-600/30 bg-slate-900/30'
      }`}
    >
      {/* Glow effect for primary card */}
      {card.isPrimary && (
        <>
          <motion.div
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/20 via-cyan-500/30 to-blue-500/20"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent" />
        </>
      )}

      {/* Label badge */}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, delay: baseDelay + 0.2 }}
        className={`relative z-10 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
          card.isPrimary
            ? 'bg-blue-500/20 text-blue-300'
            : 'bg-slate-700/50 text-slate-400'
        }`}
      >
        {card.label}
      </motion.span>

      {/* Title */}
      <h3
        className={`relative z-10 font-heading text-2xl font-bold sm:text-3xl ${
          card.isPrimary ? 'text-blue-200' : 'text-slate-300'
        }`}
      >
        {card.title}
      </h3>

      {/* Indicator */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: baseDelay + 0.3 }}
        className={`relative z-10 text-3xl font-bold ${
          card.isPrimary ? 'text-blue-400' : 'text-slate-500'
        }`}
      >
        {card.indicator}
      </motion.span>

      {/* Description */}
      <p className="relative z-10 text-center text-sm text-slate-400">
        {card.description}
      </p>

      {/* Pulse animation for primary card */}
      {card.isPrimary && (
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-2xl border border-blue-400/20"
        />
      )}
    </motion.div>
  )
}

export default function DesignDecision() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/8 blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-300/80">
              Design Priorities
            </p>
            <h2 className="font-heading text-3xl font-extrabold text-[#F9FAFB] sm:text-4xl lg:text-5xl">
              What Matters Most
            </h2>
          </motion.div>

          {/* Cards grid */}
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {cards.map((card, index) => (
              <PriorityCard key={card.id} card={card} index={index} isInView={isInView} />
            ))}
          </div>

          {/* Caption */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl text-center text-lg text-slate-300/90"
          >
            In precision systems, signal quality is prioritized over efficiency.
          </motion.p>

          {/* Transition text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 flex flex-col items-center gap-4 pt-8"
          >
            <p className="font-heading text-base font-medium text-slate-400 sm:text-lg">
              Now, let's examine a conventional inverter design.
            </p>
            
            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-blue-400/70"
            >
              <span className="text-2xl">↓</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
