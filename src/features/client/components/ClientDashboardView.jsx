import { motion } from 'framer-motion'
import { Armchair, Check, ExternalLink, Link2, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  DashCard,
  DashReveal,
  KpiCard,
  ProgressRing,
  QuickAction,
  UsageBar,
} from '../../../shared/components/PanelDashboard.jsx'
import { formatDaysLeft, formatRelativeDate } from '../../../shared/utils/eventInfo.js'
import { publicUrl } from '../../invitations/core/utils/publicUrl.js'
import { SITE, whatsappUrl } from '../../marketing/data/siteContent.js'

const EASE = [0.22, 1, 0.36, 1]

const STATUS_LABEL = { confirmed: 'Confirmó', declined: 'No asistirá', pending: 'Respondió' }
const STATUS_PILL = { confirmed: 'panel-pill--confirmed', declined: 'panel-pill--declined', pending: 'panel-pill--pending' }

/**
 * @param {{ event: ReturnType<typeof import('../../../shared/utils/eventInfo.js').getEventInfo>, project: import('../../admin/types/projectRecord.js').ProjectRecord }} props
 */
function EventHero({ event, project }) {
  const days = event.daysLeft
  const invitationUrl = publicUrl(`/invitacion/${project.slug}`)

  return (
    <section className={`dash-hero ${event.heroImage ? 'has-photo' : ''}`}>
      <div className="dash-hero-copy">
        <p className="dash-hero-eyebrow">
          <span className="panel-dot" aria-hidden /> Tu evento
        </p>
        <h2 className="dash-hero-title">{event.name}</h2>
        <p className="dash-hero-meta">
          {[event.dateLabel, event.venue].filter(Boolean).join(' · ') || project.title}
        </p>

        <div className="dash-hero-count">
          {days !== null && days > 0 ? (
            <>
              <motion.span
                className="dash-hero-days"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              >
                {days}
              </motion.span>
              <span className="dash-hero-days-label">{days === 1 ? 'día para el gran día' : 'días para el gran día'}</span>
            </>
          ) : (
            <span className="dash-hero-days-label is-big">{formatDaysLeft(days)}</span>
          )}
        </div>

        <div className="dash-hero-ctas">
          <a href={invitationUrl} target="_blank" rel="noreferrer" className="dash-btn is-light">
            Ver mi invitación
            <ExternalLink size={15} strokeWidth={1.75} aria-hidden="true" />
          </a>
          <Link to={`/cliente/proyectos/${project.slug}/enlaces`} className="dash-btn is-ghost">
            Gestionar invitados
          </Link>
        </div>
      </div>
      {event.heroImage ? (
        <motion.div
          className="dash-hero-photo"
          initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 18px 18px)' }}
          animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 18px 18px)' }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
        >
          <img src={event.heroImage} alt="" loading="lazy" />
        </motion.div>
      ) : null}
    </section>
  )
}

/**
 * @param {{
 *   projects: import('../../admin/types/projectRecord.js').ProjectRecord[],
 *   featured: import('../../admin/types/projectRecord.js').ProjectRecord | null,
 *   onSelect: (projectId: string) => void,
 *   dashboard: ReturnType<typeof import('../utils/clientDashboardModel.js').buildClientDashboard> | null,
 *   loading: boolean,
 *   detailLoading: boolean,
 *   error?: string,
 * }} props
 */
export function ClientDashboardView({ projects, featured, onSelect, dashboard, loading, detailLoading, error }) {
  if (loading) {
    return (
      <div className="dash">
        <div className="dash-hero is-loading" aria-busy="true">
          <p className="dash-hero-meta">Cargando tu evento…</p>
        </div>
      </div>
    )
  }

  if (!featured || !dashboard) {
    return (
      <div className="dash">
        {error ? <p className="panel-form-error">{error}</p> : null}
        <div className="dash-empty dash-empty--big">
          <p className="dash-empty-title">Aún no tienes un evento asignado</p>
          <p>Cuando el equipo de {SITE.name} active tu invitación, aparecerá aquí con todo lo necesario.</p>
          <a
            href={whatsappUrl(SITE.whatsapp, 'Hola, ya tengo cuenta en el panel y quiero activar mi invitación.')}
            target="_blank"
            rel="noreferrer"
            className="panel-btn-primary rounded-full px-5 text-sm font-medium"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    )
  }

  const { event, people, groups, links, recent, steps, completedSteps } = dashboard
  const responded = people.confirmed + people.declined
  const percent = people.invited > 0 ? Math.round((responded / people.invited) * 100) : 0
  const slug = featured.slug

  return (
    <div className="dash">
      {error ? <p className="panel-form-error">{error}</p> : null}

      {projects.length > 1 ? (
        <div className="dash-switch" role="tablist" aria-label="Tus eventos">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={project.id === featured.id}
              className={`dash-switch-btn ${project.id === featured.id ? 'is-active' : ''}`}
              onClick={() => onSelect(project.id)}
            >
              {project.title || project.slug}
            </button>
          ))}
        </div>
      ) : null}

      <DashReveal>
        <EventHero event={event} project={featured} />
      </DashReveal>

      <DashReveal index={1} className="dash-kpis">
        <KpiCard tone="dark" label="Confirmados" value={people.confirmed} hint={`${groups.confirmed} ${groups.confirmed === 1 ? 'grupo' : 'grupos'}`} loading={detailLoading} />
        <KpiCard label="Por responder" value={people.pending} hint={`${groups.pending} ${groups.pending === 1 ? 'grupo' : 'grupos'}`} loading={detailLoading} />
        <KpiCard label="No asistirán" value={people.declined} hint={`${groups.declined} ${groups.declined === 1 ? 'grupo' : 'grupos'}`} loading={detailLoading} />
        <KpiCard
          tone="clay"
          label="Enlaces usados"
          value={`${links.used}${links.limit > 0 ? `/${links.limit}` : ''}`}
          hint={links.limit > 0 ? `${Math.max(links.limit - links.used, 0)} disponibles` : 'Sin límite'}
          loading={detailLoading}
        />
      </DashReveal>

      <div className="dash-columns">
        <DashReveal index={2}>
          <DashCard eyebrow="Asistencia" title="Avance de confirmaciones" action={{ label: 'Ver respuestas', to: `/cliente/proyectos/${slug}/respuestas` }}>
            <div className="dash-rsvp">
              <ProgressRing
                total={people.invited}
                label={`${responded} de ${people.invited} personas respondieron`}
                segments={[
                  { value: people.confirmed, color: 'var(--olive)' },
                  { value: people.declined, color: 'var(--sand)' },
                ]}
                center={
                  <>
                    <strong>{percent}%</strong>
                    <span>respondió</span>
                  </>
                }
              />
              <ul className="dash-legend">
                <li>
                  <span className="dash-legend-dot" style={{ background: 'var(--olive)' }} />
                  Confirmados <strong>{people.confirmed}</strong>
                </li>
                <li>
                  <span className="dash-legend-dot" style={{ background: 'var(--sand)' }} />
                  No asistirán <strong>{people.declined}</strong>
                </li>
                <li>
                  <span className="dash-legend-dot" style={{ background: 'var(--paper-2)' }} />
                  Por responder <strong>{people.pending}</strong>
                </li>
                <li className="dash-legend-total">
                  Personas invitadas <strong>{people.invited}</strong>
                </li>
              </ul>
            </div>
          </DashCard>
        </DashReveal>

        <DashReveal index={3}>
          <DashCard eyebrow={`${completedSteps} de ${steps.length} listos`} title="Próximos pasos">
            <div className="dash-steps-progress">
              <UsageBar value={completedSteps} max={steps.length} />
            </div>
            <ol className="dash-steps">
              {steps.map((step, index) => (
                <li key={step.id}>
                  <Link to={step.to} className={`dash-step ${step.done ? 'is-done' : ''}`}>
                    <span className="dash-step-check" aria-hidden>
                      {step.done ? <Check size={14} strokeWidth={2.4} /> : index + 1}
                    </span>
                    <span>
                      <span className="dash-step-title">{step.title}</span>
                      <span className="dash-step-text">{step.text}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </DashCard>
        </DashReveal>
      </div>

      <DashReveal index={4} className="dash-actions">
        <QuickAction to={`/cliente/proyectos/${slug}/enlaces`} icon={Link2} title="Enlaces e invitados" text="Crea, edita y copia enlaces" primary />
        <QuickAction to={`/cliente/proyectos/${slug}/respuestas`} icon={MessageCircle} title="Respuestas y Excel" text="Mensajes y descarga" />
        <QuickAction to={`/cliente/proyectos/${slug}/enlaces/simular-mesas`} icon={Armchair} title="Simular mesas" text="Organiza e imprime en PDF" />
        <QuickAction to={publicUrl(`/invitacion/${slug}`)} icon={ExternalLink} title="Mi invitación" text="Mírala como tus invitados" external />
      </DashReveal>

      <DashReveal index={5}>
        <DashCard eyebrow="En vivo" title="Últimas respuestas" action={{ label: 'Ver todas', to: `/cliente/proyectos/${slug}/respuestas` }}>
          {detailLoading ? <p className="dash-muted">Cargando respuestas…</p> : null}
          {!detailLoading && recent.length === 0 ? (
            <p className="dash-muted">Aún no hay respuestas. Comparte tus enlaces y aparecerán aquí al instante.</p>
          ) : null}
          <ul className="dash-recent">
            {recent.map((row) => (
              <li key={row.id}>
                <div className="dash-recent-item">
                  <span className="dash-recent-avatar" aria-hidden>
                    {row.group.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="dash-recent-name">
                    {row.group}
                    {row.names ? <span className="dash-recent-sub">{row.names}</span> : null}
                  </span>
                  <span className={`panel-pill ${STATUS_PILL[row.status]}`}>
                    {STATUS_LABEL[row.status]}
                    {row.status === 'confirmed' && row.cupos ? ` · ${row.cupos}` : ''}
                  </span>
                  <span className="dash-recent-time">{formatRelativeDate(row.createdAt)}</span>
                </div>
              </li>
            ))}
          </ul>
        </DashCard>
      </DashReveal>
    </div>
  )
}
