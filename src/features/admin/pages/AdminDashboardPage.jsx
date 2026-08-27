import { ADMIN_NAV } from '../data/adminNav.js'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'

export function AdminDashboardPage() {
  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.ADMIN}`}
      title="Panel administrador"
      subtitle="Gestiona proyectos, clientes y plantillas."
      navItems={ADMIN_NAV}
    >
      <div className="panel-stat-grid">
        <article className="panel-stat-card">
          <p className="panel-stat-value">0</p>
          <p className="panel-stat-label">Proyectos activos</p>
        </article>
        <article className="panel-stat-card">
          <p className="panel-stat-value">0</p>
          <p className="panel-stat-label">Clientes</p>
        </article>
        <article className="panel-stat-card">
          <p className="panel-stat-value">1</p>
          <p className="panel-stat-label">Plantilla demo</p>
        </article>
      </div>

      <p className="panel-notice">
        Etapa 4: aquí podrás crear proyectos, asignar plantillas (boda, XV, baby shower),
        configurar contenido y definir cuántos enlaces puede generar cada cliente.
      </p>
    </PanelShell>
  )
}
