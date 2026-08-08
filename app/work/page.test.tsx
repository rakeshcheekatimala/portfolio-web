import { render, screen } from '@testing-library/react'
import WorkPage from './page'

// Mock ExperienceTimeline component
jest.mock('../../components/ExperienceTimeline', () => {
  return function MockExperienceTimeline() {
    return <div data-testid="experience-timeline">Experience Timeline</div>
  }
})

// Mock LocationBanner component
jest.mock('../../components/LocationBanner', () => {
  return function MockLocationBanner() {
    return <div data-testid="location-banner">Location Banner</div>
  }
})

describe('WorkPage', () => {
  it('renders the work page with ExperienceTimeline', () => {
    render(<WorkPage />)
    
    expect(screen.getByTestId('experience-timeline')).toBeInTheDocument()
  })

  // The root layout owns the single <main> landmark, so the page must not add another.
  it('does not nest a second main landmark', () => {
    const { container } = render(<WorkPage />)

    expect(container.querySelector('main')).not.toBeInTheDocument()
  })
})
