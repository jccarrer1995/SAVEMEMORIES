import { juanCarlosJessicaProject } from '../../templates/boda/config/juanCarlosJessica.js'

/** @type {Record<string, import('../types/invitationProject.js').RegisteredProject>} */
const PROJECTS = {
  [juanCarlosJessicaProject.id]: {
    templateId: juanCarlosJessicaProject.templateId,
    config: juanCarlosJessicaProject,
  },
}

/**
 * @param {string} projectId
 * @returns {import('../types/invitationProject.js').RegisteredProject | null}
 */
export function getProjectById(projectId) {
  return PROJECTS[projectId] ?? null
}

export function listProjectIds() {
  return Object.keys(PROJECTS)
}
