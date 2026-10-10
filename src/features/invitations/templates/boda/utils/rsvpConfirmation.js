import { normalizeMesa } from '../../../../../shared/utils/normalizeMesa.js'

/** @param {string} confirmacion */
export function isAttendanceConfirmed(confirmacion) {
  if (!confirmacion) return false
  return !/no podr/i.test(confirmacion)
}

/** @param {string} confirmacion */
export function isAttendanceDeclined(confirmacion) {
  if (!confirmacion) return false
  return /no podr/i.test(confirmacion)
}

/**
 * @typedef {object} GuestRsvpConfirmation
 * @property {string} confirmacion
 * @property {string} nombres
 * @property {string} grupoInvitados
 * @property {number} cupos
 * @property {string} createdAt
 * @property {string} [mesaAsignada]
 */

/**
 * @typedef {GuestRsvpConfirmation} GuestRsvpDecline
 */

/**
 * @param {Record<string, unknown>} data
 * @returns {string}
 */
export function rsvpCreatedAtIso(data) {
  const createdAt = data.createdAt
  if (createdAt && typeof createdAt === 'object' && 'toDate' in createdAt) {
    const date = /** @type {{ toDate: () => Date }} */ (createdAt).toDate()
    if (date instanceof Date && !Number.isNaN(date.getTime())) {
      return date.toISOString()
    }
  }
  if (typeof createdAt === 'string') return createdAt
  return ''
}

/**
 * @param {Array<Record<string, unknown>>} rows
 * @returns {Record<string, unknown> | null}
 */
export function pickLatestRsvpRow(rows) {
  if (rows.length === 0) return null
  return [...rows].sort((a, b) => {
    const ta = Date.parse(rsvpCreatedAtIso(a)) || 0
    const tb = Date.parse(rsvpCreatedAtIso(b)) || 0
    return tb - ta
  })[0]
}

/**
 * @param {Record<string, unknown>} row
 * @returns {GuestRsvpConfirmation | null}
 */
export function rowToGuestConfirmation(row) {
  const confirmacion = typeof row.confirmacion === 'string' ? row.confirmacion : ''
  if (!isAttendanceConfirmed(confirmacion)) return null

  return {
    confirmacion,
    nombres: typeof row.nombres === 'string' ? row.nombres : '',
    grupoInvitados: typeof row.grupoInvitados === 'string' ? row.grupoInvitados : '',
    cupos: typeof row.cupos === 'number' ? row.cupos : 0,
    createdAt: rsvpCreatedAtIso(row) || new Date().toISOString(),
    mesaAsignada: normalizeMesa(row.mesaAsignada),
  }
}

/**
 * @param {Record<string, unknown>} row
 * @returns {GuestRsvpDecline | null}
 */
export function rowToGuestDecline(row) {
  const confirmacion = typeof row.confirmacion === 'string' ? row.confirmacion : ''
  if (!isAttendanceDeclined(confirmacion)) return null

  return {
    confirmacion,
    nombres: typeof row.nombres === 'string' ? row.nombres : '',
    grupoInvitados: typeof row.grupoInvitados === 'string' ? row.grupoInvitados : '',
    cupos: typeof row.cupos === 'number' ? row.cupos : 0,
    createdAt: rsvpCreatedAtIso(row) || new Date().toISOString(),
    mesaAsignada: normalizeMesa(row.mesaAsignada),
  }
}
