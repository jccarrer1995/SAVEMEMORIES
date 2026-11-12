/** @typedef {import('../../invitations/core/types/invitationProject.js').InvitationTimelineItem} InvitationTimelineItem */

/** Ícono según palabras clave de la actividad. */
const ICON_RULES = [
  { icon: 'church', pattern: /misa|iglesia|ceremonia|bendici/i },
  { icon: 'waltz', pattern: /vals|entrada|coronaci|zapatill/i },
  { icon: 'cake', pattern: /pastel|torta|brindis de honor/i },
  { icon: 'glasses', pattern: /brind|llegad|bienven|cocktail|coctel|trago/i },
  { icon: 'people', pattern: /juego|reto|dinámica|dinamica|karaoke/i },
  { icon: 'dinner', pattern: /cena|comida|almuerzo|pizza|snack|picad/i },
  { icon: 'music', pattern: /bail|fiesta|disco|pista|música|musica|dj/i },
  { icon: 'gift', pattern: /regalo|sorpresa/i },
  { icon: 'clock', pattern: /after|cierre|final|fin\b/i },
]

/** @param {string} label */
function iconFor(label) {
  return ICON_RULES.find((rule) => rule.pattern.test(label))?.icon ?? 'sparkle'
}

/**
 * Convierte el cronograma a texto editable: una línea por momento ("18:00 - Llegada").
 * @param {unknown} cronograma
 */
export function cronogramaToText(cronograma) {
  if (!Array.isArray(cronograma)) return ''
  return cronograma
    .map((item) => {
      const hora = typeof item?.hora === 'string' ? item.hora.trim() : ''
      const label = typeof item?.label === 'string' ? item.label.trim() : ''
      return [hora, label].filter(Boolean).join(' - ')
    })
    .filter(Boolean)
    .join('\n')
}

/**
 * Lee líneas "18:00 - Llegada y brindis" (también acepta "|" o ":" tras la hora).
 * @param {string} text
 * @returns {InvitationTimelineItem[]}
 */
export function textToCronograma(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const match = line.match(/^(\d{1,2}[:.h]\d{2}\s*(?:hrs|h|am|pm)?)\s*[-–—|:]?\s*(.*)$/i)
      const hora = match ? match[1].trim() : ''
      const label = (match ? match[2] : line).trim() || line
      return {
        id: `momento-${index + 1}`,
        hora,
        label,
        icon: iconFor(label),
      }
    })
}
