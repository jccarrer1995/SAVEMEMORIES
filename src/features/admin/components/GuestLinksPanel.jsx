import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { GuestLinkForm } from './GuestLinkForm.jsx'
import { GuestLinkStatusToggle } from './GuestLinkStatusToggle.jsx'
import {
  createProjectGuestLink,
  deleteProjectGuestLink,
  listGuestLinks,
  toggleProjectGuestLink,
  updateProjectGuestLinkMesa,
} from '../services/guestLinkService.js'
import { getProjectById } from '../services/projectService.js'
import { buildInvitationLinkUrl } from '../../invitations/core/utils/invitationUrl.js'
import { PanelActionsMenu } from '../../../shared/components/PanelActionsMenu.jsx'
import { PanelTextDialog } from '../../../shared/components/PanelTextDialog.jsx'
import { PanelTablePagination } from '../../../shared/components/PanelTablePagination.jsx'
import { usePanelTablePagination } from '../../../shared/hooks/usePanelTablePagination.js'
import { copyTextToClipboard } from '../../../shared/utils/copyTextToClipboard.js'
import { listRsvps } from '../../invitations/templates/boda/services/saveRsvp.js'
import { GuestLinkConfirmPill } from './GuestLinkConfirmPill.jsx'
import {
  buildGuestLinkConfirmationIndex,
  isGuestLinkConfirmed,
  sortGuestLinks,
} from '../utils/guestLinkTableHelpers.js'

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
  const [deletingLinkId, setDeletingLinkId] = useState('')
  const [mesaEditLink, setMesaEditLink] = useState(
    /** @type {import('../../invitations/core/types/guestLink.js').GuestLinkRecord | null} */ (null),
  )
  const [savingMesa, setSavingMesa] = useState(false)
  const [rsvpRows, setRsvpRows] = useState(/** @type {Array<Record<string, unknown>>} */ ([]))
  const [sortMode, setSortMode] = useState(
    /** @type {import('../utils/guestLinkTableHelpers.js').GuestLinkSortMode} */ ('confirmado'),
  )

  const loadData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [project, projectLinks, rsvps] = await Promise.all([
        getProjectById(projectId),
        listGuestLinks(projectId),
        listRsvps(projectId),
      ])
      if (!project) {
        setError('Proyecto no encontrado.')
        return
      }
      setLinkLimit(project.linkLimit)
      setLinks(projectLinks)
      setRsvpRows(rsvps)
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

  async function handleDelete(linkCode, guestLabel) {
    const confirmed = window.confirm(
      `¿Eliminar a "${guestLabel}"?\n\nSu enlace dejará de funcionar y podrás generar otro en su lugar.`,
    )
    if (!confirmed) return

    setDeletingLinkId(linkCode)
    try {
      await deleteProjectGuestLink(projectId, linkCode)
      toast.success('Invitado eliminado')
      await loadData()
    } catch (err) {
      const isPermission =
        err && typeof err === 'object' && 'code' in err && err.code === 'permission-denied'
      toast.error(
        isPermission
          ? 'Sin permiso para eliminar invitados. Publica las reglas de Firestore actualizadas.'
          : err instanceof Error
            ? err.message
            : 'No se pudo eliminar el invitado.',
      )
    } finally {
      setDeletingLinkId('')
    }
  }

  async function handleSaveMesa(value) {
    if (!mesaEditLink) return

    setSavingMesa(true)
    try {
      await updateProjectGuestLinkMesa(projectId, mesaEditLink.id, value)
      toast.success('Mesa actualizada')
      setMesaEditLink(null)
      await loadData()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo guardar la mesa.')
    } finally {
      setSavingMesa(false)
    }
  }

  const limitReached = linkLimit > 0 && links.length >= linkLimit
  const linksSummary = formatGuestLinksSummary(links.length, linkLimit, loading)

  const confirmationIndex = useMemo(
    () => buildGuestLinkConfirmationIndex(rsvpRows),
    [rsvpRows],
  )

  const sortedLinks = useMemo(
    () => sortGuestLinks(links, sortMode, confirmationIndex),
    [links, sortMode, confirmationIndex],
  )

  const pagination = usePanelTablePagination(sortedLinks)

  return (
    <div className="flex flex-col gap-4">
      <p className="marketing-muted text-sm">{linksSummary}</p>

      {error ? <p className="panel-form-error">{error}</p> : null}

      <GuestLinkForm onSubmit={handleCreate} disabled={limitReached || loading} />

      {limitReached ? (
        <p className="panel-form-hint">Alcanzaste el límite de enlaces configurado para este proyecto.</p>
      ) : null}

      <div className="panel-table-sort">
        <span className="panel-table-sort-label">Ordenar:</span>
        <select
          className="panel-table-sort-select"
          value={sortMode}
          disabled={loading || links.length === 0}
          onChange={(event) =>
            setSortMode(
              /** @type {import('../utils/guestLinkTableHelpers.js').GuestLinkSortMode} */ (
                event.target.value
              ),
            )
          }
        >
          <option value="mesa-asc">De mesa menor a mayor</option>
          <option value="mesa-desc">De mesa mayor a menor</option>
          <option value="confirmado">Confirmado → por confirmar</option>
          <option value="por-confirmar">Por confirmar → confirmado</option>
        </select>
      </div>

      <div className="panel-table-wrap">
        <table className="panel-table">
          <thead>
            <tr>
              <th>Invitado</th>
              <th className="panel-table-col-desktop">Código</th>
              <th>Estado</th>
              <th>Mesa</th>
              <th>Confirmado</th>
              <th className="panel-table-actions-heading panel-table-actions-heading--center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {links.length === 0 && !loading ? (
              <tr>
                <td colSpan={6} className="panel-table-empty">
                  Aún no hay enlaces. Genera el primero arriba.
                </td>
              </tr>
            ) : null}
            {pagination.pageItems.map((link) => {
              const url = buildInvitationLinkUrl(projectId, link.id)
              const confirmed = isGuestLinkConfirmed(link, confirmationIndex)
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
                  <td>{link.mesa || '—'}</td>
                  <td>
                    <GuestLinkConfirmPill confirmed={confirmed} />
                  </td>
                  <td className="panel-table-actions panel-table-actions--center">
                    <PanelActionsMenu
                      items={[
                        {
                          id: 'copy',
                          label: 'Copiar enlace',
                          onClick: () => void copyGuestLinkUrl(url),
                        },
                        {
                          id: 'mesa',
                          label: 'Editar mesa',
                          onClick: () => setMesaEditLink(link),
                        },
                        ...(link.active
                          ? [
                              {
                                id: 'view',
                                label: 'Ver invitación',
                                href: url,
                                external: true,
                              },
                            ]
                          : []),
                        {
                          id: 'delete',
                          label: deletingLinkId === link.id ? 'Eliminando…' : 'Eliminar invitado',
                          destructive: true,
                          disabled: deletingLinkId === link.id || loading,
                          onClick: () => void handleDelete(link.id, link.guestLabel),
                        },
                      ]}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <PanelTablePagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        from={pagination.from}
        to={pagination.to}
        total={pagination.total}
        disabled={loading || Boolean(togglingLinkId) || Boolean(deletingLinkId)}
        onPageChange={pagination.setPage}
      />

      <PanelTextDialog
        open={Boolean(mesaEditLink)}
        title="Mesa asignada"
        description={
          mesaEditLink
            ? `Invitado: ${mesaEditLink.guestLabel}. Deja vacío si aún no tiene mesa.`
            : undefined
        }
        label="Mesa (opcional)"
        initialValue={mesaEditLink?.mesa ?? ''}
        placeholder="Ej. Mesa N.° 12"
        busy={savingMesa}
        onCancel={() => {
          if (!savingMesa) setMesaEditLink(null)
        }}
        onConfirm={(value) => void handleSaveMesa(value)}
      />
    </div>
  )
}
