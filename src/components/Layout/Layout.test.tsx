import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Layout from './index'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '',
  }),
}))

describe('Routes', () => {
  it('should render routes', () => {
    render(
      <MemoryRouter>
        <Layout>Test</Layout>
      </MemoryRouter>
    )
    expect(screen.getByTestId('app-container')).toBeInTheDocument()
  })
})
