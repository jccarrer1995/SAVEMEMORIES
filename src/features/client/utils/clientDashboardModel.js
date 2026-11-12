import {
  buildGuestLinkConfirmationIndex,
  getGuestLinkRsvpStatus,
} from '../../admin/utils/guestLinkTableHelpers.js'
import {
  isAttendanceConfirmed,
  isAttendanceDeclined,
  rsvpCreatedAtIso,
} from '../../invitations/templates/boda/utils/rsvpConfirmation.js'
import { getEventInfo } from '../../../shared/utils/eventInfo.js'

/** @typedef {import('../../admin/types/projectRecord.js').ProjectRecord} ProjectRecord */
/** @typedef {import('../../invitations/core/types/guestLink.js').GuestLinkRecord} GuestLinkRecord */

/**
 * Elige el evento a destacar: el próximo activo; si no hay, el más reciente.
 * @param {ProjectRecord[]} projects
 */
export function pickFeaturedProject(projects) {
  if (projects.length === 0) return null
  const withDays = projects.map((project) => ({ project, days: getEventInfo(project).daysLeft }))
  const upcoming = withDays
    .filter((item) => item.project.status !== 'archived' && item.days !== null && item.days >= 0)
    .sort((a, b) => (a.days ?? 0) - (b.days ?? 0))
  return (upcoming[0] ?? withDays[0]).project
}

/** @param {unknown} value */
const text = (value) => (typeof value === 'string' ? value.trim() : '')

/**
 * @param {{
 *   project: ProjectRecord,
 *   linksUsed: number,
 *   links: GuestLinkRecord[],
 *   rsvps: Array<Record<string, unknown>>,
 * }} data
 */
export function buildClientDashboard({ project, linksUsed, links, rsvps }) {
  const index = buildGuestLinkConfirmationIndex(rsvps)
  const people = { invited: 0, confirmed: 0, declined: 0, pending: 0 }
  const groups = { confirmed: 0, declined: 0, pending: 0 }

  for (const link of links) {
    const cupos = Number(link.cupos) || 0
    const status = getGuestLinkRsvpStatus(link, index)
    people.invited += cupos
    people[status] += cupos
    groups[status] += 1
  }

  const withoutMesa = links.filter((link) => !link.mesa?.trim()).length
  const limit = project.linkLimit
  const hasSms = Boolean(text(project.smsTemplate))

  const recent = [...rsvps]
    .sort((a, b) => (Date.parse(rsvpCreatedAtIso(b)) || 0) - (Date.parse(rsvpCreatedAtIso(a)) || 0))
    .slice(0, 5)
    .map((row, position) => {
      const confirmacion = text(row.confirmacion)
      return {
        id: text(row.id) || `rsvp-${position}`,
        group: text(row.grupoInvitados) || 'Invitado',
        names: text(row.nombres),
        status: isAttendanceConfirmed(confirmacion)
          ? 'confirmed'
          : isAttendanceDeclined(confirmacion)
            ? 'declined'
            : 'pending',
        cupos: Number(row.cupos) || 0,
        createdAt: rsvpCreatedAtIso(row),
      }
    })

  const steps = [
    {
      id: 'links',
      done: links.length > 0,
      title: 'Crea los enlaces de tus invitados',
      text:
        links.length > 0
          ? `${links.length} ${links.length === 1 ? 'enlace creado' : 'enlaces creados'}${limit > 0 ? ` de ${limit}` : ''}.`
          : 'Un enlace por familia o grupo, con sus cupos.',
      to: `/cliente/proyectos/${project.slug}/enlaces`,
    },
    {
      id: 'sms',
      done: hasSms,
      title: 'Personaliza el mensaje de WhatsApp',
      text: hasSms ? 'Tu mensaje ya está listo para copiar.' : 'Escribe el texto que acompañará cada enlace.',
      to: '/cliente/proyectos',
    },
    {
      id: 'mesas',
      done: links.length > 0 && withoutMesa === 0,
      title: 'Asigna las mesas',
      text:
        links.length === 0
          ? 'Cuando tengas enlaces podrás ubicarlos por mesa.'
          : withoutMesa === 0
            ? 'Todos tus invitados tienen mesa.'
            : `${withoutMesa} ${withoutMesa === 1 ? 'enlace no tiene' : 'enlaces no tienen'} mesa todavía.`,
      to: `/cliente/proyectos/${project.slug}/enlaces/simular-mesas`,
    },
    {
      id: 'rsvp',
      done: links.length > 0 && groups.pending === 0,
      title: 'Recibe todas las confirmaciones',
      text:
        links.length === 0
          ? 'Comparte los enlaces para empezar a recibir respuestas.'
          : groups.pending === 0
            ? '¡Todos respondieron!'
            : `${groups.pending} ${groups.pending === 1 ? 'grupo aún no responde' : 'grupos aún no responden'}.`,
      to: `/cliente/proyectos/${project.slug}/respuestas`,
    },
  ]

  return {
    event: getEventInfo(project),
    people,
    groups,
    links: { used: linksUsed, limit, withoutMesa, total: links.length },
    responses: rsvps.length,
    recent,
    steps,
    completedSteps: steps.filter((step) => step.done).length,
  }
}
