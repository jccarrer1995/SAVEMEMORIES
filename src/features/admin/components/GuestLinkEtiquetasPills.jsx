import {
  labelEtiquetaGrupo,
  labelEtiquetaLado,
  normalizeEtiquetaGrupo,
  normalizeEtiquetaLado,
} from '../../invitations/core/constants/guestLinkTags.js'

/**
 * @param {{
 *   link: { etiquetaLado?: string, etiquetaGrupo?: string },
 *   hideWhenEmpty?: boolean,
 *   variant?: 'table' | 'simulation',
 * }} props
 */
export function GuestLinkEtiquetasPills({
  link,
  hideWhenEmpty = false,
  variant = 'table',
}) {
  const lado = labelEtiquetaLado(normalizeEtiquetaLado(link.etiquetaLado))
  const grupo = labelEtiquetaGrupo(normalizeEtiquetaGrupo(link.etiquetaGrupo))

  if (!lado && !grupo) {
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
    </div>
  )
}
