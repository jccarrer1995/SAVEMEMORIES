/** @typedef {{ id: string, label: string, available: boolean }} TemplateOption */

/** @type {TemplateOption[]} */
export const TEMPLATE_OPTIONS = [
  { id: 'boda', label: 'Boda', available: true },
  { id: 'xv', label: 'Quinceañera', available: false },
  { id: 'babyshower', label: 'Baby shower', available: true },
  { id: 'despedida', label: 'Despedida de soltera Juvenil', available: true },
]

/**
 * Qué bloques del formulario usa cada plantilla.
 * @param {string} templateId
 */
export function getTemplateFormFeatures(templateId) {
  if (templateId === 'despedida') {
    return {
      singlePerson: true,
      showPadres: false,
      showDressCode: false,
      showNinos: false,
      regalosLabel: 'Traer (una cosa por línea: snacks, bebidas…)',
      editableCronograma: true,
    }
  }

  return {
    singlePerson: false,
    showPadres: true,
    showDressCode: true,
    showNinos: true,
    regalosLabel: 'Regalos',
    editableCronograma: false,
  }
}

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

  if (templateId === 'despedida') {
    return {
      novio: '',
      novia: 'Nombre de la novia',
      coupleSection: 'Persona',
    }
  }

  return {
    novio: 'Novio',
    novia: 'Novia',
    coupleSection: 'Pareja y fecha',
  }
}
