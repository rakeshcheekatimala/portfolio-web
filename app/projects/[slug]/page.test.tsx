import { render, screen } from '@testing-library/react'
import ProjectPage from './page'

// Mock mockProjects
jest.mock('../../../lib/mock-data', () => ({
  mockProjects: [
    {
      title: 'Test Project',
      slug: 'test-project',
      summary: 'This is a test project summary',
      outcome: 'This is a test project outcome',
      context: 'This is test context',
      problem: 'This is the test problem',
      constraints: 'This is the test constraint',
      approach: ['Decision one'],
      impact: 'This is the test impact',
      roleDetails: 'Owned the detailed role',
      role: 'Led the test project',
      metrics: ['Metric one'],
      highlights: ['Changed one thing'],
      tags: ['React'],
      url: 'https://example.com',
      repoUrl: 'https://github.com/example/test',
    },
    {
      title: 'Another Project',
      slug: 'another-project',
      summary: 'Another project summary',
    },
  ],
}))

describe('ProjectPage', () => {
  it('renders project when slug exists', () => {
    render(<ProjectPage params={{ slug: 'test-project' }} />)
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('This is the test problem')).toBeInTheDocument()
  })

  // An unknown slug now hands off to the Next.js not-found boundary.
  it('triggers the not-found boundary when the slug does not exist', () => {
    expect(() => render(<ProjectPage params={{ slug: 'non-existent' }} />)).toThrow(
      /NEXT_NOT_FOUND/
    )
  })

  it('renders back to work links', () => {
    render(<ProjectPage params={{ slug: 'test-project' }} />)
    
    const backLinks = screen.getAllByRole('link', { name: /back to case studies/i })
    expect(backLinks.length).toBeGreaterThan(0)
    expect(backLinks[0]).toHaveAttribute('href', '/projects')
  })

  it('renders project action buttons', () => {
    render(<ProjectPage params={{ slug: 'test-project' }} />)
    
    expect(screen.getByRole('link', { name: /view project/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
  })

  it('renders case study details', () => {
    render(<ProjectPage params={{ slug: 'test-project' }} />)
    
    expect(screen.getByText(/This is the test problem/)).toBeInTheDocument()
    expect(screen.getByText(/This is the test constraint/)).toBeInTheDocument()
    expect(screen.getByText(/Owned the detailed role/)).toBeInTheDocument()
    expect(screen.getByText(/Decision one/)).toBeInTheDocument()
    expect(screen.getByText(/This is the test impact/)).toBeInTheDocument()
    expect(screen.getByText(/Metric one/)).toBeInTheDocument()
  })
})
