/** @typedef {'admin' | 'client'} UserRole */

export const ROLES = /** @type {const} */ ({
  ADMIN: 'admin',
  CLIENT: 'client',
})

/** @param {unknown} role */
export function isAdminRole(role) {
  return role === ROLES.ADMIN
}

/** @param {unknown} role */
export function isClientRole(role) {
  return role === ROLES.CLIENT
}
