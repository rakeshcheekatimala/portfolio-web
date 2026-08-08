'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const TRAIL_LENGTH = 8
const TRAIL = Array.from({ length: TRAIL_LENGTH })

/*
  A tapered comet trail inspired by Skynexa's pointer treatment. Positions
  are animated directly on DOM nodes so pointer movement never renders React.
  The native cursor remains visible for familiar affordance and accessibility.
*/
export default function Cursor() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [interactive, setInteractive] = useState(false)
  const [pressed, setPressed] = useState(false)
  const nodes = useRef<Array<HTMLDivElement | null>>([])
  const target = useRef({ x: -100, y: -100 })
  const points = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  )
  const visibleRef = useRef(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const sync = () => setEnabled(fine.matches)
    sync()
    fine.addEventListener('change', sync)
    return () => fine.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled || reduceMotion) return

    const onMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY }
      if (!visibleRef.current) {
        visibleRef.current = true
        points.current.forEach((point) => {
          point.x = event.clientX
          point.y = event.clientY
        })
        setVisible(true)
      }

      const eventTarget = event.target as HTMLElement | null
      const interactive = eventTarget?.closest<HTMLElement>(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      )
      setInteractive(Boolean(interactive))
    }

    const animate = () => {
      let leader = target.current
      points.current.forEach((point, index) => {
        const easing = index === 0 ? 0.52 : 0.2
        point.x += (leader.x - point.x) * easing
        point.y += (leader.y - point.y) * easing
        const node = nodes.current[index]
        if (node) {
          node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`
        }
        leader = point
      })
      frame = window.requestAnimationFrame(animate)
    }

    const onLeave = () => {
      visibleRef.current = false
      setVisible(false)
      setInteractive(false)
      setPressed(false)
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    let frame = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [enabled, reduceMotion])

  if (!enabled || reduceMotion) return null

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[70] hidden overflow-hidden transition-opacity duration-200 md:block ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {TRAIL.map((_, index) => {
        const size =
          index === 0
            ? pressed
              ? 7
              : interactive
                ? 16
                : 11
            : Math.max(3, 11 - index * 1.05)
        return (
          <div
            key={index}
            ref={(node) => {
              nodes.current[index] = node
            }}
            className="absolute left-0 top-0 rounded-full bg-accent transition-[width,height] duration-200 will-change-transform"
            style={{
              width: size,
              height: size,
              opacity: index === 0 ? 1 : Math.max(0.12, 0.78 - index * 0.095),
              boxShadow: index === 0 ? '0 0 18px var(--cursor-glow)' : undefined,
            }}
          />
        )
      })}
    </div>
  )
}
