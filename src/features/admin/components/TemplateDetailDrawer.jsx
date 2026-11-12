import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Eye, Minus, Plus, X } from 'lucide-react'
import { formatDaysLeft } from '../../../shared/utils/eventInfo.js'
import { describeFormFeatures } from '../utils/templateCatalogModel.js'
import { Palette, TemplateCover } from './TemplateCatalogParts.jsx'
import { ProjectStatusBadge } from './ProjectStatusBadge.jsx'

const EASE = [0.22, 1, 0.36, 1]
const NARROW_QUERY = '(max-width: 699px)'

/** En pantallas angostas el detalle sube como hoja inferior. */
function useIsNarrow() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(NARROW_QUERY).matches,
  )
  useEffect(() => {
    const media = window.matchMedia(NARROW_QUERY)
    const update = () => setNarrow(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return narrow
}

/**
 * Panel lateral (escritorio) / hoja inferior (móvil) con el detalle de una plantilla.
 * @param {{
 *   template: import('../utils/templateCatalogModel.js').CatalogTemplate | null,
 *   onClose: () => void,
 * }} props
 */
export function TemplateDetailDrawer({ template, onClose }) {
  const closeRef = useRef(/** @type {HTMLButtonElement | null} */ (null))
  const isOpen = Boolean(template)
  const isSheet = useIsNarrow()
  const hidden = isSheet ? { y: '100%' } : { x: '100%' }

  useEffect(() => {
    if (!isOpen) return undefined
    const previous = document.activeElement
    function handleKey(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {template ? (
        <div className="tpl-drawer-root">
          <motion.button
            type="button"
            className="tpl-drawer-backdrop"
            aria-label="Cerrar detalle"
            tabIndex={-1}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="tpl-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tpl-drawer-title"
            initial={hidden}
            animate={{ x: 0, y: 0 }}
            exit={hidden}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <DrawerContent template={template} onClose={onClose} closeRef={closeRef} />
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  )
}

/**
 * @param {{
 *   template: import('../utils/templateCatalogModel.js').CatalogTemplate,
 *   onClose: () => void,
 *   closeRef: import('react').RefObject<HTMLButtonElement | null>,
 * }} props
 */
function DrawerContent({ template, onClose, closeRef }) {
  const { stats, rows } = template
  const formFeatures = describeFormFeatures(template.features)

  return (
    <>
      <div className="tpl-drawer-cover">
        <TemplateCover cover={template.cover} />
        <button ref={closeRef} type="button" className="tpl-drawer-close" onClick={onClose} aria-label="Cerrar">
          <X size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <div className="tpl-drawer-body">
        <header className="tpl-drawer-head">
          <p className="tpl-tagline">{template.tagline}</p>
          <h2 id="tpl-drawer-title" className="tpl-drawer-title">
            {template.label}
          </h2>
          <p className="tpl-desc">{template.description}</p>
          <div className="tpl-drawer-meta">
            <span className={`tpl-status is-inline ${template.available ? 'is-live' : ''}`}>
              {template.available ? 'Disponible' : 'Próximamente'}
            </span>
            <Palette colors={template.palette} />
            <code className="tpl-code">{template.id}</code>
          </div>
        </header>

        <dl className="tpl-stats tpl-stats--wide">
          <div>
            <dt>Total</dt>
            <dd>{stats.total}</dd>
          </div>
          <div>
            <dt>Activos</dt>
            <dd>{stats.active}</dd>
          </div>
          <div>
            <dt>Borradores</dt>
            <dd>{stats.drafts}</dd>
          </div>
          <div>
            <dt>Archivados</dt>
            <dd>{stats.archived}</dd>
          </div>
        </dl>

        <section className="tpl-drawer-section">
          <h3>Secciones de la invitación</h3>
          <ol className="tpl-sections">
            {template.sections.map((section, index) => (
              <li key={section}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {section}
              </li>
            ))}
          </ol>
        </section>

        <section className="tpl-drawer-section">
          <h3>Campos del formulario</h3>
          <ul className="tpl-features">
            {formFeatures.map((feature) => (
              <li key={feature.label} className={feature.on ? 'is-on' : 'is-off'}>
                {feature.on ? (
                  <Check size={14} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Minus size={14} strokeWidth={2} aria-hidden="true" />
                )}
                <span>{feature.label}</span>
                <span className="sr-only">{feature.on ? '(incluido)' : '(no incluido)'}</span>
              </li>
            ))}
          </ul>
        </section>

        {template.music ? (
          <section className="tpl-drawer-section">
            <h3>Música por defecto</h3>
            <audio className="tpl-audio" controls preload="none" src={template.music.src}>
              {template.music.title}
            </audio>
          </section>
        ) : null}

        <section className="tpl-drawer-section">
          <h3>Proyectos con esta plantilla</h3>
          {rows.length === 0 ? (
            <p className="dash-muted">Todavía no hay proyectos creados con esta plantilla.</p>
          ) : (
            <ul className="tpl-projects">
              {rows.map(({ project, event }) => (
                <li key={project.id}>
                  <Link to={`/admin/proyectos/${project.slug}`} className="tpl-project">
                    <span className="tpl-project-main">
                      <span className="tpl-project-name">{event.name}</span>
                      <span className="tpl-project-meta">
                        /{project.slug} · {formatDaysLeft(event.daysLeft)}
                      </span>
                    </span>
                    <ProjectStatusBadge status={project.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <footer className="tpl-drawer-footer">
        {template.demoPath ? (
          <a href={template.demoPath} target="_blank" rel="noreferrer" className="tpl-btn">
            <Eye size={16} strokeWidth={1.75} aria-hidden="true" />
            Ver demo
            <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
          </a>
        ) : null}
        {template.available ? (
          <Link
            to={`/admin/proyectos/nuevo?plantilla=${template.id}`}
            className="panel-btn-primary tpl-btn tpl-btn--primary"
          >
            <Plus size={16} strokeWidth={2} aria-hidden="true" />
            Crear proyecto
          </Link>
        ) : (
          <span className="tpl-btn tpl-btn--disabled" aria-disabled="true">
            Aún en diseño
          </span>
        )}
      </footer>
    </>
  )
}
