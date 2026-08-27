import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { GuestLinkForm } from './GuestLinkForm.jsx'
import { GuestLinkStatusToggle } from './GuestLinkStatusToggle.jsx'
import {
  createProjectGuestLink,
  listGuestLinks,
  toggleProjectGuestLink,
} from '../services/guestLinkService.js'
import { getProjectById } from '../services/projectService.js'
import { buildInvitationLinkUrl } from '../../invitations/core/utils/invitationUrl.js'
import { copyTextToClipboard } from '../../../shared/utils/copyTextToClipboard.js'

/**
 * @param {number} linksCount
 * @param {number} linkLimit
 * @param {boolean} loading
 */
function formatGuestLinksSummary(linksCount, linkLimit, loading) {
  if (loading) return 'Cargando enlaces…'

  const limitPart = linkLimit > 0 ? ` / ${String(linkLimit)}` : ''
  return `${String(linksCount)}${limitPart} enlace(s) generado(s)`
}

/** @param {string} url */
async function copyGuestLinkUrl(url) {
  const copied = await copyTextToClipboard(url)
  if (copied) {
    toast.success('Enlace copiado')
    return
  }

  toast.error('No se pudo copiar el enlace')
}

/**
 * @param {{ projectId: string }} props
 */
export function GuestLinksPanel({ projectId }) {
  const [links, setLinks] = useState(/** @type {import('../../invitations/core/types/guestLink.js').GuestLinkRecord[]} */ ([]))
  const [linkLimit, setLinkLimit] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [togglingLinkId, setTogglingLinkId] = useState('')

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
    setTogglingLinkId(linkCode)
    try {
      await toggleProjectGuestLink(projectId, linkCode, active)
      toast.success(active ? 'Enlace activado' : 'Enlace desactivado')
      await loadData()
    } finally {
      setTogglingLinkId('')
    }
  }

  const limitReached = linkLimit > 0 && links.length >= linkLimit
  const linksSummary = formatGuestLinksSummary(links.length, linkLimit, loading)

  return (
    <div className="flex flex-col gap-4">
      <p className="marketing-muted text-sm">{linksSummary}</p>

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
              <th className="panel-table-col-desktop">Código</th>
              <th>Estado</th>
              <th aria-label="Acciones" className="panel-table-actions-heading" />
            </tr>
          </thead>
          <tbody>
            {links.length === 0 && !loading ? (
              <tr>
                <td colSpan={4} className="panel-table-empty">
                  Aún no hay enlaces. Genera el primero arriba.
                </td>
              </tr>
            ) : null}
            {links.map((link) => {
              const url = buildInvitationLinkUrl(projectId, link.id)
              return (
                <tr key={link.id}>
                  <td>
                    <p className="font-medium">{link.guestLabel}</p>
                    <p className="marketing-muted text-xs">
                      {link.cupos} cupo{link.cupos === 1 ? '' : 's'}
                    </p>
                  </td>
                  <td className="panel-table-col-desktop">
                    <code className="panel-table-code">{link.id}</code>
                  </td>
                  <td>
                    <GuestLinkStatusToggle
                      active={link.active}
                      disabled={togglingLinkId === link.id || loading}
                      onChange={(active) => void handleToggle(link.id, active)}
                    />
                  </td>
                  <td className="panel-table-actions panel-table-actions--end">
                    <button type="button" className="panel-action-link" onClick={() => void copyGuestLinkUrl(url)}>
                      Copiar
                    </button>
                    {link.active ? (
                      <Link to={url} className="panel-action-link" target="_blank" rel="noreferrer">
                        Ver
                      </Link>
                    ) : null}
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
