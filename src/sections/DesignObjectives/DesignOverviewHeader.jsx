import { motion } from 'framer-motion'

export default function DesignOverviewHeader() {
  return (
    <section
      className="relative flex h-screen min-h-screen snap-start flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#111827] via-background to-background"
      data-section="design-overview"
    >
      {/* Radial glow from top */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
      
      {/* Ambient glows */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[150px]"
      />
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute right-[20%] top-[30%] h-[300px] w-[300px] rounded-full bg-cyan-500/8 blur-[100px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center md:px-10">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/80"
        >
          Section 01
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="font-heading text-5xl font-extrabold leading-[1.1] text-[#F9FAFB] sm:text-6xl lg:text-7xl"
        >
          Design Overview
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300/90 sm:text-xl"
        >
          Understanding the critical requirements for ultra-precision power systems
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-blue-400/60"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-slate-400">Scroll to explore</span>
            <span className="text-2xl">↓</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
