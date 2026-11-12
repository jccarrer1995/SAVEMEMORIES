import { formatMesaSimulationHeading, groupLinksByMesa } from '../../admin/utils/guestLinkTableHelpers.js'
import {
  GUEST_LINK_ETIQUETA_GRUPO_OPTIONS,
  labelEtiquetaGrupo,
  labelEtiquetaLado,
  normalizeEtiquetaGrupo,
  normalizeEtiquetaLado,
} from '../../invitations/core/constants/guestLinkTags.js'

/** @typedef {import('../../invitations/core/types/guestLink.js').GuestLinkRecord} GuestLinkRecord */
/** @typedef {'todos' | 'novia' | 'novio' | 'ambos'} LadoFilter */
/** @typedef {{ lado: LadoFilter, grupos: string[] }} MesaFilters */

/** Tonos para distinguir cada grupo de invitados alrededor de la mesa. */
export const SEAT_TONES = ['#a8b096', '#c97a52', '#d8c7a6', '#8fa3ad', '#c99a8f', '#c9a55a', '#7f8c6a', '#b7a7c4']

export const SIN_GRUPO = 'sin-grupo'

/** @type {MesaFilters} */
export const EMPTY_FILTERS = { lado: 'todos', grupos: [] }

export const LADO_FILTERS = /** @type {const} */ ([
  { id: 'todos', label: 'Todos' },
  { id: 'novia', label: 'Novia' },
  { id: 'novio', label: 'Novio' },
  { id: 'ambos', label: 'Ambos' },
])

export const GRUPO_FILTERS = [
  ...GUEST_LINK_ETIQUETA_GRUPO_OPTIONS.map((option) => ({ id: option.id, label: option.label })),
  { id: SIN_GRUPO, label: 'Sin grupo' },
]

/** @param {number} count */
export function peopleLabel(count) {
  return `${count} ${count === 1 ? 'persona' : 'personas'}`
}

/** @param {string} mesaLabel */
export function mesaHeading(mesaLabel) {
  return formatMesaSimulationHeading(mesaLabel).replace('#', ' ')
}

/** @param {string} mesaLabel */
export function mesaNumber(mesaLabel) {
  return mesaHeading(mesaLabel).replace(/^Mesa\s*/i, '') || mesaLabel
}

/** @param {GuestLinkRecord} link */
export function guestTagLabels(link) {
  return [
    labelEtiquetaLado(normalizeEtiquetaLado(link.etiquetaLado)),
    labelEtiquetaGrupo(normalizeEtiquetaGrupo(link.etiquetaGrupo)),
  ].filter(Boolean)
}

/**
 * Novia incluye a los marcados como "ambos"; igual para novio.
 * @param {GuestLinkRecord} link
 * @param {LadoFilter} lado
 */
function matchesLado(link, lado) {
  if (lado === 'todos') return true
  const value = normalizeEtiquetaLado(link.etiquetaLado)
  if (lado === 'ambos') return value === 'ambos'
  return value === lado || value === 'ambos'
}

/**
 * @param {GuestLinkRecord} link
 * @param {string[]} grupos
 */
function matchesGrupo(link, grupos) {
  if (grupos.length === 0) return true
  const value = normalizeEtiquetaGrupo(link.etiquetaGrupo) || SIN_GRUPO
  return grupos.includes(value)
}

/**
 * @param {GuestLinkRecord[]} links
 * @param {MesaFilters} filters
 */
export function filterLinks(links, filters) {
  return links.filter((link) => matchesLado(link, filters.lado) && matchesGrupo(link, filters.grupos))
}

/**
 * Personas que verían cada opción de filtro, combinada con el otro criterio activo.
 * @param {GuestLinkRecord[]} links
 * @param {MesaFilters} filters
 */
export function countFilterOptions(links, filters) {
  const seated = links.filter((link) => link.mesa?.trim())
  const sum = (list) => list.reduce((total, link) => total + (Number(link.cupos) || 0), 0)

  /** @type {Record<string, number>} */
  const lado = {}
  for (const option of LADO_FILTERS) {
    lado[option.id] = sum(seated.filter((link) => matchesLado(link, option.id) && matchesGrupo(link, filters.grupos)))
  }

  /** @type {Record<string, number>} */
  const grupo = { todos: sum(seated.filter((link) => matchesLado(link, filters.lado))) }
  for (const option of GRUPO_FILTERS) {
    grupo[option.id] = sum(seated.filter((link) => matchesLado(link, filters.lado) && matchesGrupo(link, [option.id])))
  }

  return { lado, grupo }
}

/**
 * Color fijo por invitado (según su orden en la mesa completa), para que no cambie al filtrar.
 * @param {GuestLinkRecord[]} links
 */
export function buildToneMap(links) {
  /** @type {Record<string, string>} */
  const tones = {}
  for (const group of groupLinksByMesa(links)) {
    group.guests.forEach((guest, index) => {
      tones[guest.id] = SEAT_TONES[index % SEAT_TONES.length]
    })
  }
  return tones
}

/** @param {MesaFilters} filters */
export function hasActiveFilters(filters) {
  return filters.lado !== 'todos' || filters.grupos.length > 0
}

/** @param {MesaFilters} filters */
export function describeFilters(filters) {
  const parts = []
  if (filters.lado !== 'todos') {
    parts.push(LADO_FILTERS.find((option) => option.id === filters.lado)?.label ?? filters.lado)
  }
  if (filters.grupos.length > 0) {
    parts.push(
      filters.grupos.map((id) => GRUPO_FILTERS.find((option) => option.id === id)?.label ?? id).join(', '),
    )
  }
  return parts.join(' · ')
}
