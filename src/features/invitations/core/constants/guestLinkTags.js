/** @typedef {'novio' | 'novia' | 'ambos'} GuestLinkEtiquetaLado */
/** @typedef {'familia' | 'amigo' | 'trabajo' | 'universidad' | 'otros'} GuestLinkEtiquetaGrupo */

export const GUEST_LINK_ETIQUETA_LADO_OPTIONS = /** @type {const} */ ([
  { id: 'novio', label: 'Novio' },
  { id: 'novia', label: 'Novia' },
  { id: 'ambos', label: 'Ambos' },
])

export const GUEST_LINK_ETIQUETA_GRUPO_OPTIONS = /** @type {const} */ ([
  { id: 'familia', label: 'Familia' },
  { id: 'amigo', label: 'Amigo' },
  { id: 'trabajo', label: 'Trabajo' },
  { id: 'universidad', label: 'Universidad/Estudios' },
  { id: 'otros', label: 'Otros' },
])

const LADO_IDS = new Set(GUEST_LINK_ETIQUETA_LADO_OPTIONS.map((o) => o.id))
const GRUPO_IDS = new Set(GUEST_LINK_ETIQUETA_GRUPO_OPTIONS.map((o) => o.id))

/**
 * @param {unknown} value
 * @returns {GuestLinkEtiquetaLado | ''}
 */
export function normalizeEtiquetaLado(value) {
  const id = typeof value === 'string' ? value.trim() : ''
  return LADO_IDS.has(/** @type {GuestLinkEtiquetaLado} */ (id)) ? /** @type {GuestLinkEtiquetaLado} */ (id) : ''
}

/**
 * @param {unknown} value
 * @returns {GuestLinkEtiquetaGrupo | ''}
 */
export function normalizeEtiquetaGrupo(value) {
  const id = typeof value === 'string' ? value.trim() : ''
  return GRUPO_IDS.has(/** @type {GuestLinkEtiquetaGrupo} */ (id))
    ? /** @type {GuestLinkEtiquetaGrupo} */ (id)
    : ''
}

/**
 * @param {GuestLinkEtiquetaLado | '' | undefined} id
 */
export function labelEtiquetaLado(id) {
  return GUEST_LINK_ETIQUETA_LADO_OPTIONS.find((o) => o.id === id)?.label ?? ''
}

/**
 * @param {GuestLinkEtiquetaGrupo | '' | undefined} id
 */
export function labelEtiquetaGrupo(id) {
  return GUEST_LINK_ETIQUETA_GRUPO_OPTIONS.find((o) => o.id === id)?.label ?? ''
}

/**
 * @param {{ etiquetaLado?: string, etiquetaGrupo?: string }} link
 */
export function formatGuestLinkEtiquetasSummary(link) {
  const parts = [
    labelEtiquetaLado(normalizeEtiquetaLado(link.etiquetaLado)),
    labelEtiquetaGrupo(normalizeEtiquetaGrupo(link.etiquetaGrupo)),
  ].filter(Boolean)
  return parts.join(' · ')
}
