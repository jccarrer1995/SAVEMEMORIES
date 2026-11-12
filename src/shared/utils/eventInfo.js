import { resolvePublicAssetUrl } from '../../features/invitations/core/utils/publicUrl.js'

/** @typedef {import('../../features/admin/types/projectRecord.js').ProjectRecord} ProjectRecord */

/** @param {unknown} value */
const text = (value) => (typeof value === 'string' ? value.trim() : '')

/**
 * Datos legibles del evento a partir del contenido del proyecto.
 * @param {ProjectRecord} project
 */
export function getEventInfo(project) {
  const content = /** @type {Record<string, any>} */ (project.content ?? {})
  const novio = text(content.novio)
  const novia = text(content.novia)
  const couple = novio && novia ? `${novio} & ${novia}` : novio || novia
  const iso = text(content.fechaIso)
  const parsed = iso ? new Date(iso) : null
  const date = parsed && !Number.isNaN(parsed.getTime()) ? parsed : null

  return {
    name: couple || project.title || project.slug,
    title: project.title || project.slug,
    dateLabel: text(content.fechaLabel),
    date,
    daysLeft: date ? daysUntil(date) : null,
    venue: text(content.recepcion?.lugar),
    heroImage: resolvePublicAssetUrl(text(content.fotos?.hero)),
  }
}

/** @param {Date} date */
export function daysUntil(date) {
  const startOfDay = (value) => new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime()
  return Math.round((startOfDay(date) - startOfDay(new Date())) / 86_400_000)
}

/** @param {number | null} days */
export function formatDaysLeft(days) {
  if (days === null) return 'Sin fecha'
  if (days === 0) return '¡Es hoy!'
  if (days === 1) return 'Mañana'
  if (days < 0) return days === -1 ? 'Fue ayer' : `Hace ${Math.abs(days)} días`
  return `Faltan ${days} días`
}

/** @param {string | undefined} iso */
export function formatRelativeDate(iso) {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const diffMinutes = Math.round((Date.now() - date.getTime()) / 60_000)
  if (diffMinutes < 1) return 'Hace un momento'
  if (diffMinutes < 60) return `Hace ${diffMinutes} min`
  const diffHours = Math.round(diffMinutes / 60)
  if (diffHours < 24) return `Hace ${diffHours} h`
  const diffDays = Math.round(diffHours / 24)
  if (diffDays < 7) return diffDays === 1 ? 'Ayer' : `Hace ${diffDays} días`
  return date.toLocaleDateString('es-EC', { day: 'numeric', month: 'short' })
}

/** Saludo según la hora local. */
export function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Buenos días'
  if (hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

/** @param {string | undefined} displayName @param {string | undefined} email */
export function firstName(displayName, email) {
  const name = text(displayName).split(/\s+/)[0]
  if (name) return name
  return text(email).split('@')[0]
}
