import { Link } from 'react-router-dom'
import { ProjectStatusBadge } from '../../admin/components/ProjectStatusBadge.jsx'
import { getTemplateLabel } from '../../admin/data/templateOptions.js'
import { formatGuestLinksUsage } from '../services/clientProjectService.js'

/**
 * @param {{ project: import('../../admin/types/projectRecord.js').ProjectRecord }} props
 */
function ClientProjectActions({ project }) {
  return (
    <>
      <Link to={`/cliente/proyectos/${project.slug}/respuestas`} className="panel-action-link">
        Respuestas
      </Link>
      <Link to={`/cliente/proyectos/${project.slug}/enlaces`} className="panel-action-link">
        Enlaces
      </Link>
    </>
  )
}

/**
 * @param {{
 *   projects: Array<import('../../admin/types/projectRecord.js').ProjectRecord & { linksUsed: number }>,
 *   loading: boolean,
 * }} props
 */
export function ClientProjectsList({ projects, loading }) {
  if (projects.length === 0 && !loading) {
    return (
      <div className="panel-card-empty">
        No tienes eventos asignados. Pide al administrador que ponga tu UID en el campo{' '}
        <strong>ownerId</strong> del proyecto.
      </div>
    )
  }

  return (
    <div className="panel-card-list panel-card-list--projects">
      {projects.map((project) => (
        <article key={project.id} className="panel-project-card">
          <div className="panel-project-card-header">
            <div className="min-w-0">
              <p className="font-medium">{project.title || project.slug}</p>
              <p className="marketing-muted text-xs">/{project.slug}</p>
            </div>
            <ProjectStatusBadge status={project.status} />
          </div>

          <dl className="panel-project-card-meta">
            <div>
              <dt>Plantilla</dt>
              <dd>{getTemplateLabel(project.templateId)}</dd>
            </div>
            <div>
              <dt>Enlaces</dt>
              <dd>{formatGuestLinksUsage(project.linksUsed ?? 0, project.linkLimit)}</dd>
            </div>
          </dl>

          <div className="panel-project-card-actions">
            <ClientProjectActions project={project} />
          </div>
        </article>
      ))}
    </div>
  )
}
