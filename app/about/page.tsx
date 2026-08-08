import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import LocationBanner from '@components/LocationBanner'
import Reveal from '@components/Reveal'

export const metadata: Metadata = {
  title: 'About - Rakesh Cheekatimala',
  description:
    'Senior platform engineer in Singapore working across payments, eKYC, property, e-commerce, enterprise platforms, and developer tooling.',
  alternates: { canonical: '/about' },
}

const certifications = [
  {
    title: 'Architecting Agentic AI Solutions',
    issuer: 'National University of Singapore',
    date: 'Issued Mar 2026',
  },
  {
    title: 'Deploying and Operating AI Solutions - LLMOps',
    issuer: 'National University of Singapore',
    date: 'Issued Mar 2026',
  },
  {
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Issued Jan 2026 - Expires Jan 2029',
  },
  {
    title: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    date: 'Issued Mar 2026 - Expires Mar 2029',
  },
]

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <div className="max-w-3xl">
        <div>
          <Reveal>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-5xl">
              About
            </h1>
          </Reveal>

          <Reveal index={1}>
            <div className="mt-10 max-w-2xl space-y-6">
              <p className="text-xl leading-relaxed text-ink text-pretty">
                I&apos;m a senior platform engineer based in Singapore. Over the last 10+ years,
                I&apos;ve worked across payments, eKYC, property, e-commerce, enterprise platforms,
                and developer tooling.
              </p>
              <p className="text-[17px] leading-relaxed text-body text-pretty">
                My strongest work sits where product value and engineering quality meet: faster
                checkout flows, cleaner frontend architecture, reliable testing practices, shared
                component systems, and tools that help teams move with more confidence.
              </p>
              <p className="text-[17px] leading-relaxed text-body text-pretty">
                I care about systems that hold up after launch. That means clear boundaries,
                practical documentation, measurable performance work, and code that the next
                engineer can understand without archaeology.
              </p>
            </div>
          </Reveal>
        </div>

      </div>

      <section className="mt-24 border-t border-line pt-12">
        <Reveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold tracking-tight text-ink">Certifications</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-body">
                Recent AI and cloud credentials that support the Applied AI and platform direction.
              </p>
            </div>
            <Link
              href="https://sg.linkedin.com/in/rakesh-cheekatimala?trk=public_post_feed-actor-name"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-line-strong px-5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Verify on LinkedIn
              <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <ul className="mt-10 grid gap-x-12 sm:grid-cols-2">
            {certifications.map((certification) => (
              <li key={certification.title} className="border-t border-line py-6">
                <h3 className="text-base font-semibold leading-snug text-ink">
                  {certification.title}
                </h3>
                <p className="mt-2 text-sm text-body">{certification.issuer}</p>
                <p className="mt-1 font-mono text-[11px] text-faint tnum">{certification.date}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mt-24 rounded-lg border border-line bg-[radial-gradient(120%_120%_at_100%_0%,var(--color-accent-wash),transparent_60%)] p-8 md:p-12">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight text-ink">Let&apos;s Connect</h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-body text-pretty">
            Interested in senior frontend platform work, architecture, payments, eKYC, or developer
            tooling? LinkedIn is the best place to start.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="https://www.linkedin.com/in/rakesh-cheekatimala/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/rakeshcheekatimala"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-md border border-line-strong px-6 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mt-24 border-t border-line pt-12">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight text-ink">Based in Singapore</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-body">
            A small geographic note for context, kept here rather than on the hiring-focused
            homepage.
          </p>
        </Reveal>
        <div className="mt-8">
          <LocationBanner />
        </div>
      </section>
    </div>
  )
}
