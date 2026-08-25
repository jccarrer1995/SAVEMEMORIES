import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../../lib/firebase.js'

export const BODA_RSVP_COLLECTION = 'bodaRsvps'
const LOCAL_KEY = 'boda-rsvps-v1'

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
 * @param {RsvpPayload} payload
 */
function toRow(payload) {
  return {
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
 * @returns {Array<Record<string, unknown>>}
 */
export function readLocalRsvps() {
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * @param {Record<string, unknown>} row
 */
function persistLocal(row) {
  const next = [...readLocalRsvps(), row]
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(next))
}

/**
 * Guarda la confirmación en Firestore (tabla persistente) y, si existe
 * VITE_BODA_SHEETS_WEBHOOK, también la envía a Google Sheets / Excel Online.
 *
 * @param {RsvpPayload} payload
 * @returns {Promise<{ firestore: boolean, sheets: boolean }>}
 */
export async function saveRsvp(payload) {
  const row = toRow(payload)
  persistLocal(row)

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
      console.warn('[boda] No se pudo guardar en Firestore:', error)
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
      console.warn('[boda] No se pudo enviar a Sheets:', error)
    }
  }

  return { firestore, sheets }
}

/**
 * @returns {Promise<Array<Record<string, unknown>>>}
 */
export async function listRsvps() {
  const local = readLocalRsvps()
  if (!db) return local

  try {
    const snap = await getDocs(query(collection(db, BODA_RSVP_COLLECTION), orderBy('createdAt', 'desc')))
    const remote = snap.docs.map((docSnap) => {
      const data = docSnap.data()
      const createdAt = data.createdAt?.toDate?.() instanceof Date
        ? data.createdAt.toDate().toISOString()
        : data.createdAt ?? ''
      return { id: docSnap.id, ...data, createdAt }
    })
    if (remote.length > 0) return remote
  } catch (error) {
    console.warn('[boda] No se pudieron leer RSVPs remotos:', error)
  }
  return local
}

/**
 * @param {Array<Record<string, unknown>>} rows
 */
export async function downloadRsvpsExcel(rows) {
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
  XLSX.writeFile(workbook, 'confirmaciones-boda-juan-carlos-jessica.xlsx')
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
