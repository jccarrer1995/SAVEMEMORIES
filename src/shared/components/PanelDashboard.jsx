import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../layouts/panel-dashboard.css'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Aparece suave al cargar (escalonado por índice).
 * @param {{ children: import('react').ReactNode, index?: number, className?: string }} props
 */
export function DashReveal({ children, index = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: Math.min(index, 8) * 0.06 }}
    >
      {children}
    </motion.div>
  )
}

/**
 * @param {{
 *   label: string,
 *   value: import('react').ReactNode,
 *   hint?: import('react').ReactNode,
 *   tone?: 'default' | 'dark' | 'clay',
 *   loading?: boolean,
 * }} props
 */
export function KpiCard({ label, value, hint, tone = 'default', loading = false }) {
  return (
    <div className={`dash-kpi is-${tone}`}>
      <span className="dash-kpi-label">{label}</span>
      <span className="dash-kpi-value">{loading ? <span className="dash-skeleton" /> : value}</span>
      {hint ? <span className="dash-kpi-hint">{hint}</span> : null}
    </div>
  )
}

/**
 * @param {{
 *   title: string,
 *   eyebrow?: string,
 *   action?: { label: string, to: string },
 *   children: import('react').ReactNode,
 *   className?: string,
 * }} props
 */
export function DashCard({ title, eyebrow, action, children, className = '' }) {
  return (
    <section className={`dash-card ${className}`}>
      <header className="dash-card-head">
        <div>
          {eyebrow ? <p className="dash-card-eyebrow">{eyebrow}</p> : null}
          <h2 className="dash-card-title">{title}</h2>
        </div>
        {action ? (
          <Link to={action.to} className="dash-card-action">
            {action.label}
            <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        ) : null}
      </header>
      {children}
    </section>
  )
}

/**
 * @param {{
 *   to: string,
 *   icon: import('react').ComponentType<{ size?: number, strokeWidth?: number, 'aria-hidden'?: boolean | 'true' }>,
 *   title: string,
 *   text: string,
 *   external?: boolean,
 *   primary?: boolean,
 * }} props
 */
export function QuickAction({ to, icon: Icon, title, text, external = false, primary = false }) {
  const content = (
    <>
      <span className="dash-action-icon">
        <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
      </span>
      <span className="dash-action-body">
        <span className="dash-action-title">{title}</span>
        <span className="dash-action-text">{text}</span>
      </span>
      <span className="dash-action-arrow" aria-hidden>
        <ArrowUpRight size={16} strokeWidth={1.75} />
      </span>
    </>
  )

  const className = `dash-action ${primary ? 'is-primary' : ''}`
  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    )
  }
  return (
    <Link to={to} className={className}>
      {content}
    </Link>
  )
}

/**
 * Anillo de progreso con segmentos (confirmados, no asisten, pendientes).
 * @param {{
 *   segments: Array<{ value: number, color: string }>,
 *   total: number,
 *   label: string,
 *   center: import('react').ReactNode,
 * }} props
 */
export function ProgressRing({ segments, total, label, center }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="dash-ring" role="img" aria-label={label}>
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--paper-2)" strokeWidth="10" />
        {total > 0
          ? segments.map((segment, index) => {
              const length = (segment.value / total) * circumference
              const dash = (
                <motion.circle
                  key={index}
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="10"
                  strokeLinecap="butt"
                  transform="rotate(-90 60 60)"
                  strokeDashoffset={-offset}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: `${length} ${circumference}` }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.2 + index * 0.15 }}
                />
              )
              offset += length
              return dash
            })
          : null}
      </svg>
      <div className="dash-ring-center">{center}</div>
    </div>
  )
}

/**
 * @param {{ value: number, max: number, tone?: 'olive' | 'clay' }} props
 */
export function UsageBar({ value, max, tone = 'olive' }) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <span className="dash-usage" aria-hidden>
      <motion.span
        className={`dash-usage-fill is-${percent >= 90 ? 'clay' : tone}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: max > 0 ? percent / 100 : 0.06 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      />
    </span>
  )
}

/**
 * @param {{ date: Date | null }} props
 */
export function DateBadge({ date }) {
  if (!date) {
    return (
      <span className="dash-date is-empty" aria-label="Sin fecha">
        <span className="dash-date-day">—</span>
        <span className="dash-date-month">Fecha</span>
      </span>
    )
  }
  return (
    <span className="dash-date">
      <span className="dash-date-day">{date.getDate()}</span>
      <span className="dash-date-month">
        {date.toLocaleDateString('es-EC', { month: 'short' }).replace('.', '')}{' '}
        {String(date.getFullYear()).slice(2)}
      </span>
    </span>
  )
}
