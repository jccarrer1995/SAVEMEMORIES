/**
 * @param {string} [extra]
 * @param {Record<string, string>} fieldErrors
 * @param {string} field
 */
export function panelFieldClass(fieldErrors, field, extra = '') {
  const invalid = fieldErrors[field] ? 'is-invalid' : ''
  return ['panel-field', extra, invalid].filter(Boolean).join(' ')
}
