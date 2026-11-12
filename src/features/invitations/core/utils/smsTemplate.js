import { asText } from '../../../../shared/utils/asText.js'

/** Token para el enlace personalizado de cada invitado. */
export const SMS_TEMPLATE_LINK_TOKEN = '{{enlace}}'

/** Token opcional con el nombre del grupo / invitado del enlace. */
export const SMS_TEMPLATE_GUEST_TOKEN = '{{invitado}}'

/**
 * @param {{ novio?: string, novia?: string }} names
 */
export function buildDefaultSmsTemplate({ novio = '', novia = '' } = {}) {
  const signature =
    [novia.trim(), novio.trim()].filter(Boolean).join(' y ') || 'Nosotros'

  return `¡Hola! 🤍✨

Con mucha ilusión y el corazón lleno de amor, queremos compartir con ustedes una noticia muy especial… ¡NOS CASAMOS! 💍🥹🤍

Estamos por comenzar una hermosa etapa juntos y nos encantaría que fueran parte de este momento tan importante en nuestras vidas. 🥂✨

💌 Aquí les compartimos nuestra invitación, donde encontrarán todos los detalles de este día tan especial y podrán confirmar su asistencia:
${SMS_TEMPLATE_LINK_TOKEN}

🤍 Les pedimos un favor muy especial: confirmar su asistencia a la brevedad, para poder preparar cada detalle con mucho cariño.

Gracias por ser parte de nuestras vidas. ¡Esperamos celebrar nuestro amor junto a ustedes! 🥹💕

Con cariño,
${signature} 💍✨`
}

/**
 * @param {{ novia?: string }} names
 */
export function buildDespedidaSmsTemplate({ novia = '' } = {}) {
  const nombre = novia.trim() || 'la novia'

  return `¡Holaaa! 💖✨

🚨 Alerta de despedida 🚨 ${nombre} se nos casa y antes nos vamos a despedir su soltería como se merece 💋💃

Aquí está tu pase con todos los detalles (y qué traer 🍿🍾). Confirma porfa para contar contigo:
${SMS_TEMPLATE_LINK_TOKEN}

¡No faltes, que sin ti no es lo mismo! 👯‍♀️💅`
}

/**
 * @param {{ novia?: string }} names
 */
export function buildXvSmsTemplate({ novia = '' } = {}) {
  const nombre = novia.trim() || 'Nuestra quinceañera'

  return `¡Hola! 🤍

Con mucha ilusión queremos invitarte a celebrar los XV años de ${nombre}, una noche que hemos soñado por mucho tiempo y que no sería igual sin ti.

En tu invitación encontrarás todos los detalles y podrás confirmar tu asistencia:
${SMS_TEMPLATE_LINK_TOKEN}

Te pedimos confirmar a la brevedad para reservar tu lugar.

Con cariño,
${nombre} y familia ✨`
}

/**
 * @param {import('../../../admin/types/projectRecord.js').ProjectRecord | { smsTemplate?: string, templateId?: string, content?: Record<string, unknown> }} project
 */
export function getProjectSmsTemplate(project) {
  const saved = asText(project.smsTemplate).trim()
  if (saved) return saved

  const content = project.content ?? {}
  if (project.templateId === 'despedida') {
    return buildDespedidaSmsTemplate({ novia: asText(content.novia) })
  }
  if (project.templateId === 'xv') {
    return buildXvSmsTemplate({ novia: asText(content.novia) })
  }
  return buildDefaultSmsTemplate({
    novio: asText(content.novio),
    novia: asText(content.novia),
  })
}

/**
 * @param {string} template
 * @param {{ linkUrl: string, guestLabel?: string }} vars
 */
export function renderSmsTemplate(template, { linkUrl, guestLabel = '' }) {
  return template
    .replaceAll(SMS_TEMPLATE_LINK_TOKEN, linkUrl)
    .replaceAll('{{link}}', linkUrl)
    .replaceAll(SMS_TEMPLATE_GUEST_TOKEN, guestLabel)
}
