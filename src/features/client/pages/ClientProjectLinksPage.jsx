import { Link } from 'react-router-dom'
import { GuestLinksPanel } from '../../admin/components/GuestLinksPanel.jsx'
import { ClientProjectShell } from '../components/ClientProjectShell.jsx'
import { CLIENT_NAV } from '../data/clientNav.js'

export function ClientProjectLinksPage() {
  return (
    <ClientProjectShell title="Enlaces de invitados" navItems={CLIENT_NAV}>
      {(project) => (
        <>
          <div className="panel-toolbar">
            <Link to="/cliente/proyectos" className="marketing-link text-sm font-medium">
              ← Mis proyectos
            </Link>
          </div>
          <GuestLinksPanel projectId={project.slug} />
        </>
      )}
    </ClientProjectShell>
  )
}
