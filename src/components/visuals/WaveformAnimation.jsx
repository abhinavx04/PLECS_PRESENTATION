import { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const W = 680
const H = 260
const MID = H / 2
const AMP = 88

const F_FUND = 0.009
const F_CARRIER_BASE = 0.12
const W_FUND = 0.6
const W_CARRIER = 3.8
const DRIFT = 8

function triangle(phase) {
  const p = ((phase % 1) + 1) % 1
  return 4 * Math.abs(p - 0.5) - 1
}

function hermite(t) {
  return t * t * (3 - 2 * t)
}

function getFilterAmount(x, regionPWM, regionTrans) {
  if (x < regionPWM) return 0
  if (x >= regionTrans) return 1
  return (x - regionPWM) / (regionTrans - regionPWM)
}

function sample(x, t, filterRaw) {
  const xDrifted = x - t * DRIFT
  const theta = 2 * Math.PI * (xDrifted * F_FUND + t * W_FUND)
  const sine = Math.sin(theta)

  if (filterRaw >= 1) return sine

  const s = hermite(filterRaw)

  const carrierFreq = F_CARRIER_BASE * (1 - s * 0.55)
  const carrier = triangle(xDrifted * carrierFreq + t * W_CARRIER)
  const pwm = sine >= carrier ? 1 : -1

  const rippleDecay = (1 - s) * (1 - s) * 0.06
  const ripple = rippleDecay * Math.sin(2 * Math.PI * (xDrifted * F_CARRIER_BASE * 0.4 + t * W_CARRIER * 0.35))

  return pwm * (1 - s) + sine * s + ripple
}

function colorAt(s) {
  const r = Math.round(239 + (56 - 239) * s)
  const g = Math.round(68 + (132 - 68) * s)
  const b = Math.round(68 + (246 - 68) * s)
  return [r, g, b]
}

function drawRegion(ctx, xFrom, xTo, t, regionPWM, regionTrans) {
  const fStart = hermite(getFilterAmount(xFrom, regionPWM, regionTrans))
  const fEnd = hermite(getFilterAmount(xTo, regionPWM, regionTrans))
  const fAvg = (fStart + fEnd) * 0.5

  const [r, g, b] = colorAt(fAvg)

  ctx.strokeStyle = `rgb(${r},${g},${b})`
  ctx.shadowColor = `rgba(${r},${g},${b},${0.4 + fAvg * 0.4})`
  ctx.shadowBlur = 3 + fAvg * 10
  ctx.lineWidth = 1.6 + fAvg * 0.8

  ctx.beginPath()
  let first = true
  for (let x = xFrom; x <= xTo; x++) {
    const fRaw = getFilterAmount(x, regionPWM, regionTrans)
    const val = sample(x, t, fRaw)
    const y = MID - val * AMP * 0.82
    if (first) { ctx.moveTo(x, y); first = false }
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
  ctx.shadowBlur = 0
}

function drawWaveform(ctx, t) {
  const regionPWM = W * 0.28
  const regionTrans = W * 0.74

  ctx.save()

  drawRegion(ctx, 0, Math.floor(regionPWM), t, regionPWM, regionTrans)

  const SEGMENTS = 10
  const transW = regionTrans - regionPWM
  for (let i = 0; i < SEGMENTS; i++) {
    const x0 = Math.floor(regionPWM + (transW * i) / SEGMENTS)
    const x1 = Math.floor(regionPWM + (transW * (i + 1)) / SEGMENTS)
    drawRegion(ctx, x0, x1, t, regionPWM, regionTrans)
  }

  drawRegion(ctx, Math.floor(regionTrans), W, t, regionPWM, regionTrans)

  ctx.restore()
}

function drawCenterline(ctx) {
  ctx.save()
  ctx.setLineDash([3, 8])
  ctx.strokeStyle = 'rgba(148,163,184,0.1)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, MID)
  ctx.lineTo(W, MID)
  ctx.stroke()
  ctx.restore()
}

function drawLabels(ctx) {
  ctx.font = '600 10px Inter, sans-serif'
  ctx.fillStyle = 'rgba(239,68,68,0.78)'
  ctx.fillText('PWM', 10, 17)

  ctx.fillStyle = 'rgba(148,163,184,0.38)'
  ctx.fillText('FILTER', W * 0.47, 17)

  ctx.fillStyle = 'rgba(59,130,246,0.82)'
  ctx.fillText('SINE', W - 42, 17)
}

function drawBackground(ctx) {
  const grad = ctx.createLinearGradient(0, 0, W, 0)
  grad.addColorStop(0, 'rgba(239,68,68,0.05)')
  grad.addColorStop(0.42, 'rgba(100,100,180,0.03)')
  grad.addColorStop(1, 'rgba(59,130,246,0.05)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)
}

export default function WaveformAnimation() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  const draw = useCallback((timestamp) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const t = timestamp * 0.001

    ctx.clearRect(0, 0, W, H)
    drawBackground(ctx)
    drawCenterline(ctx)
    drawWaveform(ctx, t)
    drawLabels(ctx)

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
      className="relative flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="w-full max-w-[680px]"
      />
      <div className="pointer-events-none absolute right-2 top-7 rounded-full border border-emerald-300/35 bg-emerald-500/12 px-3 py-1 text-[10px] font-semibold tracking-[0.08em] text-emerald-300 shadow-[0_0_18px_rgba(34,197,94,0.25)] backdrop-blur-sm sm:right-3 sm:text-[11px]">
        THD ↓ 0.33%
      </div>
    </motion.div>
  )
}
