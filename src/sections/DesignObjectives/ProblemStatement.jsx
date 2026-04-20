import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function ProblemStatement() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative flex h-screen min-h-screen snap-start items-center overflow-hidden bg-gradient-to-b from-[#111827] via-background to-background"
      data-section="problem"
    >
      {/* Radial glow from top */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.12),transparent)]" />
      
      {/* Ambient glow */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute right-[10%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -15, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute right-[20%] top-[30%] h-[300px] w-[300px] rounded-full bg-cyan-500/8 blur-[100px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Text content */}
          <div className="flex flex-col gap-5">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="font-heading text-4xl font-extrabold leading-[1.1] text-[#F9FAFB] sm:text-5xl lg:text-6xl"
            >
              Not All Power
              <br />
              Is Equal
            </motion.h2>

            <div className="flex flex-col gap-4 pt-2">
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                className="text-lg text-slate-300/90 sm:text-xl"
              >
                In precision systems, tiny distortions matter.
              </motion.p>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
                className="text-lg text-slate-300/90 sm:text-xl"
              >
                Harmonic components introduce instability.
              </motion.p>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.35 }}
                className="text-lg text-slate-200 brightness-110 sm:text-xl"
              >
                Signal quality directly affects system behavior.
              </motion.p>
            </div>
          </div>

          {/* Right: Abstract visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            {/* Abstract visualization - concentric rings with distortion effect */}
            <div className="relative h-80 w-80 lg:h-96 lg:w-96">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.3 - i * 0.04, 0.4 - i * 0.04, 0.3 - i * 0.04],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  }}
                  className="absolute inset-0 rounded-full border border-blue-400/20"
                  style={{
                    transform: `scale(${1 - i * 0.15})`,
                    top: `${i * 7.5}%`,
                    left: `${i * 7.5}%`,
                    right: `${i * 7.5}%`,
                    bottom: `${i * 7.5}%`,
                  }}
                />
              ))}
              {/* Center glow */}
              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_60px_20px_rgba(59,130,246,0.4)]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
