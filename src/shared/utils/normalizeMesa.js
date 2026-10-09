/**
 * @param {unknown} value
 * @returns {string | undefined}
 */
export function normalizeMesa(value) {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}
