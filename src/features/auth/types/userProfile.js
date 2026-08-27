/** @typedef {'admin' | 'client'} UserRole */

/**
 * @typedef {object} UserProfile
 * @property {string} uid
 * @property {UserRole} role
 * @property {string} email
 * @property {string} [displayName]
 */

export const USERS_COLLECTION = 'users'
