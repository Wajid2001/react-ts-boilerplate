import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import OktaError from './'

const mockError = {
  errorCode: 'bad_request',
  name: 'bad_request',
  errorSummary: 'mock_summary',
}

describe('Okta Error view', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        {/* @ts-expect-error */}
        <OktaError error={mockError} />
      </MemoryRouter>
    )
    expect(
      screen.getByText(`[${mockError.name}: ${mockError.errorSummary}]`)
    ).toBeInTheDocument()
  })
  it('should render access_denied', () => {
    mockError.errorCode = 'access_denied'
    render(
      <MemoryRouter>
        {/* @ts-expect-error */}
        <OktaError error={mockError} />
      </MemoryRouter>
    )
    act(() => {
      expect(screen.getByText('403 Forbidden')).toBeInTheDocument()
    })
  })
  it('should render undefined', () => {
    render(
      <MemoryRouter>
        <OktaError error={undefined} />
      </MemoryRouter>
    )
  })
})
