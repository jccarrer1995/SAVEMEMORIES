/** @typedef {{ label: string, href: string, disabled?: boolean }} PanelNavItem */

/** @type {PanelNavItem[]} */
export const CLIENT_NAV = [
  { label: 'Inicio', href: '/cliente' },
  { label: 'Mis proyectos', href: '/cliente/proyectos', disabled: true },
  { label: 'Respuestas', href: '/cliente/respuestas', disabled: true },
  { label: 'Enlaces', href: '/cliente/enlaces', disabled: true },
]
