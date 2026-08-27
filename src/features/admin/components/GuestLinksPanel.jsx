import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { GuestLinkForm } from './GuestLinkForm.jsx'
import {
  createProjectGuestLink,
  listGuestLinks,
  toggleProjectGuestLink,
} from '../services/guestLinkService.js'
import { getProjectById } from '../services/projectService.js'
import { buildInvitationLinkUrl } from '../../invitations/core/utils/invitationUrl.js'

/**
 * @param {{ projectId: string }} props
 */
export function GuestLinksPanel({ projectId }) {
  const [links, setLinks] = useState(/** @type {import('../../invitations/core/types/guestLink.js').GuestLinkRecord[]} */ ([]))
  const [linkLimit, setLinkLimit] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [project, projectLinks] = await Promise.all([
        getProjectById(projectId),
        listGuestLinks(projectId),
      ])
      if (!project) {
        setError('Proyecto no encontrado.')
        return
      }
      setLinkLimit(project.linkLimit)
      setLinks(projectLinks)
    } catch (err) {
      const isPermission =
        err && typeof err === 'object' && 'code' in err && err.code === 'permission-denied'
      setError(
        isPermission
          ? 'Sin permiso para leer enlaces. Publica las reglas de Firestore con la subcolección projects/{id}/links.'
          : 'No se pudieron cargar los enlaces.',
      )
    } finally {
      setLoading(false)
    }
  }, [projectId])

  useEffect(() => {
    void loadData()
  }, [loadData])

  async function handleCreate(values) {
    await createProjectGuestLink(projectId, values)
    await loadData()
  }

  async function handleToggle(linkCode, active) {
    await toggleProjectGuestLink(projectId, linkCode, active)
    toast.success(active ? 'Enlace activado' : 'Enlace desactivado')
    await loadData()
  }

  async function handleCopy(url) {
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Enlace copiado')
    } catch {
      toast.error('No se pudo copiar el enlace')
    }
  }

  const limitReached = linkLimit > 0 && links.length >= linkLimit

  return (
    <div className="flex flex-col gap-4">
      <p className="marketing-muted text-sm">
        {loading
          ? 'Cargando enlaces…'
          : `${links.length}${linkLimit > 0 ? ` / ${linkLimit}` : ''} enlace(s) generado(s)`}
      </p>

      {error ? <p className="panel-form-error">{error}</p> : null}

      <GuestLinkForm onSubmit={handleCreate} disabled={limitReached || loading} />

      {limitReached ? (
        <p className="panel-form-hint">Alcanzaste el límite de enlaces configurado para este proyecto.</p>
      ) : null}

      <div className="panel-table-wrap">
        <table className="panel-table">
          <thead>
            <tr>
              <th>Invitado</th>
              <th>Cupos</th>
              <th>Código</th>
              <th>Estado</th>
              <th aria-label="Acciones" />
            </tr>
          </thead>
          <tbody>
            {links.length === 0 && !loading ? (
              <tr>
                <td colSpan={5} className="panel-table-empty">
                  Aún no hay enlaces. Genera el primero arriba.
                </td>
              </tr>
            ) : null}
            {links.map((link) => {
              const url = buildInvitationLinkUrl(projectId, link.id)
              return (
                <tr key={link.id}>
                  <td>{link.guestLabel}</td>
                  <td>{link.cupos}</td>
                  <td>
                    <code className="text-xs">{link.id}</code>
                  </td>
                  <td>{link.active ? 'Activo' : 'Inactivo'}</td>
                  <td className="panel-table-actions">
                    <button type="button" className="marketing-link text-sm" onClick={() => void handleCopy(url)}>
                      Copiar
                    </button>
                    {link.active ? (
                      <Link to={url} className="marketing-link text-sm" target="_blank" rel="noreferrer">
                        Ver
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      className="marketing-link text-sm"
                      onClick={() => void handleToggle(link.id, !link.active)}
                    >
                      {link.active ? 'Desactivar' : 'Activar'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
