import { getEventInfo } from '../../../shared/utils/eventInfo.js'
import { TEMPLATE_CATALOG } from '../data/templateCatalog.js'
import { getTemplateFormFeatures } from '../data/templateOptions.js'

/** @typedef {import('../types/projectRecord.js').ProjectRecord} ProjectRecord */

/**
 * Cruza el catálogo de plantillas con los proyectos guardados.
 * @param {ProjectRecord[]} projects
 */
export function buildTemplateCatalog(projects) {
  const items = TEMPLATE_CATALOG.map((template) => {
    const own = projects
      .filter((project) => project.templateId === template.id)
      .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))

    const rows = own.map((project) => ({ project, event: getEventInfo(project) }))
    const upcoming = rows.filter(
      (row) => row.project.status !== 'archived' && row.event.daysLeft !== null && row.event.daysLeft >= 0,
    ).length

    return {
      ...template,
      features: getTemplateFormFeatures(template.id),
      rows,
      stats: {
        total: own.length,
        active: own.filter((project) => project.status === 'active').length,
        drafts: own.filter((project) => project.status === 'draft').length,
        archived: own.filter((project) => project.status === 'archived').length,
        upcoming,
        lastUsed: own[0]?.updatedAt || own[0]?.createdAt || '',
      },
    }
  })

  const knownIds = new Set(TEMPLATE_CATALOG.map((template) => template.id))
  const mostUsed = [...items].sort((a, b) => b.stats.total - a.stats.total)[0]

  return {
    items,
    kpis: {
      total: items.length,
      available: items.filter((item) => item.available).length,
      soon: items.filter((item) => !item.available).length,
      inUse: projects.filter((project) => knownIds.has(project.templateId)).length,
      mostUsed: mostUsed && mostUsed.stats.total > 0 ? mostUsed : null,
    },
  }
}

/** @typedef {ReturnType<typeof buildTemplateCatalog>['items'][number]} CatalogTemplate */

/**
 * Campos del formulario de proyecto que se habilitan con la plantilla.
 * @param {CatalogTemplate['features']} features
 */
export function describeFormFeatures(features) {
  return [
    { label: features.singlePerson ? 'Una persona protagonista' : 'Pareja (dos nombres)', on: true },
    { label: 'Padres', on: features.showPadres },
    { label: 'Código de vestimenta', on: features.showDressCode },
    { label: 'Aviso de niños', on: features.showNinos },
    { label: 'Cronograma editable', on: features.editableCronograma },
    { label: features.regalosLabel.split(' (')[0], on: true },
  ]
}
