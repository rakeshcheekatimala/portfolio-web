import { render, screen } from '@testing-library/react'
import Home from './page'

// Mock dependencies
jest.mock('../lib/mock-data', () => ({
  getMockPosts: jest.fn().mockResolvedValue([
    {
      title: 'Testing Patterns',
      slug: 'testing-patterns',
      excerpt: 'Practical testing notes',
      date: '2025-01-01',
    },
  ]),
  getMockProjects: jest.fn().mockResolvedValue([
    {
      title: 'Payments Performance Modernization',
      slug: 'payments-performance-modernization',
      summary: 'Refactored a payments experience',
      outcome: 'Reduced bundle size by 60%',
      impact: 'Reduced bundle size by 60% and supported checkout performance.',
    },
  ]),
}))

jest.mock('../components/LocationBanner', () => {
  return function MockLocationBanner() {
    return <div data-testid="location-banner">Location Banner</div>
  }
})

jest.mock('../components/SocailLinks', () => {
  return function MockSocailLinks() {
    return <div data-testid="social-links">Social Links</div>
  }
})

jest.mock('../components/AskAgentButton', () => {
  return function MockAskAgentButton() {
    return <button>Ask My Agent</button>
  }
})

describe('Home', () => {
  it('renders the hero section with name', async () => {
    const page = await Home()
    render(page)
    
    expect(screen.getByText(/I build revenue-critical frontend/i)).toBeInTheDocument()
    expect(screen.getByText(/Rakesh Cheekatimala/)).toBeInTheDocument()
  })

  it('renders the introduction text', async () => {
    const page = await Home()
    render(page)
    
    expect(screen.getByText(/Singapore-based engineer/)).toBeInTheDocument()
    expect(screen.getByText(/10\+ years/)).toBeInTheDocument()
  })

  it('renders the AskAgentButton', async () => {
    const page = await Home()
    render(page)
    
    expect(screen.getByRole('button', { name: /ask my agent/i })).toBeInTheDocument()
  })

  it('renders links to articles and work', async () => {
    const page = await Home()
    render(page)
    
    const caseStudiesLink = screen.getByRole('link', { name: /^case studies$/i })
    expect(caseStudiesLink).toHaveAttribute('href', '/projects')

    const workLinks = screen.getAllByRole('link', { name: /review work history/i })
    expect(workLinks[0]).toHaveAttribute('href', '/work')
  })

  it('renders the primary LinkedIn hiring CTA', async () => {
    const page = await Home()
    render(page)

    const linkedInLinks = screen.getAllByRole('link', { name: /connect on linkedin/i })
    expect(linkedInLinks[0]).toHaveAttribute('href', 'https://www.linkedin.com/in/rakesh-cheekatimala/')
  })

  it('renders proof points', async () => {
    const page = await Home()
    render(page)

    expect(screen.getAllByText('60%').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/bundle-size reduction/).length).toBeGreaterThan(0)
  })

  it('renders social links component', async () => {
    const page = await Home()
    render(page)
    
    expect(screen.getByTestId('social-links')).toBeInTheDocument()
  })

  it('renders the hiring value pillars and case studies', async () => {
    const page = await Home()
    render(page)
    
    expect(screen.getByText(/What I'm hired to improve/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Revenue-critical frontend' })).toBeInTheDocument()
    expect(screen.getAllByText(/Case Studies/i).length).toBeGreaterThan(0)
  })

  it('renders building, writing, and judgment sections', async () => {
    const page = await Home()
    render(page)

    expect(screen.getByText('Building now')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /AnswerLint/i })).toHaveAttribute(
      'href',
      'https://github.com/rakeshcheekatimala/answerlint'
    )
    expect(screen.getByText('Engineering notes')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Read writing/i })).toHaveAttribute('href', '/writing')
    expect(screen.getByText('Proof of judgment')).toBeInTheDocument()
  })
})
