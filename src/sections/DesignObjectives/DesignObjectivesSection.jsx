import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ProblemStatement from './ProblemStatement'
import RippleImpact from './RippleImpact'
import RealWorldContext from './RealWorldContext'
import DesignDecision from './DesignDecision'

export default function DesignObjectivesSection() {
  return (
    <div className="relative bg-gradient-to-b from-[#111827] via-background to-background">
      {/* Shared background effects */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
      
      <ProblemStatement />
      <RippleImpact />
      <RealWorldContext />
      <DesignDecision />
    </div>
  )
}
