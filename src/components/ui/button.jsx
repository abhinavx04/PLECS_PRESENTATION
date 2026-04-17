import { motion } from 'framer-motion'

export default function Button({ children, onClick, className = '' }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 rounded-xl border border-blue-300/20
        bg-blue-600 px-8 py-3.5
        font-heading text-sm font-semibold tracking-[0.03em] text-white
        shadow-[0_10px_28px_-10px_rgba(59,130,246,0.55)]
        transition-all duration-300 ease-in-out
        hover:bg-blue-500 hover:shadow-[0_18px_44px_-10px_rgba(59,130,246,0.78),0_0_22px_rgba(59,130,246,0.42)]
        focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-background
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}
