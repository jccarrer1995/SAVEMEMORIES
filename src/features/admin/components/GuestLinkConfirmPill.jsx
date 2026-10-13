/**
 * @param {{
 *   status: import('../utils/guestLinkTableHelpers.js').GuestLinkRsvpStatus,
 *   size?: 'default' | 'tag',
 * }} props
 */
export function GuestLinkConfirmPill({ status, size = 'default' }) {
  const sizeClass = size === 'tag' ? ' panel-pill--tag-sized' : ''

  if (status === 'confirmed') {
    return <span className={`panel-pill panel-pill--confirmed${sizeClass}`}>Confirmado</span>
  }

  if (status === 'declined') {
    return <span className={`panel-pill panel-pill--declined${sizeClass}`}>No asistirá(n)</span>
  }

  return <span className={`panel-pill panel-pill--pending${sizeClass}`}>Por confirmar</span>
}
