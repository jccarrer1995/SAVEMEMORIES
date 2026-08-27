/**
 * @param {import('../types/invitationProject.js').InvitationProjectConfig} project
 * @returns {import('../types/invitationProject.js').GuestInvite}
 */
export function getDefaultGuestInvite(project) {
  return {
    nombre: project.invitadosPorDefecto.nombre,
    cupos: project.invitadosPorDefecto.cupos,
  }
}

/**
 * @param {import('../types/invitationProject.js').InvitationProjectConfig} project
 * @param {string} search
 * @returns {import('../types/invitationProject.js').GuestInvite}
 */
export function getGuestInviteFromSearch(project, search) {
  const params = new URLSearchParams(search)
  const nombre = params.get('invitados')?.trim()
  const cuposRaw = params.get('cupos')
  const cupos = cuposRaw ? Number.parseInt(cuposRaw, 10) : NaN

  return {
    nombre: nombre || project.invitadosPorDefecto.nombre,
    cupos: Number.isFinite(cupos) && cupos > 0 ? cupos : project.invitadosPorDefecto.cupos,
  }
}
