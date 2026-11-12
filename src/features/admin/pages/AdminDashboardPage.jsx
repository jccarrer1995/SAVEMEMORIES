import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth.js'
import { AdminDashboardView } from '../components/AdminDashboardView.jsx'
import { ADMIN_NAV } from '../data/adminNav.js'
import { listClients } from '../services/clientService.js'
import { listProjects } from '../services/projectService.js'
import { buildAdminDashboard } from '../utils/adminDashboardModel.js'
import { countGuestLinks } from '../../../lib/firebase/guestLinkStore.js'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'
import { firstName, greeting } from '../../../shared/utils/eventInfo.js'

export function AdminDashboardPage() {
  const { profile } = useAuth()
  const [data, setData] = useState({
    projects: /** @type {import('../types/projectRecord.js').ProjectRecord[]} */ ([]),
    clients: /** @type {import('../types/clientRecord.js').ClientRecord[]} */ ([]),
    linkCounts: /** @type {Record<string, number>} */ ({}),
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [projects, clients] = await Promise.all([listProjects(), listClients().catch(() => [])])
        const counts = await Promise.all(
          projects.map(async (project) => [project.id, await countGuestLinks(project.slug).catch(() => 0)]),
        )
        if (!cancelled) setData({ projects, clients, linkCounts: Object.fromEntries(counts) })
      } catch {
        if (!cancelled) setError('No se pudieron cargar los datos del panel.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const dashboard = useMemo(() => buildAdminDashboard(data), [data])
  const name = firstName(profile?.displayName, profile?.email)
  const today = new Date().toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.ADMIN}`}
      title={`${greeting()}${name ? `, ${name}` : ''}`}
      subtitle={`Hoy es ${today}. Este es el resumen de tus proyectos, clientes y próximos eventos.`}
      navItems={ADMIN_NAV}
    >
      <AdminDashboardView dashboard={dashboard} loading={loading} error={error} />
    </PanelShell>
  )
}
