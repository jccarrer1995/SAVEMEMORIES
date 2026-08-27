import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../../lib/firebase/index.js'

/**
 * @param {string} email
 * @param {string} password
 */
export async function signInWithEmail(email, password) {
  if (!auth) {
    throw new Error('Firebase no está configurado en este entorno.')
  }

  return signInWithEmailAndPassword(auth, email.trim(), password)
}

export async function signOutUser() {
  if (!auth) return
  await signOut(auth)
}
