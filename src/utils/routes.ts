import HomePage from '../Pages/Home/Home'

export const ROUTE_PATHS = {
  HOME: '/',
  NOT_AUTHORIZED: '/403',
  LOGIN: '/login',
  LOGOUT: '/logout',
}

export const ROUTES = [
  {
    path: ROUTE_PATHS.HOME,
    Component: HomePage,
  },
]
