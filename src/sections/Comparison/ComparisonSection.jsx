import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import ImageModal from '@/components/ui/ImageModal'

export default function ComparisonSection() {
  const containerRef = useRef(null)
  const chartRef = useRef(null)
  const isInView = useInView(chartRef, { once: false, amount: 0.3 })
  const [showTHDArrow, setShowTHDArrow] = useState(false)
  const [barsAnimated, setBarsAnimated] = useState(false)

  useEffect(() => {
    if (isInView) {
      setBarsAnimated(true)
      const timer = setTimeout(() => {
        setShowTHDArrow(true)
      }, 2500)
      return () => clearTimeout(timer)
    } else {
      setBarsAnimated(false)
      setShowTHDArrow(false)
    }
  }, [isInView])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen snap-start overflow-hidden bg-gradient-to-b from-background via-[#0a0f1a] to-[#111827] py-12 md:py-16"
      data-section="comparison"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.1),transparent)]" />
        <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-300/70"
          >
            Section 06 — Performance Comparison
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
            className="font-heading text-2xl font-bold text-slate-100 sm:text-3xl lg:text-4xl"
          >
            Conventional vs Proposed Design
          </motion.h2>
        </div>

        {/* Main content: Chart + Table */}
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* Left: Animated Chart */}
          <motion.div
            ref={chartRef}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 backdrop-blur-sm"
          >
            {/* Chart title */}
            <h3 className="mb-4 text-center text-lg font-semibold text-slate-200">
              Conventional vs Proposed
            </h3>

            {/* Chart container */}
            <div className="relative h-[350px] px-4">
              {/* Y-axis left (0-120 for Efficiency & Loss) */}
              <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between text-[10px] text-slate-500">
                <span>120</span>
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
                <span>0</span>
              </div>

              {/* Y-axis right (0-0.5 for THD) */}
              <div className="absolute right-0 top-0 bottom-10 flex flex-col justify-between text-[10px] text-slate-500">
                <span>0.5</span>
                <span>0.4</span>
                <span>0.3</span>
                <span>0.25</span>
                <span>0.2</span>
                <span>0.1</span>
                <span>0</span>
              </div>

              {/* Grid lines */}
              <div className="absolute left-8 right-8 top-0 bottom-10 flex flex-col justify-between">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-px bg-slate-700/40" />
                ))}
              </div>

              {/* Bars area */}
              <div className="absolute left-10 right-10 top-2 bottom-12 flex items-end justify-around">
                {/* Group 1: Efficiency */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative flex h-[250px] items-end gap-3">
                    {/* Conventional: 98.408% out of 120 = 82% height = 205px */}
                    <div className="relative">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={barsAnimated ? { height: 205 } : { height: 0 }}
                        transition={{ duration: 1.2, delay: 0, ease: [0.22, 1, 0.36, 1] }}
                        className="w-12 rounded-t-md bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 shadow-lg shadow-blue-500/40"
                      >
                        <motion.div
                          animate={{ opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-t-md bg-gradient-to-t from-transparent via-transparent to-white/30"
                        />
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={barsAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 1.3 }}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-300"
                      >
                        98.4%
                      </motion.span>
                    </div>
                    {/* Proposed: 98.234% out of 120 = 81.8% height = 204px */}
                    <div className="relative">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={barsAnimated ? { height: 204 } : { height: 0 }}
                        transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="w-12 rounded-t-md bg-gradient-to-t from-orange-600 via-orange-500 to-orange-400 shadow-lg shadow-orange-500/40"
                      >
                        <motion.div
                          animate={{ opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                          className="absolute inset-0 rounded-t-md bg-gradient-to-t from-transparent via-transparent to-white/30"
                        />
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={barsAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 1.45 }}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-orange-300"
                      >
                        98.2%
                      </motion.span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-400">Efficiency [%]</span>
                </div>

                {/* Group 2: Total Switch Loss */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative flex h-[250px] items-end gap-3">
                    {/* Conventional: 48.701W out of 120 = 40.6% height = 101px */}
                    <div className="relative">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={barsAnimated ? { height: 101 } : { height: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="w-12 rounded-t-md bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 shadow-lg shadow-blue-500/40"
                      >
                        <motion.div
                          animate={{ opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-t-md bg-gradient-to-t from-transparent via-transparent to-white/30"
                        />
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={barsAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 1.6 }}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-300"
                      >
                        48.7W
                      </motion.span>
                    </div>
                    {/* Proposed: 54.406W out of 120 = 45.3% height = 113px */}
                    <div className="relative">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={barsAnimated ? { height: 113 } : { height: 0 }}
                        transition={{ duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="w-12 rounded-t-md bg-gradient-to-t from-orange-600 via-orange-500 to-orange-400 shadow-lg shadow-orange-500/40"
                      >
                        <motion.div
                          animate={{ opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                          className="absolute inset-0 rounded-t-md bg-gradient-to-t from-transparent via-transparent to-white/30"
                        />
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={barsAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 1.75 }}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-orange-300"
                      >
                        54.4W
                      </motion.span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-400">Total Switch Loss [W]</span>
                </div>

                {/* Group 3: THD - uses RIGHT scale (0-0.5) */}
                <div className="relative flex flex-col items-center gap-2">
                  <div className="relative flex h-[250px] items-end gap-3">
                    {/* Conventional: 0.4576% out of 0.5 = 91.5% height = 228px */}
                    <div className="relative">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={barsAnimated ? { height: 228 } : { height: 0 }}
                        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="w-12 rounded-t-md bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 shadow-lg shadow-blue-500/40"
                      >
                        <motion.div
                          animate={{ opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-t-md bg-gradient-to-t from-transparent via-transparent to-white/30"
                        />
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={barsAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 1.9 }}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-300"
                      >
                        0.458%
                      </motion.span>
                    </div>
                    {/* Proposed: 4.24e-5 - essentially zero, show as tiny bar with glow */}
                    <div className="relative">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={barsAnimated ? { height: 4 } : { height: 0 }}
                        transition={{ duration: 1.2, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        className="w-12 rounded-t-md bg-gradient-to-t from-orange-600 to-orange-400"
                      />
                      {/* Pulsing glow to highlight the tiny bar */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={barsAnimated ? { 
                          opacity: [0.4, 0.8, 0.4], 
                          scale: [0.9, 1.1, 0.9] 
                        } : { opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
                        className="absolute -bottom-1 left-1/2 h-6 w-16 -translate-x-1/2 rounded-full bg-green-400/50 blur-md"
                      />
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={barsAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 2.05 }}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-green-400"
                      >
                        4.24e-5%
                      </motion.span>
                    </div>
                  </div>

                  {/* Animated arrow showing 99.99% reduction - positioned between the two THD bars */}
                  <AnimatePresence>
                    {showTHDArrow && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute left-1/2 top-2 -translate-x-1/2 flex flex-col items-center"
                      >
                        {/* Label */}
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="mb-1 text-base font-black text-red-500"
                        >
                          -99.99%
                        </motion.span>
                        
                        {/* Solid arrow shaft + head */}
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 180 }}
                          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                          className="relative w-3 overflow-hidden"
                        >
                          {/* Arrow shaft */}
                          <div className="absolute inset-x-0 top-0 bottom-4 bg-gradient-to-b from-red-500 to-red-600" />
                          
                          {/* Arrow head */}
                          <div 
                            className="absolute bottom-0 left-1/2 -translate-x-1/2"
                            style={{
                              width: 0,
                              height: 0,
                              borderLeft: '10px solid transparent',
                              borderRight: '10px solid transparent',
                              borderTop: '14px solid #dc2626',
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span className="text-xs font-medium text-slate-400">THD [%]</span>
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-6 rounded-sm bg-gradient-to-r from-blue-600 to-blue-400" />
                  <span className="text-xs text-slate-400">Conventional</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-6 rounded-sm bg-gradient-to-r from-orange-600 to-orange-400" />
                  <span className="text-xs text-slate-400">Proposed</span>
                </div>
              </div>
            </div>

            {/* Pulsing background glow */}
            <motion.div
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-green-500/5 blur-xl"
            />
          </motion.div>

          {/* Right: Performance Table Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 shadow-2xl shadow-blue-500/10">
              <ImageModal
                src="/comparison-table.png"
                alt="Performance comparison table - Conventional vs Proposed"
                className="w-full"
              />
            </div>
            <p className="mt-3 text-center text-xs font-medium tracking-wide text-slate-500">
              Performance Metrics Comparison (click to zoom)
            </p>

            {/* Key insight card - referencing the TABLE data */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 rounded-xl border-2 border-green-500/30 bg-green-500/10 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-4 w-4 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
                />
                <span className="text-sm font-bold uppercase tracking-wider text-green-300">
                  Key Achievement (from table)
                </span>
              </div>
              <p className="text-xl font-bold text-green-100">
                THD reduced by <span className="text-green-400">99.99%</span>
              </p>
              <p className="mt-2 text-sm text-green-200/70">
                Conventional: <span className="font-mono text-slate-300">0.4576%</span> → Proposed: <span className="font-mono text-green-300">4.24×10⁻⁵%</span>
              </p>
              <p className="mt-1 text-sm text-green-200/70">
                Efficiency maintained at <span className="font-mono text-slate-300">98.2%</span> (only 0.17% decrease)
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
