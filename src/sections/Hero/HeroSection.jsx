import AuroraBackground from '@/components/visuals/AuroraBackground'
import HeroText from './HeroText'
import HeroVisual from './HeroVisual'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-background to-[#111827]">
      <AuroraBackground />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#070b14]/72 via-[#0b0f19]/64 to-[#0b0f19]/82" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 py-20 md:px-10 md:py-24 lg:grid-cols-2 lg:gap-20 lg:py-14 xl:gap-24">
        <HeroText />
        <HeroVisual />
      </div>
    </section>
  )
}
