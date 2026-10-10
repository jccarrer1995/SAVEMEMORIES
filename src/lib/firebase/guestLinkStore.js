import {
  collection,
  deleteDoc,
  deleteField,
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
import { normalizeMesa } from '../../shared/utils/normalizeMesa.js'
import {
  normalizeEtiquetaGrupo,
  normalizeEtiquetaLado,
} from '../../features/invitations/core/constants/guestLinkTags.js'

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
 * @param {string} linkCode
 * @param {Record<string, unknown>} data
 * @returns {import('../../features/invitations/core/types/guestLink.js').GuestLinkRecord}
 */
export function mapGuestLinkDoc(linkCode, data) {
  return {
    id: linkCode,
    guestLabel: asText(data.guestLabel),
    cupos: Number(data.cupos ?? 0),
    active: data.active !== false,
    createdAt: toIsoDate(data.createdAt),
    updatedAt: toIsoDate(data.updatedAt),
    mesa: normalizeMesa(data.mesa),
    etiquetaLado: normalizeEtiquetaLado(data.etiquetaLado) || undefined,
    etiquetaGrupo: normalizeEtiquetaGrupo(data.etiquetaGrupo) || undefined,
  }
}

/**
 * @param {string} projectId
 * @param {string} linkCode
 */
export async function fetchGuestLink(projectId, linkCode) {
  if (!db) return null

  const snap = await getDoc(doc(db, 'projects', projectId, 'links', linkCode))
  if (!snap.exists()) return null
  return mapGuestLinkDoc(snap.id, snap.data())
}

/**
 * @param {string} projectId
 */
export async function listGuestLinks(projectId) {
  if (!db) return []

  const snap = await getDocs(
    query(collection(db, 'projects', projectId, 'links'), orderBy('createdAt', 'desc')),
  )
  return snap.docs.map((docSnap) => mapGuestLinkDoc(docSnap.id, docSnap.data()))
}

/**
 * @param {string} projectId
 */
export async function countGuestLinks(projectId) {
  const links = await listGuestLinks(projectId)
  return links.length
}

/**
 * @param {string} projectId
 * @param {string} linkCode
 * @param {import('../../features/invitations/core/types/guestLink.js').GuestLinkFormValues} values
 */
export async function createGuestLink(projectId, linkCode, values) {
  if (!db) throw new Error('Firebase no está configurado.')

  const ref = doc(db, 'projects', projectId, 'links', linkCode)
  const existing = await getDoc(ref)
  if (existing.exists()) throw new Error('El código generado ya existe. Intenta de nuevo.')

  const mesa = normalizeMesa(values.mesa)
  const etiquetaLado = normalizeEtiquetaLado(values.etiquetaLado)
  const etiquetaGrupo = normalizeEtiquetaGrupo(values.etiquetaGrupo)
  await setDoc(ref, {
    guestLabel: values.guestLabel.trim(),
    cupos: Number(values.cupos) || 1,
    active: true,
    ...(mesa ? { mesa } : {}),
    ...(etiquetaLado ? { etiquetaLado } : {}),
    ...(etiquetaGrupo ? { etiquetaGrupo } : {}),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return linkCode
}

/**
 * @param {string} projectId
 * @param {string} linkCode
 * @param {boolean} active
 */
export async function setGuestLinkActive(projectId, linkCode, active) {
  if (!db) throw new Error('Firebase no está configurado.')

  await setDoc(
    doc(db, 'projects', projectId, 'links', linkCode),
    { active, updatedAt: serverTimestamp() },
    { merge: true },
  )
}

/**
 * @param {string} projectId
 * @param {string} linkCode
 */
export async function deleteGuestLink(projectId, linkCode) {
  if (!db) throw new Error('Firebase no está configurado.')

  await deleteDoc(doc(db, 'projects', projectId, 'links', linkCode))
}

/**
 * @param {string} projectId
 * @param {string} linkCode
 * @param {string} mesa
 */
export async function updateGuestLinkMesa(projectId, linkCode, mesa) {
  await updateGuestLinkMeta(projectId, linkCode, { mesa })
}

/**
 * @param {string} projectId
 * @param {string} linkCode
 * @param {import('../../features/invitations/core/types/guestLink.js').GuestLinkMetaValues} values
 */
export async function updateGuestLinkMeta(projectId, linkCode, values) {
  if (!db) throw new Error('Firebase no está configurado.')

  const ref = doc(db, 'projects', projectId, 'links', linkCode)
  const snap = await getDoc(ref)
  if (!snap.exists()) throw new Error('Enlace no encontrado.')

  const normalizedMesa = normalizeMesa(values.mesa)
  const lado = normalizeEtiquetaLado(values.etiquetaLado)
  const grupo = normalizeEtiquetaGrupo(values.etiquetaGrupo)

  await setDoc(
    ref,
    {
      mesa: normalizedMesa ?? '',
      updatedAt: serverTimestamp(),
      etiquetaLado: lado ? lado : deleteField(),
      etiquetaGrupo: grupo ? grupo : deleteField(),
    },
    { merge: true },
  )
}
