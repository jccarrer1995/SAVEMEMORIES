import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../lib/firebase/index.js'
import { fetchUserProfile } from '../services/userProfileService.js'
import { signOutUser } from '../services/authService.js'
import {
  AuthErrorContext,
  AuthLoadingContext,
  AuthProfileContext,
  AuthUserContext,
} from './AuthContext.jsx'

/**
 * @param {{ children: import('react').ReactNode }} props
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(/** @type {import('firebase/auth').User | null} */ (null))
  const [profile, setProfile] = useState(/** @type {import('../types/userProfile.js').UserProfile | null} */ (null))
  const [loading, setLoading] = useState(() => Boolean(auth))
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    if (!auth) return

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      void (async () => {
        setLoading(true)
        setAuthError('')
        setUser(nextUser)

        if (!nextUser) {
          setProfile(null)
          setLoading(false)
          return
        }

        try {
          const nextProfile = await fetchUserProfile(nextUser.uid)
          if (!nextProfile) {
            await signOutUser()
            setUser(null)
            setProfile(null)
            setAuthError(
              'Tu cuenta no tiene rol asignado. Crea el documento users/{uid} en Firestore con role admin o client.'
            )
            return
          }
          setProfile(nextProfile)
        } catch (error) {
          await signOutUser()
          setUser(null)
          setProfile(null)
          setAuthError(error instanceof Error ? error.message : 'No se pudo verificar tu sesión.')
        } finally {
          setLoading(false)
        }
      })()
    })

    return unsubscribe
  }, [])

  return (
    <AuthLoadingContext.Provider value={loading}>
      <AuthUserContext.Provider value={user}>
        <AuthProfileContext.Provider value={profile}>
          <AuthErrorContext.Provider value={authError}>{children}</AuthErrorContext.Provider>
        </AuthProfileContext.Provider>
      </AuthUserContext.Provider>
    </AuthLoadingContext.Provider>
  )
}

export { isFirebaseConfigured as authIsConfigured } from '../../../lib/firebase/index.js'
