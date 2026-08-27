import { useContext } from 'react'
import { auth, isFirebaseConfigured } from '../../../lib/firebase/index.js'
import {
  AuthErrorContext,
  AuthLoadingContext,
  AuthProfileContext,
  AuthUserContext,
} from '../context/AuthContext.jsx'

export function useAuth() {
  const user = useContext(AuthUserContext)
  const profile = useContext(AuthProfileContext)
  const loading = useContext(AuthLoadingContext)
  const authError = useContext(AuthErrorContext)

  const pendingProfile = Boolean(auth?.currentUser && !profile)

  return {
    user,
    profile,
    loading: loading || pendingProfile,
    authError,
    isConfigured: isFirebaseConfigured,
    isAuthenticated: Boolean(user && profile),
  }
}
