const ROMAN_MONTHS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']

/**
 * Partes de la fecha del evento para la tipografía de la portada.
 * Usa la hora local escrita en fechaIso ("2027-03-20T17:00:00-05:00").
 * @param {string | undefined} fechaIso
 */
export function getXvDateParts(fechaIso) {
  const match = typeof fechaIso === 'string' ? /^(\d{4})-(\d{2})-(\d{2})/.exec(fechaIso) : null
  if (!match) return null
  const [, year, month, day] = match
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return {
    day: String(Number(day)).padStart(2, '0'),
    monthRoman: ROMAN_MONTHS[Number(month) - 1],
    monthName: date.toLocaleDateString('es-EC', { month: 'long' }),
    weekday: date.toLocaleDateString('es-EC', { weekday: 'long' }),
    year,
  }
}
