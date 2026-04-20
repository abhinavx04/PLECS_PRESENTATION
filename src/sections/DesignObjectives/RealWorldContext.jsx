import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function RealWorldContext() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative flex h-screen min-h-screen snap-start items-center overflow-hidden bg-gradient-to-b from-[#111827] via-background to-background"
      data-section="real-world"
    >
      {/* Radial glow from top */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.1),transparent)]" />
      
      {/* Video Background - Right 65% */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[65%] overflow-hidden">
        {/* Video element - full opacity, object-contain to prevent cropping */}
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.video
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-contain"
          >
            <source src="/EUV/Video Project.mp4" type="video/mp4" />
          </motion.video>
        </motion.div>
        
        {/* Hard gradient mask - left edge fades into background */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 via-[15%] to-transparent to-[30%]" />
        
        {/* Top and bottom edge fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent via-[10%] to-transparent to-[90%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent via-[10%] to-transparent to-[90%]" />
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-[5%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-500/8 blur-[120px]" />

      <div className="relative z-10 w-full max-w-7xl pl-6 pr-6 py-20 md:pl-10 lg:pl-16">
        <div className="max-w-md">
          {/* Left: Text content */}
          <div className="flex flex-col gap-5">
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

            <div className="flex flex-col gap-4 pt-2">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                className="text-base text-slate-300/90 sm:text-lg"
              >
                Even micro-level electrical noise creates real errors.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.22 }}
                className="text-base text-slate-300/90 sm:text-lg"
              >
                Mechanical systems follow electrical input.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.29 }}
                className="text-base text-slate-200 brightness-110 sm:text-lg"
              >
                Unstable power leads to positioning deviation.
              </motion.p>
            </div>

            {/* Glassmorphism highlight box */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              className="relative mt-2 max-w-md overflow-hidden rounded-xl border border-blue-400/20 bg-blue-950/20 p-5 backdrop-blur-md"
            >
              {/* Glow border effect */}
              <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-blue-500/20" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent" />
              
              <p className="relative z-10 font-heading text-base font-semibold text-blue-200 sm:text-lg">
                Low THD → Stable Motion → Accurate Positioning
              </p>
            </motion.div>

            {/* Supporting line */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.55 }}
              className="text-sm text-slate-400/90"
            >
              Electrical stability defines mechanical precision.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
