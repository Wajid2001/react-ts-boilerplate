import { LoginCallback } from '@okta/okta-react'
import { type ReactNode } from 'react'
import OktaError from '../OktaError'

export default function LoginComp(): ReactNode {
  return (
    <>
      <LoginCallback
        errorComponent={props => (
          // @ts-expect-error
          <OktaError error={props?.error ?? undefined} />
        )}
        loadingElement={<div>Loading...</div>}
      />{' '}
    </>
  )
}
