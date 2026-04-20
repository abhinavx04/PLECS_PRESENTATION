import { motion } from 'framer-motion'
import ImageModal from '@/components/ui/ImageModal'

const THERMAL_STATS = [
  {
    label: 'IGBT T_j (max)',
    value: '99.99',
    unit: '°C',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    note: '< 100°C limit',
  },
  {
    label: 'Diode T_j (max)',
    value: '68.13',
    unit: '°C',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
  },
  {
    label: 'Total Switch Loss',
    value: '54.406',
    unit: 'W',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
  },
]

const OUTPUT_STATS = [
  {
    label: 'V_out (rms)',
    value: '110.029',
    unit: 'V',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    label: 'THD',
    value: '4.24e-5',
    unit: '%',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
  {
    label: 'P_out',
    value: '3026.6',
    unit: 'W',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
]

export default function ProposedResultsSection() {
  return (
    <section
      className="relative min-h-screen snap-start overflow-hidden bg-gradient-to-b from-[#111827] via-background to-background py-12 md:py-16"
      data-section="proposed-results"
    >
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-300/70"
          >
            Section 05 — Proposed Design Results
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
            className="font-heading text-2xl font-bold text-slate-100 sm:text-3xl lg:text-4xl"
          >
            Thermal Analysis &amp; Output Waveforms
          </motion.h2>
        </div>

        {/* Two graphs side by side */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Thermal analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="flex flex-col"
          >
            <div className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-white/95 shadow-2xl shadow-blue-500/5">
              <ImageModal
                src="/proposed-thermal.png"
                alt="Proposed design thermal analysis - IGBT and diode junction temperatures and losses"
                className="w-full"
              />
            </div>
            <p className="mt-2 text-center text-xs font-medium tracking-wide text-slate-500">
              Fig.&thinsp;5 &mdash; IGBT &amp; Diode junction temps and losses (click to zoom)
            </p>

            {/* Key figures - Thermal */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {THERMAL_STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className={`relative overflow-hidden rounded-lg border ${stat.borderColor} ${stat.bgColor} p-3 text-center`}
                >
                  {/* Animated glow */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className={`absolute inset-0 ${stat.bgColor} blur-xl`}
                  />
                  
                  <div className="relative">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      {stat.label}
                    </p>
                    <p className={`mt-1 text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                      <span className="ml-1 text-sm font-normal text-slate-400">{stat.unit}</span>
                    </p>
                    {stat.note && (
                      <p className="mt-0.5 text-[9px] text-green-400">{stat.note}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Output waveforms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col"
          >
            <div className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-white/95 shadow-2xl shadow-blue-500/5">
              <ImageModal
                src="/proposed-waveforms.png"
                alt="Proposed design output waveforms - voltage, current, and power"
                className="w-full"
              />
            </div>
            <p className="mt-2 text-center text-xs font-medium tracking-wide text-slate-500">
              Fig.&thinsp;6 &mdash; Output voltage, current &amp; power (click to zoom)
            </p>

            {/* Key figures - Output */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {OUTPUT_STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className={`relative overflow-hidden rounded-lg border ${stat.borderColor} ${stat.bgColor} p-3 text-center`}
                >
                  {/* Animated glow */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className={`absolute inset-0 ${stat.bgColor} blur-xl`}
                  />
                  
                  <div className="relative">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      {stat.label}
                    </p>
                    <p className={`mt-1 text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                      <span className="ml-1 text-sm font-normal text-slate-400">{stat.unit}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* THD Highlight - The star metric */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="mt-8 flex justify-center"
        >
          <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/40 bg-gradient-to-r from-green-500/10 via-green-500/5 to-green-500/10 px-8 py-5">
            {/* Animated background pulse */}
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-green-500/10 blur-2xl"
            />
            
            <div className="relative flex items-center gap-6">
              {/* Icon */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 ring-2 ring-green-400/30"
              >
                <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              
              {/* Text */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-green-300">
                  Key Achievement
                </p>
                <p className="mt-1 text-3xl font-black text-green-400">
                  THD: 4.24×10<sup>-5</sup>%
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Efficiency: <span className="font-bold text-blue-400">98.23%</span> • 
                  f<sub>sw</sub>: <span className="font-bold text-cyan-400">8649 Hz</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
