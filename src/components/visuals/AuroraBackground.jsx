import SoftAurora from '@/components/SoftAurora'

export default function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-45">
      <SoftAurora
        speed={1.45}
        scale={1.5}
        brightness={0.72}
        color1="#0321e5"
        color2="#0b2cea"
        noiseFrequency={2.8}
        noiseAmplitude={0.85}
        bandHeight={0.5}
        bandSpread={0.92}
        octaveDecay={0.2}
        layerOffset={0}
        colorSpeed={0.9}
        enableMouseInteraction
        mouseInfluence={0.18}
      />
    </div>
  )
}
