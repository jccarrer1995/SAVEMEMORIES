import { LEGACY_BODA_PROJECT_ID } from '../../../app/router/routes.js'

export const SITE = {
  name: 'SAVEMEMORIES',
  tagline: 'Invitaciones digitales con alma',
  email: 'contacto@savememories.com',
  whatsapp: '593999999999',
  whatsappMessage: 'Hola, me gustaría cotizar una invitación digital para mi evento.',
}

export const NAV_LINKS = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'plantillas', label: 'Plantillas' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contacto', label: 'Contacto' },
]

export const FEATURES = [
  {
    title: 'Diseño personalizado',
    text: 'Textos, fotos, música, ubicación y cronograma adaptados a tu evento.',
  },
  {
    title: 'Enlaces por invitado',
    text: 'Cada familia recibe su enlace con cupos definidos. Sin confusiones.',
  },
  {
    title: 'Confirmaciones en vivo',
    text: 'Recibe respuestas en un panel y expórtalas a Excel cuando quieras.',
  },
]

export const TEMPLATES = [
  {
    id: 'boda',
    name: 'Boda',
    description: 'Sobre animado, galería, countdown y formulario de confirmación.',
    demoPath: `/invitacion/${LEGACY_BODA_PROJECT_ID}`,
    available: true,
  },
  {
    id: 'xv',
    name: 'Quinceañera',
    description: 'Estilo festivo con paleta personalizable y secciones modulares.',
    available: false,
  },
  {
    id: 'baby',
    name: 'Baby shower',
    description: 'Tonos pasteles, sobre animado y confirmación de asistencia.',
    demoPath: '/demo/baby-shower',
    available: true,
  },
]

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Cuéntanos tu evento',
    text: 'Fecha, tipo de celebración, estilo visual y cantidad de invitados.',
  },
  {
    step: '02',
    title: 'Diseñamos tu invitación',
    text: 'Configuramos plantilla, textos, fotos, mapa y música.',
  },
  {
    step: '03',
    title: 'Generamos tus enlaces',
    text: 'Creamos un link único por grupo con sus cupos asignados.',
  },
  {
    step: '04',
    title: 'Recibe confirmaciones',
    text: 'Consulta respuestas desde tu panel y descarga el reporte.',
  },
]

export const FAQ_ITEMS = [
  {
    question: '¿Puedo ver una demo antes de contratar?',
    answer:
      'Sí. Tenemos una invitación de boda demo en vivo para que explores la experiencia completa del invitado.',
  },
  {
    question: '¿Los invitados necesitan crear cuenta?',
    answer: 'No. Solo abren su enlace, confirman asistencia y listo.',
  },
  {
    question: '¿Puedo modificar textos o fotos después?',
    answer:
      'Dependiendo de tu plan, podrás solicitar ajustes. El panel de administración permitirá cambios en etapas posteriores.',
  },
  {
    question: '¿Qué pasa si alguien cambia la URL del enlace?',
    answer:
      'En la versión final los cupos se validan en la nube. Si el enlace no es válido, se muestra un mensaje de error.',
  },
]

/**
 * @param {string} phone
 * @param {string} message
 */
export function whatsappUrl(phone, message) {
  const text = encodeURIComponent(message)
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${text}`
}

/**
 * @param {string} subject
 */
export function mailtoQuote(subject = 'Cotización invitación digital') {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`
}
