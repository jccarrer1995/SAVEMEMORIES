import { Link } from 'react-router-dom'
import { ProjectStatusBadge } from '../../admin/components/ProjectStatusBadge.jsx'
import { getTemplateLabel } from '../../admin/data/templateOptions.js'

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
 *   projects: import('../../admin/types/projectRecord.js').ProjectRecord[],
 *   loading: boolean,
 * }} props
 */
export function ClientProjectsMobileList({ projects, loading }) {
  if (projects.length === 0 && !loading) {
    return (
      <div className="panel-card-empty panel-only-mobile">
        No tienes eventos asignados. Pide al administrador que ponga tu UID en el campo{' '}
        <strong>ownerId</strong> del proyecto.
      </div>
    )
  }

  return (
    <div className="panel-card-list panel-only-mobile">
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
              <dd>{project.linkLimit}</dd>
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

/**
 * @param {{
 *   projects: import('../../admin/types/projectRecord.js').ProjectRecord[],
 *   loading: boolean,
 * }} props
 */
export function ClientProjectsDesktopTable({ projects, loading }) {
  return (
    <div className="panel-table-wrap panel-only-desktop">
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
                <ClientProjectActions project={project} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
