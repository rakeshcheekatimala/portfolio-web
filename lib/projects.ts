export type Project = {
  title: string
  slug: string
  summary: string
  outcome?: string
  context?: string
  role?: string
  problem?: string
  constraints?: string
  approach?: string[]
  impact?: string
  roleDetails?: string
  metrics?: string[]
  highlights?: string[]
  tags?: string[]
  url?: string
  repoUrl?: string
}

export const mockProjects: Project[] = [
  {
    title: 'Payments Performance Modernization',
    slug: 'payments-performance-modernization',
    summary: 'Refactored a revenue-critical payments experience with lazy loading and cleaner frontend boundaries.',
    outcome: 'Reduced bundle size by 60% and supported faster checkout performance.',
    context: 'Payments flows need to feel instant and stay reliable because every extra second can affect conversion, support load, and customer trust.',
    role: 'Led frontend refactoring across performance, architecture, and delivery quality.',
    problem: 'The payments experience had to stay fast and reliable while supporting business-critical checkout improvements.',
    constraints: 'The work touched revenue-sensitive flows, so changes needed to reduce frontend weight without weakening reliability or delivery confidence.',
    approach: [
      'Split heavy paths with lazy loading so checkout users downloaded less code up front.',
      'Kept architecture boundaries clear while contributing to new payment methods and save-card capability.',
      'Used performance audits to keep technical changes connected to user and business outcomes.'
    ],
    impact: 'Reduced bundle size by 60%, contributed to payment methods tied to a 25% sales lift, and supported save-card work tied to an additional 3% lift.',
    roleDetails: 'Owned the frontend refactoring approach and kept performance, architecture, and delivery quality aligned across the checkout journey.',
    metrics: ['60% bundle-size reduction', '25% sales lift from new payment methods', '3% sales lift from save-card capability'],
    highlights: [
      'Split heavy frontend paths with lazy loading so checkout users downloaded less code up front.',
      'Contributed to new payment methods and save-card capability across production payment journeys.',
      'Used performance audits to keep the work tied to measurable user and business outcomes.'
    ],
    tags: ['React', 'TypeScript', 'Performance', 'Payments', 'Lighthouse'],
  },
  {
    title: 'eKYC Micro-Frontend Platform',
    slug: 'ekyc-micro-frontend-platform',
    summary: 'Designed a micro-frontend foundation for registration, verification, and outcome flows.',
    outcome: 'Streamlined delivery across eKYC journeys while keeping teams aligned on shared frontend standards.',
    context: 'Identity flows sit at the intersection of compliance, customer onboarding, and cross-team delivery, so the architecture has to be clear and resilient.',
    role: 'Led the frontend architecture and implementation using React, Rollup, shared UI patterns, and cross-team technical standards.',
    problem: 'Registration, verification, and outcome flows needed a frontend foundation that multiple teams could reason about consistently.',
    constraints: 'The platform had to support compliance-sensitive onboarding work while preserving clear integration boundaries and shared standards.',
    approach: [
      'Created a Rollup-based micro-frontend approach for eKYC registration, verification, and outcome flows.',
      'Standardized shared UI patterns with Storybook documentation to reduce drift across journeys.',
      'Made integration boundaries easier to understand so teams could move faster without fragmenting the frontend.'
    ],
    impact: 'Aligned three eKYC journey areas around reusable frontend packaging, shared component standards, and clearer delivery boundaries.',
    roleDetails: 'Led frontend architecture and implementation across React, Rollup, shared UI patterns, and cross-team technical standards.',
    metrics: ['3 eKYC journey areas aligned', 'Shared component standards', 'Reusable Rollup-based frontend packaging'],
    highlights: [
      'Created a scalable micro-frontend approach for registration, verification, and outcome flows.',
      'Standardized shared UI patterns with Storybook documentation for more consistent delivery.',
      'Improved team velocity by making frontend integration boundaries easier to reason about.'
    ],
    tags: ['React', 'Rollup', 'Micro-Frontend', 'Storybook', 'Architecture'],
  },
  {
    title: 'Developer Tooling & Quality System',
    slug: 'developer-tooling-quality-system',
    summary: 'Built internal tooling and quality practices that made frontend delivery easier to operate.',
    outcome: 'Improved developer experience through internal CLI automation, component documentation, testing standards, and CI quality gates.',
    context: 'Sustainable frontend teams need more than components; they need guardrails, observability, and repeatable workflows that reduce delivery friction.',
    role: 'Built Node.js automation, Storybook documentation, Lighthouse audit workflows, and testing standards across frontend applications.',
    problem: 'Frontend delivery needed repeatable guardrails for quality, documentation, performance, and developer workflow speed.',
    constraints: 'The work had to improve team confidence without creating process overhead or slowing product delivery.',
    approach: [
      'Built internal Node.js CLI automation to remove repeated development tasks.',
      'Documented reusable UI components with Storybook and improved testing standards with Jest, Cypress, and CI coverage gates.',
      'Used Lighthouse audit workflows to make performance checks part of the delivery system.'
    ],
    impact: 'Improved developer experience with CLI automation, Storybook standards, Lighthouse workflows, and testing gates including a 30% coverage increase at 99.co.',
    roleDetails: 'Built and connected the tooling, documentation, testing, and performance practices that made frontend work easier to operate.',
    metrics: ['30% test coverage increase at 99.co', '75% minimum coverage gate in CI', 'Automated Lighthouse audit workflows'],
    highlights: [
      'Built internal CLI tools with Node.js to automate repeated development tasks.',
      'Used Storybook to document reusable UI components and improve design consistency.',
      'Set up Cypress and CI coverage gates to catch regressions earlier in the delivery lifecycle.'
    ],
    tags: ['Node.js', 'Storybook', 'Cypress', 'Jest', 'CI/CD', 'Developer Experience'],
  }
]
