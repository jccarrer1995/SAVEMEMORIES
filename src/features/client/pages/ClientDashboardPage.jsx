import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth.js'
import { CLIENT_NAV } from '../data/clientNav.js'
import { getClientDashboardStats } from '../services/clientProjectService.js'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'

export function ClientDashboardPage() {
  const { profile } = useAuth()
  const [stats, setStats] = useState({ projectsCount: 0, linksCount: 0, linksAvailable: null })

  useEffect(() => {
    if (!profile?.uid) return

    getClientDashboardStats(profile.uid)
      .then(setStats)
      .catch(() => {})
  }, [profile?.uid])

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.CLIENT}`}
      title="Panel cliente"
      subtitle="Consulta respuestas y administra los enlaces de tu evento."
      navItems={CLIENT_NAV}
    >
      <div className="panel-stat-grid">
        <article className="panel-stat-card">
          <p className="panel-stat-value">{stats.projectsCount}</p>
          <p className="panel-stat-label">Mis eventos</p>
        </article>
        <article className="panel-stat-card">
          <p className="panel-stat-value">{stats.linksCount}</p>
          <p className="panel-stat-label">Enlaces creados</p>
        </article>
        <article className="panel-stat-card">
          <p className="panel-stat-value">
            {stats.linksAvailable === null ? '∞' : stats.linksAvailable}
          </p>
          <p className="panel-stat-label">Enlaces disponibles</p>
        </article>
      </div>

      <p className="panel-notice">
        <Link to="/cliente/proyectos" className="marketing-link font-medium">
          Ver mis proyectos
        </Link>{' '}
        para consultar confirmaciones, exportar Excel y generar enlaces personalizados dentro del
        límite asignado por el administrador.
      </p>
    </PanelShell>
  )
}
