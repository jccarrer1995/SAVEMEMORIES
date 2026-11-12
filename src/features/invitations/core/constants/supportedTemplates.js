/** @type {readonly string[]} */
export const SUPPORTED_TEMPLATE_IDS = ['boda', 'babyshower', 'despedida']

/** @param {string} templateId */
export function isSupportedTemplateId(templateId) {
  return SUPPORTED_TEMPLATE_IDS.includes(templateId)
}
