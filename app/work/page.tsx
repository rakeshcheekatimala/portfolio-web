import type { Metadata } from 'next'
import ExperienceTimeline from '@components/ExperienceTimeline'

export const metadata: Metadata = {
  title: 'Work & Experience - Rakesh Cheekatimala',
  description:
    'Ten years of frontend and platform engineering roles across Singtel, 99.co, Capita, ITCAN, VISEO, Comtel, and Persistent Systems.',
  alternates: { canonical: '/work' },
}

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <ExperienceTimeline />
    </div>
  )
}
