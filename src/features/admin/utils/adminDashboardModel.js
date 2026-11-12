import { getEventInfo } from '../../../shared/utils/eventInfo.js'
import { getTemplateLabel } from '../data/templateOptions.js'

/** @typedef {import('../types/projectRecord.js').ProjectRecord} ProjectRecord */
/** @typedef {import('../types/clientRecord.js').ClientRecord} ClientRecord */

/**
 * Resume lo que el administrador necesita ver al entrar.
 * @param {{ projects: ProjectRecord[], clients: ClientRecord[], linkCounts: Record<string, number> }} data
 */
export function buildAdminDashboard({ projects, clients, linkCounts }) {
  const clientsById = new Map(clients.map((client) => [client.uid, client]))

  const rows = projects.map((project) => {
    const event = getEventInfo(project)
    const owner = clientsById.get(project.ownerId)
    const linksUsed = linkCounts[project.id] ?? 0
    return {
      project,
      event,
      owner,
      ownerLabel: owner ? owner.displayName || owner.email : '',
      linksUsed,
      template: getTemplateLabel(project.templateId),
    }
  })

  const active = rows.filter((row) => row.project.status === 'active')
  const drafts = rows.filter((row) => row.project.status === 'draft')
  const activeClients = clients.filter((client) => client.active)
  const totalLinks = rows.reduce((sum, row) => sum + row.linksUsed, 0)

  const upcoming = rows
    .filter((row) => row.project.status !== 'archived' && row.event.daysLeft !== null && row.event.daysLeft >= 0)
    .sort((a, b) => (a.event.daysLeft ?? 0) - (b.event.daysLeft ?? 0))

  const recent = [...rows]
    .sort((a, b) => (b.project.updatedAt || '').localeCompare(a.project.updatedAt || ''))
    .slice(0, 5)

  const withoutOwner = rows.filter((row) => !row.owner)
  const nearLimit = rows.filter(
    (row) => row.project.linkLimit > 0 && row.linksUsed / row.project.linkLimit >= 0.9,
  )
  const pastActive = active.filter((row) => row.event.daysLeft !== null && row.event.daysLeft < 0)
  const inactiveClients = clients.filter((client) => !client.active)

  const attention = [
    {
      id: 'drafts',
      count: drafts.length,
      title: drafts.length === 1 ? 'Borrador sin publicar' : 'Borradores sin publicar',
      text: 'Revisa el contenido y actívalos para que los invitados puedan abrirlos.',
      to: '/admin/proyectos',
    },
    {
      id: 'owner',
      count: withoutOwner.length,
      title: withoutOwner.length === 1 ? 'Proyecto sin cliente' : 'Proyectos sin cliente',
      text: 'Asigna un cliente para que pueda gestionar sus enlaces y respuestas.',
      to: '/admin/proyectos',
    },
    {
      id: 'limit',
      count: nearLimit.length,
      title: 'Cerca del límite de enlaces',
      text: 'Han usado el 90 % o más de los enlaces contratados.',
      to: '/admin/proyectos',
    },
    {
      id: 'past',
      count: pastActive.length,
      title: pastActive.length === 1 ? 'Evento ya realizado' : 'Eventos ya realizados',
      text: 'Siguen activos; considera archivarlos.',
      to: '/admin/proyectos',
    },
    {
      id: 'clients',
      count: inactiveClients.length,
      title: inactiveClients.length === 1 ? 'Cliente inactivo' : 'Clientes inactivos',
      text: 'No pueden iniciar sesión en su panel.',
      to: '/admin/clientes',
    },
  ].filter((item) => item.count > 0)

  /** @type {Record<string, number>} */
  const byTemplate = {}
  for (const row of rows) byTemplate[row.template] = (byTemplate[row.template] ?? 0) + 1
  const templates = Object.entries(byTemplate)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)

  return {
    kpis: {
      active: active.length,
      total: rows.length,
      drafts: drafts.length,
      clients: clients.length,
      activeClients: activeClients.length,
      links: totalLinks,
      upcoming: upcoming.length,
    },
    upcoming: upcoming.slice(0, 5),
    recent,
    attention,
    templates,
  }
}
