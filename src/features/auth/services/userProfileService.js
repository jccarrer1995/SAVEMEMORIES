import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebase/index.js'
import { isValidUserRole } from '../utils/roleRedirects.js'
import { USERS_COLLECTION } from '../types/userProfile.js'

/**
 * @param {string} uid
 * @returns {Promise<import('../types/userProfile.js').UserProfile | null>}
 */
export async function fetchUserProfile(uid) {
  if (!db) return null

  try {
    const snap = await getDoc(doc(db, USERS_COLLECTION, uid))
    if (!snap.exists()) return null

    const data = snap.data()
    if (data.active === false) return null
    if (!isValidUserRole(data.role)) return null

    return {
      uid,
      role: data.role,
      email: typeof data.email === 'string' ? data.email : '',
      displayName: typeof data.displayName === 'string' ? data.displayName : undefined,
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[auth] No se pudo leer users/{uid}. ¿Desplegaste firestore.rules?', error)
    }
    throw new Error(
      'No se pudo verificar tu rol. Despliega las reglas de Firestore (firebase deploy --only firestore:rules).'
    )
  }
}
