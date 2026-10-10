import { generateLinkCode } from '../utils/generateLinkCode.js'
import {
  countGuestLinks,
  createGuestLink,
  deleteGuestLink,
  fetchGuestLink,
  listGuestLinks,
  setGuestLinkActive,
  updateGuestLinkMeta,
  updateGuestLinkMesa,
} from '../../../lib/firebase/guestLinkStore.js'
import { getProjectById } from './projectService.js'

export { listGuestLinks, fetchGuestLink }

/**
 * @param {string} projectId
 * @param {import('../../invitations/core/types/guestLink.js').GuestLinkFormValues} values
 */
export async function createProjectGuestLink(projectId, values) {
  const project = await getProjectById(projectId)
  if (!project) throw new Error('Proyecto no encontrado.')

  const currentCount = await countGuestLinks(projectId)
  if (project.linkLimit > 0 && currentCount >= project.linkLimit) {
    throw new Error(`Límite alcanzado: máximo ${project.linkLimit} enlace(s) para este proyecto.`)
  }

  const guestLabel = values.guestLabel.trim()
  if (!guestLabel) throw new Error('Indica el nombre del invitado o grupo.')

  const cupos = Number(values.cupos)
  if (!Number.isFinite(cupos) || cupos < 1) throw new Error('Los cupos deben ser al menos 1.')

  const linkCode = generateLinkCode()
  await createGuestLink(projectId, linkCode, {
    guestLabel,
    cupos,
    mesa: values.mesa,
    etiquetaLado: values.etiquetaLado,
    etiquetaGrupo: values.etiquetaGrupo,
  })
  return linkCode
}

/**
 * @param {string} projectId
 * @param {string} linkCode
 * @param {string} mesa
 */
export async function updateProjectGuestLinkMesa(projectId, linkCode, mesa) {
  await updateGuestLinkMesa(projectId, linkCode, mesa)
}

/**
 * @param {string} projectId
 * @param {string} linkCode
 * @param {import('../../invitations/core/types/guestLink.js').GuestLinkMetaValues} values
 */
export async function updateProjectGuestLinkMeta(projectId, linkCode, values) {
  await updateGuestLinkMeta(projectId, linkCode, values)
}

/**
 * @param {string} projectId
 * @param {string} linkCode
 * @param {boolean} active
 */
export async function toggleProjectGuestLink(projectId, linkCode, active) {
  await setGuestLinkActive(projectId, linkCode, active)
}

/**
 * @param {string} projectId
 * @param {string} linkCode
 */
export async function deleteProjectGuestLink(projectId, linkCode) {
  if (!linkCode) throw new Error('Enlace no especificado.')
  await deleteGuestLink(projectId, linkCode)
}
