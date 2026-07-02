import { Navigate } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext.jsx'

export default function RequireAdmin({ children }) {
  const { status } = useAdminAuth()

  if (status === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b10] text-white/50">
        Checking session…
      </div>
    )
  }

  if (status === 'guest') {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
