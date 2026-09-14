'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import { List, X } from '@phosphor-icons/react'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/work', label: 'Work' },
  { href: '/projects', label: 'Case Studies' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lifted, setLifted] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  // Only flips state when the threshold is crossed, not on every frame.
  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > 12
    setLifted((prev) => (prev === next ? prev : next))
  })

  const closeMenu = () => setIsMenuOpen(false)
  const isActive = (href: string) =>
    Boolean(pathname) && (pathname === href || pathname!.startsWith(`${href}/`))

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        lifted ? 'border-b border-line bg-base/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Rakesh Cheekatimala, home">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-md border border-line bg-surface font-mono text-[10px] font-semibold tracking-tight text-ink transition-colors group-hover:border-accent group-hover:text-accent"
          >
            RC
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-ink">Rakesh</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href) ? 'text-ink' : 'text-faint hover:text-ink'
              }`}
            >
              {link.label}
              {isActive(link.href) ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-px h-px bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              ) : null}
            </Link>
          ))}
          <span className="mx-2 h-4 w-px bg-line" aria-hidden="true" />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="grid h-9 w-9 place-items-center rounded-md border border-line text-body transition-colors hover:text-ink"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav className="border-t border-line bg-base md:hidden" aria-label="Mobile">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`border-b border-line/60 py-3.5 text-[15px] font-medium last:border-b-0 ${
                  isActive(link.href) ? 'text-accent' : 'text-body'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  )
}
