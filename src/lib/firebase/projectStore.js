import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from './index.js'
import { asText } from '../../shared/utils/asText.js'

export const PROJECTS_COLLECTION = 'projects'

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
 * @param {string} id
 * @param {Record<string, unknown>} data
 * @returns {import('../../features/admin/types/projectRecord.js').ProjectRecord}
 */
export function mapProjectDoc(id, data) {
  return {
    id,
    slug: asText(data.slug, id),
    templateId: asText(data.templateId, 'boda'),
    status: /** @type {import('../../features/admin/types/projectRecord.js').ProjectStatus} */ (data.status ?? 'draft'),
    title: asText(data.title),
    ownerId: asText(data.ownerId),
    linkLimit: Number(data.linkLimit ?? 0),
    content: /** @type {Record<string, unknown>} */ (data.content ?? {}),
    createdAt: toIsoDate(data.createdAt),
    updatedAt: toIsoDate(data.updatedAt),
  }
}

/**
 * @returns {Promise<import('../../features/admin/types/projectRecord.js').ProjectRecord[]>}
 */
export async function listProjectRecords() {
  if (!db) return []

  try {
    const snap = await getDocs(query(collection(db, PROJECTS_COLLECTION), orderBy('updatedAt', 'desc')))
    return snap.docs.map((docSnap) => mapProjectDoc(docSnap.id, docSnap.data()))
  } catch (error) {
    const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : ''
    if (code === 'permission-denied') throw error

    const snap = await getDocs(collection(db, PROJECTS_COLLECTION))
    return snap.docs
      .map((docSnap) => mapProjectDoc(docSnap.id, docSnap.data()))
      .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
  }
}

/**
 * @param {string} projectId
 */
export async function fetchProjectRecord(projectId) {
  if (!db) return null

  const snap = await getDoc(doc(db, PROJECTS_COLLECTION, projectId))
  if (!snap.exists()) return null
  return mapProjectDoc(snap.id, snap.data())
}

/**
 * @param {string} slug
 * @param {Record<string, unknown>} payload
 * @param {boolean} isNew
 */
export async function persistProjectRecord(slug, payload, isNew) {
  if (!db) throw new Error('Firebase no está configurado.')

  const ref = doc(db, PROJECTS_COLLECTION, slug)
  if (isNew) {
    const existing = await getDoc(ref)
    if (existing.exists()) throw new Error('Ya existe un proyecto con ese identificador.')
    await setDoc(ref, { ...payload, createdAt: serverTimestamp() })
    return slug
  }

  await setDoc(ref, payload, { merge: true })
  return slug
}
