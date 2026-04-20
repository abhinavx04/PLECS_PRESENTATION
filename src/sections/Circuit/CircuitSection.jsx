import { motion } from 'framer-motion'
import ImageModal from '@/components/ui/ImageModal'

export default function CircuitSection() {
  return (
    <section 
      className="relative min-h-screen snap-start overflow-hidden bg-gradient-to-b from-[#111827] to-background py-12 md:py-16"
      data-section="circuit"
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
            Conventional Topology
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
            className="font-heading text-2xl font-bold text-slate-100 sm:text-3xl lg:text-4xl"
          >
            Inverter Circuit &amp; Design Specifications
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
            <ImageModal
              src="/conventional-circuit.png"
              alt="Conventional single-phase inverter circuit with LCL filter"
              className="w-full rounded-lg"
            />
            <p className="mt-3 text-center text-xs font-medium tracking-wide text-slate-500">
              Fig.&thinsp;1 &mdash; Single-phase PWM inverter with LCL output filter (click to zoom)
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
            <ImageModal
              src="/specs-table.png"
              alt="Design specifications table"
              className="max-h-[400px] w-auto rounded-lg shadow-lg shadow-black/20"
            />
            <p className="mt-3 text-center text-xs font-medium tracking-wide text-slate-500">
              Design Parameters (click to zoom)
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
