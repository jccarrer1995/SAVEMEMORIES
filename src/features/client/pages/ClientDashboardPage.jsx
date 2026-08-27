import { CLIENT_NAV } from '../data/clientNav.js'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'

export function ClientDashboardPage() {
  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.CLIENT}`}
      title="Panel cliente"
      subtitle="Consulta respuestas y administra los enlaces de tu evento."
      navItems={CLIENT_NAV}
    >
      <div className="panel-stat-grid">
        <article className="panel-stat-card">
          <p className="panel-stat-value">—</p>
          <p className="panel-stat-label">Confirmaciones</p>
        </article>
        <article className="panel-stat-card">
          <p className="panel-stat-value">—</p>
          <p className="panel-stat-label">Enlaces creados</p>
        </article>
        <article className="panel-stat-card">
          <p className="panel-stat-value">—</p>
          <p className="panel-stat-label">Enlaces disponibles</p>
        </article>
      </div>

      <p className="panel-notice">
        Etapa 6: podrás ver las respuestas de tus invitados, exportarlas a Excel y crear enlaces
        personalizados dentro del límite que te asigne el administrador.
      </p>
    </PanelShell>
  )
}
