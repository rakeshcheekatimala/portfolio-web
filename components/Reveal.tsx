'use client'

import React from 'react'
import { motion, useReducedMotion } from 'motion/react'

type RevealProps = {
  children: React.ReactNode
  /** Stagger index. Each step adds 60ms. */
  index?: number
  /** Travel distance in px before settling. */
  distance?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article' | 'span'
}

/*
  Scroll reveal used for section entrances. Sequence communicates reading
  order, so it runs once and never replays on scroll-up.
*/
export default function Reveal({
  children,
  index = 0,
  distance = 20,
  className,
  as = 'div',
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as]

  if (reduceMotion) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  )
}
