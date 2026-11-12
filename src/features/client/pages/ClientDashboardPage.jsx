import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth.js'
import { listRsvps } from '../../invitations/templates/boda/services/saveRsvp.js'
import { ClientDashboardView } from '../components/ClientDashboardView.jsx'
import { CLIENT_NAV } from '../data/clientNav.js'
import { listGuestLinks, listMyProjectsWithLinkUsage } from '../services/clientProjectService.js'
import { buildClientDashboard, pickFeaturedProject } from '../utils/clientDashboardModel.js'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'
import { firstName, greeting } from '../../../shared/utils/eventInfo.js'

export function ClientDashboardPage() {
  const { profile } = useAuth()
  const [projects, setProjects] = useState(
    /** @type {Array<import('../../admin/types/projectRecord.js').ProjectRecord & { linksUsed: number }>} */ ([]),
  )
  const [selectedId, setSelectedId] = useState('')
  const [detail, setDetail] = useState({
    projectId: '',
    links: /** @type {import('../../invitations/core/types/guestLink.js').GuestLinkRecord[]} */ ([]),
    rsvps: /** @type {Array<Record<string, unknown>>} */ ([]),
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!profile?.uid) return undefined
    let cancelled = false
    listMyProjectsWithLinkUsage(profile.uid)
      .then((list) => {
        if (!cancelled) setProjects(list)
      })
      .catch(() => {
        if (!cancelled) setError('No se pudieron cargar tus eventos.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [profile?.uid])

  const featured = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? pickFeaturedProject(projects),
    [projects, selectedId],
  )

  useEffect(() => {
    if (!featured) return undefined
    let cancelled = false
    Promise.all([listGuestLinks(featured.id), listRsvps(featured.id).catch(() => [])])
      .then(([links, rsvps]) => {
        if (!cancelled) setDetail({ projectId: featured.id, links, rsvps })
      })
      .catch(() => {
        if (!cancelled) {
          setDetail({ projectId: featured.id, links: [], rsvps: [] })
          setError('No se pudieron cargar los invitados de tu evento.')
        }
      })
    return () => {
      cancelled = true
    }
  }, [featured])

  const detailLoading = Boolean(featured) && detail.projectId !== featured?.id
  const dashboard = useMemo(() => {
    if (!featured) return null
    const ready = detail.projectId === featured.id
    return buildClientDashboard({
      project: featured,
      linksUsed: featured.linksUsed ?? 0,
      links: ready ? detail.links : [],
      rsvps: ready ? detail.rsvps : [],
    })
  }, [featured, detail])

  const name = firstName(profile?.displayName, profile?.email)

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.CLIENT}`}
      title={`${greeting()}${name ? `, ${name}` : ''}`}
      subtitle="Aquí ves cómo va tu evento: confirmaciones, enlaces y lo que falta por hacer."
      navItems={CLIENT_NAV}
    >
      <ClientDashboardView
        projects={projects}
        featured={featured}
        onSelect={setSelectedId}
        dashboard={dashboard}
        loading={loading}
        detailLoading={detailLoading}
        error={error}
      />
    </PanelShell>
  )
}
