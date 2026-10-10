import {
  isAttendanceConfirmed,
  isAttendanceDeclined,
  rsvpCreatedAtIso,
} from '../../invitations/templates/boda/utils/rsvpConfirmation.js'

/** @typedef {'confirmed' | 'declined' | 'pending'} GuestLinkRsvpStatus */

/** @typedef {'mesa-asc' | 'mesa-desc' | 'confirmado' | 'por-confirmar'} GuestLinkSortMode */

/**
 * @typedef {object} MesaGuestGroup
 * @property {string} mesaLabel
 * @property {import('../../invitations/core/types/guestLink.js').GuestLinkRecord[]} guests
 * @property {number} totalCupos
 * @property {number} maxCupos
 */

/**
 * @param {import('../../invitations/core/types/guestLink.js').GuestLinkRecord[]} links
 * @returns {MesaGuestGroup[]}
 */
export function groupLinksByMesa(links) {
  /** @type {Map<string, import('../../invitations/core/types/guestLink.js').GuestLinkRecord[]>} */
  const byMesa = new Map()

  for (const link of links) {
    const label = typeof link.mesa === 'string' ? link.mesa.trim() : ''
    if (!label) continue
    const bucket = byMesa.get(label) ?? []
    bucket.push(link)
    byMesa.set(label, bucket)
  }

  const groups = [...byMesa.entries()].map(([mesaLabel, guests]) => {
    const totalCupos = guests.reduce((sum, guest) => sum + guest.cupos, 0)
    const maxCupos = guests.reduce((max, guest) => Math.max(max, guest.cupos), 0)
    return {
      mesaLabel,
      guests: [...guests].sort((a, b) => b.cupos - a.cupos || a.guestLabel.localeCompare(b.guestLabel, 'es')),
      totalCupos,
      maxCupos,
    }
  })

  groups.sort((a, b) => {
    const numA = parseMesaSortNumber(a.mesaLabel)
    const numB = parseMesaSortNumber(b.mesaLabel)
    if (numA !== null && numB !== null && numA !== numB) return numA - numB
    if (numA === null && numB !== null) return 1
    if (numA !== null && numB === null) return -1
    return a.mesaLabel.localeCompare(b.mesaLabel, 'es')
  })

  return groups
}

export function parseMesaSortNumber(mesa) {
  if (!mesa) return null
  const match = mesa.match(/(\d+)/)
  if (!match) return null
  const value = Number(match[1])
  return Number.isFinite(value) ? value : null
}

/**
 * @param {string} mesaLabel
 */
export function formatMesaSimulationHeading(mesaLabel) {
  const num = parseMesaSortNumber(mesaLabel)
  if (num !== null) return `Mesa#${num}`
  const trimmed = mesaLabel.trim()
  return trimmed ? `Mesa#${trimmed}` : 'Mesa'
}

/**
 * @param {number} totalCupos
 */
export function formatMesaTotalPeopleLabel(totalCupos) {
  const total = Number.isFinite(totalCupos) ? totalCupos : 0
  const noun = total === 1 ? 'persona' : 'personas'
  return `Total (${total}) ${noun}`
}

/**
 * @param {import('../../invitations/core/types/guestLink.js').GuestLinkRecord} link
 * @param {{
 *   linkCodes: Set<string>,
 *   groupLabels: Set<string>,
 *   declinedLinkCodes: Set<string>,
 *   declinedGroupLabels: Set<string>,
 * }} index
 */
export function isGuestLinkConfirmed(link, index) {
  if (index.linkCodes.has(link.id)) return true
  return index.groupLabels.has(link.guestLabel)
}

/**
 * @param {import('../../invitations/core/types/guestLink.js').GuestLinkRecord} link
 * @param {{
 *   linkCodes: Set<string>,
 *   groupLabels: Set<string>,
 *   declinedLinkCodes: Set<string>,
 *   declinedGroupLabels: Set<string>,
 * }} index
 * @returns {GuestLinkRsvpStatus}
 */
export function getGuestLinkRsvpStatus(link, index) {
  if (isGuestLinkConfirmed(link, index)) return 'confirmed'
  if (index.declinedLinkCodes.has(link.id) || index.declinedGroupLabels.has(link.guestLabel)) {
    return 'declined'
  }
  return 'pending'
}

/**
 * @param {Array<Record<string, unknown>>} rsvpRows
 */
export function buildGuestLinkConfirmationIndex(rsvpRows) {
  /** @type {Map<string, Record<string, unknown>>} */
  const latestByLinkCode = new Map()
  /** @type {Map<string, Record<string, unknown>>} */
  const latestByGroup = new Map()

  for (const row of rsvpRows) {
    const linkCode = typeof row.linkCode === 'string' ? row.linkCode : ''
    const group = typeof row.grupoInvitados === 'string' ? row.grupoInvitados : ''

    if (linkCode) {
      const prev = latestByLinkCode.get(linkCode)
      if (!prev || isRowNewer(row, prev)) latestByLinkCode.set(linkCode, row)
    } else if (group) {
      const prev = latestByGroup.get(group)
      if (!prev || isRowNewer(row, prev)) latestByGroup.set(group, row)
    }
  }

  const linkCodes = new Set()
  const declinedLinkCodes = new Set()
  for (const [code, row] of latestByLinkCode) {
    const confirmacion = typeof row.confirmacion === 'string' ? row.confirmacion : ''
    if (isAttendanceConfirmed(confirmacion)) linkCodes.add(code)
    else if (isAttendanceDeclined(confirmacion)) declinedLinkCodes.add(code)
  }

  const groupLabels = new Set()
  const declinedGroupLabels = new Set()
  for (const [group, row] of latestByGroup) {
    const confirmacion = typeof row.confirmacion === 'string' ? row.confirmacion : ''
    if (isAttendanceConfirmed(confirmacion)) groupLabels.add(group)
    else if (isAttendanceDeclined(confirmacion)) declinedGroupLabels.add(group)
  }

  return { linkCodes, groupLabels, declinedLinkCodes, declinedGroupLabels }
}

/**
 * @param {Record<string, unknown>} a
 * @param {Record<string, unknown>} b
 */
function isRowNewer(a, b) {
  const ta = Date.parse(rsvpCreatedAtIso(a)) || 0
  const tb = Date.parse(rsvpCreatedAtIso(b)) || 0
  return ta >= tb
}

/**
 * @param {import('../../invitations/core/types/guestLink.js').GuestLinkRecord[]} links
 * @param {GuestLinkSortMode} sortMode
 * @param {{ linkCodes: Set<string>, groupLabels: Set<string> }} confirmed
 */
export function sortGuestLinks(links, sortMode, confirmed) {
  const sorted = [...links]

  sorted.sort((a, b) => {
    if (sortMode === 'confirmado' || sortMode === 'por-confirmar') {
      const rankA = isGuestLinkConfirmed(a, confirmed) ? 0 : 1
      const rankB = isGuestLinkConfirmed(b, confirmed) ? 0 : 1
      if (rankA !== rankB) {
        return sortMode === 'confirmado' ? rankA - rankB : rankB - rankA
      }
      return a.guestLabel.localeCompare(b.guestLabel, 'es')
    }

    const numA = parseMesaSortNumber(a.mesa)
    const numB = parseMesaSortNumber(b.mesa)

    if (sortMode === 'mesa-asc') {
      if (numA === null && numB === null) return a.guestLabel.localeCompare(b.guestLabel, 'es')
      if (numA === null) return 1
      if (numB === null) return -1
      if (numA !== numB) return numA - numB
      return a.guestLabel.localeCompare(b.guestLabel, 'es')
    }

    if (numA === null && numB === null) return a.guestLabel.localeCompare(b.guestLabel, 'es')
    if (numA === null) return 1
    if (numB === null) return -1
    if (numA !== numB) return numB - numA
    return a.guestLabel.localeCompare(b.guestLabel, 'es')
  })

  return sorted
}
