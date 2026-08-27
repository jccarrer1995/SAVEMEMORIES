/** @typedef {{ label: string, href: string, disabled?: boolean }} PanelNavItem */

/** @type {PanelNavItem[]} */
export const ADMIN_NAV = [
  { label: 'Inicio', href: '/admin' },
  { label: 'Proyectos', href: '/admin/proyectos' },
  { label: 'Clientes', href: '/admin/clientes' },
  { label: 'Plantillas', href: '/admin/plantillas', disabled: true },
]
