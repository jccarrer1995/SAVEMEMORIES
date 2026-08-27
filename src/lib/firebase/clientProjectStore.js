import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from './index.js'
import { mapProjectDoc, fetchProjectRecord } from './projectStore.js'

/**
 * @param {string} ownerId
 * @returns {Promise<import('../../features/admin/types/projectRecord.js').ProjectRecord[]>}
 */
export async function listProjectRecordsByOwner(ownerId) {
  if (!db || !ownerId) return []

  try {
    const snap = await getDocs(
      query(collection(db, 'projects'), where('ownerId', '==', ownerId)),
    )
    return snap.docs
      .map((docSnap) => mapProjectDoc(docSnap.id, docSnap.data()))
      .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
  } catch (error) {
    const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : ''
    if (code === 'permission-denied') throw error
    return []
  }
}

/**
 * @param {string} projectId
 * @param {string} ownerId
 */
export async function fetchProjectRecordForOwner(projectId, ownerId) {
  const project = await fetchProjectRecord(projectId)
  if (project?.ownerId !== ownerId) return null
  return project
}

export { listProjectRecords } from './projectStore.js'
