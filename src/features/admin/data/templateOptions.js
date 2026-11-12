/** @typedef {{ id: string, label: string, available: boolean }} TemplateOption */

/** @type {TemplateOption[]} */
export const TEMPLATE_OPTIONS = [
  { id: 'boda', label: 'Boda', available: true },
  { id: 'xv', label: 'Quinceañera Elegante', available: true },
  { id: 'babyshower', label: 'Baby shower', available: true },
  { id: 'despedida', label: 'Despedida de soltera Juvenil', available: true },
]

/**
 * Qué bloques del formulario usa cada plantilla.
 * @param {string} templateId
 */
export function getTemplateFormFeatures(templateId) {
  const base = {
    singlePerson: false,
    showPadres: true,
    showDressCode: true,
    showNinos: true,
    showCeremonia: false,
    regalosLabel: 'Regalos',
    editableCronograma: false,
    padresNovioLabel: 'Padres del novio (una línea por persona)',
    padresNoviaLabel: 'Padres de la novia (una línea por persona)',
    cronogramaLabel: 'Plan de la noche (una línea por momento: hora - actividad)',
    cronogramaPlaceholder: '18:00 - Llegada y brindis\n19:00 - Juegos y retos\n20:00 - Cena',
  }

  if (templateId === 'despedida') {
    return {
      ...base,
      singlePerson: true,
      showPadres: false,
      showDressCode: false,
      showNinos: false,
      regalosLabel: 'Traer (una cosa por línea: snacks, bebidas…)',
      editableCronograma: true,
    }
  }

  if (templateId === 'xv') {
    return {
      ...base,
      singlePerson: true,
      showNinos: false,
      showCeremonia: true,
      editableCronograma: true,
      regalosLabel: 'Regalos (p. ej. lluvia de sobres)',
      padresNovioLabel: 'Padres de la quinceañera (una línea por persona)',
      padresNoviaLabel: 'Padrinos (una línea por persona)',
      cronogramaLabel: 'Programa (una línea por momento: hora - actividad)',
      cronogramaPlaceholder: '17:00 - Misa de acción de gracias\n19:30 - Recepción\n20:30 - Entrada y vals',
    }
  }

  return base
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

  if (templateId === 'xv') {
    return {
      novio: '',
      novia: 'Nombre de la quinceañera',
      coupleSection: 'Quinceañera y fecha',
    }
  }

  return {
    novio: 'Novio',
    novia: 'Novia',
    coupleSection: 'Pareja y fecha',
  }
}
