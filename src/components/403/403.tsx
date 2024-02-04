import { type ReactNode } from 'react'

const Error403 = (): ReactNode => {
  return (
    <div data-testid={'error-403'} style={{ color: 'red' }}>
      403 Forbidden
    </div>
  )
}

export default Error403
