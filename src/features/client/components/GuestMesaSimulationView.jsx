import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { listGuestLinks } from '../services/clientProjectService.js'
import {
  formatMesaSimulationHeading,
  formatMesaTotalPeopleLabel,
  groupLinksByMesa,
} from '../../admin/utils/guestLinkTableHelpers.js'

/**
 * @param {{ guest: import('../../invitations/core/types/guestLink.js').GuestLinkRecord }} props
 */
function GuestMesaChip({ guest }) {
  return (
    <div className="mesa-simulation-guest">
      <p className="mesa-simulation-guest-name">{guest.guestLabel}</p>
      <p className="mesa-simulation-guest-meta">
        {guest.cupos} {guest.cupos === 1 ? 'persona' : 'personas'}
      </p>
    </div>
  )
}

/**
 * @param {{
 *   mesaLabel: string,
 *   guests: import('../../invitations/core/types/guestLink.js').GuestLinkRecord[],
 *   maxCupos: number,
 *   totalCupos: number,
 * }} props
 */
function MesaSimulationScene({ mesaLabel, guests, maxCupos, totalCupos }) {
  const tableWidthRem = 4.25 + Math.min(maxCupos, 12) * 0.55
  const tableHeightRem = tableWidthRem * 0.62
  const heading = formatMesaSimulationHeading(mesaLabel)
  const totalLabel = formatMesaTotalPeopleLabel(totalCupos)

  if (guests.length === 1) {
    return (
      <article className="mesa-simulation-scene">
        <h3 className="mesa-simulation-scene-title">{heading}</h3>
        <p className="mesa-simulation-scene-total">{totalLabel}</p>
        <div className="mesa-simulation-scene-single">
          <GuestMesaChip guest={guests[0]} />
          <div
            className="mesa-simulation-table"
            style={{ width: `${tableWidthRem}rem`, height: `${tableHeightRem}rem` }}
            aria-hidden
          />
        </div>
      </article>
    )
  }

  if (guests.length === 2) {
    const [leftGuest, rightGuest] = guests
    return (
      <article className="mesa-simulation-scene">
        <h3 className="mesa-simulation-scene-title">{heading}</h3>
        <p className="mesa-simulation-scene-total">{totalLabel}</p>
        <div className="mesa-simulation-scene-duo">
          <GuestMesaChip guest={leftGuest} />
          <div
            className="mesa-simulation-table"
            style={{ width: `${tableWidthRem}rem`, height: `${tableHeightRem}rem` }}
            aria-hidden
          />
          <GuestMesaChip guest={rightGuest} />
        </div>
      </article>
    )
  }

  return (
    <article className="mesa-simulation-scene">
      <h3 className="mesa-simulation-scene-title">{heading}</h3>
      <p className="mesa-simulation-scene-total">{totalLabel}</p>
      <div className="mesa-simulation-scene-multi">
        <div className="mesa-simulation-scene-multi-top">
          {guests.slice(0, Math.ceil(guests.length / 2)).map((guest) => (
            <GuestMesaChip key={guest.id} guest={guest} />
          ))}
        </div>
        <div
          className="mesa-simulation-table"
          style={{ width: `${tableWidthRem}rem`, height: `${tableHeightRem}rem` }}
          aria-hidden
        />
        <div className="mesa-simulation-scene-multi-bottom">
          {guests.slice(Math.ceil(guests.length / 2)).map((guest) => (
            <GuestMesaChip key={guest.id} guest={guest} />
          ))}
        </div>
      </div>
    </article>
  )
}

/**
 * @param {{ projectId: string, backHref: string }} props
 */
export function GuestMesaSimulationView({ projectId, backHref }) {
  const [links, setLinks] = useState(
    /** @type {import('../../invitations/core/types/guestLink.js').GuestLinkRecord[]} */ ([]),
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    listGuestLinks(projectId)
      .then(setLinks)
      .catch(() => setError('No se pudieron cargar los enlaces.'))
      .finally(() => setLoading(false))
  }, [projectId])

  const mesaGroups = useMemo(() => groupLinksByMesa(links), [links])
  const linksWithoutMesa = links.filter((link) => !link.mesa?.trim()).length

  return (
    <div className="mesa-simulation-page flex flex-col gap-4">
      <div className="panel-toolbar">
        <Link to={backHref} className="marketing-link text-sm font-medium">
          ← Volver a enlaces
        </Link>
      </div>

      <p className="marketing-muted text-sm">
        Vista previa según la mesa asignada en cada enlace. El tamaño de la mesa crece con más
        invitados en ese grupo.
      </p>

      {error ? <p className="panel-form-error">{error}</p> : null}
      {loading ? <p className="marketing-muted text-sm">Cargando simulación…</p> : null}

      {!loading && mesaGroups.length === 0 ? (
        <div className="panel-card-empty">
          No hay invitados con mesa asignada. Edita la mesa en cada enlace o al crear uno nuevo.
        </div>
      ) : null}

      {!loading && mesaGroups.length > 0 ? (
        <div className="mesa-simulation-grid">
          {mesaGroups.map((group) => (
            <MesaSimulationScene
              key={group.mesaLabel}
              mesaLabel={group.mesaLabel}
              guests={group.guests}
              maxCupos={group.maxCupos}
              totalCupos={group.totalCupos}
            />
          ))}
        </div>
      ) : null}

      {!loading && linksWithoutMesa > 0 ? (
        <p className="panel-form-hint">
          {linksWithoutMesa} enlace(s) sin mesa no aparecen en esta simulación.
        </p>
      ) : null}
    </div>
  )
}
