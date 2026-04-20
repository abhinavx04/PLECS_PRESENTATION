import { motion } from 'framer-motion'
import ImageModal from '@/components/ui/ImageModal'

export default function ProposedCircuitSection() {
  return (
    <section
      className="relative min-h-screen snap-start overflow-hidden bg-gradient-to-b from-background via-[#0d1320] to-[#111827] py-12 md:py-16"
      data-section="proposed-circuit"
    >
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-300/70"
          >
            Section 04 — Implementation
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
            className="font-heading text-2xl font-bold text-slate-100 sm:text-3xl lg:text-4xl"
          >
            Proposed Circuit &amp; Specifications
          </motion.h2>
        </div>

        {/* Main content: Circuit + Specs side by side */}
        <div className="grid items-center gap-8 lg:grid-cols-3">
          {/* Left: Circuit diagram (takes 2/3) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-2"
          >
            <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-[#f5f5dc]/95 shadow-2xl shadow-blue-500/5">
              <ImageModal
                src="/proposed-circuit.png"
                alt="Proposed single-phase inverter circuit with optimized LCL filter"
                className="w-full"
              />
            </div>
            <p className="mt-3 text-center text-xs font-medium tracking-wide text-slate-500">
              Fig.&thinsp;4 &mdash; Proposed PWM inverter with optimized LCL filter (click to zoom)
            </p>
          </motion.div>

          {/* Right: Specifications table (takes 1/3) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-white/95 shadow-2xl shadow-blue-500/5">
              <ImageModal
                src="/proposed-specs.png"
                alt="Proposed design specifications table"
                className="max-h-[420px] w-auto"
              />
            </div>
            <p className="mt-3 text-center text-xs font-medium tracking-wide text-slate-500">
              Design Parameters (click to zoom)
            </p>
          </motion.div>
        </div>

        {/* Summary text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="mt-8 flex justify-center"
        >
          <div className="max-w-3xl rounded-xl border border-blue-500/20 bg-blue-500/5 px-6 py-4">
            <p className="text-center text-sm text-slate-300">
              <span className="font-semibold text-blue-300">Optimized switching frequency:</span>{' '}
              f<sub>s</sub> = 8649 Hz &mdash; maximizes THD reduction while maintaining junction temperature below 100°C
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
