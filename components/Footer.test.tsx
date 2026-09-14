import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the wordmark and the writing link', () => {
    render(<Footer />)

    expect(screen.getByText('Rakesh Cheekatimala')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /read on substack/i })).toHaveAttribute(
      'href',
      'https://rakeshcheekatimala.substack.com'
    )
  })

  it('renders navigation links', () => {
    render(<Footer />)

    expect(screen.getByRole('navigation', { name: 'Footer' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/work')
    expect(screen.getByRole('link', { name: 'Case Studies' })).toHaveAttribute('href', '/projects')
    expect(screen.getByRole('link', { name: 'Writing' })).toHaveAttribute('href', '/writing')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
  })

  it('renders real social links', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/rakeshcheekatimala')
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/rakesh-cheekatimala/')
  })

  it('renders copyright with current year', () => {
    render(<Footer />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument()
  })

  it('renders as a footer element', () => {
    const { container } = render(<Footer />)
    
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })
})
