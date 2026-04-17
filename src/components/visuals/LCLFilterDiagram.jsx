import { motion } from 'framer-motion'

const stages = [
  {
    label: 'L₁',
    desc: 'Reduces current ripple',
    color: 'from-red-500/20 to-red-500/5',
    border: 'border-red-500/40',
    glow: 'shadow-red-500/20',
    text: 'text-red-400',
  },
  {
    label: 'C',
    desc: 'Smooths voltage',
    color: 'from-purple-500/20 to-purple-500/5',
    border: 'border-purple-500/40',
    glow: 'shadow-purple-500/20',
    text: 'text-purple-400',
  },
  {
    label: 'L₂',
    desc: 'Final filtering stage',
    color: 'from-blue-500/20 to-blue-500/5',
    border: 'border-blue-500/40',
    glow: 'shadow-blue-500/20',
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
      className="flex items-center justify-center gap-2 sm:gap-3"
    >
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex items-center gap-2 sm:gap-3">
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
