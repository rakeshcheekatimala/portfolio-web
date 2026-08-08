'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

type TrailPoint = {
  x: number
  y: number
  vx: number
  vy: number
  scale: number
}

const DOTS = [
  { size: 10.8, opacity: 1, glow: 10 },
  { size: 9.6, opacity: 0.875, glow: 9 },
  { size: 8.4, opacity: 0.75, glow: 8 },
  { size: 7.2, opacity: 0.625, glow: 7 },
  { size: 6, opacity: 0.5, glow: 6 },
  { size: 4.8, opacity: 0.375, glow: 5 },
  { size: 4.2, opacity: 0.25, glow: 4 },
  { size: 3.6, opacity: 0.125, glow: 3 },
] as const

const OFFSCREEN = -100
const FRAME_MS = 1000 / 60

const makePoint = (): TrailPoint => ({
  x: OFFSCREEN,
  y: OFFSCREEN,
  vx: 0,
  vy: 0,
  scale: 1,
})

/*
  An eight-point spring trail based on the Skynexa reference. The head has a
  lightly under-damped response and each following point chases the previous
  frame's position, producing the elastic wave instead of a linear delay.
  Positions are written directly to composited DOM nodes so pointer movement
  never causes a React render. The native cursor stays visible for familiar
  affordance and accessibility.
*/
export default function Cursor() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const nodes = useRef<Array<HTMLSpanElement | null>>([])
  const target = useRef({ x: OFFSCREEN, y: OFFSCREEN })
  const points = useRef<TrailPoint[]>(DOTS.map(makePoint))
  const visible = useRef(false)
  const pressed = useRef(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const canHover = window.matchMedia('(hover: hover)')
    const sync = () => setEnabled(finePointer.matches && canHover.matches)

    sync()
    finePointer.addEventListener('change', sync)
    canHover.addEventListener('change', sync)

    return () => {
      finePointer.removeEventListener('change', sync)
      canHover.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!enabled || reduceMotion) return

    const show = () => {
      if (visible.current) return
      visible.current = true
      if (root.current) root.current.style.opacity = '1'
    }

    const hide = () => {
      visible.current = false
      pressed.current = false
      if (root.current) root.current.style.opacity = '0'
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      target.current.x = event.clientX
      target.current.y = event.clientY
      show()
    }

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') pressed.current = true
    }
    const onUp = () => {
      pressed.current = false
    }
    const onVisibilityChange = () => {
      if (document.hidden) hide()
    }

    let frame = 0
    let previousTime = 0

    const animate = (time: number) => {
      // Clamp after background-tab pauses so the spring cannot explode.
      const step = previousTime
        ? Math.min(Math.max((time - previousTime) / FRAME_MS, 0.5), 1.5)
        : 1
      previousTime = time

      const previousPositions = points.current.map((point) => ({
        x: point.x,
        y: point.y,
      }))

      points.current.forEach((point, index) => {
        const leader = index === 0 ? target.current : previousPositions[index - 1]
        // These ratios reproduce the reference's small, controlled overshoot:
        // lively enough to feel elastic without the tail slingshotting past it.
        const stiffness = index === 0 ? 0.1 : 0.074
        const damping = Math.pow(index === 0 ? 0.63 : 0.69, step)

        point.vx = point.vx * damping + (leader.x - point.x) * stiffness * step
        point.vy = point.vy * damping + (leader.y - point.y) * stiffness * step
        point.x += point.vx * step
        point.y += point.vy * step

        const scaleTarget = pressed.current && index === 0 ? 0.68 : 1
        point.scale += (scaleTarget - point.scale) * Math.min(0.34 * step, 1)

        const node = nodes.current[index]
        if (node) {
          node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) scale(${point.scale})`
        }
      })

      frame = window.requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('pointercancel', onUp, { passive: true })
    document.addEventListener('pointerleave', hide)
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('blur', hide)
    frame = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      document.removeEventListener('pointerleave', hide)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('blur', hide)
    }
  }, [enabled, reduceMotion])

  if (!enabled || reduceMotion) return null

  return (
    <div
      ref={root}
      data-cursor-root=""
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden opacity-0 transition-opacity duration-150"
      style={{ contain: 'strict' }}
    >
      {DOTS.map((dot, index) => (
        <span
          key={index}
          ref={(node) => {
            nodes.current[index] = node
          }}
          data-cursor-dot={index}
          className="absolute left-0 top-0 rounded-full bg-accent will-change-transform"
          style={{
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
            boxShadow: `0 0 ${dot.glow}px var(--cursor-glow)`,
            transform: `translate3d(${OFFSCREEN}px, ${OFFSCREEN}px, 0) translate(-50%, -50%)`,
          }}
        />
      ))}
    </div>
  )
}
