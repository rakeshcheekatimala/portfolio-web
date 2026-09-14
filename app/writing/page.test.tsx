import { render, screen } from '@testing-library/react'
import WritingPage from './page'

describe('WritingPage', () => {
  it('renders the writing page title and themes', () => {
    render(<WritingPage />)

    expect(screen.getByText('Engineering Notes')).toBeInTheDocument()
    expect(screen.getByText(/Practical writing on platforms/)).toBeInTheDocument()
    expect(screen.getByText('Production AI reliability')).toBeInTheDocument()
  })

  it('renders curated article links and the Substack archive link', () => {
    render(<WritingPage />)

    expect(screen.getByRole('link', { name: /AI Gateway/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/pulse/ai-gateway-building-reliable-control-plane-llm-rakesh-cheekatimala-aazoc'
    )
    expect(screen.getByRole('link', { name: /Multi-Agent Coding Orchestration/i })).toHaveAttribute(
      'href',
      'https://rakeshcheekatimala.substack.com/p/the-multi-agent-coding-orchestration'
    )
    expect(screen.getByRole('link', { name: /Read on Substack/i })).toHaveAttribute(
      'href',
      'https://rakeshcheekatimala.substack.com'
    )
  })
})
