import { Link } from 'react-router-dom'
import { ClientResponsesPanel } from '../components/ClientResponsesPanel.jsx'
import { ClientProjectShell } from '../components/ClientProjectShell.jsx'
import { CLIENT_NAV } from '../data/clientNav.js'

export function ClientProjectResponsesPage() {
  return (
    <ClientProjectShell title="Confirmaciones" navItems={CLIENT_NAV}>
      {(project) => (
        <>
          <div className="panel-toolbar">
            <Link to="/cliente/proyectos" className="marketing-link text-sm font-medium">
              ← Mis proyectos
            </Link>
          </div>
          <ClientResponsesPanel projectId={project.slug} projectTitle={project.title || project.slug} />
        </>
      )}
    </ClientProjectShell>
  )
}
