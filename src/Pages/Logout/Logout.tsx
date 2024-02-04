import { useOktaAuth } from '@okta/okta-react'
import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

export default function Logout(): ReactNode {
  const { oktaAuth, authState } = useOktaAuth()
  const location = useLocation()

  useEffect(() => {
    void (async () => {
      if (!authState?.isAuthenticated) {
        window.location.href = '/'
        return
      }
      await oktaAuth.signOut()
    })()
  }, [oktaAuth, location, authState])

  return 'Logging out...'
}
