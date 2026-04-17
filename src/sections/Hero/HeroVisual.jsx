import { motion } from 'framer-motion'
import WaveformAnimation from '@/components/visuals/WaveformAnimation'
import LCLFilterDiagram from '@/components/visuals/LCLFilterDiagram'

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: 'easeInOut' }}
      className="flex flex-col items-center gap-7 lg:gap-8"
    >
      <div className="w-full rounded-3xl border border-white/[0.08] bg-white/[0.04] p-5 shadow-[0_20px_55px_-28px_rgba(0,0,0,0.75)] backdrop-blur-md sm:p-7">
        <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Signal Flow &mdash; PWM to Pure Sine
        </p>
        <WaveformAnimation />
      </div>

      <div className="w-full rounded-3xl border border-white/[0.08] bg-white/[0.04] p-5 shadow-[0_20px_55px_-28px_rgba(0,0,0,0.75)] backdrop-blur-md sm:p-7">
        <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          LCL Filter Topology
        </p>
        <LCLFilterDiagram />
      </div>
    </motion.div>
  )
}
