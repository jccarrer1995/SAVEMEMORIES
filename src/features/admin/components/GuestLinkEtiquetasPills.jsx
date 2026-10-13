import {
  labelEtiquetaGrupo,
  labelEtiquetaLado,
  normalizeEtiquetaGrupo,
  normalizeEtiquetaLado,
} from '../../invitations/core/constants/guestLinkTags.js'
import { GuestLinkConfirmPill } from './GuestLinkConfirmPill.jsx'

/**
 * @param {{
 *   link: { etiquetaLado?: string, etiquetaGrupo?: string },
 *   hideWhenEmpty?: boolean,
 *   variant?: 'table' | 'simulation',
 *   rsvpStatus?: import('../utils/guestLinkTableHelpers.js').GuestLinkRsvpStatus,
 *   showRsvpStatusOnMobile?: boolean,
 * }} props
 */
export function GuestLinkEtiquetasPills({
  link,
  hideWhenEmpty = false,
  variant = 'table',
  rsvpStatus,
  showRsvpStatusOnMobile = false,
}) {
  const lado = labelEtiquetaLado(normalizeEtiquetaLado(link.etiquetaLado))
  const grupo = labelEtiquetaGrupo(normalizeEtiquetaGrupo(link.etiquetaGrupo))
  const showMobileRsvp = showRsvpStatusOnMobile && rsvpStatus != null

  if (!lado && !grupo && !showMobileRsvp) {
    if (hideWhenEmpty) return null
    return <span className="marketing-muted text-sm">—</span>
  }

  const isSimulation = variant === 'simulation'
  const wrapClass = isSimulation ? 'mesa-simulation-guest-tags' : 'panel-table-etiquetas'
  const pillClass = isSimulation
    ? 'panel-pill panel-pill--tag panel-pill--tag-sm'
    : 'panel-pill panel-pill--tag'

  return (
    <div className={wrapClass}>
      {lado ? <span className={pillClass}>{lado}</span> : null}
      {grupo ? <span className={pillClass}>{grupo}</span> : null}
      {showMobileRsvp ? (
        <span className="panel-only-mobile">
          <GuestLinkConfirmPill status={rsvpStatus} size="tag" />
        </span>
      ) : null}
    </div>
  )
}
