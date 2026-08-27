/** @typedef {import('../types/clientRecord.js').ClientFormValues} ClientFormValues */

/** @type {Record<string, string>} */
const FIELD_LABELS = {
  email: 'Correo',
  displayName: 'Nombre',
  temporarySecret: 'Contraseña temporal',
}

const MIN_SECRET_LENGTH = 6

/**
 * @param {string} email
 */
function isValidEmail(email) {
  const at = email.indexOf('@')
  if (at <= 0) return false
  const domain = email.slice(at + 1)
  return domain.length > 0 && domain.includes('.') && !email.includes(' ')
}

/**
 * @param {ClientFormValues} values
 * @param {boolean} isNew
 * @returns {{ valid: boolean, fieldErrors: Record<string, string> }}
 */
export function validateClientForm(values, isNew) {
  /** @type {Record<string, string>} */
  const fieldErrors = {}

  const email = values.email.trim()
  if (!email) {
    fieldErrors.email = 'Indica el correo del cliente.'
  } else if (!isValidEmail(email)) {
    fieldErrors.email = 'El correo no es válido.'
  }

  if (!values.displayName.trim()) {
    fieldErrors.displayName = 'Indica el nombre del cliente.'
  }

  if (isNew) {
    const temporarySecret = values.temporarySecret.trim()
    if (!temporarySecret) {
      fieldErrors.temporarySecret = 'Indica una contraseña temporal.'
    } else if (temporarySecret.length < MIN_SECRET_LENGTH) {
      fieldErrors.temporarySecret = `La contraseña debe tener al menos ${MIN_SECRET_LENGTH} caracteres.`
    }
  }

  return { valid: Object.keys(fieldErrors).length === 0, fieldErrors }
}

/** @param {Record<string, string>} fieldErrors */
export function summarizeClientFieldErrors(fieldErrors) {
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
 * @param {unknown} error
 * @returns {Record<string, string>}
 */
export function mapClientSaveErrorToFields(error) {
  const code =
    error && typeof error === 'object' && 'code' in error && typeof error.code === 'string'
      ? error.code
      : ''

  if (code === 'auth/email-already-in-use') {
    return { email: 'Ese correo ya está registrado en Firebase Auth.' }
  }
  if (code === 'auth/invalid-email') {
    return { email: 'El correo no es válido.' }
  }
  if (code === 'auth/weak-password') {
    return { temporarySecret: 'La contraseña es demasiado débil (mínimo 6 caracteres).' }
  }

  const message = error instanceof Error ? error.message : ''
  if (message.includes('correo')) return { email: message }
  if (message.includes('contraseña') || message.includes('Contraseña')) return { temporarySecret: message }
  return {}
}

/**
 * @param {unknown} error
 */
export function getClientSaveErrorMessage(error) {
  const mapped = mapClientSaveErrorToFields(error)
  const first = Object.values(mapped)[0]
  if (first) return first

  if (error instanceof Error && error.message) return error.message
  return 'No se pudo guardar el cliente.'
}
