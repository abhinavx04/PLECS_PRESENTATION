import AuroraBackground from '@/components/visuals/AuroraBackground'
import HeroText from './HeroText'
import SignalPipeline from '@/components/visuals/SignalPipeline'

export default function HeroSection() {
  return (
    <section 
      className="relative flex h-screen min-h-screen snap-start flex-col justify-center overflow-hidden bg-gradient-to-b from-background to-[#111827]"
      data-section="hero"
    >
      <AuroraBackground />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/10" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#070b14]/30 via-[#0b0f19]/24 to-[#0b0f19]/42" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,transparent_58%,rgba(2,6,23,0.2)_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 py-20 md:px-10 md:py-24 lg:py-16">
        <HeroText />

        <div className="mt-16 w-full lg:mt-20">
          <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400/70">
            Signal Flow &mdash; PWM &rarr; LCL Filter &rarr; Pure Sine
          </p>
          <SignalPipeline />
        </div>
      </div>
    </section>
  )
}
