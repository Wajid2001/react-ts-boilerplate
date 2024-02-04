import { useOktaAuth } from '@okta/okta-react'
import { useCallback, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useOkta } from '../../hooks/okta-hooks'
import { ROUTE_PATHS } from '../../utils/routes'

const Layout = ({ children }: { children: ReactNode }): ReactNode => {
  const { authState } = useOktaAuth()
  const { authenticate } = useOkta()
  const locationOrg = useLocation()

  const loginUser = useCallback((): void => {
    const query = new URLSearchParams(locationOrg.search)
    const error = query.get('error')
    if (locationOrg.pathname !== '/403' && error !== 'access_denied')
      authenticate()
  }, [locationOrg.search, locationOrg.pathname, authenticate])

  const logoutUser = useCallback((): void => {
    window.location.href = ROUTE_PATHS.LOGOUT
  }, [])

  if (!(authState?.isAuthenticated ?? false))
    return (
      <>
        <button onClick={loginUser}>Login</button>
      </>
    )

  return (
    <>
      <button onClick={logoutUser}>Logout</button>
      {children}
    </>
  )
}
export default Layout
