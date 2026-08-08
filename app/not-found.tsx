import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'

export const metadata = {
  title: 'Page not found - Rakesh Cheekatimala',
}

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-5 py-28 md:px-8 md:py-36">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Error 404</p>
      <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-5xl">
        This page does not exist.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-body text-pretty">
        The link may be out of date. The case studies and work history are the best places to pick
        up from here.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover"
        >
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          Back home
        </Link>
        <Link
          href="/projects"
          className="inline-flex h-12 items-center justify-center rounded-md border border-line-strong px-6 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Case Studies
        </Link>
      </div>
    </div>
  )
}
