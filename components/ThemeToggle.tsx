'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from '@phosphor-icons/react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.classList.toggle('light', theme === 'light')
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const preferred = getPreferredTheme()
    setTheme(preferred)
    applyTheme(preferred)
    setMounted(true)
  }, [])

  const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'

  function handleToggle() {
    setTheme(nextTheme)
    applyTheme(nextTheme)
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
  }

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      title={`Switch to ${nextTheme} theme`}
      onClick={handleToggle}
      className="grid h-9 w-9 place-items-center rounded-md border border-line text-faint transition-colors hover:border-line-strong hover:text-ink"
    >
      {/* Icon is decided on the client, so nothing renders until the theme is known. */}
      {mounted ? (
        theme === 'dark' ? <Moon size={16} weight="fill" /> : <Sun size={16} weight="fill" />
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  )
}
