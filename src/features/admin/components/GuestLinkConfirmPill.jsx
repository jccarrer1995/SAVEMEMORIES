/**
 * @param {{ confirmed: boolean }} props
 */
export function GuestLinkConfirmPill({ confirmed }) {
  if (confirmed) {
    return <span className="panel-pill panel-pill--confirmed">Confirmado</span>
  }

  return <span className="panel-pill panel-pill--pending">Por confirmar</span>
}
