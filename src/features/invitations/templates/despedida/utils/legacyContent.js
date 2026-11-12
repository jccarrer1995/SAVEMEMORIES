/**
 * Proyectos de despedida creados antes de que el plan de la noche fuera editable
 * guardaron el plan de ejemplo (20:00 en adelante, con "A bailar"). Mientras ese
 * plan siga sin tocar, lo alineamos con la hora real del evento y quitamos lo de baile.
 */

const LEGACY_PLAN_IDS = ['llegada', 'juegos', 'cena', 'baile', 'after']
const LEGACY_TRAER_LINE = 'Ganas de bailar toda la noche 💃'

/** @param {string} hora */
function toMinutes(hora) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hora.trim())
  if (!match) return null
  return Number(match[1]) * 60 + Number(match[2])
}

/** @param {number} minutes */
function fromMinutes(minutes) {
  const wrapped = ((minutes % 1440) + 1440) % 1440
  const h = String(Math.floor(wrapped / 60)).padStart(2, '0')
  const m = String(wrapped % 60).padStart(2, '0')
  return `${h}:${m}`
}

/** Hora local del evento tal como se escribió en fechaIso ("...T18:00:00-05:00"). */
function eventStartMinutes(fechaIso) {
  if (typeof fechaIso !== 'string') return null
  const match = /T(\d{2}):(\d{2})/.exec(fechaIso)
  return match ? Number(match[1]) * 60 + Number(match[2]) : null
}

/** @param {unknown} cronograma */
function isUntouchedSamplePlan(cronograma) {
  return (
    Array.isArray(cronograma) &&
    cronograma.length > 0 &&
    cronograma.every((item) => LEGACY_PLAN_IDS.includes(item?.id)) &&
    cronograma.every((item) => typeof item?.hora === 'string' && toMinutes(item.hora) !== null)
  )
}

/**
 * @template {{ cronograma?: unknown, fechaIso?: string, regalos?: { texto?: string } }} T
 * @param {T} content
 * @returns {T}
 */
export function applyLegacyDespedidaContent(content) {
  let next = content

  if (isUntouchedSamplePlan(content.cronograma)) {
    const plan = /** @type {{ id: string, hora: string }[]} */ (content.cronograma).filter(
      (item) => item.id !== 'baile',
    )
    const start = eventStartMinutes(content.fechaIso)
    const first = plan.length > 0 ? toMinutes(plan[0].hora) : null
    const delta = start !== null && first !== null ? start - first : 0

    next = {
      ...next,
      cronograma: plan.map((item) => ({
        ...item,
        hora: fromMinutes(/** @type {number} */ (toMinutes(item.hora)) + delta),
      })),
    }
  }

  const traer = content.regalos?.texto
  if (typeof traer === 'string' && traer.includes(LEGACY_TRAER_LINE)) {
    next = {
      ...next,
      regalos: {
        ...content.regalos,
        texto: traer
          .split('\n')
          .filter((line) => line.trim() !== LEGACY_TRAER_LINE)
          .join('\n'),
      },
    }
  }

  return next
}
