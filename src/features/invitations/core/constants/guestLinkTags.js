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

const GRUPO_SUMMARY_LABELS = {
  familia: 'Familia',
  amigo: 'Amigos',
  trabajo: 'Trabajo',
  universidad: 'Universidad/Estudios',
  otros: 'Otros',
}

/**
 * @param {Record<string, number>} grupos
 * @param {number} sinGrupo
 * @param {number} ambos
 */
function buildSideSummary(title, grupos, sinGrupo, ambos) {
  const rows = GUEST_LINK_ETIQUETA_GRUPO_OPTIONS.map((option) => ({
    id: option.id,
    label: GRUPO_SUMMARY_LABELS[option.id],
    count: grupos[option.id] ?? 0,
  }))
  if (sinGrupo > 0) rows.push({ id: 'sin-grupo', label: 'Sin grupo', count: sinGrupo })
  const total = rows.reduce((sum, row) => sum + row.count, 0)
  return {
    title,
    total,
    ambos,
    rows,
  }
}

/**
 * Desglose de cupos por grupo, separado en novia y novio.
 * Los invitados marcados como ambos cuentan en los dos lados.
 * @param {Array<{ cupos?: number, etiquetaLado?: string, etiquetaGrupo?: string }>} links
 */
export function summarizeGuestLinkTags(links) {
  /** @type {Record<'novia' | 'novio', { grupos: Record<string, number>, sinGrupo: number, ambos: number }>} */
  const sides = {
    novia: { grupos: {}, sinGrupo: 0, ambos: 0 },
    novio: { grupos: {}, sinGrupo: 0, ambos: 0 },
  }

  for (const link of links) {
    const people = Number(link.cupos)
    const count = Number.isFinite(people) && people > 0 ? people : 0
    if (!count) continue
    const lado = normalizeEtiquetaLado(link.etiquetaLado)
    const grupo = normalizeEtiquetaGrupo(link.etiquetaGrupo)
    /** @type {Array<'novia' | 'novio'>} */
    const targets = lado === 'ambos' ? ['novia', 'novio'] : lado === 'novia' || lado === 'novio' ? [lado] : []
    for (const target of targets) {
      const side = sides[target]
      if (lado === 'ambos') side.ambos += count
      if (grupo) side.grupos[grupo] = (side.grupos[grupo] ?? 0) + count
      else side.sinGrupo += count
    }
  }

  return {
    novia: buildSideSummary('Invitados de la novia', sides.novia.grupos, sides.novia.sinGrupo, sides.novia.ambos),
    novio: buildSideSummary('Invitados del novio', sides.novio.grupos, sides.novio.sinGrupo, sides.novio.ambos),
  }
}
