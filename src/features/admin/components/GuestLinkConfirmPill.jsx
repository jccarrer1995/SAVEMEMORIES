/**
 * @param {{ status: import('../utils/guestLinkTableHelpers.js').GuestLinkRsvpStatus }} props
 */
export function GuestLinkConfirmPill({ status }) {
  if (status === 'confirmed') {
    return <span className="panel-pill panel-pill--confirmed">Confirmado</span>
  }

  if (status === 'declined') {
    return <span className="panel-pill panel-pill--declined">No asistirá(n)</span>
  }

  return <span className="panel-pill panel-pill--pending">Por confirmar</span>
}
