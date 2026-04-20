import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function NoisyWaveform({ className }) {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    let animationId
    let time = 0
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Create gradient for the line
      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, '#ef4444')
      gradient.addColorStop(0.5, '#f97316')
      gradient.addColorStop(1, '#ef4444')
      
      ctx.beginPath()
      ctx.strokeStyle = gradient
      ctx.lineWidth = 2.5
      ctx.shadowColor = '#ef4444'
      ctx.shadowBlur = 10
      
      for (let x = 0; x <= width; x++) {
        const baseY = Math.sin((x / width) * Math.PI * 4 + time * 0.03) * (height * 0.3)
        // Add noise/jitter
        const noise = (Math.random() - 0.5) * 15 + 
                      Math.sin(x * 0.3 + time * 0.1) * 8 +
                      Math.sin(x * 0.7 + time * 0.05) * 5
        const y = height / 2 + baseY + noise
        
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      
      ctx.stroke()
      time++
      animationId = requestAnimationFrame(draw)
    }
    
    draw()
    
    return () => cancelAnimationFrame(animationId)
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={150}
      className={className}
    />
  )
}

function CleanWaveform({ className }) {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    let animationId
    let time = 0
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Create gradient for the line
      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, '#3b82f6')
      gradient.addColorStop(0.5, '#38bdf8')
      gradient.addColorStop(1, '#3b82f6')
      
      ctx.beginPath()
      ctx.strokeStyle = gradient
      ctx.lineWidth = 2.5
      ctx.shadowColor = '#3b82f6'
      ctx.shadowBlur = 15
      
      for (let x = 0; x <= width; x++) {
        const y = height / 2 + Math.sin((x / width) * Math.PI * 4 + time * 0.02) * (height * 0.3)
        
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      
      ctx.stroke()
      time++
      animationId = requestAnimationFrame(draw)
    }
    
    draw()
    
    return () => cancelAnimationFrame(animationId)
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={150}
      className={className}
    />
  )
}

export default function RippleImpact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background gradients */}
      <div className="pointer-events-none absolute left-[5%] top-1/3 h-[400px] w-[400px] rounded-full bg-red-500/5 blur-[100px]" />
      <div className="pointer-events-none absolute right-[5%] top-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/8 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center gap-16">
          {/* Waveform comparison */}
          <div className="grid w-full gap-8 md:grid-cols-2 lg:gap-16">
            {/* High THD - Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/20 to-transparent p-6 backdrop-blur-sm">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent" />
                <NoisyWaveform className="relative z-10" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center gap-1"
              >
                <span className="font-heading text-xl font-bold text-red-400">High THD</span>
                <span className="text-sm text-slate-400">Distorted Signal</span>
              </motion.div>
            </motion.div>

            {/* Center arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-3xl text-slate-400"
                >
                  →
                </motion.div>
              </div>
            </motion.div>

            {/* Low THD - Right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/20 to-transparent p-6 backdrop-blur-sm">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent" />
                <CleanWaveform className="relative z-10" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col items-center gap-1"
              >
                <span className="font-heading text-xl font-bold text-blue-400">Low THD</span>
                <span className="text-sm text-slate-400">Clean Signal</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Caption */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl text-center text-lg text-slate-300/90 sm:text-xl"
          >
            Voltage ripple introduces instability in precision systems
          </motion.p>
        </div>
      </div>
    </section>
  )
}
