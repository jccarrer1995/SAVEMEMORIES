/**
 * @param {string} projectSlug
 * @param {string} linkCode
 */
export function buildInvitationLinkPath(projectSlug, linkCode) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}/invitacion/${projectSlug}/${linkCode}`
}

/**
 * @param {string} projectSlug
 * @param {string} linkCode
 */
export function buildInvitationLinkUrl(projectSlug, linkCode) {
  if (typeof window === 'undefined') return buildInvitationLinkPath(projectSlug, linkCode)
  return `${window.location.origin}${buildInvitationLinkPath(projectSlug, linkCode)}`
}
