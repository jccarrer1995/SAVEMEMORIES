/** @typedef {'draft' | 'active' | 'archived'} ProjectStatus */

/**
 * @typedef {object} ProjectRecord
 * @property {string} id
 * @property {string} slug
 * @property {string} templateId
 * @property {ProjectStatus} status
 * @property {string} title
 * @property {string} ownerId
 * @property {number} linkLimit
 * @property {Record<string, unknown>} content
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {object} ProjectFormValues
 * @property {string} slug
 * @property {string} templateId
 * @property {ProjectStatus} status
 * @property {string} title
 * @property {string} ownerId
 * @property {number} linkLimit
 * @property {string} novio
 * @property {string} novia
 * @property {string} iniciales
 * @property {string} fechaLabel
 * @property {string} fechaEvento
 * @property {string} horaEvento
 * @property {string} cita
 * @property {string} padresNovio
 * @property {string} padresNovia
 * @property {string} recepcionTitulo
 * @property {string} recepcionHora
 * @property {string} recepcionLugar
 * @property {string} recepcionDireccion
 * @property {string} recepcionMapsUrl
 * @property {string} regalosTexto
 * @property {string} dressCodeEstilo
 * @property {string} dressCodeDetalle
 * @property {string} noNinos
 * @property {string} invitadoDefault
 * @property {number} cuposDefault
 * @property {string} fotoHero
 * @property {string} fotosGaleria
 * @property {string} musicaSrc
 */

export const PROJECTS_COLLECTION = 'projects'
