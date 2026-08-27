import { deleteApp, initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'
import { firebaseConfig, isFirebaseConfigured } from './index.js'

/**
 * Crea un usuario en Firebase Auth sin cerrar la sesión del administrador.
 * @param {string} email
 * @param {string} password
 */
export async function createAuthUser(email, password) {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase no está configurado.')
  }

  const secondaryApp = initializeApp(firebaseConfig, `AdminCreateUser-${Date.now()}`)
  try {
    const secondaryAuth = getAuth(secondaryApp)
    const credential = await createUserWithEmailAndPassword(secondaryAuth, email, password)
    await signOut(secondaryAuth)
    return credential.user.uid
  } finally {
    await deleteApp(secondaryApp)
  }
}
