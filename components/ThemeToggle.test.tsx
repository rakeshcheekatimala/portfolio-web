import { fireEvent, render, screen } from '@testing-library/react'
import ThemeToggle from './ThemeToggle'

function mockSystemDark(prefersDark: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: prefersDark,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  })
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.classList.remove('dark', 'light')
    mockSystemDark(false)
  })

  it('follows a light system preference when nothing is saved', () => {
    render(<ThemeToggle />)

    expect(document.documentElement).toHaveClass('light')
    expect(document.documentElement).not.toHaveClass('dark')
    expect(screen.getByRole('button', { name: /toggle color theme/i })).toBeInTheDocument()
  })

  it('follows a dark system preference when nothing is saved', () => {
    mockSystemDark(true)

    render(<ThemeToggle />)

    expect(document.documentElement).toHaveClass('dark')
    expect(document.documentElement).not.toHaveClass('light')
  })

  it('toggles and saves the next theme', () => {
    render(<ThemeToggle />)

    fireEvent.click(screen.getByRole('button', { name: /toggle color theme/i }))

    expect(document.documentElement).toHaveClass('dark')
    expect(document.documentElement).not.toHaveClass('light')
    expect(window.localStorage.getItem('portfolio-theme')).toBe('dark')
  })

  it('preserves a saved dark preference', () => {
    window.localStorage.setItem('portfolio-theme', 'dark')

    render(<ThemeToggle />)

    expect(document.documentElement).toHaveClass('dark')
  })

  it('lets a saved light preference win over a dark system preference', () => {
    mockSystemDark(true)
    window.localStorage.setItem('portfolio-theme', 'light')

    render(<ThemeToggle />)

    expect(document.documentElement).toHaveClass('light')
  })
})
