import { countGuestLinks } from '../../../lib/firebase/guestLinkStore.js'
import {
  fetchProjectRecordForOwner,
  listProjectRecordsByOwner,
} from '../../../lib/firebase/clientProjectStore.js'

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
 * @param {string} projectId
 * @param {string} ownerId
 */
export async function getMyProject(projectId, ownerId) {
  return fetchProjectRecordForOwner(projectId, ownerId)
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
