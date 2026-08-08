import '@testing-library/jest-dom'

// Polyfill for Next.js API routes
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

// Mock fetch globally
global.fetch = jest.fn()

// Mock scrollIntoView (not available in jsdom) - only for jsdom environment
if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView = jest.fn()
}

// jsdom ships neither of these, and Motion needs both: IntersectionObserver
// drives scroll reveals, matchMedia drives pointer and reduced-motion checks.
if (typeof window !== 'undefined') {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null
    readonly rootMargin = ''
    readonly thresholds: ReadonlyArray<number> = []
    observe = jest.fn()
    unobserve = jest.fn()
    disconnect = jest.fn()
    takeRecords = jest.fn(() => [])
  }

  window.IntersectionObserver = MockIntersectionObserver as any
  global.IntersectionObserver = MockIntersectionObserver as any

  if (!window.matchMedia) {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
  }
}
