import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listGuestLinks } from '../services/clientProjectService.js'
import { MesaSimulationBoard } from './MesaSimulationBoard.jsx'

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

  return (
    <div className="mesa-simulation-page flex flex-col gap-4">
      <div className="panel-toolbar">
        <Link to={backHref} className="marketing-link text-sm font-medium">
          ← Volver a enlaces
        </Link>
      </div>

      {error ? <p className="panel-form-error">{error}</p> : null}
      {loading ? <p className="marketing-muted text-sm">Cargando simulación…</p> : null}
      {!loading && !error ? <MesaSimulationBoard links={links} /> : null}
    </div>
  )
}
