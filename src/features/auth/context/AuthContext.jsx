import { createContext } from 'react'

/** @type {import('react').Context<import('../types/userProfile.js').UserProfile | null>} */
export const AuthProfileContext = createContext(null)

/** @type {import('react').Context<import('firebase/auth').User | null>} */
export const AuthUserContext = createContext(null)

/** @type {import('react').Context<boolean>} */
export const AuthLoadingContext = createContext(true)

/** @type {import('react').Context<string>} */
export const AuthErrorContext = createContext('')
