const MONTHS_ES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
]

const DATE_TIME_PATTERN = /^(\d{4}-\d{2}-\d{2})[T\s](\d{2}:\d{2})/
const DATE_ONLY_PATTERN = /^(\d{4}-\d{2}-\d{2})/
const TIME_PATTERN = /^(\d{2}):(\d{2})/

/** @param {string} fechaIso */
export function splitFechaIso(fechaIso) {
  const trimmed = fechaIso.trim()
  if (!trimmed) return { fechaEvento: '', horaEvento: '' }

  const match = DATE_TIME_PATTERN.exec(trimmed)
  if (match) {
    return { fechaEvento: match[1], horaEvento: match[2] }
  }

  const dateOnly = DATE_ONLY_PATTERN.exec(trimmed)
  if (dateOnly) {
    return { fechaEvento: dateOnly[1], horaEvento: '19:00' }
  }

  return { fechaEvento: '', horaEvento: '' }
}

/**
 * @param {string} fechaEvento
 * @param {string} horaEvento
 */
export function joinFechaIso(fechaEvento, horaEvento) {
  const date = fechaEvento.trim()
  const time = horaEvento.trim()
  if (!date || !time) return ''
  const normalizedTime = time.length >= 5 ? time.slice(0, 5) : time
  return `${date}T${normalizedTime}:00-05:00`
}

/** @param {string} fechaEvento */
export function formatFechaEventoFeedback(fechaEvento) {
  const parts = fechaEvento.trim().split('-').map(Number)
  if (parts.length !== 3) return ''
  const [year, month, day] = parts
  if (!year || !month || !day || month < 1 || month > 12 || day < 1 || day > 31) return ''

  const monthLabel = MONTHS_ES[month - 1]
  return `Año ${year} · mes ${monthLabel} · día ${day}`
}

/** @param {string} horaEvento */
export function formatHoraEventoFeedback(horaEvento) {
  const match = TIME_PATTERN.exec(horaEvento.trim())
  if (!match) return ''
  const hour = Number(match[1])
  const minute = match[2]
  const suffix = hour >= 12 ? 'p. m.' : 'a. m.'
  const hour12 = hour % 12 || 12
  return `Hora ${hour12}:${minute} ${suffix}`
}
