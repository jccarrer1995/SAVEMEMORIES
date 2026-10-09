import { isAttendanceConfirmed, rsvpCreatedAtIso } from '../../invitations/templates/boda/utils/rsvpConfirmation.js'

/** @typedef {'mesa-asc' | 'mesa-desc' | 'confirmado' | 'por-confirmar'} GuestLinkSortMode */

/**
 * @param {string | undefined} mesa
 */
export function parseMesaSortNumber(mesa) {
  if (!mesa) return null
  const match = mesa.match(/(\d+)/)
  if (!match) return null
  const value = Number(match[1])
  return Number.isFinite(value) ? value : null
}

/**
 * @param {import('../../invitations/core/types/guestLink.js').GuestLinkRecord} link
 * @param {{ linkCodes: Set<string>, groupLabels: Set<string> }} confirmed
 */
export function isGuestLinkConfirmed(link, confirmed) {
  if (confirmed.linkCodes.has(link.id)) return true
  return confirmed.groupLabels.has(link.guestLabel)
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
  for (const [code, row] of latestByLinkCode) {
    const confirmacion = typeof row.confirmacion === 'string' ? row.confirmacion : ''
    if (isAttendanceConfirmed(confirmacion)) linkCodes.add(code)
  }

  const groupLabels = new Set()
  for (const [group, row] of latestByGroup) {
    const confirmacion = typeof row.confirmacion === 'string' ? row.confirmacion : ''
    if (isAttendanceConfirmed(confirmacion)) groupLabels.add(group)
  }

  return { linkCodes, groupLabels }
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
