import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImageModal({ src, alt, className, ...props }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const MIN_SCALE = 0.5
  const MAX_SCALE = 4
  const SCALE_STEP = 0.25

  const handleOpen = () => {
    setIsOpen(true)
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleClose = () => {
    setIsOpen(false)
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const zoomIn = (e) => {
    e.stopPropagation()
    setScale((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE))
  }

  const zoomOut = (e) => {
    e.stopPropagation()
    setScale((prev) => Math.max(prev - SCALE_STEP, MIN_SCALE))
  }

  const resetZoom = (e) => {
    e.stopPropagation()
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const fitToScreen = (e) => {
    e.stopPropagation()
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          handleClose()
          break
        case '+':
        case '=':
          setScale((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE))
          break
        case '-':
          setScale((prev) => Math.max(prev - SCALE_STEP, MIN_SCALE))
          break
        case '0':
          setScale(1)
          setPosition({ x: 0, y: 0 })
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Handle mouse wheel zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP
    setScale((prev) => Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev + delta)))
  }, [])

  // Handle drag to pan
  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <>
      {/* Thumbnail image */}
      <img
        src={src}
        alt={alt}
        className={`cursor-pointer transition-all duration-200 hover:opacity-90 hover:shadow-xl ${className}`}
        onClick={handleOpen}
        draggable={false}
        {...props}
      />

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={handleClose}
            onWheel={handleWheel}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Controls bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="absolute top-4 left-1/2 z-[110] flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Zoom out */}
              <button
                onClick={zoomOut}
                disabled={scale <= MIN_SCALE}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-slate-700 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent"
                title="Zoom out (−)"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>

              {/* Zoom percentage */}
              <span className="min-w-[60px] text-center text-sm font-medium text-slate-300">
                {Math.round(scale * 100)}%
              </span>

              {/* Zoom in */}
              <button
                onClick={zoomIn}
                disabled={scale >= MAX_SCALE}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-slate-700 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent"
                title="Zoom in (+)"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>

              <div className="mx-2 h-6 w-px bg-slate-700" />

              {/* Reset zoom */}
              <button
                onClick={resetZoom}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                title="Reset (0)"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>

              <div className="mx-2 h-6 w-px bg-slate-700" />

              {/* Close */}
              <button
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-red-500/20 hover:text-red-400"
                title="Close (Esc)"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>

            {/* Image */}
            <motion.img
              src={src}
              alt={alt}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: scale,
                opacity: 1,
                x: position.x,
                y: position.y,
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ 
                scale: { duration: 0.15 },
                x: { duration: 0 },
                y: { duration: 0 },
                opacity: { duration: 0.2 },
              }}
              className={`max-h-[85vh] max-w-[90vw] select-none rounded-lg shadow-2xl ${scale > 1 ? 'cursor-grab' : 'cursor-zoom-in'} ${isDragging ? 'cursor-grabbing' : ''}`}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={handleMouseDown}
              draggable={false}
            />

            {/* Keyboard hints */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              className="absolute bottom-4 left-1/2 z-[110] flex -translate-x-1/2 items-center gap-4 text-xs text-slate-500"
            >
              <span>Scroll to zoom</span>
              <span>•</span>
              <span>Drag to pan when zoomed</span>
              <span>•</span>
              <span>Esc to close</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
