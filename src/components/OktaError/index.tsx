import { type ReactNode } from 'react'

export interface CustomError extends Error {
  errorCode: string
  errorSummary: string
}

export default function OktaError({
  error,
}: {
  error?: CustomError
}): ReactNode | null {
  if (error !== null && error !== undefined) {
    let errorToDisplay = `[${error?.name}: ${error?.errorSummary}]`

    if (error?.errorCode === 'access_denied') {
      errorToDisplay = '403 Forbidden'
    }

    return (
      <div data-testid={'error-403'} style={{ color: 'red' }}>
        <p>{errorToDisplay}</p>
      </div>
    )
  }

  return null
}
