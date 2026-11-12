import { CalendarHeart, Eye, FilePlus2, Sparkles, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  DashCard,
  DashReveal,
  DateBadge,
  KpiCard,
  QuickAction,
  UsageBar,
} from '../../../shared/components/PanelDashboard.jsx'
import { formatDaysLeft, formatRelativeDate } from '../../../shared/utils/eventInfo.js'
import { ProjectStatusBadge } from './ProjectStatusBadge.jsx'

/**
 * @param {{
 *   dashboard: ReturnType<typeof import('../utils/adminDashboardModel.js').buildAdminDashboard>,
 *   loading: boolean,
 *   error?: string,
 * }} props
 */
export function AdminDashboardView({ dashboard, loading, error }) {
  const { kpis, upcoming, recent, attention, templates } = dashboard
  const maxTemplate = Math.max(1, ...templates.map((item) => item.count))

  return (
    <div className="dash">
      {error ? <p className="panel-form-error">{error}</p> : null}

      <DashReveal className="dash-actions">
        <QuickAction to="/admin/proyectos/nuevo" icon={FilePlus2} title="Nuevo proyecto" text="Crea una invitación para un cliente" primary />
        <QuickAction to="/admin/clientes/nuevo" icon={UserPlus} title="Nuevo cliente" text="Dale acceso a su panel" />
        <QuickAction to="/demo/boda" icon={Sparkles} title="Demo de boda" text="Muéstrala en una venta" external />
        <QuickAction to="/" icon={Eye} title="Sitio público" text="Ver el home como un visitante" external />
      </DashReveal>

      <DashReveal index={1} className="dash-kpis">
        <KpiCard tone="dark" label="Proyectos activos" value={kpis.active} hint={`de ${kpis.total} en total`} loading={loading} />
        <KpiCard label="Borradores" value={kpis.drafts} hint="Pendientes de publicar" loading={loading} />
        <KpiCard label="Clientes" value={kpis.clients} hint={`${kpis.activeClients} con acceso activo`} loading={loading} />
        <KpiCard tone="clay" label="Enlaces creados" value={kpis.links} hint="En todos los proyectos" loading={loading} />
      </DashReveal>

      <div className="dash-columns">
        <DashReveal index={2}>
          <DashCard
            eyebrow={`${kpis.upcoming} por venir`}
            title="Próximos eventos"
            action={{ label: 'Todos los proyectos', to: '/admin/proyectos' }}
          >
            {loading ? <p className="dash-muted">Cargando eventos…</p> : null}
            {!loading && upcoming.length === 0 ? (
              <div className="dash-empty">
                <CalendarHeart size={28} strokeWidth={1.4} aria-hidden="true" />
                <p>No hay eventos con fecha próxima.</p>
                <Link to="/admin/proyectos/nuevo" className="panel-btn-primary rounded-full px-4 text-sm font-medium">
                  Crear proyecto
                </Link>
              </div>
            ) : null}
            <ul className="dash-list">
              {upcoming.map((row) => (
                <li key={row.project.id} className="dash-event">
                  <DateBadge date={row.event.date} />
                  <div className="dash-event-body">
                    <p className="dash-event-name">{row.event.name}</p>
                    <p className="dash-event-meta">
                      {row.template}
                      {row.ownerLabel ? ` · ${row.ownerLabel}` : ' · Sin cliente'}
                    </p>
                    <div className="dash-event-usage">
                      <UsageBar value={row.linksUsed} max={row.project.linkLimit} />
                      <span>
                        {row.linksUsed}/{row.project.linkLimit || '∞'} enlaces
                      </span>
                    </div>
                  </div>
                  <div className="dash-event-side">
                    <span className={`dash-pill ${row.event.daysLeft !== null && row.event.daysLeft <= 14 ? 'is-hot' : ''}`}>
                      {formatDaysLeft(row.event.daysLeft)}
                    </span>
                    <div className="dash-event-links">
                      <Link to={`/admin/proyectos/${row.project.slug}/enlaces`}>Enlaces</Link>
                      <Link to={`/admin/proyectos/${row.project.slug}`}>Editar</Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </DashCard>
        </DashReveal>

        <div className="dash-stack">
          <DashReveal index={3}>
            <DashCard eyebrow="Para hoy" title="Requiere atención">
              {loading ? <p className="dash-muted">Revisando…</p> : null}
              {!loading && attention.length === 0 ? (
                <p className="dash-allgood">
                  <span aria-hidden>✓</span> Todo en orden. No hay pendientes.
                </p>
              ) : null}
              <ul className="dash-list">
                {attention.map((item) => (
                  <li key={item.id}>
                    <Link to={item.to} className="dash-alert">
                      <span className="dash-alert-count">{item.count}</span>
                      <span>
                        <span className="dash-alert-title">{item.title}</span>
                        <span className="dash-alert-text">{item.text}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </DashCard>
          </DashReveal>

          <DashReveal index={4}>
            <DashCard eyebrow="Catálogo" title="Proyectos por plantilla">
              {!loading && templates.length === 0 ? <p className="dash-muted">Aún no hay proyectos.</p> : null}
              <ul className="dash-bars">
                {templates.map((item) => (
                  <li key={item.label}>
                    <span className="dash-bars-label">{item.label}</span>
                    <UsageBar value={item.count} max={maxTemplate} />
                    <strong>{item.count}</strong>
                  </li>
                ))}
              </ul>
            </DashCard>
          </DashReveal>
        </div>
      </div>

      <DashReveal index={5}>
        <DashCard eyebrow="Actividad" title="Actualizados recientemente" action={{ label: 'Ver proyectos', to: '/admin/proyectos' }}>
          {!loading && recent.length === 0 ? <p className="dash-muted">Sin actividad todavía.</p> : null}
          <ul className="dash-recent">
            {recent.map((row) => (
              <li key={row.project.id}>
                <Link to={`/admin/proyectos/${row.project.slug}`} className="dash-recent-item">
                  <span className="dash-recent-name">{row.event.name}</span>
                  <span className="dash-recent-meta">/{row.project.slug}</span>
                  <ProjectStatusBadge status={row.project.status} />
                  <span className="dash-recent-time">{formatRelativeDate(row.project.updatedAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </DashCard>
      </DashReveal>
    </div>
  )
}
