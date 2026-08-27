import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const missingKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID',
].filter((key) => !import.meta.env[key])

/** @type {import('firebase/firestore').Firestore | null} */
let db = null

if (missingKeys.length === 0) {
  const app = initializeApp(firebaseConfig)
  db = getFirestore(app)
} else if (import.meta.env.DEV) {
  console.info(
    '[invitación] Firebase opcional. Sin .env las confirmaciones se guardan en este dispositivo y se pueden descargar a Excel.'
  )
}

export { db }
