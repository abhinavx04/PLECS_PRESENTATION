import { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const DPR = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1
const CSS_W = 1100
const CSS_H = 320
const W = Math.round(CSS_W * DPR)
const H = Math.round(CSS_H * DPR)
const MID = H / 2
const AMP = H * 0.36

const F_FUND = 0.006
const F_CARRIER = 0.07
const W_FUND = 0.55
const W_CARRIER = 3.2
const DRIFT = 6

const PWM_END = 0.2
const L1_START = 0.22
const L1_END = 0.31
const C_START = 0.40
const C_END = 0.49
const L2_START = 0.56
const L2_END = 0.65
const SINE_START = 0.72

function triangle(phase) {
  const p = ((phase % 1) + 1) % 1
  return 4 * Math.abs(p - 0.5) - 1
}

function hermite(t) {
  return t * t * (3 - 2 * t)
}

function getFilterAmount(nx) {
  if (nx <= PWM_END) return 0
  if (nx >= SINE_START) return 1
  const progress = (nx - PWM_END) / (SINE_START - PWM_END)
  return progress
}

function sample(x, t, filterRaw) {
  const xD = x - t * DRIFT * DPR
  const theta = 2 * Math.PI * (xD * F_FUND / DPR + t * W_FUND)
  const sine = Math.sin(theta)
  if (filterRaw >= 1) return sine

  const s = hermite(filterRaw)
  const carrierFreq = (F_CARRIER / DPR) * (1 - s * 0.5)
  const carrier = triangle(xD * carrierFreq + t * W_CARRIER)
  const pwm = sine >= carrier ? 1 : -1

  const rippleDecay = (1 - s) * (1 - s) * 0.05
  const ripple = rippleDecay * Math.sin(2 * Math.PI * (xD * (F_CARRIER / DPR) * 0.35 + t * W_CARRIER * 0.3))

  return pwm * (1 - s) + sine * s + ripple
}

function colorAt(s) {
  const sm = hermite(s)
  return [
    Math.round(239 + (56 - 239) * sm),
    Math.round(68 + (132 - 68) * sm),
    Math.round(68 + (246 - 68) * sm),
  ]
}

function isInsideBlock(nx) {
  return (nx >= L1_START && nx <= L1_END) ||
    (nx >= C_START && nx <= C_END) ||
    (nx >= L2_START && nx <= L2_END)
}

function drawWaveform(ctx, t) {
  ctx.save()

  let segStart = 0
  let prevInBlock = isInsideBlock(0)

  for (let x = 0; x <= W; x++) {
    const nx = x / W
    const inBlock = isInsideBlock(nx)

    if (inBlock !== prevInBlock || x === W) {
      if (!prevInBlock && segStart < x) {
        drawSegment(ctx, segStart, Math.min(x, W), t)
      }
      segStart = x
      prevInBlock = inBlock
    }
  }

  ctx.restore()
}

function drawSegment(ctx, xFrom, xTo, t) {
  const SEGS = 6
  const len = xTo - xFrom
  for (let i = 0; i < SEGS; i++) {
    const x0 = Math.floor(xFrom + (len * i) / SEGS)
    const x1 = Math.floor(xFrom + (len * (i + 1)) / SEGS)

    const nxMid = ((x0 + x1) / 2) / W
    const fMid = hermite(getFilterAmount(nxMid))
    const [r, g, b] = colorAt(getFilterAmount(nxMid))

    ctx.strokeStyle = `rgb(${r},${g},${b})`
    ctx.shadowColor = `rgba(${r},${g},${b},${0.35 + fMid * 0.45})`
    ctx.shadowBlur = (3 + fMid * 12) * DPR
    ctx.lineWidth = (1.6 + fMid * 0.8) * DPR

    ctx.beginPath()
    let first = true
    for (let x = x0; x <= x1; x++) {
      const fRaw = getFilterAmount(x / W)
      const val = sample(x, t, fRaw)
      const y = MID - val * AMP
      if (first) { ctx.moveTo(x, y); first = false }
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  ctx.shadowBlur = 0
}

function drawFilterBlock(ctx, nxStart, nxEnd, label, desc, hue, glowAlpha, t) {
  const x = nxStart * W
  const w = (nxEnd - nxStart) * W
  const bh = H * 0.52
  const by = MID - bh / 2
  const rad = 14 * DPR

  ctx.save()

  ctx.fillStyle = `hsla(${hue}, 80%, 55%, 0.06)`
  ctx.strokeStyle = `hsla(${hue}, 70%, 55%, 0.35)`
  ctx.lineWidth = 1.2 * DPR
  ctx.shadowColor = `hsla(${hue}, 75%, 55%, ${glowAlpha})`
  ctx.shadowBlur = 22 * DPR

  ctx.beginPath()
  ctx.roundRect(x, by, w, bh, rad)
  ctx.fill()
  ctx.stroke()
  ctx.shadowBlur = 0

  const fIn = getFilterAmount(nxStart)
  const fOut = getFilterAmount(nxEnd)
  const valIn = sample(Math.round(x), t, fIn)
  const valOut = sample(Math.round(x + w), t, fOut)
  const yIn = MID - valIn * AMP
  const yOut = MID - valOut * AMP

  const [rIn, gIn, bIn] = colorAt(fIn)
  const [rOut, gOut, bOut] = colorAt(fOut)

  ctx.setLineDash([4 * DPR, 5 * DPR])

  ctx.strokeStyle = `rgba(${rIn},${gIn},${bIn},0.35)`
  ctx.lineWidth = 1.2 * DPR
  ctx.beginPath()
  ctx.moveTo(x, yIn)
  ctx.bezierCurveTo(x + w * 0.33, yIn, x + w * 0.66, yOut, x + w, yOut)
  ctx.stroke()

  ctx.setLineDash([])

  ctx.fillStyle = `hsla(${hue}, 70%, 70%, 0.92)`
  ctx.font = `bold ${20 * DPR}px Poppins, Inter, sans-serif`
  ctx.textAlign = 'center'
  ctx.fillText(label, x + w / 2, MID - 6 * DPR)

  ctx.fillStyle = 'rgba(148,163,184,0.6)'
  ctx.font = `${11 * DPR}px Inter, sans-serif`
  ctx.fillText(desc, x + w / 2, MID + 18 * DPR)

  ctx.restore()
}

function drawCenterline(ctx) {
  ctx.save()
  ctx.setLineDash([3 * DPR, 9 * DPR])
  ctx.strokeStyle = 'rgba(148,163,184,0.08)'
  ctx.lineWidth = 1 * DPR
  ctx.beginPath()
  ctx.moveTo(0, MID)
  ctx.lineTo(W, MID)
  ctx.stroke()
  ctx.restore()
}

function drawLabels(ctx) {
  ctx.font = `600 ${12 * DPR}px Inter, sans-serif`
  ctx.textAlign = 'left'

  ctx.fillStyle = 'rgba(239,68,68,0.82)'
  ctx.fillText('PWM INPUT', 10 * DPR, 20 * DPR)

  ctx.textAlign = 'right'
  ctx.fillStyle = 'rgba(59,130,246,0.85)'
  ctx.fillText('CLEAN SINE', W - 20 * DPR, 20 * DPR)
}

function drawFlowDots(ctx, t) {
  ctx.save()
  const count = 5
  const speed = 0.06
  for (let i = 0; i < count; i++) {
    const phase = ((t * speed + i / count) % 1)
    const nx = phase
    if (isInsideBlock(nx)) continue

    const fRaw = getFilterAmount(nx)
    const [r, g, b] = colorAt(fRaw)
    const alpha = Math.sin(phase * Math.PI) * 0.7

    const x = nx * W
    const val = sample(Math.round(x), t, fRaw)
    const y = MID - val * AMP

    ctx.beginPath()
    ctx.arc(x, y, 2.5 * DPR, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
    ctx.shadowColor = `rgba(${r},${g},${b},${alpha * 0.8})`
    ctx.shadowBlur = 10 * DPR
    ctx.fill()
  }
  ctx.shadowBlur = 0
  ctx.restore()
}

export default function SignalPipeline() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  const draw = useCallback((timestamp) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const t = timestamp * 0.001

    ctx.clearRect(0, 0, W, H)
    drawCenterline(ctx)
    drawWaveform(ctx, t)

    drawFilterBlock(ctx, L1_START, L1_END, 'L\u2081', 'Current ripple', 0, 0.15, t)
    drawFilterBlock(ctx, C_START, C_END, 'C', 'Voltage smooth', 270, 0.22, t)
    drawFilterBlock(ctx, L2_START, L2_END, 'L\u2082', 'Final filter', 217, 0.35, t)

    drawFlowDots(ctx, t)
    drawLabels(ctx)

    animRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [draw])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: 'easeInOut' }}
      className="relative mx-auto w-full max-w-[1140px] rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-5"
    >
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{ width: CSS_W, height: CSS_H }}
        className="mx-auto block w-full"
      />
      <div className="pointer-events-none absolute bottom-3 right-4 rounded-full border border-emerald-300/35 bg-emerald-500/12 px-3 py-1 text-[10px] font-semibold tracking-[0.08em] text-emerald-300 shadow-[0_0_18px_rgba(34,197,94,0.25)] backdrop-blur-sm sm:text-[11px]">
        THD ↓ 0.33%
      </div>
    </motion.div>
  )
}
