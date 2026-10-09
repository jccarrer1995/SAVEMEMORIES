import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../../../../../lib/firebase/index.js'
import { normalizeMesa } from '../../../../../shared/utils/normalizeMesa.js'
import {
  pickLatestRsvpRow,
  rowToGuestConfirmation,
  rsvpCreatedAtIso,
} from '../utils/rsvpConfirmation.js'

export const BODA_RSVP_COLLECTION = 'bodaRsvps'

/**
 * @typedef {object} RsvpPayload
 * @property {string} confirmacion
 * @property {string} nombres
 * @property {string} telefono
 * @property {string} mensaje
 * @property {string} grupoInvitados
 * @property {number} cupos
 * @property {string} [linkCode]
 * @property {string} [mesaAsignada]
 */

/**
 * @param {string} projectId
 */
function localStorageKey(projectId) {
  return `invitation-rsvps-${projectId}-v1`
}

/**
 * @param {RsvpPayload} payload
 * @param {string} projectId
 */
function toRow(payload, projectId) {
  return {
    projectId,
    confirmacion: payload.confirmacion,
    nombres: payload.nombres,
    telefono: payload.telefono,
    mensaje: payload.mensaje,
    grupoInvitados: payload.grupoInvitados,
    cupos: payload.cupos,
    ...(payload.linkCode ? { linkCode: payload.linkCode } : {}),
    ...(normalizeMesa(payload.mesaAsignada) ? { mesaAsignada: normalizeMesa(payload.mesaAsignada) } : {}),
    createdAt: new Date().toISOString(),
  }
}

/**
 * @param {string} projectId
 * @returns {Array<Record<string, unknown>>}
 */
export function readLocalRsvps(projectId) {
  try {
    const raw = window.localStorage.getItem(localStorageKey(projectId))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * @param {string} projectId
 * @param {Record<string, unknown>} row
 */
function persistLocal(projectId, row) {
  const next = [...readLocalRsvps(projectId), row]
  window.localStorage.setItem(localStorageKey(projectId), JSON.stringify(next))
}

/**
 * @param {Record<string, unknown>} a
 * @param {Record<string, unknown>} b
 */
function isSameLocalRsvpRow(a, b) {
  return (
    a.createdAt === b.createdAt &&
    a.grupoInvitados === b.grupoInvitados &&
    a.nombres === b.nombres &&
    a.telefono === b.telefono
  )
}

/**
 * @param {string} projectId
 * @param {Record<string, unknown>} row
 */
function removeLocalRsvp(projectId, row) {
  const next = readLocalRsvps(projectId).filter((item) => !isSameLocalRsvpRow(item, row))
  window.localStorage.setItem(localStorageKey(projectId), JSON.stringify(next))
}

/**
 * @param {string} projectId
 * @param {Record<string, unknown>} row
 */
export async function deleteRsvp(projectId, row) {
  const docId = typeof row.id === 'string' ? row.id : ''

  if (docId && db) {
    const docRef = doc(db, BODA_RSVP_COLLECTION, docId)
    const snap = await getDoc(docRef)
    if (snap.exists()) {
      const data = snap.data()
      const storedProjectId = typeof data.projectId === 'string' ? data.projectId : ''
      if (!storedProjectId) {
        await updateDoc(docRef, { projectId })
      } else if (storedProjectId !== projectId) {
        throw new Error('Este registro pertenece a otro proyecto.')
      }
    }
    await deleteDoc(docRef)
  }

  removeLocalRsvp(projectId, row)
}

/**
 * @param {string} projectId
 * @param {RsvpPayload} payload
 * @returns {Promise<{ firestore: boolean, sheets: boolean }>}
 */
export async function saveRsvp(projectId, payload) {
  const row = toRow(payload, projectId)
  persistLocal(projectId, row)

  let firestore = false
  let sheets = false

  if (db) {
    try {
      await addDoc(collection(db, BODA_RSVP_COLLECTION), {
        ...row,
        createdAt: serverTimestamp(),
      })
      firestore = true
    } catch (error) {
      console.warn('[invitation] No se pudo guardar en Firestore:', error)
    }
  }

  const webhook = import.meta.env.VITE_BODA_SHEETS_WEBHOOK
  if (typeof webhook === 'string' && webhook.startsWith('http')) {
    try {
      await fetch(webhook, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(row),
      })
      sheets = true
    } catch (error) {
      console.warn('[invitation] No se pudo enviar a Sheets:', error)
    }
  }

  if (db && !firestore) {
    throw new Error('No se pudo guardar tu confirmación. Revisa tu conexión e intenta de nuevo.')
  }

  return { firestore, sheets }
}

/**
 * @param {string} projectId
 * @param {{ grupoInvitados: string, linkCode?: string }} invite
 * @returns {Promise<import('../utils/rsvpConfirmation.js').GuestRsvpConfirmation | null>}
 */
export async function fetchGuestRsvpConfirmation(projectId, invite) {
  if (!db) return null

  const { grupoInvitados, linkCode } = invite

  try {
    if (linkCode) {
      const byLink = await getDocs(
        query(
          collection(db, BODA_RSVP_COLLECTION),
          where('projectId', '==', projectId),
          where('linkCode', '==', linkCode),
        ),
      )
      const latestLink = pickLatestRsvpRow(byLink.docs.map((docSnap) => docSnap.data()))
      const fromLink = latestLink ? rowToGuestConfirmation(latestLink) : null
      if (fromLink) return fromLink
    }

    const byGroup = await getDocs(
      query(
        collection(db, BODA_RSVP_COLLECTION),
        where('projectId', '==', projectId),
        where('grupoInvitados', '==', grupoInvitados),
      ),
    )
    const latestGroup = pickLatestRsvpRow(byGroup.docs.map((docSnap) => docSnap.data()))
    return latestGroup ? rowToGuestConfirmation(latestGroup) : null
  } catch (error) {
    console.warn('[invitation] No se pudo leer confirmación del invitado:', error)
    return null
  }
}

/**
 * @param {string} projectId
 * @returns {Promise<Array<Record<string, unknown>>>}
 */
export async function listRsvps(projectId) {
  const local = readLocalRsvps(projectId)
  if (!db) return local

  try {
    const snap = await getDocs(
      query(
        collection(db, BODA_RSVP_COLLECTION),
        where('projectId', '==', projectId),
        orderBy('createdAt', 'desc'),
      ),
    )
    const remote = snap.docs.map((docSnap) => {
      const data = docSnap.data()
      const createdAt = rsvpCreatedAtIso(data) || (data.createdAt ?? '')
      return { id: docSnap.id, ...data, createdAt }
    })

    if (remote.length > 0) return remote
  } catch (error) {
    console.warn('[invitation] No se pudieron leer RSVPs remotos:', error)
    try {
      const snap = await getDocs(query(collection(db, BODA_RSVP_COLLECTION), orderBy('createdAt', 'desc')))
      const remote = snap.docs
        .map((docSnap) => {
          const data = docSnap.data()
          const createdAt = rsvpCreatedAtIso(data) || (data.createdAt ?? '')
          return { id: docSnap.id, ...data, createdAt }
        })
        .filter((row) => row.projectId === projectId || !row.projectId)

      if (remote.length > 0) return remote
    } catch {
      // fallback to local
    }
  }

  return local
}

/**
 * @param {string} projectId
 * @param {string} fileLabel
 * @param {Array<Record<string, unknown>>} rows
 */
export async function downloadRsvpsExcel(projectId, fileLabel, rows) {
  const XLSX = await import('xlsx')
  const sheetRows = rows.map((row) => ({
    Fecha: formatExcelDate(row.createdAt),
    Grupo: row.grupoInvitados ?? '',
    Cupos: row.cupos ?? '',
    Mesa: row.mesaAsignada ?? '',
    Confirmación: row.confirmacion ?? '',
    'Nombre de asistentes': row.nombres ?? '',
    Teléfono: row.telefono ?? '',
    Mensaje: row.mensaje ?? '',
  }))

  const worksheet = XLSX.utils.json_to_sheet(
    sheetRows.length > 0
      ? sheetRows
      : [
          {
            Fecha: '',
            Grupo: '',
            Cupos: '',
            Mesa: '',
            Confirmación: '',
            'Nombre de asistentes': '',
            Teléfono: '',
            Mensaje: '',
          },
        ]
  )
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Confirmaciones')
  XLSX.writeFile(workbook, `confirmaciones-${fileLabel || projectId}.xlsx`)
}

/**
 * @param {unknown} value
 */
function formatExcelDate(value) {
  if (value instanceof Date) return value.toLocaleString('es-MX')
  if (typeof value === 'number' && Number.isFinite(value)) {
    return new Date(value).toLocaleString('es-MX')
  }
  if (typeof value === 'string') {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString('es-MX')
  }
  return ''
}
