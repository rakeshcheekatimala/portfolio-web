import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders the home link with the wordmark', () => {
    render(<Header />)

    // The portrait is decorative; the link itself carries the accessible name.
    expect(screen.getByRole('link', { name: /rakesh cheekatimala, home/i })).toHaveAttribute(
      'href',
      '/'
    )
    expect(screen.getByText('Rakesh')).toBeInTheDocument()
  })

  it('renders desktop navigation links', () => {
    render(<Header />)
      
    const workLink = screen.getAllByRole('link', { name: /work/i })[0]
    expect(workLink).toHaveAttribute('href', '/work')

    const caseStudiesLink = screen.getAllByRole('link', { name: /case studies/i })[0]
    expect(caseStudiesLink).toHaveAttribute('href', '/projects')

    const writingLink = screen.getAllByRole('link', { name: /writing/i })[0]
    expect(writingLink).toHaveAttribute('href', '/writing')
    
    const aboutLink = screen.getAllByRole('link', { name: /about/i })[0]
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('toggles mobile menu when hamburger is clicked', async () => {
    render(<Header />)
    
    const menuButton = screen.getByRole('button', { name: /open menu/i })

    // Menu should be closed initially
    expect(screen.queryAllByText('Case Studies')).toHaveLength(1)
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    // Open menu
    fireEvent.click(menuButton)
    await waitFor(() => {
      expect(screen.getAllByText('Case Studies')).toHaveLength(2)
    })
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute(
      'aria-expanded',
      'true'
    )

    // Close menu
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }))
    await waitFor(() => {
      expect(screen.queryAllByText('Case Studies')).toHaveLength(1)
    })
  })

  it('renders as a header element with sticky positioning', () => {
    const { container } = render(<Header />)
    
    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('sticky')
  })
})
