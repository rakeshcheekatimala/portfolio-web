import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import SocailLinks from './SocailLinks'

const siteLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/projects', label: 'Case Studies' },
  { href: '/about', label: 'About' },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight text-ink">Rakesh Cheekatimala</p>
            <p className="mt-3 text-sm leading-relaxed text-faint">
              Notes on frontend architecture, testing, AI experiments, and developer experience.
            </p>
            <Link
              href="https://rakeshcheekatimala.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-opacity hover:opacity-70"
            >
              Read on Substack
              <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
            </Link>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {siteLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-faint transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-faint">
            © {new Date().getFullYear()} Rakesh Cheekatimala. Built with Next.js and Tailwind.
          </p>
          <SocailLinks />
        </div>
      </div>
    </footer>
  )
}
