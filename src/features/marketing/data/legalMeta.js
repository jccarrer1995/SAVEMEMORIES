import { SITE } from './siteContent.js'

/** Fecha de última revisión visible en documentos legales. */
export const LEGAL_LAST_UPDATED = '12 de octubre de 2026'

export const LEGAL_CONTACT = {
  email: SITE.email,
  product: SITE.name,
  productionUrl: 'https://savememories-prd.web.app',
  firebaseProjectId: 'savememories-prd',
}

export const LEGAL_ROUTES = {
  terms: '/terminos-y-condiciones',
  privacy: '/politica-de-privacidad',
}

export const LEGAL_MENU_LINKS = [
  { to: LEGAL_ROUTES.terms, label: 'Términos y condiciones' },
  { to: LEGAL_ROUTES.privacy, label: 'Política de privacidad' },
]

/** Etiquetas cortas para la barra de navegación principal. */
export const LEGAL_HEADER_LINKS = [
  { to: LEGAL_ROUTES.terms, label: 'Términos' },
  { to: LEGAL_ROUTES.privacy, label: 'Privacidad' },
]
