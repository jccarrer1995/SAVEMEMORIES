import { isSupportedTemplateId } from '../constants/supportedTemplates.js'
import { fetchProjectRecord } from '../../../../lib/firebase/projectStore.js'
import { getProjectById as getRegistryProject } from '../registry/projectRegistry.js'

/**
 * @param {import('../../admin/types/projectRecord.js').ProjectRecord} record
 * @returns {import('../types/invitationProject.js').RegisteredProject | null}
 */
function mapRecordToRegistered(record) {
  if (!isSupportedTemplateId(record.templateId)) return null

  return {
    templateId: record.templateId,
    config: {
      id: record.slug,
      templateId: record.templateId,
      title: record.title,
      ...(/** @type {import('../types/invitationProject.js').InvitationProjectConfig} */ (record.content)),
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
