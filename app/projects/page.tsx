import type { Metadata } from 'next'
import CaseStudyIndex from '@components/CaseStudyIndex'
import Reveal from '@components/Reveal'
import { getMockProjects } from '../../lib/mock-data'

export const metadata: Metadata = {
  title: 'Case Studies - Rakesh Cheekatimala',
  description:
    'Frontend architecture, performance, quality, and developer experience work from production payments, eKYC, and property systems.',
  alternates: { canonical: '/projects' },
}

export default async function ProjectsPage() {
  const projects = await getMockProjects()

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Case Studies</p>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink text-balance md:text-5xl">
          Engineering work with measurable value
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body text-pretty">
          A focused set of frontend architecture, performance, quality, and developer experience work
          from production systems, shaped for quick hiring-leader review.
        </p>
      </Reveal>

      <div className="mt-16">
        <CaseStudyIndex projects={projects} />
      </div>
    </div>
  )
}
