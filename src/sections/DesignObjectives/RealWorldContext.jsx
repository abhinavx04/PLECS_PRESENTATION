import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function RealWorldContext() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-[10%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-500/8 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Text content */}
          <div className="flex flex-col gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="font-heading text-3xl font-extrabold leading-[1.1] text-[#F9FAFB] sm:text-4xl lg:text-5xl"
            >
              Precision at
              <br />
              Nanometer Scale
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              className="max-w-lg text-base leading-relaxed text-slate-300/90 sm:text-lg"
            >
              Wafer positioning systems require extremely stable input power.
              Even small harmonic distortions translate into mechanical
              positioning errors.
            </motion.p>

            {/* Glassmorphism highlight box */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              className="relative mt-4 max-w-md overflow-hidden rounded-xl border border-blue-400/20 bg-blue-950/20 p-5 backdrop-blur-md"
            >
              {/* Glow border effect */}
              <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-blue-500/20" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent" />
              
              <p className="relative z-10 font-heading text-base font-semibold text-blue-200 sm:text-lg">
                Ultra-Precision Motion = High-Fidelity Input Power
              </p>
            </motion.div>
          </div>

          {/* Right: EUV/Wafer stage visual representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Abstract EUV representation */}
              <div className="relative h-72 w-72 lg:h-96 lg:w-96">
                {/* Outer ring - wafer stage */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 shadow-[0_0_60px_rgba(59,130,246,0.15)]" />
                
                {/* Grid pattern - wafer surface */}
                <div className="absolute inset-4 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                </div>
                
                {/* Center element - laser/light source */}
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px 5px rgba(59,130,246,0.4)',
                      '0 0 40px 10px rgba(59,130,246,0.6)',
                      '0 0 20px 5px rgba(59,130,246,0.4)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400"
                />
                
                {/* Precision markers */}
                {[0, 90, 180, 270].map((angle) => (
                  <div
                    key={angle}
                    className="absolute left-1/2 top-1/2 h-1 w-8 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
                    style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                  />
                ))}
                
                {/* Nanometer scale indicator */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs font-medium text-slate-400">Nanometer Precision</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
