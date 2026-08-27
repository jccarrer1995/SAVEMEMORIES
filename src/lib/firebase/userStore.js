import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from './index.js'
import { asText } from '../../shared/utils/asText.js'
import { USERS_COLLECTION } from '../../features/auth/types/userProfile.js'

/**
 * @param {unknown} value
 */
function toIsoDate(value) {
  if (value instanceof Date) return value.toISOString()
  if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate().toISOString()
  }
  return typeof value === 'string' ? value : ''
}

/**
 * @param {string} uid
 * @param {Record<string, unknown>} data
 * @returns {import('../../features/admin/types/clientRecord.js').ClientRecord}
 */
export function mapClientDoc(uid, data) {
  return {
    uid,
    email: asText(data.email),
    displayName: asText(data.displayName),
    role: 'client',
    active: data.active !== false,
    createdAt: toIsoDate(data.createdAt),
    updatedAt: toIsoDate(data.updatedAt),
  }
}

/**
 * @returns {Promise<import('../../features/admin/types/clientRecord.js').ClientRecord[]>}
 */
export async function listClientRecords() {
  if (!db) return []

  const snap = await getDocs(query(collection(db, USERS_COLLECTION), where('role', '==', 'client')))
  return snap.docs
    .map((docSnap) => mapClientDoc(docSnap.id, docSnap.data()))
    .sort((a, b) => (b.updatedAt || b.createdAt || '').localeCompare(a.updatedAt || a.createdAt || ''))
}

/**
 * @param {string} uid
 */
export async function fetchClientRecord(uid) {
  if (!db || !uid) return null

  const snap = await getDoc(doc(db, USERS_COLLECTION, uid))
  if (!snap.exists()) return null

  const data = snap.data()
  if (data.role !== 'client') return null
  return mapClientDoc(snap.id, data)
}

/**
 * @param {string} uid
 * @param {Record<string, unknown>} payload
 * @param {boolean} isNew
 */
export async function persistClientRecord(uid, payload, isNew) {
  if (!db) throw new Error('Firebase no está configurado.')

  const ref = doc(db, USERS_COLLECTION, uid)
  if (isNew) {
    const existing = await getDoc(ref)
    if (existing.exists()) throw new Error('Ya existe un perfil con ese UID.')
    await setDoc(ref, { ...payload, createdAt: serverTimestamp() })
    return uid
  }

  await setDoc(ref, { ...payload, updatedAt: serverTimestamp() }, { merge: true })
  return uid
}

/**
 * @param {string} uid
 */
export async function removeClientRecord(uid) {
  if (!db) throw new Error('Firebase no está configurado.')
  await deleteDoc(doc(db, USERS_COLLECTION, uid))
}
