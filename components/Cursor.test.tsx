import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { useReducedMotion } from 'motion/react'
import Cursor from './Cursor'

jest.mock('motion/react', () => ({
  useReducedMotion: jest.fn(),
}))

const reducedMotionMock = useReducedMotion as jest.MockedFunction<typeof useReducedMotion>

function mockMedia({ fine = true, hover = true } = {}) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches:
        query === '(pointer: fine)'
          ? fine
          : query === '(hover: hover)'
            ? hover
            : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

describe('Cursor', () => {
  beforeEach(() => {
    reducedMotionMock.mockReturnValue(false)
    mockMedia()
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1)
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the eight-point tapered trail for a fine hover pointer', async () => {
    const { container } = render(<Cursor />)

    await waitFor(() => {
      expect(container.querySelector('[data-cursor-root]')).toBeInTheDocument()
    })

    const root = container.querySelector<HTMLElement>('[data-cursor-root]')!
    const dots = root.querySelectorAll<HTMLElement>('[data-cursor-dot]')

    expect(dots).toHaveLength(8)
    expect(dots[0]).toHaveStyle({ width: '10.8px', opacity: '1' })
    expect(dots[7]).toHaveStyle({ width: '3.6px', opacity: '0.125' })

    fireEvent.pointerMove(window, { clientX: 320, clientY: 240, pointerType: 'mouse' })
    expect(root).toHaveStyle({ opacity: '1' })
  })

  it('does not mount on touch-style pointers', () => {
    mockMedia({ fine: true, hover: false })
    const { container } = render(<Cursor />)

    expect(container.querySelector('[data-cursor-root]')).not.toBeInTheDocument()
  })

  it('respects reduced-motion preferences', () => {
    reducedMotionMock.mockReturnValue(true)
    const { container } = render(<Cursor />)

    expect(container.querySelector('[data-cursor-root]')).not.toBeInTheDocument()
  })
})
