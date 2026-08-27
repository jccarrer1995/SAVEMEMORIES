/** @type {readonly string[]} */
export const SUPPORTED_TEMPLATE_IDS = ['boda', 'babyshower']

/** @param {string} templateId */
export function isSupportedTemplateId(templateId) {
  return SUPPORTED_TEMPLATE_IDS.includes(templateId)
}
