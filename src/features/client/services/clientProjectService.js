import { countGuestLinks } from '../../../lib/firebase/guestLinkStore.js'
import {
  fetchProjectRecordForOwner,
  listProjectRecordsByOwner,
} from '../../../lib/firebase/clientProjectStore.js'
import { patchProjectSmsTemplate } from '../../../lib/firebase/projectStore.js'

export { listGuestLinks } from '../../../lib/firebase/guestLinkStore.js'
export {
  createProjectGuestLink,
  toggleProjectGuestLink,
} from '../../admin/services/guestLinkService.js'

/**
 * @param {string} ownerId
 */
export async function listMyProjects(ownerId) {
  return listProjectRecordsByOwner(ownerId)
}

/**
 * @param {number} used
 * @param {number} limit
 */
export function formatGuestLinksUsage(used, limit) {
  if (limit > 0) return `${used}/${limit}`
  return `${used}/∞`
}

/**
 * @param {string} ownerId
 * @returns {Promise<Array<import('../../admin/types/projectRecord.js').ProjectRecord & { linksUsed: number }>>}
 */
export async function listMyProjectsWithLinkUsage(ownerId) {
  const projects = await listProjectRecordsByOwner(ownerId)
  return Promise.all(
    projects.map(async (project) => ({
      ...project,
      linksUsed: await countGuestLinks(project.slug),
    })),
  )
}

/**
 * @param {string} projectId
 * @param {string} ownerId
 */
export async function getMyProject(projectId, ownerId) {
  return fetchProjectRecordForOwner(projectId, ownerId)
}

/**
 * @param {string} projectId
 * @param {string} ownerId
 * @param {string} smsTemplate
 */
export async function saveMyProjectSmsTemplate(projectId, ownerId, smsTemplate) {
  const project = await fetchProjectRecordForOwner(projectId, ownerId)
  if (!project) throw new Error('Proyecto no encontrado o sin permiso.')

  const trimmed = smsTemplate.trim()
  if (trimmed.length > 5000) {
    throw new Error('La plantilla es demasiado larga (máximo 5000 caracteres).')
  }

  await patchProjectSmsTemplate(projectId, trimmed)
}

/**
 * @param {string} ownerId
 */
export async function getClientDashboardStats(ownerId) {
  const projects = await listProjectRecordsByOwner(ownerId)
  let linksCount = 0
  let linksLimit = 0

  await Promise.all(
    projects.map(async (project) => {
      const count = await countGuestLinks(project.slug)
      linksCount += count
      if (project.linkLimit > 0) linksLimit += project.linkLimit
    }),
  )

  return {
    projectsCount: projects.length,
    linksCount,
    linksAvailable: linksLimit > 0 ? Math.max(linksLimit - linksCount, 0) : null,
  }
}
