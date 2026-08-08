import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import AskAgentButton from '@components/AskAgentButton'
import CaseStudyIndex from '@components/CaseStudyIndex'
import Magnetic from '@components/Magnetic'
import Reveal from '@components/Reveal'
import SocailLinks from '@components/SocailLinks'
import Spotlight from '@components/Spotlight'
import { getMockProjects } from '../lib/mock-data'
import { experiences } from '../experiences'

const LINKEDIN = 'https://www.linkedin.com/in/rakesh-cheekatimala/'

const proofPoints = [
  { value: '60%', label: 'bundle-size reduction on a payments app' },
  { value: '25%', label: 'sales lift from new payment methods' },
  { value: '30%', label: 'test automation coverage increase' },
  { value: '10+', label: 'years across Singapore engineering teams' },
]

const valuePillars = [
  {
    title: 'Revenue-critical frontend',
    description:
      'Payments, checkout, and onboarding work where speed, reliability, and business outcomes have to move together.',
  },
  {
    title: 'Platform architecture',
    description:
      'Micro-frontends, shared UI standards, Storybook documentation, and integration boundaries that help teams scale cleanly.',
  },
  {
    title: 'Delivery confidence',
    description:
      'Testing strategy, CI quality gates, Lighthouse workflows, Sentry visibility, and internal tooling that reduce delivery friction.',
  },
]

export default async function Home() {
  const projects = await getMockProjects()
  const [leadPillar, ...supportingPillars] = valuePillars

  return (
    <>
      {/* Hero: evidence-led editorial split with no decorative artwork. */}
      <section className="mx-auto grid max-w-6xl items-start gap-12 px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20 lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.55fr)] lg:gap-20">
        <div>
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Senior Software Engineer, Platforms &amp; Applied AI
            </p>
          </Reveal>

          <Reveal index={1}>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-ink text-balance md:text-5xl lg:text-6xl">
              I build revenue critical systems that customers can trust.
            </h1>
          </Reveal>

          <Reveal index={2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body text-pretty">
              I&apos;m Rakesh Cheekatimala, a Singapore-based engineer with 10+ years across
              payments, eKYC, property, commerce, and enterprise platforms.
            </p>
          </Reveal>

          <Reveal index={3}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic>
                <Link
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="LinkedIn"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover sm:w-auto"
                >
                  Connect on LinkedIn
                  <ArrowRight size={15} weight="bold" />
                </Link>
              </Magnetic>
              <AskAgentButton />
            </div>
          </Reveal>

          <Reveal index={4}>
            <div className="mt-8 flex items-center gap-1 border-t border-line pt-6">
              <SocailLinks />
            </div>
          </Reveal>
        </div>

        <Reveal index={2} distance={20}>
          <aside className="border-t border-line pt-7 lg:mt-1 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              Current focus
            </p>
            <ul className="mt-6">
              {[
                ['01', 'Frontend platforms'],
                ['02', 'Payments & identity'],
                ['03', 'Applied AI systems'],
              ].map(([number, label]) => (
                <li
                  key={number}
                  className="flex items-center gap-5 border-t border-line py-5 first:border-t-0 first:pt-0"
                >
                  <span className="font-mono text-[10px] text-accent tnum">{number}</span>
                  <span className="text-sm font-medium text-ink">{label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-line pt-6 text-sm leading-relaxed text-faint">
              Singapore-based. Building systems where platform quality directly supports customer
              trust and business growth.
            </p>
          </aside>
        </Reveal>
      </section>

      {/* Proof metrics: plain columns divided by hairlines, no cards. */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <dl className="grid grid-cols-2 gap-y-10 border-y border-line py-12 lg:grid-cols-4 lg:gap-y-0">
          {proofPoints.map((point, index) => (
            <Reveal
              key={point.value}
              index={index}
              className="lg:border-l lg:border-line lg:first:border-l-0 lg:px-8 lg:first:pl-0"
            >
              <dt className="font-mono text-4xl font-medium tracking-tight text-ink tnum md:text-5xl">
                {point.value}
              </dt>
              <dd className="mt-3 max-w-[15rem] pr-4 text-sm leading-relaxed text-faint">
                {point.label}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Positioning: asymmetric bento, one lead cell plus two supporting cells. */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="text-sm font-medium text-accent">What I&apos;m hired to improve</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-ink text-balance md:text-4xl">
            Calm engineering judgment for frontend systems.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-body text-pretty">
            I focus on performance, clean architecture, reliable tests, and developer tooling that
            helps teams ship with confidence.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <Reveal className="h-full">
            <Spotlight
              as="article"
              className="flex h-full flex-col justify-center rounded-lg border border-line bg-[radial-gradient(130%_130%_at_0%_0%,var(--color-accent-wash),transparent_58%)] p-8 md:p-12"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                {leadPillar.title}
              </h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-body text-pretty">
                {leadPillar.description}
              </p>
            </Spotlight>
          </Reveal>

          <div className="grid gap-4">
            {supportingPillars.map((pillar, index) => (
              <Reveal key={pillar.title} index={index + 1}>
                <Spotlight
                  as="article"
                  className={`h-full rounded-lg border border-line p-7 ${
                    index === 0 ? 'bg-raised' : 'bg-surface'
                  }`}
                >
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{pillar.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-body text-pretty">
                    {pillar.description}
                  </p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies: editorial index with a pointer-tracked preview. */}
      {projects.length > 0 ? (
        <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-ink text-balance md:text-4xl">
                Selected work, with the outcome first.
              </h2>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-opacity hover:opacity-70"
              >
                Case Studies
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </Reveal>

          <CaseStudyIndex projects={projects} />
        </section>
      ) : null}

      {/* Career rail: compact company list, distinct from the case study index. */}
      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Ten years of shipping in Singapore.
            </h2>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-opacity hover:opacity-70"
            >
              Review work history
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {experiences.map((experience) => (
              <li
                key={`${experience.company}-${experience.start}`}
                className="min-w-[13rem] shrink-0 snap-start rounded-md border border-line px-5 py-4"
              >
                <p className="text-[15px] font-semibold text-ink">{experience.company}</p>
                <p className="mt-1 text-[13px] leading-snug text-faint">{experience.role}</p>
                <p className="mt-3 font-mono text-[11px] text-faint tnum">
                  {experience.start} to {experience.end}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Closing CTA: single full-width band. */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8 md:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-ink text-balance md:text-4xl">
              Looking for a senior engineer who can connect platform quality to business outcomes?
            </h2>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Link
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="LinkedIn"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover sm:w-auto"
                >
                  Connect on LinkedIn
                  <ArrowRight size={15} weight="bold" />
                </Link>
              </Magnetic>
              <Link
                href="/work"
                className="inline-flex h-12 w-full items-center justify-center rounded-md border border-line-strong px-6 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent sm:w-auto"
              >
                Review work history
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
