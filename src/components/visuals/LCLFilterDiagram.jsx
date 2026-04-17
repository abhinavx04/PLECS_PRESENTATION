import { motion } from 'framer-motion'

const stages = [
  {
    label: 'L₁',
    desc: 'Reduces current ripple',
    color: 'from-red-500/20 to-red-500/5',
    border: 'border-red-500/40',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.18)]',
    text: 'text-red-400',
  },
  {
    label: 'C',
    desc: 'Smooths voltage',
    color: 'from-purple-500/20 to-purple-500/5',
    border: 'border-purple-500/40',
    glow: 'shadow-[0_0_26px_rgba(168,85,247,0.28)]',
    text: 'text-purple-400',
  },
  {
    label: 'L₂',
    desc: 'Final filtering stage',
    color: 'from-blue-500/20 to-blue-500/5',
    border: 'border-blue-500/40',
    glow: 'shadow-[0_0_34px_rgba(59,130,246,0.42)]',
    text: 'text-blue-400',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function Arrow() {
  return (
    <svg width="28" height="14" viewBox="0 0 28 14" className="shrink-0 text-slate-500">
      <path
        d="M0 7h22m0 0l-5-5m5 5l-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function LCLFilterDiagram() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex items-center justify-center gap-2 sm:gap-3"
    >
      <div className="pointer-events-none absolute left-[11%] right-[11%] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-red-500/45 via-purple-500/40 to-blue-400/50 sm:block" />
      {[0, 0.9, 1.8].map((delay, i) => (
        <motion.div
          key={`flow-dot-${i}`}
          className="pointer-events-none absolute top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-300/85 shadow-[0_0_14px_rgba(96,165,250,0.75)] sm:block"
          initial={{ left: '11%', opacity: 0 }}
          animate={{ left: ['11%', '88%'], opacity: [0, 0.9, 0] }}
          transition={{
            duration: 2.8,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {stages.map((stage, i) => (
        <div key={stage.label} className="relative z-10 flex items-center gap-2 sm:gap-3">
          <motion.div
            variants={itemVariants}
            className={`
              flex flex-col items-center justify-center
              rounded-xl border bg-gradient-to-b
              px-4 py-3 sm:px-6 sm:py-4
              shadow-lg backdrop-blur-sm
              ${stage.color} ${stage.border} ${stage.glow}
            `}
          >
            <span className={`font-heading text-lg font-bold sm:text-xl ${stage.text}`}>
              {stage.label}
            </span>
            <span className="mt-1 max-w-[90px] text-center text-[10px] leading-tight text-slate-400 sm:text-xs">
              {stage.desc}
            </span>
          </motion.div>
          {i < stages.length - 1 && <Arrow />}
        </div>
      ))}
    </motion.div>
  )
}
