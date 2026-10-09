import { LEGACY_BODA_PROJECT_ID } from '../../../../app/router/routes.js'
import { isSupportedTemplateId } from '../constants/supportedTemplates.js'
import { fetchProjectRecord } from '../../../../lib/firebase/projectStore.js'
import { getProjectById as getRegistryProject } from '../registry/projectRegistry.js'
import { publicUrl, resolveMusicSrc, resolvePublicAssetUrl } from '../utils/publicUrl.js'

/**
 * @param {import('../types/invitationProject.js').InvitationProjectConfig} content
 */
function normalizeProjectAssets(content) {
  const fotos = content.fotos
  const normalizedFotos = fotos
    ? {
        ...fotos,
        hero: fotos.hero ? resolvePublicAssetUrl(fotos.hero) : fotos.hero,
        galeria: Array.isArray(fotos.galeria)
          ? fotos.galeria.map((item) => resolvePublicAssetUrl(item))
          : fotos.galeria,
      }
    : fotos

  return {
    ...content,
    musicaSrc: resolveMusicSrc(content.musicaSrc, '/boda/musica.mp3'),
    fotos: normalizedFotos,
  }
}

/**
 * @param {import('../types/invitationProject.js').RegisteredProject} project
 */
function normalizeRegisteredProject(project) {
  const withAssets = normalizeProjectAssets(project.config)
  const normalizedContent =
    project.templateId === 'boda'
      ? applyLegacyBodaContent(withAssets)
      : {
          ...withAssets,
          musicaSrc: resolveMusicSrc(withAssets.musicaSrc, '/baby-shower/baby-shower.mp3'),
        }

  return {
    ...project,
    config: {
      ...project.config,
      ...normalizedContent,
    },
  }
}

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
  const withAssets = normalizeProjectAssets(content)
  const normalizedContent =
    record.templateId === 'boda'
      ? applyLegacyBodaContent(withAssets)
      : {
          ...withAssets,
          musicaSrc: resolveMusicSrc(withAssets.musicaSrc, '/baby-shower/baby-shower.mp3'),
        }

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
  if (projectId === LEGACY_BODA_PROJECT_ID) {
    const registered = getRegistryProject(projectId)
    return registered ? normalizeRegisteredProject(registered) : null
  }

  try {
    const record = await fetchProjectRecord(projectId)
    if (record) {
      if (record.status !== 'active') return null
      return mapRecordToRegistered(record)
    }
  } catch {
    // Continúa con el registry estático.
  }

  const registered = getRegistryProject(projectId)
  return registered ? normalizeRegisteredProject(registered) : null
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

  const registered = getRegistryProject(projectId)
  return registered ? normalizeRegisteredProject(registered) : null
}
