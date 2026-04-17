import { motion } from 'framer-motion'

function Hero() {
  return (
    <section className="flex min-h-[60vh] items-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-3xl space-y-4"
      >
        <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
          Presentation PLECS
        </p>
        <h1 className="font-heading text-4xl font-semibold leading-tight text-slate-100 md:text-6xl">
          Hero Section Placeholder
        </h1>
        <p className="max-w-2xl text-base text-slate-300 md:text-lg">
          This starter layout is clean and ready for scalable section-based growth,
          animations, and data visualization components.
        </p>
      </motion.div>
    </section>
  )
}

export default Hero
