import { type ReactNode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Logout from './Pages/Logout/Logout'
import Error403 from './components/403/403'
import Layout from './components/Layout'
import LoginComp from './components/LoginComp/LoginComp'
import RemoteModuleProvider from './components/RemoteModuleProvider/RemoteModuleProvider'
import { ROUTES, ROUTE_PATHS } from './utils/routes'

export default function App(): ReactNode {
  return (
    <RemoteModuleProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_PATHS.LOGOUT} element={<Logout />} />
          <Route path={ROUTE_PATHS.LOGIN} element={<LoginComp />} />
          <Route path={ROUTE_PATHS.NOT_AUTHORIZED} element={<Error403 />} />

          {ROUTES.map(({ path, Component }, index) => {
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </BrowserRouter>
    </RemoteModuleProvider>
  )
}
