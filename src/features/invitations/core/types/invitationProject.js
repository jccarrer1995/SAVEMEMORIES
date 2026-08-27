/**
 * @typedef {object} InvitationVenue
 * @property {string} titulo
 * @property {string} hora
 * @property {string} lugar
 * @property {string} direccion
 * @property {string} mapsUrl
 */

/**
 * @typedef {object} InvitationTimelineItem
 * @property {string} id
 * @property {string} hora
 * @property {string} label
 * @property {string} icon
 */

/**
 * @typedef {object} InvitationPhotos
 * @property {string} hero
 * @property {string[]} galeria
 */

/**
 * @typedef {object} InvitationProjectConfig
 * @property {string} id
 * @property {string} templateId
 * @property {string} title
 * @property {string} novio
 * @property {string} novia
 * @property {string} iniciales
 * @property {string} fechaLabel
 * @property {string} fechaIso
 * @property {string} cita
 * @property {{ novio: string[], novia: string[] }} padres
 * @property {InvitationVenue} recepcion
 * @property {InvitationTimelineItem[]} cronograma
 * @property {{ texto: string }} regalos
 * @property {{ estilo: string, detalle: string }} dressCode
 * @property {string} noNinos
 * @property {{ nombre: string, cupos: number }} invitadosPorDefecto
 * @property {InvitationPhotos} fotos
 * @property {string} musicaSrc
 */

/**
 * @typedef {object} GuestInvite
 * @property {string} nombre
 * @property {number} cupos
 * @property {string} [linkCode]
 */

/**
 * @typedef {object} RegisteredProject
 * @property {string} templateId
 * @property {InvitationProjectConfig} config
 */

export {}
