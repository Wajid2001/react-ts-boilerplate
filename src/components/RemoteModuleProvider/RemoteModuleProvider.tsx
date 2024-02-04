import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { Security } from '@okta/okta-react'
import axios from 'axios'
import type React from 'react'
import { type ReactNode, useEffect, useMemo } from 'react'

/**
 * Please note this component will wrap all routes exposed through module
 * federation.
 */
function RemoteModuleProvider({
  children,
  oktaClientId,
}: {
  children: React.ReactElement
  oktaClientId?: string
}): ReactNode {
  const oktaAuth = useMemo(() => {
    const windowOrig = window as any
    return new OktaAuth({
      issuer: windowOrig.REACT_APP_ISSUER,
      clientId: oktaClientId ?? windowOrig.REACT_APP_CLIENT_ID,
      redirectUri: windowOrig.REACT_APP_REDIRECT_URI,
      postLogoutRedirectUri: windowOrig.REACT_APP_LOGOUT_URI,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      pkce: windowOrig.REACT_APP_PKCE === 'true',
    })
  }, [])

  const accessToken = oktaAuth?.getAccessToken() ?? null
  useEffect(() => {
    // If already logged in then set access token to axios
    // get the authentication token from local storage if it exists
    if (accessToken) {
      axios.defaults.headers.post.Authorization = `Bearer ${accessToken}`
    }
  }, [accessToken])

  const triggerLogin = (): void => {
    void oktaAuth.signInWithRedirect({ originalUri: '/' })
  }

  const restoreOriginalUri = (
    _oktaAuth: OktaAuth,
    originalUri: string
  ): void => {
    window.location.replace(
      toRelativeUrl(originalUri || '/', window.location.origin)
    )
  }

  const customAuthHandler = (): void => {
    const previousAuthState = oktaAuth.authStateManager.getPreviousAuthState()
    if (!previousAuthState || !previousAuthState.isAuthenticated) {
      triggerLogin()
    }
  }

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      {children}
    </Security>
  )
}

export default RemoteModuleProvider
