import { useOktaAuth } from '@okta/okta-react'

interface IUseOkta {
  authState: any
  authenticate: () => void
}

export const useOkta = (): IUseOkta => {
  const { authState, oktaAuth } = useOktaAuth()
  function authenticate(): void {
    if (authState == null) return

    if (!(authState?.isAuthenticated ?? false)) {
      void oktaAuth.signInWithRedirect({ originalUri: '/' })
    }
  }

  return {
    authState,
    authenticate,
  }
}
