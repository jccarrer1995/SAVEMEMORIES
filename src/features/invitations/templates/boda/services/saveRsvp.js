import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../../../lib/firebase/index.js'

export const BODA_RSVP_COLLECTION = 'bodaRsvps'

/**
 * @typedef {object} RsvpPayload
 * @property {string} confirmacion
 * @property {string} nombres
 * @property {string} telefono
 * @property {string} mensaje
 * @property {string} grupoInvitados
 * @property {number} cupos
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

  return { firestore, sheets }
}

/**
 * @param {string} projectId
 * @returns {Promise<Array<Record<string, unknown>>>}
 */
export async function listRsvps(projectId) {
  const local = readLocalRsvps(projectId)
  if (!db) return local

  try {
    const snap = await getDocs(query(collection(db, BODA_RSVP_COLLECTION), orderBy('createdAt', 'desc')))
    const remote = snap.docs
      .map((docSnap) => {
        const data = docSnap.data()
        const createdAt = data.createdAt?.toDate?.() instanceof Date
          ? data.createdAt.toDate().toISOString()
          : data.createdAt ?? ''
        return { id: docSnap.id, ...data, createdAt }
      })
      .filter((row) => !row.projectId || row.projectId === projectId)

    if (remote.length > 0) return remote
  } catch (error) {
    console.warn('[invitation] No se pudieron leer RSVPs remotos:', error)
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
