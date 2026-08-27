/** @typedef {{ id: string, label: string, available: boolean }} TemplateOption */

/** @type {TemplateOption[]} */
export const TEMPLATE_OPTIONS = [
  { id: 'boda', label: 'Boda', available: true },
  { id: 'xv', label: 'Quinceañera', available: false },
  { id: 'babyshower', label: 'Baby shower', available: true },
]

/** @param {string} templateId */
export function getTemplateLabel(templateId) {
  return TEMPLATE_OPTIONS.find((item) => item.id === templateId)?.label ?? templateId
}

/** @param {string} templateId */
export function getProjectFieldLabels(templateId) {
  if (templateId === 'babyshower') {
    return {
      novio: 'Bebé',
      novia: 'Mamita',
      coupleSection: 'Bebé y mamita',
    }
  }

  return {
    novio: 'Novio',
    novia: 'Novia',
    coupleSection: 'Pareja y fecha',
  }
}
