import { MotionConfig, motion } from 'framer-motion'
import { useId, useMemo, useState } from 'react'
import { GuestLinkEtiquetasPills } from '../../admin/components/GuestLinkEtiquetasPills.jsx'
import {
  formatMesaSimulationHeading,
  groupLinksByMesa,
} from '../../admin/utils/guestLinkTableHelpers.js'
import { summarizeGuestLinkTags } from '../../invitations/core/constants/guestLinkTags.js'
import { useSiteFonts } from '../../marketing/home/useSiteFonts.js'
import './mesa-simulation.css'

const EASE = [0.22, 1, 0.36, 1]

/** Tonos para distinguir cada grupo de invitados alrededor de la mesa. */
const SEAT_TONES = ['#a8b096', '#c97a52', '#d8c7a6', '#8fa3ad', '#c99a8f', '#c9a55a', '#7f8c6a', '#b7a7c4']

/** @param {number} count */
function peopleLabel(count) {
  return `${count} ${count === 1 ? 'persona' : 'personas'}`
}

/**
 * @param {{
 *   mesaLabel: string,
 *   guests: import('../../invitations/core/types/guestLink.js').GuestLinkRecord[],
 *   totalCupos: number,
 *   index: number,
 * }} props
 */
function MesaCard({ mesaLabel, guests, totalCupos, index }) {
  const [focusId, setFocusId] = useState(/** @type {string | null} */ (null))
  const heading = formatMesaSimulationHeading(mesaLabel).replace('#', ' ')
  const tableNumber = heading.replace(/^Mesa\s*/i, '') || mesaLabel

  /** Un asiento por persona, agrupados por enlace de invitado. */
  const seats = useMemo(() => {
    const list = []
    guests.forEach((guest, guestIndex) => {
      const count = Math.max(0, Number(guest.cupos) || 0)
      for (let seat = 0; seat < count; seat += 1) {
        list.push({ guestId: guest.id, tone: SEAT_TONES[guestIndex % SEAT_TONES.length] })
      }
    })
    return list
  }, [guests])

  const total = seats.length
  const seatSize = Math.min(13, ((2 * Math.PI * 42) / Math.max(total, 1)) * 0.68)
  const tableInset = total > 14 ? 24 : 27

  return (
    <motion.article
      className="msim-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay: Math.min(index, 6) * 0.05 }}
    >
      <div className="msim-stage">
        <div className="msim-stage-head">
          <span className="msim-tag">{guests.length === 1 ? '1 grupo' : `${guests.length} grupos`}</span>
          <span className="msim-stage-total">{peopleLabel(totalCupos)}</span>
        </div>

        <div className="msim-round" role="img" aria-label={`${heading}: ${peopleLabel(totalCupos)}`}>
          <span className="msim-table" style={{ inset: `${tableInset}%` }}>
            <span className="msim-table-kicker">Mesa</span>
            <span className="msim-table-number">{tableNumber}</span>
          </span>
          {seats.map((seat, seatIndex) => {
            const angle = (seatIndex / total) * Math.PI * 2 - Math.PI / 2
            const dimmed = focusId !== null && focusId !== seat.guestId
            return (
              <motion.span
                key={`${seat.guestId}-${seatIndex}`}
                className={`msim-seat ${dimmed ? 'is-dimmed' : ''} ${focusId === seat.guestId ? 'is-focus' : ''}`}
                style={{
                  left: `${50 + Math.cos(angle) * 42}%`,
                  top: `${50 + Math.sin(angle) * 42}%`,
                  width: `${seatSize}%`,
                  background: seat.tone,
                  x: '-50%',
                  y: '-50%',
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + seatIndex * 0.035, duration: 0.45, ease: EASE }}
              />
            )
          })}
        </div>
      </div>

      <ul className="msim-guests" onMouseLeave={() => setFocusId(null)}>
        {guests.map((guest, guestIndex) => (
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
              <span className="msim-guest-dot" style={{ background: SEAT_TONES[guestIndex % SEAT_TONES.length] }} />
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
 * Simulación visual de mesas (presentación). Recibe los enlaces ya cargados.
 * @param {{ links: import('../../invitations/core/types/guestLink.js').GuestLinkRecord[] }} props
 */
export function MesaSimulationBoard({ links }) {
  useSiteFonts()
  const mesaGroups = useMemo(() => groupLinksByMesa(links), [links])
  const tagSummary = useMemo(() => summarizeGuestLinkTags(links), [links])
  const seated = mesaGroups.reduce((sum, group) => sum + group.totalCupos, 0)
  const linksWithoutMesa = links.filter((link) => !link.mesa?.trim()).length
  const hasTagSummary = tagSummary.novia.total > 0 || tagSummary.novio.total > 0

  const stats = [
    { label: 'Mesas', value: mesaGroups.length },
    { label: 'Personas ubicadas', value: seated },
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

        {mesaGroups.length === 0 ? (
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
            <div className="msim-grid">
              {mesaGroups.map((group, index) => (
                <MesaCard
                  key={group.mesaLabel}
                  index={index}
                  mesaLabel={group.mesaLabel}
                  guests={group.guests}
                  totalCupos={group.totalCupos}
                />
              ))}
            </div>
          </>
        )}

        {linksWithoutMesa > 0 && mesaGroups.length > 0 ? (
          <p className="msim-footnote">
            {linksWithoutMesa} {linksWithoutMesa === 1 ? 'enlace sin mesa no aparece' : 'enlaces sin mesa no aparecen'}{' '}
            en esta simulación.
          </p>
        ) : null}
      </div>
    </MotionConfig>
  )
}
