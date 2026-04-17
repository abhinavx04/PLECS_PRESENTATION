import { motion } from 'framer-motion'

export default function CircuitSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#111827] to-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue-300/70"
        >
          Conventional Topology
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 font-heading text-3xl font-bold text-slate-100 sm:text-4xl lg:text-5xl"
        >
          Inverter Circuit
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-xl text-base leading-relaxed text-slate-300/80 lg:text-lg"
        >
          The standard single-phase H-bridge inverter with an LCL output
          filter. This topology converts DC bus voltage into a sinusoidal AC
          output through high-frequency PWM switching.
        </motion.p>
      </div>

      <motion.img
        src="/conventional-circuit.png"
        alt="Conventional single-phase inverter circuit with LCL filter"
        draggable={false}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto block w-full max-w-6xl px-4"
      />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 text-center text-xs font-medium tracking-wide text-slate-500"
      >
        Fig.&thinsp;1 &mdash; Single-phase PWM inverter with LCL output filter
      </motion.p>
    </section>
  )
}
