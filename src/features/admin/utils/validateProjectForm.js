import { getProjectFieldLabels } from '../data/templateOptions.js'

/** @typedef {import('../types/projectRecord.js').ProjectFormValues} ProjectFormValues */

/** @type {ReadonlySet<string>} */
const EVENT_TEMPLATE_IDS = new Set(['boda', 'babyshower'])

/**
 * @param {string} templateId
 */
function getFieldLabels(templateId) {
  const labels = getProjectFieldLabels(templateId)
  return {
    title: 'Título del proyecto',
    slug: 'Identificador (URL)',
    novio: labels.novio,
    novia: labels.novia,
    fechaLabel: 'Fecha (texto)',
    fechaEvento: 'Fecha del evento',
    horaEvento: 'Hora del evento',
  }
}

/**
 * @param {string} slug
 * @param {Record<string, string>} fieldErrors
 */
function validateSlug(slug, fieldErrors) {
  if (!slug.trim()) {
    fieldErrors.slug = 'Completa el identificador (URL).'
    return
  }

  if (!/^[a-z0-9-]+$/.test(slug.trim())) {
    fieldErrors.slug = 'Usa solo minúsculas, números y guiones.'
  }
}

/**
 * @param {ProjectFormValues} values
 * @param {Record<string, string>} fieldErrors
 */
function validateEventTemplateFields(values, fieldErrors) {
  if (!EVENT_TEMPLATE_IDS.has(values.templateId)) return

  const isBabyShower = values.templateId === 'babyshower'
  const coupleMessages = isBabyShower
    ? { novio: 'Indica el nombre del bebé.', novia: 'Indica el nombre de la mamita.' }
    : { novio: 'Indica el nombre del novio.', novia: 'Indica el nombre de la novia.' }

  if (!values.novio.trim()) fieldErrors.novio = coupleMessages.novio
  if (!values.novia.trim()) fieldErrors.novia = coupleMessages.novia
  if (!values.fechaLabel.trim()) fieldErrors.fechaLabel = 'Indica la fecha en texto.'
  if (!values.fechaEvento.trim()) fieldErrors.fechaEvento = 'Selecciona la fecha del evento.'
  if (!values.horaEvento.trim()) fieldErrors.horaEvento = 'Selecciona la hora del evento.'
}

/**
 * @param {ProjectFormValues} values
 * @returns {{ valid: boolean, fieldErrors: Record<string, string> }}
 */
export function validateProjectForm(values) {
  /** @type {Record<string, string>} */
  const fieldErrors = {}

  if (!values.title.trim()) {
    fieldErrors.title = 'Completa el título del proyecto.'
  }

  validateSlug(values.slug, fieldErrors)
  validateEventTemplateFields(values, fieldErrors)

  return { valid: Object.keys(fieldErrors).length === 0, fieldErrors }
}

/**
 * @param {Record<string, string>} fieldErrors
 * @param {string} [templateId='boda']
 */
export function summarizeFieldErrors(fieldErrors, templateId = 'boda') {
  const fieldLabels = getFieldLabels(templateId)
  const keys = Object.keys(fieldErrors)
  if (keys.length === 0) return ''
  if (keys.length === 1) {
    const key = keys[0]
    return `Falta completar: ${fieldLabels[key] ?? key}.`
  }
  const labels = keys.map((key) => fieldLabels[key] ?? key)
  return `Faltan completar: ${labels.join(', ')}.`
}

/**
 * @param {string} message
 * @returns {Record<string, string>}
 */
export function mapSaveErrorToFields(message) {
  if (message.includes('identificador')) {
    return { slug: message }
  }
  return {}
}
