import { motion } from 'framer-motion'

export default function Button({ children, onClick, className = '' }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'tween', duration: 0.32, ease: 'easeInOut' }}
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 rounded-xl
        bg-blue-600 px-8 py-3.5
        font-heading text-sm font-semibold tracking-[0.03em] text-white
        shadow-[0_12px_35px_-12px_rgba(59,130,246,0.58)]
        transition-all duration-300 ease-in-out
        hover:bg-blue-500 hover:shadow-[0_18px_40px_-14px_rgba(59,130,246,0.72)]
        focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-background
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}
