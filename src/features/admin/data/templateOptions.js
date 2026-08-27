/** @typedef {{ id: string, label: string, available: boolean }} TemplateOption */

/** @type {TemplateOption[]} */
export const TEMPLATE_OPTIONS = [
  { id: 'boda', label: 'Boda', available: true },
  { id: 'xv', label: 'Quinceañera', available: false },
  { id: 'babyshower', label: 'Baby shower', available: false },
]

/** @param {string} templateId */
export function getTemplateLabel(templateId) {
  return TEMPLATE_OPTIONS.find((item) => item.id === templateId)?.label ?? templateId
}
