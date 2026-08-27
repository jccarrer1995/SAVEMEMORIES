import { Navigate, useLocation } from 'react-router-dom'
import { auth } from '../../../lib/firebase/index.js'
import { ROLES } from '../../../shared/constants/roles.js'
import { useAuth } from '../hooks/useAuth.js'
import { AuthLoadingScreen } from './AuthLoadingScreen.jsx'
import { FirebaseRequiredScreen } from './FirebaseRequiredScreen.jsx'
import { UnauthorizedPage } from './UnauthorizedPage.jsx'

/**
 * @param {{ allowedRoles: string[], children: import('react').ReactNode }} props
 * @returns {import('react').ReactElement}
 */
export function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, profile, loading, isConfigured } = useAuth()
  const location = useLocation()
  const waitingForProfile = Boolean(auth?.currentUser && !profile)

  if (!isConfigured) {
    return <FirebaseRequiredScreen />
  }

  if (loading || waitingForProfile) {
    return <AuthLoadingScreen />
  }

  if (!isAuthenticated || !profile) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (!allowedRoles.includes(profile.role)) {
    const requiredRole = allowedRoles.includes(ROLES.ADMIN) ? 'administrador' : 'cliente'
    return <UnauthorizedPage requiredRole={requiredRole} />
  }

  return <>{children}</>
}
