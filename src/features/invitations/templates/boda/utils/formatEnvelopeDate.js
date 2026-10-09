const MONTHS = [
  'ENERO',
  'FEBRERO',
  'MARZO',
  'ABRIL',
  'MAYO',
  'JUNIO',
  'JULIO',
  'AGOSTO',
  'SEPTIEMBRE',
  'OCTUBRE',
  'NOVIEMBRE',
  'DICIEMBRE',
]

/**
 * @param {string | undefined} fechaIso
 */
export function formatEnvelopeDate(fechaIso) {
  if (!fechaIso?.trim()) return ''

  const date = new Date(fechaIso)
  if (Number.isNaN(date.getTime())) return ''

  return `${date.getDate()}-${MONTHS[date.getMonth()]}-${date.getFullYear()}`
}
