import { motion } from 'framer-motion'
import ImageModal from '@/components/ui/ImageModal'

export default function SpecificationsSection() {
  return (
    <section
      className="relative min-h-screen snap-start overflow-hidden bg-gradient-to-b from-background via-background to-[#111827] py-12 md:py-16"
      data-section="simulation"
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
            Simulation Results
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
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Thermal analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="flex flex-col"
          >
            <ImageModal
              src="/thermal-analysis.png"
              alt="Thermal analysis showing IGBT and diode temperatures and losses"
              className="w-full rounded-lg shadow-lg shadow-black/20"
            />
            <p className="mt-2 text-center text-xs font-medium tracking-wide text-slate-500">
              Fig.&thinsp;2 &mdash; IGBT &amp; Diode junction temps and losses (click to zoom)
            </p>
          </motion.div>

          {/* Right: Output waveforms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col"
          >
            <ImageModal
              src="/output-waveforms.png"
              alt="Output voltage, current, and power waveforms"
              className="w-full rounded-lg shadow-lg shadow-black/20"
            />
            <p className="mt-2 text-center text-xs font-medium tracking-wide text-slate-500">
              Fig.&thinsp;3 &mdash; Output voltage, current &amp; power (click to zoom)
            </p>
          </motion.div>
        </div>

        {/* Summary text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="mt-6 flex justify-center"
        >
          <p className="max-w-2xl text-center text-sm text-slate-400">
            Clean sinusoidal output after LCL filtering. Junction temperatures remain within safe operating limits.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
