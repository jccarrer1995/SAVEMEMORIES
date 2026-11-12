import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock3, Eye, Info, LayoutTemplate, Music2, Plus, Search } from 'lucide-react'
import { DashReveal, KpiCard } from '../../../shared/components/PanelDashboard.jsx'
import { formatRelativeDate } from '../../../shared/utils/eventInfo.js'
import { Palette, TemplateCover } from './TemplateCatalogParts.jsx'
import { TemplateDetailDrawer } from './TemplateDetailDrawer.jsx'
import './admin-templates.css'

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'available', label: 'Disponibles' },
  { id: 'soon', label: 'Próximamente' },
]

/**
 * @param {{
 *   catalog: ReturnType<typeof import('../utils/templateCatalogModel.js').buildTemplateCatalog>,
 *   loading: boolean,
 *   error?: string,
 * }} props
 */
export function TemplateCatalogView({ catalog, loading, error }) {
  const { items, kpis } = catalog
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(/** @type {string | null} */ (null))

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    return items.filter((item) => {
      if (filter === 'available' && !item.available) return false
      if (filter === 'soon' && item.available) return false
      if (!term) return true
      return [item.label, item.tagline, item.description, ...item.highlights]
        .join(' ')
        .toLowerCase()
        .includes(term)
    })
  }, [items, filter, query])

  const counts = { all: items.length, available: kpis.available, soon: kpis.soon }
  const selected = items.find((item) => item.id === selectedId) ?? null

  return (
    <div className="dash tpl">
      {error ? <p className="panel-form-error">{error}</p> : null}

      <DashReveal className="dash-kpis">
        <KpiCard tone="dark" label="Plantillas" value={kpis.total} hint={`${kpis.available} listas para usar`} />
        <KpiCard label="Próximamente" value={kpis.soon} hint="En diseño" />
        <KpiCard label="Proyectos" value={kpis.inUse} hint="Creados con estas plantillas" loading={loading} />
        <KpiCard
          tone="clay"
          label="Más usada"
          value={<span className="tpl-kpi-text">{kpis.mostUsed?.label ?? '—'}</span>}
          hint={kpis.mostUsed ? `${kpis.mostUsed.stats.total} proyecto(s)` : 'Aún sin proyectos'}
          loading={loading}
        />
      </DashReveal>

      <DashReveal index={1} className="tpl-toolbar">
        <label className="tpl-search">
          <Search size={16} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar plantilla, estilo o sección…"
            aria-label="Buscar plantillas"
          />
        </label>
        <div className="tpl-filters" role="tablist" aria-label="Filtrar plantillas">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              className={`tpl-filter ${filter === item.id ? 'is-active' : ''}`}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
              <span className="tpl-filter-count">{counts[item.id]}</span>
            </button>
          ))}
        </div>
      </DashReveal>

      {visible.length === 0 ? (
        <div className="dash-card dash-empty tpl-empty">
          <LayoutTemplate size={28} strokeWidth={1.4} aria-hidden="true" />
          <p>Ninguna plantilla coincide con tu búsqueda.</p>
          <button
            type="button"
            className="dash-card-action"
            onClick={() => {
              setQuery('')
              setFilter('all')
            }}
          >
            Limpiar filtros
          </button>
        </div>
      ) : null}

      <ul className="tpl-grid">
        {visible.map((item, index) => (
          <li key={item.id}>
            <DashReveal index={index + 2} className="tpl-card-wrap">
              <TemplateCard item={item} loading={loading} onOpen={() => setSelectedId(item.id)} />
            </DashReveal>
          </li>
        ))}
      </ul>

      <TemplateDetailDrawer template={selected} onClose={() => setSelectedId(null)} />
    </div>
  )
}

/**
 * @param {{
 *   item: import('../utils/templateCatalogModel.js').CatalogTemplate,
 *   loading: boolean,
 *   onOpen: () => void,
 * }} props
 */
function TemplateCard({ item, loading, onOpen }) {
  const { stats } = item

  return (
    <article className={`tpl-card ${item.available ? '' : 'is-soon'}`}>
      <button type="button" className="tpl-cover" onClick={onOpen} aria-label={`Ver detalles de ${item.label}`}>
        <TemplateCover cover={item.cover} />
        <span className={`tpl-status ${item.available ? 'is-live' : ''}`}>
          {item.available ? 'Disponible' : 'Próximamente'}
        </span>
        {item.music ? (
          <span className="tpl-music" title="Incluye música">
            <Music2 size={14} strokeWidth={1.75} aria-hidden="true" />
          </span>
        ) : null}
      </button>

      <div className="tpl-body">
        <div className="tpl-head">
          <div className="tpl-head-text">
            <p className="tpl-tagline">{item.tagline}</p>
            <h2 className="tpl-name">{item.label}</h2>
          </div>
          <Palette colors={item.palette} />
        </div>

        <p className="tpl-desc">{item.description}</p>

        <ul className="tpl-tags" aria-label="Incluye">
          {item.highlights.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <dl className="tpl-stats">
          <div>
            <dt>Proyectos</dt>
            <dd>{loading ? '…' : stats.total}</dd>
          </div>
          <div>
            <dt>Activos</dt>
            <dd>{loading ? '…' : stats.active}</dd>
          </div>
          <div>
            <dt>Próximos</dt>
            <dd>{loading ? '…' : stats.upcoming}</dd>
          </div>
        </dl>

        <p className="tpl-last">
          <Clock3 size={13} strokeWidth={1.75} aria-hidden="true" />
          {stats.lastUsed ? `Último uso ${formatRelativeDate(stats.lastUsed)}` : 'Sin uso todavía'}
        </p>

        <div className="tpl-actions">
          {item.available ? (
            <Link
              to={`/admin/proyectos/nuevo?plantilla=${item.id}`}
              className="panel-btn-primary tpl-btn tpl-btn--primary"
            >
              <Plus size={16} strokeWidth={2} aria-hidden="true" />
              Usar plantilla
            </Link>
          ) : (
            <span className="tpl-btn tpl-btn--disabled" aria-disabled="true">
              En diseño
            </span>
          )}
          {item.demoPath ? (
            <a href={item.demoPath} target="_blank" rel="noreferrer" className="tpl-btn">
              <Eye size={16} strokeWidth={1.75} aria-hidden="true" />
              Demo
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
            </a>
          ) : null}
          <button type="button" className="tpl-btn tpl-btn--icon" onClick={onOpen} aria-label={`Detalles de ${item.label}`}>
            <Info size={16} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}

