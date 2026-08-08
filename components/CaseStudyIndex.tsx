import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import type { Project } from '../lib/projects'

type Props = { projects: Project[] }

export default function CaseStudyIndex({ projects }: Props) {
  return (
    <ol className="border-t border-line">
      {projects.map((project, index) => (
        <li key={project.slug} className="border-b border-line">
          <Link
            href={`/projects/${project.slug}`}
            data-cursor-label="Open"
            className="group grid grid-cols-[2.25rem_1fr] items-start gap-x-4 gap-y-5 py-8 md:grid-cols-[3rem_minmax(0,1fr)_auto] md:items-center md:gap-x-8 md:py-10"
          >
            <span className="font-mono text-xs text-faint tnum">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body text-pretty">
                {project.outcome ?? project.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                {project.tags?.slice(0, 4).map((tag) => (
                  <span key={tag} className="font-mono text-[11px] text-faint">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <span className="col-start-2 inline-flex items-center gap-2 text-xs font-semibold text-faint transition-colors group-hover:text-accent md:col-start-auto">
              View case study
              <ArrowRight
                size={13}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
