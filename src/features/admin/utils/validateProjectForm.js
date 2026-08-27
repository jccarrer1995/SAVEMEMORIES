/** @typedef {import('../types/projectRecord.js').ProjectFormValues} ProjectFormValues */

/** @type {Record<string, string>} */
const FIELD_LABELS = {
  title: 'Título del proyecto',
  slug: 'Identificador (URL)',
  novio: 'Novio',
  novia: 'Novia',
  fechaLabel: 'Fecha (texto)',
  fechaEvento: 'Fecha del evento',
  horaEvento: 'Hora del evento',
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

  if (!values.slug.trim()) {
    fieldErrors.slug = 'Completa el identificador (URL).'
  } else if (!/^[a-z0-9-]+$/.test(values.slug.trim())) {
    fieldErrors.slug = 'Usa solo minúsculas, números y guiones.'
  }

  if (values.templateId === 'boda') {
    if (!values.novio.trim()) fieldErrors.novio = 'Indica el nombre del novio.'
    if (!values.novia.trim()) fieldErrors.novia = 'Indica el nombre de la novia.'
    if (!values.fechaLabel.trim()) fieldErrors.fechaLabel = 'Indica la fecha en texto.'
    if (!values.fechaEvento.trim()) fieldErrors.fechaEvento = 'Selecciona la fecha del evento.'
    if (!values.horaEvento.trim()) fieldErrors.horaEvento = 'Selecciona la hora del evento.'
  }

  return { valid: Object.keys(fieldErrors).length === 0, fieldErrors }
}

/** @param {Record<string, string>} fieldErrors */
export function summarizeFieldErrors(fieldErrors) {
  const keys = Object.keys(fieldErrors)
  if (keys.length === 0) return ''
  if (keys.length === 1) {
    const key = keys[0]
    return `Falta completar: ${FIELD_LABELS[key] ?? key}.`
  }
  const labels = keys.map((key) => FIELD_LABELS[key] ?? key)
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
