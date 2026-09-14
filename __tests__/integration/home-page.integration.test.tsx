/**
 * Integration test for the home page
 * Tests the full page rendering with all components working together
 */
import { render, screen } from '@testing-library/react'
import Home from '../../app/page'

// Mock all child components to focus on integration
jest.mock('../../lib/mock-data', () => ({
  getMockPosts: jest.fn().mockResolvedValue([
    {
      title: 'Test Post',
      slug: 'test-post',
      excerpt: 'Test excerpt',
      content: '',
      date: '2024-01-01',
    },
  ]),
  getMockProjects: jest.fn().mockResolvedValue([
    {
      title: 'Test Project',
      slug: 'test-project',
      summary: 'Test summary',
    },
  ]),
}))

jest.mock('../../components/LocationBanner', () => {
  return function MockLocationBanner() {
    return (
      <div data-testid="location-banner">
        <p>I&apos;m from Singapore, roughly 1,234km away from your current location</p>
      </div>
    )
  }
})

jest.mock('../../components/SocailLinks', () => {
  return function MockSocailLinks() {
    return (
      <div data-testid="social-links">
        <a href="https://x.com/test" aria-label="Twitter">Twitter</a>
        <a href="https://linkedin.com/test" aria-label="LinkedIn">LinkedIn</a>
      </div>
    )
  }
})

jest.mock('../../components/AskAgentButton', () => {
  return function MockAskAgentButton() {
    return <button>Ask My Agent</button>
  }
})

describe('Home Page Integration', () => {
  it('renders complete home page with all sections', async () => {
    const page = await Home()
    render(page)
    
    // Hero section
    expect(screen.getByText(/I build revenue-critical frontend/i)).toBeInTheDocument()
    expect(screen.getByText(/Rakesh Cheekatimala/)).toBeInTheDocument()
    expect(screen.getByText(/Singapore-based engineer/)).toBeInTheDocument()
    expect(screen.getByText('Best fit for')).toBeInTheDocument()
    expect(screen.getAllByText('Senior Frontend Engineer').length).toBeGreaterThan(0)
    
    // CTA buttons
    expect(screen.getByRole('link', { name: /^case studies$/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /review work history/i })[0]).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /connect on linkedin/i })[0]).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ask my agent/i })).toBeInTheDocument()
    
    // Social links
    expect(screen.getByTestId('social-links')).toBeInTheDocument()
    
    // Hiring proof sections
    expect(screen.getByText(/What I'm hired to improve/i)).toBeInTheDocument()
    expect(screen.getByText('Building now')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /AnswerLint/i })).toHaveAttribute(
      'href',
      'https://github.com/rakeshcheekatimala/answerlint'
    )
    expect(screen.getByText('Engineering notes')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Read writing/i })).toHaveAttribute('href', '/writing')
    expect(screen.getByText('Proof of judgment')).toBeInTheDocument()
    expect(screen.getAllByText(/Case Studies/i).length).toBeGreaterThan(0)
  })

  it('has correct external link attributes', async () => {
    const page = await Home()
    render(page)
    
    const caseStudiesLink = screen.getByRole('link', { name: /^case studies$/i })
    expect(caseStudiesLink).toHaveAttribute('href', '/projects')
    expect(caseStudiesLink).not.toHaveAttribute('target')
  })

  it('has correct internal navigation', async () => {
    const page = await Home()
    render(page)
    
    const workLink = screen.getAllByRole('link', { name: /review work history/i })[0]
    expect(workLink).toHaveAttribute('href', '/work')
    expect(workLink).not.toHaveAttribute('target')
  })

  it('renders all major sections in correct order', async () => {
    const page = await Home()
    const { container } = render(page)
    
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThanOrEqual(1)
    
    // Hero section should be first
    const firstSection = sections[0]
    expect(firstSection.textContent).toContain('revenue-critical')
    expect(firstSection.textContent).toContain('Rakesh')
  })
})
