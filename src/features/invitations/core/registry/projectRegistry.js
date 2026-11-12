import { demoBabyShowerProject } from '../../templates/baby-shower/config/demoBabyShower.js'
import { demoBodaProject } from '../../templates/boda/config/demoBoda.js'
import { demoDespedidaProject } from '../../templates/despedida/config/demoDespedida.js'
import { demoXvProject } from '../../templates/xv/config/demoXv.js'

/** @type {Record<string, import('../types/invitationProject.js').RegisteredProject>} */
const PROJECTS = {
  [demoBodaProject.id]: {
    templateId: demoBodaProject.templateId,
    config: demoBodaProject,
  },
  [demoBabyShowerProject.id]: {
    templateId: demoBabyShowerProject.templateId,
    config: demoBabyShowerProject,
  },
  [demoDespedidaProject.id]: {
    templateId: demoDespedidaProject.templateId,
    config: demoDespedidaProject,
  },
  [demoXvProject.id]: {
    templateId: demoXvProject.templateId,
    config: demoXvProject,
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
