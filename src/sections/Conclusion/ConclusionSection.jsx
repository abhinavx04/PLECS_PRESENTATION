import { motion } from 'framer-motion'

const CONCLUSIONS = [
  {
    id: 1,
    text: 'LCL filter-based single-phase inverter is designed for the stated EUV wafer-stage use case.',
  },
  {
    id: 2,
    text: 'Achieved 99.99% reduction in THD (0.4576% → 4.24×10⁻⁵%) through optimized filter parameters',
  },
  {
    id: 3,
    text: 'Recorded proposed-design metrics: efficiency 98.234%, IGBT Tj 99.99°C, and diode Tj 68.13°C.',
  },
  {
    id: 4,
    text: 'Design specifications used in simulation: fs = 8649 Hz, L1 = L2 = 4.13 mH, and C = 34.07 µF.',
  },
  {
    id: 5,
    text: 'Output metrics comparison: Vout 109.7 V → 110.029 V and Pout 3010.5 W → 3026.6 W.',
  },
  {
    id: 6,
    text: 'All numeric claims in this deck are taken from the displayed simulation plots, specs, and comparison table.',
  },
]

export default function ConclusionSection() {
  return (
    <section
      className="relative min-h-screen snap-start overflow-hidden bg-gradient-to-b from-[#111827] via-[#0a0f1a] to-[#050810] py-16 md:py-20"
      data-section="conclusion"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(59,130,246,0.08),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-300/70"
          >
            Section 07
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-3xl font-bold text-slate-100 sm:text-4xl lg:text-5xl"
          >
            Conclusion
          </motion.h2>
        </motion.div>

        {/* Conclusion points */}
        <div className="space-y-5">
          {CONCLUSIONS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: 'easeOut',
              }}
              className="group flex items-start gap-4"
            >
              {/* Bullet point */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.12 + 0.2,
                  type: 'spring',
                  stiffness: 300,
                }}
                className="mt-1.5 flex-shrink-0"
              >
                <div className="h-2.5 w-2.5 rounded-sm bg-blue-500 shadow-lg shadow-blue-500/50 transition-all duration-300 group-hover:scale-125 group-hover:shadow-blue-400/70" />
              </motion.div>

              {/* Text */}
              <p className="text-base leading-relaxed text-slate-300 transition-colors duration-300 group-hover:text-slate-100 sm:text-lg">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decorative bottom element */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-col items-center"
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mt-6 text-sm text-slate-500"
          >
            Thank you
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
