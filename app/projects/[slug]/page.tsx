import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Reveal from '@components/Reveal'
import { mockProjects } from '../../../lib/mock-data'

type Params = { params: { slug: string } }

export function generateStaticParams() {
  return mockProjects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const project = mockProjects.find((item) => item.slug === params.slug)
  if (!project) return { title: 'Case study not found' }

  return {
    title: `${project.title} - Rakesh Cheekatimala`,
    description: project.outcome ?? project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.outcome ?? project.summary,
    },
  }
}

export default function ProjectPage({ params }: Params) {
  const index = mockProjects.findIndex((item) => item.slug === params.slug)
  if (index === -1) notFound()

  const project = mockProjects[index]
  const nextProject = mockProjects[(index + 1) % mockProjects.length]
  const decisions = project.approach ?? project.highlights ?? []

  const sections = [
    {
      heading: 'Problem',
      body: [project.problem ?? project.summary, project.context].filter(Boolean) as string[],
    },
    { heading: 'Constraints', body: project.constraints ? [project.constraints] : [] },
    {
      heading: 'My Role',
      body: [project.roleDetails ?? project.role].filter(Boolean) as string[],
    },
  ].filter((section) => section.body.length > 0)

  return (
    <article className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-faint transition-colors hover:text-accent"
      >
        <ArrowLeft size={14} weight="bold" aria-hidden="true" />
        Back to Case Studies
      </Link>

      <Reveal>
        <header className="mt-10 border-b border-line pb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Case Study</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink text-balance md:text-5xl">
            {project.title}
          </h1>
          {project.outcome ? (
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-body text-pretty md:text-xl">
              {project.outcome}
            </p>
          ) : null}
        </header>
      </Reveal>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.55fr_0.85fr] lg:gap-20">
        <div className="max-w-2xl">
          {sections.map((section, sectionIndex) => (
            <Reveal key={section.heading} index={sectionIndex}>
              <section className="border-t border-line pt-8 first:border-t-0 first:pt-0 [&:not(:first-child)]:mt-12">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-[17px] leading-relaxed text-body text-pretty first-of-type:mt-5"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            </Reveal>
          ))}

          {decisions.length > 0 ? (
            <Reveal>
              <section className="mt-12 border-t border-line pt-8">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                  Decisions
                </h2>
                <ol className="mt-5">
                  {decisions.map((item, decisionIndex) => (
                    <li
                      key={item}
                      className="flex gap-5 border-b border-line/70 py-5 last:border-b-0 last:pb-0"
                    >
                      <span className="font-mono text-xs text-accent tnum">
                        {String(decisionIndex + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[17px] leading-relaxed text-body text-pretty">{item}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>
          ) : null}

          {project.impact ? (
            <Reveal>
              <section className="mt-12 border-t border-line pt-8">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                  Impact
                </h2>
                <p className="mt-5 text-[17px] leading-relaxed text-body text-pretty">
                  {project.impact}
                </p>
              </section>
            </Reveal>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          {project.metrics?.length ? (
            <section>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                Evidence
              </h2>
              <ul className="mt-5">
                {project.metrics.map((metric) => (
                  <li
                    key={metric}
                    className="border-b border-line py-4 text-[15px] leading-snug text-ink tnum first:border-t first:border-line"
                  >
                    {metric}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.tags?.length ? (
            <section className="mt-12">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Stack</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex h-7 items-center rounded-md border border-line-strong bg-raised px-3 font-mono text-xs font-medium text-body shadow-low"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {project.url || project.repoUrl ? (
            <section className="mt-12 flex flex-col gap-3">
              {project.url ? (
                <Link
                  href={project.url}
                  className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover"
                >
                  View Project
                </Link>
              ) : null}
              {project.repoUrl ? (
                <Link
                  href={project.repoUrl}
                  className="inline-flex h-11 items-center justify-center rounded-md border border-line-strong px-5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  GitHub
                </Link>
              ) : null}
            </section>
          ) : null}
        </aside>
      </div>

      <nav
        aria-label="Case study navigation"
        className="mt-20 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-faint transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          Back to Case Studies
        </Link>

        {nextProject.slug !== project.slug ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
          >
            <span className="text-faint">Next</span>
            {nextProject.title}
            <ArrowRight size={14} weight="bold" aria-hidden="true" />
          </Link>
        ) : null}
      </nav>
    </article>
  )
}
