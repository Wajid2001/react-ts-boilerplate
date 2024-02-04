import { render, screen } from '@testing-library/react'
import Error403 from './403'
describe('403 view', () => {
  it('should render error', () => {
    render(<Error403 />)
    expect(screen.getByText('403 Forbidden')).toBeInTheDocument()
  })
})
