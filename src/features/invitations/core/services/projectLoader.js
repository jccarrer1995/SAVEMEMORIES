import { isSupportedTemplateId } from '../constants/supportedTemplates.js'
import { fetchProjectRecord } from '../../../../lib/firebase/projectStore.js'
import { getProjectById as getRegistryProject } from '../registry/projectRegistry.js'
import { publicUrl } from '../utils/publicUrl.js'

/** @type {readonly string[]} */
const REMOVED_BODA_GALLERY_FILES = ['Pareja2.jpeg', 'Pareja3.jpeg']

/**
 * @param {import('../types/invitationProject.js').InvitationProjectConfig} content
 */
function applyLegacyBodaContent(content) {
  const fotos = content.fotos ?? { hero: '', galeria: [] }
  let hero = fotos.hero
  if (typeof hero === 'string' && hero.includes('Pareja1.jpeg')) {
    hero = publicUrl('/boda/couple-2.jpg')
  }

  const galeria = Array.isArray(fotos.galeria)
    ? fotos.galeria.filter(
        (url) =>
          typeof url === 'string' &&
          !REMOVED_BODA_GALLERY_FILES.some((filename) => url.includes(filename)),
      )
    : fotos.galeria

  let cronograma = content.cronograma
  let cronogramaChanged = false
  if (Array.isArray(cronograma)) {
    cronograma = cronograma.map((item) => {
      if (item.id === 'cena' && item.hora === '21:00 hrs') {
        cronogramaChanged = true
        return { ...item, hora: '22:00 hrs' }
      }
      if (
        item.id === 'fiesta' &&
        (item.hora === '22:30 hrs' || item.hora === '22:00 hrs')
      ) {
        cronogramaChanged = true
        return { ...item, hora: '00:00 hrs' }
      }
      return item
    })
  }

  const fotosChanged = hero !== fotos.hero || galeria !== fotos.galeria

  if (!fotosChanged && !cronogramaChanged) return content

  return {
    ...content,
    fotos: { ...fotos, hero, galeria },
    ...(cronogramaChanged ? { cronograma } : {}),
  }
}

/**
 * @param {import('../../admin/types/projectRecord.js').ProjectRecord} record
 * @returns {import('../types/invitationProject.js').RegisteredProject | null}
 */
function mapRecordToRegistered(record) {
  if (!isSupportedTemplateId(record.templateId)) return null

  const content = /** @type {import('../types/invitationProject.js').InvitationProjectConfig} */ (
    record.content
  )
  const normalizedContent =
    record.templateId === 'boda' ? applyLegacyBodaContent(content) : content

  return {
    templateId: record.templateId,
    config: {
      id: record.slug,
      templateId: record.templateId,
      title: record.title,
      ...normalizedContent,
    },
  }
}

/**
 * @param {string} projectId
 * @returns {Promise<import('../types/invitationProject.js').RegisteredProject | null>}
 */
export async function loadPublicProject(projectId) {
  try {
    const record = await fetchProjectRecord(projectId)
    if (record) {
      if (record.status !== 'active') return null
      return mapRecordToRegistered(record)
    }
  } catch {
    // Continúa con el registry estático.
  }

  return getRegistryProject(projectId)
}

/**
 * @param {string} projectId
 * @returns {Promise<import('../types/invitationProject.js').RegisteredProject | null>}
 */
export async function loadProjectForResponses(projectId) {
  try {
    const record = await fetchProjectRecord(projectId)
    if (record) return mapRecordToRegistered(record)
  } catch {
    // Continúa con el registry estático.
  }

  return getRegistryProject(projectId)
}
