import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProjectStatusBadge } from '../components/ProjectStatusBadge.jsx'
import { ADMIN_NAV } from '../data/adminNav.js'
import { getTemplateLabel } from '../data/templateOptions.js'
import { listProjects } from '../services/projectService.js'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'

export function AdminProjectsListPage() {
  const [projects, setProjects] = useState(/** @type {import('../types/projectRecord.js').ProjectRecord[]} */ ([]))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listProjects()
      .then(setProjects)
      .catch((err) => {
        const isPermission =
          err && typeof err === 'object' && 'code' in err && err.code === 'permission-denied'
        setError(
          isPermission
            ? 'Sin permiso para leer proyectos. Publica las reglas de Firestore (colección projects) e inicia sesión como admin.'
            : 'No se pudieron cargar los proyectos.',
        )
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.ADMIN}`}
      title="Proyectos"
      subtitle="Crea y administra invitaciones por cliente."
      navItems={ADMIN_NAV}
    >
      <div className="panel-toolbar">
        <p className="marketing-muted text-sm">
          {loading ? 'Cargando…' : `${projects.length} proyecto(s) en Firestore`}
        </p>
        <Link to="/admin/proyectos/nuevo" className="panel-btn-primary rounded-full px-4 py-2 text-sm font-medium">
          + Nuevo proyecto
        </Link>
      </div>

      {error ? <p className="panel-form-error">{error}</p> : null}

      <div className="panel-table-wrap">
        <table className="panel-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Plantilla</th>
              <th>Estado</th>
              <th>Enlaces</th>
              <th aria-label="Acciones" />
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && !loading ? (
              <tr>
                <td colSpan={5} className="panel-table-empty">
                  Aún no hay proyectos. Crea el primero o sigue usando la demo estática{' '}
                  <Link to="/demo/boda" className="marketing-link">
                    juan-carlos-jessica
                  </Link>
                  .
                </td>
              </tr>
            ) : null}
            {projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <p className="font-medium">{project.title || project.slug}</p>
                  <p className="marketing-muted text-xs">/{project.slug}</p>
                </td>
                <td>{getTemplateLabel(project.templateId)}</td>
                <td>
                  <ProjectStatusBadge status={project.status} />
                </td>
                <td>{project.linkLimit}</td>
                <td className="panel-table-actions">
                  <Link to={`/admin/proyectos/${project.slug}/enlaces`} className="panel-action-link">
                    Enlaces
                  </Link>
                  <Link to={`/admin/proyectos/${project.slug}`} className="panel-action-link">
                    Editar
                  </Link>
                  {project.status === 'active' ? (
                    <Link
                      to={`/invitacion/${project.slug}`}
                      className="panel-action-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver
                    </Link>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelShell>
  )
}
