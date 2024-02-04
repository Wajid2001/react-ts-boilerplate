import { act, renderHook } from '@testing-library/react-hooks'
import { useOkta } from './okta-hooks'

const mockSignInWithRedirect = jest.fn()
let mockAuthenticate = true
jest.mock('@okta/okta-react', () => {
  return {
    useOktaAuth: () => ({
      authState: { isAuthenticated: mockAuthenticate },
      authService: { handleAuthentication: jest.fn() },
      oktaAuth: {
        getUser: async () =>
          await new Promise((resolve, reject) => {
            resolve('foo')
          }),
        signInWithRedirect: mockSignInWithRedirect,
      },
    }),
  }
})

test('should return auth state', () => {
  const { result } = renderHook(() => useOkta())
  act(() => {
    result.current.authenticate()
  })
  expect(result.current.authState).toStrictEqual({ isAuthenticated: true })
})

test('should redirect to auth', () => {
  mockAuthenticate = false
  const { result } = renderHook(() => useOkta())

  act(() => {
    result.current.authenticate()
  })

  expect(mockSignInWithRedirect).toHaveBeenCalled()
})
