import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { adminApi, setCsrfToken } from './adminApi.js'

const AdminAuthContext = createContext(null)

// status: 'checking' | 'authed' | 'guest'
export default function AdminAuthProvider({ children }) {
  const [state, setState] = useState({ status: 'checking', admin: null })

  const checkSession = useCallback(async () => {
    try {
      const { admin, csrfToken } = await adminApi.me()
      setCsrfToken(csrfToken)
      setState({ status: 'authed', admin })
    } catch {
      setCsrfToken(null)
      setState({ status: 'guest', admin: null })
    }
  }, [])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  const login = useCallback(async (username, password) => {
    const { admin, csrfToken } = await adminApi.login(username, password)
    setCsrfToken(csrfToken)
    setState({ status: 'authed', admin })
  }, [])

  const logout = useCallback(async () => {
    await adminApi.logout().catch(() => {})
    setCsrfToken(null)
    setState({ status: 'guest', admin: null })
  }, [])

  return (
    <AdminAuthContext.Provider value={{ ...state, login, logout }}>{children}</AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}
