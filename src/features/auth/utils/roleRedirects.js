/** @param {unknown} role */
export function isValidUserRole(role) {
  return role === 'admin' || role === 'client'
}

/**
 * @param {import('../types/userProfile.js').UserRole} role
 */
export function getHomePathForRole(role) {
  return role === 'admin' ? '/admin' : '/cliente'
}

/**
 * @param {string} path
 * @param {import('../types/userProfile.js').UserRole} role
 */
export function isPathAllowedForRole(path, role) {
  if (role === 'admin') return path.startsWith('/admin')
  if (role === 'client') return path.startsWith('/cliente')
  return false
}
