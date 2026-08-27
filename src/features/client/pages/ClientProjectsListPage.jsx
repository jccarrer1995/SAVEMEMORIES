import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth.js'
import { ProjectStatusBadge } from '../../admin/components/ProjectStatusBadge.jsx'
import { getTemplateLabel } from '../../admin/data/templateOptions.js'
import { listMyProjects } from '../services/clientProjectService.js'
import { CLIENT_NAV } from '../data/clientNav.js'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'

export function ClientProjectsListPage() {
  const { profile } = useAuth()
  const [projects, setProjects] = useState(/** @type {import('../../admin/types/projectRecord.js').ProjectRecord[]} */ ([]))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!profile?.uid) return

    listMyProjects(profile.uid)
      .then(setProjects)
      .catch((err) => {
        const isPermission =
          err && typeof err === 'object' && 'code' in err && err.code === 'permission-denied'
        setError(
          isPermission
            ? 'Sin permiso para leer tus proyectos. Verifica las reglas de Firestore y que el admin asignó tu UID en ownerId.'
            : 'No se pudieron cargar tus proyectos.',
        )
      })
      .finally(() => setLoading(false))
  }, [profile?.uid])

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.CLIENT}`}
      title="Mis proyectos"
      subtitle="Eventos asignados a tu cuenta."
      navItems={CLIENT_NAV}
    >
      <p className="marketing-muted mb-4 text-sm">
        {loading ? 'Cargando…' : `${projects.length} evento(s) asignado(s)`}
      </p>

      {error ? <p className="panel-form-error">{error}</p> : null}

      <div className="panel-table-wrap">
        <table className="panel-table">
          <thead>
            <tr>
              <th>Evento</th>
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
                  No tienes eventos asignados. Pide al administrador que ponga tu UID en el campo{' '}
                  <strong>ownerId</strong> del proyecto.
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
                  <Link
                    to={`/cliente/proyectos/${project.slug}/respuestas`}
                    className="marketing-link text-sm"
                  >
                    Respuestas
                  </Link>
                  <Link
                    to={`/cliente/proyectos/${project.slug}/enlaces`}
                    className="marketing-link text-sm"
                  >
                    Enlaces
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelShell>
  )
}
