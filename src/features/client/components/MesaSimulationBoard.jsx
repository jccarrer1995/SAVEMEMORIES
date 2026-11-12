import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useId, useMemo, useState } from 'react'
import { GuestLinkEtiquetasPills } from '../../admin/components/GuestLinkEtiquetasPills.jsx'
import { groupLinksByMesa } from '../../admin/utils/guestLinkTableHelpers.js'
import { summarizeGuestLinkTags } from '../../invitations/core/constants/guestLinkTags.js'
import { useSiteFonts } from '../../marketing/home/useSiteFonts.js'
import {
  EMPTY_FILTERS,
  GRUPO_FILTERS,
  LADO_FILTERS,
  buildToneMap,
  countFilterOptions,
  filterLinks,
  hasActiveFilters,
  mesaHeading,
  mesaNumber,
  peopleLabel,
} from '../utils/mesaSimulationModel.js'
import { PrintMesasButton } from './PrintMesasButton.jsx'
import './mesa-simulation.css'

const EASE = [0.22, 1, 0.36, 1]

/**
 * @param {{
 *   mesaLabel: string,
 *   guests: import('../../invitations/core/types/guestLink.js').GuestLinkRecord[],
 *   totalCupos: number,
 *   tones: Record<string, string>,
 * }} props
 */
function MesaCard({ mesaLabel, guests, totalCupos, tones }) {
  const [focusId, setFocusId] = useState(/** @type {string | null} */ (null))
  const heading = mesaHeading(mesaLabel)

  /** Un asiento por persona, agrupados por enlace de invitado. */
  const seats = useMemo(() => {
    const list = []
    for (const guest of guests) {
      const count = Math.max(0, Number(guest.cupos) || 0)
      for (let seat = 0; seat < count; seat += 1) {
        list.push({ guestId: guest.id, tone: tones[guest.id] })
      }
    }
    return list
  }, [guests, tones])

  const total = seats.length
  const seatSize = Math.min(13, ((2 * Math.PI * 42) / Math.max(total, 1)) * 0.68)
  const tableInset = total > 14 ? 24 : 27

  return (
    <motion.article
      layout
      className="msim-card"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <div className="msim-stage">
        <div className="msim-stage-head">
          <span className="msim-tag">{guests.length === 1 ? '1 grupo' : `${guests.length} grupos`}</span>
          <span className="msim-stage-total">{peopleLabel(totalCupos)}</span>
        </div>

        <div className="msim-round" role="img" aria-label={`${heading}: ${peopleLabel(totalCupos)}`}>
          <span className="msim-table" style={{ inset: `${tableInset}%` }}>
            <span className="msim-table-kicker">Mesa</span>
            <span className="msim-table-number">{mesaNumber(mesaLabel)}</span>
          </span>
          {seats.map((seat, seatIndex) => {
            const angle = (seatIndex / total) * Math.PI * 2 - Math.PI / 2
            const dimmed = focusId !== null && focusId !== seat.guestId
            return (
              <motion.span
                key={`${seat.guestId}-${seatIndex}`}
                className={`msim-seat ${dimmed ? 'is-dimmed' : ''} ${focusId === seat.guestId ? 'is-focus' : ''}`}
                style={{
                  width: `${seatSize}%`,
                  background: seat.tone,
                  x: '-50%',
                  y: '-50%',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  left: `${50 + Math.cos(angle) * 42}%`,
                  top: `${50 + Math.sin(angle) * 42}%`,
                }}
                transition={{ delay: 0.1 + seatIndex * 0.03, duration: 0.45, ease: EASE }}
              />
            )
          })}
        </div>
      </div>

      <ul className="msim-guests" onMouseLeave={() => setFocusId(null)}>
        {guests.map((guest) => (
          <li key={guest.id}>
            <button
              type="button"
              className={`msim-guest ${focusId === guest.id ? 'is-focus' : ''}`}
              onMouseEnter={() => setFocusId(guest.id)}
              onFocus={() => setFocusId(guest.id)}
              onBlur={() => setFocusId(null)}
              onClick={() => setFocusId((value) => (value === guest.id ? null : guest.id))}
              aria-pressed={focusId === guest.id}
            >
              <span className="msim-guest-dot" style={{ background: tones[guest.id] }} />
              <span className="msim-guest-body">
                <span className="msim-guest-name">{guest.guestLabel}</span>
                <GuestLinkEtiquetasPills link={guest} hideWhenEmpty variant="simulation" />
              </span>
              <span className="msim-guest-count">{guest.cupos}</span>
            </button>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

/**
 * @param {{
 *   title: string,
 *   total: number,
 *   ambos: number,
 *   rows: Array<{ id: string, label: string, count: number }>,
 * }} props
 */
function TagSideCard({ title, total, ambos, rows }) {
  const [open, setOpen] = useState(true)
  const panelId = useId()

  return (
    <section className={`msim-side ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="msim-side-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="msim-side-title">{title}</span>
        <span className="msim-side-total">{total}</span>
        <span className="msim-side-icon" aria-hidden />
      </button>
      {open ? (
        <div id={panelId} className="msim-side-panel">
          <dl>
            {rows.map((item) => (
              <div key={item.id}>
                <dt>{item.label}</dt>
                <dd>{item.count}</dd>
              </div>
            ))}
          </dl>
          {ambos > 0 ? <p className="msim-side-note">Incluye {ambos} de ambos</p> : null}
        </div>
      ) : null}
    </section>
  )
}

/**
 * @param {{
 *   label: string,
 *   count: number,
 *   active: boolean,
 *   onClick: () => void,
 * }} props
 */
function FilterChip({ label, count, active, onClick }) {
  return (
    <button
      type="button"
      className={`msim-chip ${active ? 'is-active' : ''} ${count === 0 && !active ? 'is-empty' : ''}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
      <span className="msim-chip-count">{count}</span>
    </button>
  )
}

/**
 * Simulación visual de mesas (presentación). Recibe los enlaces ya cargados.
 * @param {{
 *   links: import('../../invitations/core/types/guestLink.js').GuestLinkRecord[],
 *   event?: { title: string, subtitle?: string, fileName: string },
 * }} props
 */
export function MesaSimulationBoard({ links, event }) {
  useSiteFonts()
  const [filters, setFilters] = useState(EMPTY_FILTERS)

  const tones = useMemo(() => buildToneMap(links), [links])
  const tagSummary = useMemo(() => summarizeGuestLinkTags(links), [links])
  const optionCounts = useMemo(() => countFilterOptions(links, filters), [links, filters])
  const visibleLinks = useMemo(() => filterLinks(links, filters), [links, filters])
  const mesaGroups = useMemo(() => groupLinksByMesa(visibleLinks), [visibleLinks])

  const isFiltered = hasActiveFilters(filters)
  const totalMesas = useMemo(() => groupLinksByMesa(links).length, [links])
  const seated = mesaGroups.reduce((sum, group) => sum + group.totalCupos, 0)
  const linksWithoutMesa = links.filter((link) => !link.mesa?.trim()).length
  const hasTagSummary = tagSummary.novia.total > 0 || tagSummary.novio.total > 0

  const toggleGrupo = (id) =>
    setFilters((current) => ({
      ...current,
      grupos: current.grupos.includes(id)
        ? current.grupos.filter((value) => value !== id)
        : [...current.grupos, id],
    }))

  const stats = [
    { label: isFiltered ? `Mesas (de ${totalMesas})` : 'Mesas', value: mesaGroups.length },
    { label: isFiltered ? 'Personas filtradas' : 'Personas ubicadas', value: seated },
    { label: 'Enlaces sin mesa', value: linksWithoutMesa, warn: linksWithoutMesa > 0 },
  ]

  return (
    <MotionConfig reducedMotion="user">
      <div className="msim">
        <div className="msim-stats">
          {stats.map((stat) => (
            <div key={stat.label} className={`msim-stat ${stat.warn ? 'is-warn' : ''}`}>
              <span className="msim-stat-value">{stat.value}</span>
              <span className="msim-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {hasTagSummary ? (
          <div className="msim-sides">
            <TagSideCard {...tagSummary.novia} />
            <TagSideCard {...tagSummary.novio} />
          </div>
        ) : null}

        {totalMesas > 0 ? (
          <div className="msim-toolbar">
            <div className="msim-filters" role="group" aria-label="Filtros de invitados">
              <div className="msim-filter-row">
                <span className="msim-filter-label">Lado</span>
                <div className="msim-segment">
                  {LADO_FILTERS.map((option) => (
                    <FilterChip
                      key={option.id}
                      label={option.label}
                      count={optionCounts.lado[option.id] ?? 0}
                      active={filters.lado === option.id}
                      onClick={() => setFilters((current) => ({ ...current, lado: option.id }))}
                    />
                  ))}
                </div>
              </div>
              <div className="msim-filter-row">
                <span className="msim-filter-label">Grupo</span>
                <div className="msim-segment">
                  <FilterChip
                    label="Todos"
                    count={optionCounts.grupo.todos ?? 0}
                    active={filters.grupos.length === 0}
                    onClick={() => setFilters((current) => ({ ...current, grupos: [] }))}
                  />
                  {GRUPO_FILTERS.map((option) => (
                    <FilterChip
                      key={option.id}
                      label={option.label}
                      count={optionCounts.grupo[option.id] ?? 0}
                      active={filters.grupos.includes(option.id)}
                      onClick={() => toggleGrupo(option.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="msim-toolbar-actions">
              {isFiltered ? (
                <button type="button" className="msim-clear" onClick={() => setFilters(EMPTY_FILTERS)}>
                  Limpiar filtros
                </button>
              ) : null}
              <PrintMesasButton
                groups={mesaGroups}
                tones={tones}
                filters={filters}
                event={event}
                disabled={mesaGroups.length === 0}
              />
            </div>
          </div>
        ) : null}

        {totalMesas === 0 ? (
          <div className="msim-empty">
            <svg className="msim-empty-art" viewBox="0 0 64 64" aria-hidden>
              <circle cx="32" cy="32" r="13" fill="none" stroke="currentColor" strokeWidth="1.2" />
              {[0, 1, 2, 3, 4, 5].map((seat) => {
                const angle = (seat / 6) * Math.PI * 2 - Math.PI / 2
                return (
                  <circle
                    key={seat}
                    cx={32 + Math.cos(angle) * 24}
                    cy={32 + Math.sin(angle) * 24}
                    r="4.5"
                    fill={seat % 2 ? '#a8b096' : '#b0603b'}
                  />
                )
              })}
            </svg>
            <p className="msim-empty-title">Aún no hay mesas asignadas</p>
            <p>Edita la mesa en cada enlace o al crear uno nuevo y aparecerá aquí.</p>
          </div>
        ) : (
          <>
            <p className="msim-hint">
              Cada punto es una persona; los colores agrupan a cada enlace. Pasa el cursor o toca un
              invitado para resaltar sus lugares.
            </p>
            {mesaGroups.length === 0 ? (
              <div className="msim-empty">
                <p className="msim-empty-title">Nadie coincide con estos filtros</p>
                <p>Prueba con otra combinación o limpia los filtros.</p>
                <button type="button" className="msim-clear" onClick={() => setFilters(EMPTY_FILTERS)}>
                  Limpiar filtros
                </button>
              </div>
            ) : null}
            <motion.div layout className="msim-grid">
              <AnimatePresence mode="popLayout" initial={false}>
                {mesaGroups.map((group) => (
                  <MesaCard
                    key={group.mesaLabel}
                    mesaLabel={group.mesaLabel}
                    guests={group.guests}
                    totalCupos={group.totalCupos}
                    tones={tones}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}

        {linksWithoutMesa > 0 && totalMesas > 0 ? (
          <p className="msim-footnote">
            {linksWithoutMesa}{' '}
            {linksWithoutMesa === 1 ? 'enlace sin mesa no aparece' : 'enlaces sin mesa no aparecen'} en
            esta simulación.
          </p>
        ) : null}
      </div>
    </MotionConfig>
  )
}
