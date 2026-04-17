import SoftAurora from '@/components/SoftAurora'

export default function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-90">
      <SoftAurora
        speed={1.5}
        scale={1.5}
        brightness={1.22}
        color1="#1d4ed8"
        color2="#38bdf8"
        noiseFrequency={2.5}
        noiseAmplitude={1}
        bandHeight={0.45}
        bandSpread={0.88}
        octaveDecay={0.2}
        layerOffset={0.15}
        colorSpeed={1.1}
        enableMouseInteraction
        mouseInfluence={0.2}
      />
    </div>
  )
}
