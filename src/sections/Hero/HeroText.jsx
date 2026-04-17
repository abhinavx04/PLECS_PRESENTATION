import { motion } from 'framer-motion'
import Button from '@/components/ui/button'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.08 } },
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
}

export default function HeroText() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex max-w-2xl flex-col gap-7 lg:gap-8"
    >
      <motion.p
        variants={fade}
        className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-300/95"
      >
        Power Electronics &middot; LCL Filter Design
      </motion.p>

      <motion.h1
        variants={fade}
        className="font-heading text-4xl font-extrabold leading-[1.05] text-[#F9FAFB] sm:text-5xl lg:text-6xl xl:text-7xl"
      >
        Designing a Low-THD Inverter Using LCL&nbsp;Filters
      </motion.h1>

      <motion.p
        variants={fade}
        className="font-heading text-lg font-semibold text-blue-300 sm:text-xl"
      >
        Transforming switching ripple into a clean sinusoidal output
      </motion.p>

      <motion.p
        variants={fade}
        className="max-w-xl text-base leading-relaxed text-slate-300/90 sm:text-lg"
      >
        High-frequency PWM switching introduces harmonic distortion that degrades
        power quality. An LCL filter attenuates these harmonics with a steep
        roll-off, achieving ultra-low THD while keeping the filter compact and
        efficient.
      </motion.p>

      <motion.div variants={fade} className="pt-3">
        <Button>Explore the Design &rarr;</Button>
      </motion.div>
    </motion.div>
  )
}
