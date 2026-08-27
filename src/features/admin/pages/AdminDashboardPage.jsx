import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ADMIN_NAV } from '../data/adminNav.js'
import { listProjects } from '../services/projectService.js'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'

export function AdminDashboardPage() {
  const [stats, setStats] = useState({ active: 0, draft: 0, total: 0 })

  useEffect(() => {
    listProjects()
      .then((projects) => {
        setStats({
          active: projects.filter((p) => p.status === 'active').length,
          draft: projects.filter((p) => p.status === 'draft').length,
          total: projects.length,
        })
      })
      .catch(() => {})
  }, [])

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.ADMIN}`}
      title="Panel administrador"
      subtitle="Gestiona proyectos, clientes y plantillas."
      navItems={ADMIN_NAV}
    >
      <div className="panel-stat-grid">
        <article className="panel-stat-card">
          <p className="panel-stat-value">{stats.active}</p>
          <p className="panel-stat-label">Proyectos activos</p>
        </article>
        <article className="panel-stat-card">
          <p className="panel-stat-value">{stats.draft}</p>
          <p className="panel-stat-label">Borradores</p>
        </article>
        <article className="panel-stat-card">
          <p className="panel-stat-value">{stats.total}</p>
          <p className="panel-stat-label">Total</p>
        </article>
      </div>

      <p className="panel-notice">
        <Link to="/admin/proyectos/nuevo" className="marketing-link font-medium">
          Crear un proyecto
        </Link>{' '}
        con plantilla boda, contenido editable y límite de enlaces. La demo estática{' '}
        <Link to="/demo/boda" className="marketing-link">
          juan-carlos-jessica
        </Link>{' '}
        sigue disponible sin Firestore.
      </p>
    </PanelShell>
  )
}
