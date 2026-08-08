import { render, screen } from '@testing-library/react'
import ProjectsPage from './page'

// Mock getMockProjects
jest.mock('../../lib/mock-data', () => ({
  getMockProjects: jest.fn().mockResolvedValue([
    {
      title: 'Project One',
      slug: 'project-one',
      summary: 'Summary of project one',
      url: 'https://example.com/project-one',
    },
    {
      title: 'Project Two',
      slug: 'project-two',
      summary: 'Summary of project two',
    },
  ]),
}))

describe('ProjectsPage', () => {
  it('renders the page title and description', async () => {
    const page = await ProjectsPage()
    const { container } = render(page)
    
    expect(screen.getByText('Engineering work with measurable value')).toBeInTheDocument()
    expect(screen.getByText(/frontend architecture, performance, quality/)).toBeInTheDocument()
  })

  it('renders all projects', async () => {
    const page = await ProjectsPage()
    render(page)
    
    expect(screen.getByText('Project One')).toBeInTheDocument()
    expect(screen.getByText('Project Two')).toBeInTheDocument()
    expect(screen.getByText('Summary of project one')).toBeInTheDocument()
    expect(screen.getByText('Summary of project two')).toBeInTheDocument()
  })

  it('renders links to individual project pages', async () => {
    const page = await ProjectsPage()
    render(page)

    expect(screen.getByRole('link', { name: /Project One/ })).toHaveAttribute(
      'href',
      '/projects/project-one'
    )
    expect(screen.getByRole('link', { name: /Project Two/ })).toHaveAttribute(
      'href',
      '/projects/project-two'
    )
  })
})
