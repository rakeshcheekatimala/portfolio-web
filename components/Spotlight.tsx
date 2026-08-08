'use client'

import React, { useRef } from 'react'

type SpotlightProps = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'article' | 'li' | 'section'
}

/*
  Writes pointer coordinates into CSS custom properties that the `.spotlight`
  rule in globals.css reads. Values go straight onto the node so tracking the
  pointer never re-renders React.
*/
export default function Spotlight({ children, className = '', as = 'div' }: SpotlightProps) {
  const ref = useRef<HTMLElement>(null)

  const handleMove = (event: React.PointerEvent<HTMLElement>) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    node.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  const Component = as as React.ElementType

  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      onPointerMove={handleMove}
      className={`spotlight ${className}`}
    >
      {children}
    </Component>
  )
}
