'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

type MagneticProps = {
  children: React.ReactNode
  /** Maximum pull toward the pointer, in px. */
  strength?: number
  className?: string
}

/*
  Pulls its child a few pixels toward the pointer. Used only on primary
  actions, as feedback that the target is live before the click lands.
*/
export default function Magnetic({ children, strength = 8, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 })

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const offsetX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const offsetY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    x.set(Math.max(-1, Math.min(1, offsetX)) * strength)
    y.set(Math.max(-1, Math.min(1, offsetY)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  )
}
