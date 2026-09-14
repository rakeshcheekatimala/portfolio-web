import type { Metadata } from 'next'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Reveal from '@components/Reveal'
import { engineeringNotes } from '../../lib/profile'

export const metadata: Metadata = {
  title: 'Writing - Rakesh Cheekatimala',
  description:
    'Engineering notes from Rakesh Cheekatimala on frontend platforms, Applied AI, AI gateways, agents, developer tooling, and production reliability.',
  alternates: { canonical: '/writing' },
}

const themes = [
  'Frontend platform engineering',
  'Production AI reliability',
  'Agent workflows and MCP tooling',
  'Developer experience and CI quality gates',
]

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          Engineering Notes
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink text-balance md:text-5xl">
          Practical writing on platforms, agents, and trustworthy AI systems.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body text-pretty">
          A curated set of articles that shows how I reason about production engineering: where
          frontend systems, developer tooling, reliability, and Applied AI start to meet.
        </p>
      </Reveal>

      <section className="mt-14 grid gap-10 border-y border-line py-12 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Recurring themes</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {themes.map((theme) => (
              <li key={theme} className="py-4 text-[15px] leading-relaxed text-body">
                {theme}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-4">
          {engineeringNotes.map((note, index) => (
            <Reveal key={note.title} index={index}>
              <a
                href={note.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-line bg-surface p-6 transition-colors hover:border-line-strong"
                data-cursor-label={note.source}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                      {note.source}
                    </p>
                    <h3 className="mt-4 max-w-2xl text-xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
                      {note.title}
                    </h3>
                  </div>
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="shrink-0 text-faint transition-colors group-hover:text-accent"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-body text-pretty">
                  {note.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                  {note.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[11px] text-faint">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="mt-16 rounded-lg border border-line bg-surface p-8 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Full archive</h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-body text-pretty">
            Substack remains the best place to follow the full stream of experiments, notes, and
            technical breakdowns.
          </p>
          <a
            href="https://rakeshcheekatimala.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover"
            data-cursor-label="Substack"
          >
            Read on Substack
            <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
          </a>
        </section>
      </Reveal>
    </div>
  )
}
