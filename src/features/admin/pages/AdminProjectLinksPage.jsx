import { Link, useParams } from 'react-router-dom'
import { GuestLinksPanel } from '../components/GuestLinksPanel.jsx'
import { ADMIN_NAV } from '../data/adminNav.js'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'

export function AdminProjectLinksPage() {
  const { projectId = '' } = useParams()

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.ADMIN}`}
      title="Enlaces de invitados"
      subtitle={`Proyecto /${projectId}`}
      navItems={ADMIN_NAV}
    >
      <div className="panel-toolbar">
        <Link to={`/admin/proyectos/${projectId}`} className="marketing-link text-sm font-medium">
          ← Volver al proyecto
        </Link>
      </div>
      <GuestLinksPanel projectId={projectId} />
    </PanelShell>
  )
}
