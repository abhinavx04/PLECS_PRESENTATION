import { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const CANVAS_W = 520
const CANVAS_H = 180
const MID_Y = CANVAS_H / 2
const AMP = 58

function easeInOut(t) {
  return 0.5 * (1 - Math.cos(Math.PI * t))
}

function drawPWM(ctx, xStart, xEnd, time, color) {
  const freq = 0.105
  const pulseW = 6.5
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.shadowColor = color
  ctx.shadowBlur = 6

  let first = true
  for (let x = xStart; x <= xEnd; x += 1) {
    const sineEnv = Math.sin((x - xStart) * 0.022 + time * 1.7)
    const duty = 0.5 + 0.4 * sineEnv
    const phase = ((x - xStart + time * 56) * freq) % (pulseW * 2)
    const high = phase < pulseW * 2 * duty
    const y = MID_Y + (high ? -AMP * 0.8 : AMP * 0.8)

    if (first) { ctx.moveTo(x, y); first = false }
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
  ctx.shadowBlur = 0
}

function drawSineWave(ctx, xStart, xEnd, time, color) {
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = 2.5
  ctx.shadowColor = color
  ctx.shadowBlur = 10

  let first = true
  for (let x = xStart; x <= xEnd; x += 1) {
    const y = MID_Y + AMP * Math.sin((x - xStart) * 0.036 + time * 1.9)
    if (first) { ctx.moveTo(x, y); first = false }
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
  ctx.shadowBlur = 0
}

function drawTransition(ctx, xStart, xEnd, time) {
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.shadowBlur = 8

  let first = true
  for (let x = xStart; x <= xEnd; x += 1) {
    const t = (x - xStart) / (xEnd - xStart)
    const blend = easeInOut(t)

    const sineEnv = Math.sin((x - xStart) * 0.022 + time * 1.7)
    const duty = 0.5 + 0.4 * sineEnv
    const freq = 0.105
    const pulseW = 6.5
    const phase = ((x - xStart + time * 56) * freq) % (pulseW * 2)
    const high = phase < pulseW * 2 * duty
    const pwmY = MID_Y + (high ? -AMP * 0.8 : AMP * 0.8)

    const sineY = MID_Y + AMP * Math.sin((x - xStart) * 0.036 + time * 1.9)

    const y = pwmY * (1 - blend) + sineY * blend

    const r = Math.round(239 * (1 - blend) + 35 * blend)
    const g = Math.round(68 * (1 - blend) + 125 * blend)
    const b = Math.round(68 * (1 - blend) + 246 * blend)
    const color = `rgb(${r},${g},${b})`
    ctx.strokeStyle = color
    ctx.shadowColor = color

    if (first) { ctx.moveTo(x, y); first = false }
    else { ctx.lineTo(x, y) }
  }
  ctx.stroke()
  ctx.shadowBlur = 0
}

export default function WaveformAnimation() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  const draw = useCallback((timestamp) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const time = timestamp * 0.001

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)

    const pwmEnd = CANVAS_W * 0.28
    const transStart = pwmEnd
    const transEnd = CANVAS_W * 0.72
    const sineStart = transEnd

    const gradient = ctx.createLinearGradient(0, 0, CANVAS_W, 0)
    gradient.addColorStop(0, 'rgba(239,68,68,0.12)')
    gradient.addColorStop(0.5, 'rgba(90,95,180,0.12)')
    gradient.addColorStop(1, 'rgba(59,130,246,0.12)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    drawPWM(ctx, 0, pwmEnd, time, '#EF4444')
    drawTransition(ctx, transStart, transEnd, time)
    drawSineWave(ctx, sineStart, CANVAS_W, time, '#3B82F6')

    ctx.fillStyle = 'rgba(239,68,68,0.88)'
    ctx.font = '500 11px Inter, sans-serif'
    ctx.fillText('PWM Input', 8, 18)

    ctx.fillStyle = 'rgba(59,130,246,0.9)'
    ctx.fillText('Clean Sine Output', CANVAS_W - 120, 18)

    animRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [draw])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: 'easeInOut' }}
      className="flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="w-full max-w-[520px]"
      />
    </motion.div>
  )
}
