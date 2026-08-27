/**
 * Convierte valores primitivos a texto sin usar String() sobre objetos.
 * @param {unknown} value
 * @param {string} [fallback='']
 */
export function asText(value, fallback = '') {
  if (value === null || value === undefined) return fallback
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  return fallback
}
