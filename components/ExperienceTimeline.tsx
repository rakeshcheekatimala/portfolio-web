import Reveal from './Reveal'
import { experiences } from '../experiences'

export default function ExperienceTimeline() {
  return (
    <section>
      <Reveal>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink text-balance md:text-5xl">
          Work &amp; Experience
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body text-pretty">
          A snapshot of the roles that shaped how I think about building reliable, scalable, and
          user-centric applications.
        </p>
      </Reveal>

      <ol className="mt-16">
        {experiences.map((experience) => (
          <Reveal
            key={`${experience.company}-${experience.start}`}
            as="li"
            className="grid gap-x-12 gap-y-5 border-t border-line py-10 md:grid-cols-[13rem_1fr] md:py-12"
          >
            <div className="md:sticky md:top-24 md:self-start">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint tnum">
                {experience.start} to {experience.end}
              </p>
              <p className="mt-3 text-lg font-semibold tracking-tight text-ink">
                {experience.company}
              </p>
              {experience.location ? (
                <p className="mt-1 text-sm text-faint">{experience.location}</p>
              ) : null}
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
                {experience.role}
              </h2>
              <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-body text-pretty">
                {experience.summary}
              </p>

              {experience.highlights.length > 0 ? (
                <ul className="mt-6 max-w-2xl">
                  {experience.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 border-b border-line/60 py-3.5 last:border-b-0"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-accent/70"
                      />
                      <span className="text-[15px] leading-relaxed text-body text-pretty">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {experience.tags.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-line px-2.5 py-1 font-mono text-[11px] text-faint"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
