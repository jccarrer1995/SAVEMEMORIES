import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { GuestLinkCreateModal } from './GuestLinkCreateModal.jsx'
import { GuestLinkStatusToggle } from './GuestLinkStatusToggle.jsx'
import {
  createProjectGuestLink,
  deleteProjectGuestLink,
  listGuestLinks,
  toggleProjectGuestLink,
  updateProjectGuestLinkMeta,
} from '../services/guestLinkService.js'
import { getProjectById } from '../services/projectService.js'
import { buildInvitationLinkUrl } from '../../invitations/core/utils/invitationUrl.js'
import { getProjectSmsTemplate, renderSmsTemplate } from '../../invitations/core/utils/smsTemplate.js'
import { PanelActionsMenu } from '../../../shared/components/PanelActionsMenu.jsx'
import { GuestLinkEditTagsModal } from './GuestLinkEditTagsModal.jsx'
import { GuestLinkEtiquetasPills } from './GuestLinkEtiquetasPills.jsx'
import { PanelTablePagination } from '../../../shared/components/PanelTablePagination.jsx'
import { usePanelTablePagination } from '../../../shared/hooks/usePanelTablePagination.js'
import { copyTextToClipboard } from '../../../shared/utils/copyTextToClipboard.js'
import { listRsvps } from '../../invitations/templates/boda/services/saveRsvp.js'
import { GuestLinkConfirmPill } from './GuestLinkConfirmPill.jsx'
import {
  buildGuestLinkConfirmationIndex,
  getGuestLinkRsvpStatus,
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

/** @param {string} message */
async function copyGuestSmsMessage(message) {
  const copied = await copyTextToClipboard(message)
  if (copied) {
    toast.success('Mensaje SMS copiado')
    return
  }

  toast.error('No se pudo copiar el mensaje')
}

/**
 * @param {{ projectId: string, mesaSimulationHref?: string }} props
 */
export function GuestLinksPanel({ projectId, mesaSimulationHref }) {
  const [links, setLinks] = useState(/** @type {import('../../invitations/core/types/guestLink.js').GuestLinkRecord[]} */ ([]))
  const [linkLimit, setLinkLimit] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [togglingLinkId, setTogglingLinkId] = useState('')
  const [deletingLinkId, setDeletingLinkId] = useState('')
  const [tagsEditLink, setTagsEditLink] = useState(
    /** @type {import('../../invitations/core/types/guestLink.js').GuestLinkRecord | null} */ (null),
  )
  const [savingTags, setSavingTags] = useState(false)
  const [rsvpRows, setRsvpRows] = useState(/** @type {Array<Record<string, unknown>>} */ ([]))
  const [sortMode, setSortMode] = useState(
    /** @type {import('../utils/guestLinkTableHelpers.js').GuestLinkSortMode} */ ('confirmado'),
  )
  const [smsTemplate, setSmsTemplate] = useState('')
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [creatingLink, setCreatingLink] = useState(false)

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
      setSmsTemplate(getProjectSmsTemplate(project))
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
    setCreatingLink(true)
    try {
      await createProjectGuestLink(projectId, values)
      await loadData()
    } finally {
      setCreatingLink(false)
    }
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

  async function handleSaveTags(values) {
    if (!tagsEditLink) return

    setSavingTags(true)
    try {
      await updateProjectGuestLinkMeta(projectId, tagsEditLink.id, values)
      toast.success('Mesa y etiquetas actualizadas')
      setTagsEditLink(null)
      await loadData()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudieron guardar las etiquetas.')
    } finally {
      setSavingTags(false)
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

      <div className="panel-table-toolbar">
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
        <div className="panel-table-toolbar-actions">
          {mesaSimulationHref ? (
            <Link to={mesaSimulationHref} className="panel-btn-secondary rounded-full px-4 py-2 text-sm font-medium">
              Simular mesas
            </Link>
          ) : null}
          <button
            type="button"
            className="panel-btn-primary rounded-full px-4 py-2 text-sm font-medium"
            disabled={limitReached || loading || creatingLink}
            onClick={() => setCreateModalOpen(true)}
          >
            + Nuevo enlace
          </button>
        </div>
      </div>

      {limitReached ? (
        <p className="panel-form-hint">Alcanzaste el límite de enlaces configurado para este proyecto.</p>
      ) : null}

      <div className="panel-table-wrap">
        <table className="panel-table">
          <thead>
            <tr>
              <th>Invitado</th>
              <th className="panel-table-col-desktop">Código</th>
              <th>Etiquetas</th>
              <th>Mesa</th>
              <th>Estado</th>
              <th>Confirmado</th>
              <th className="panel-table-actions-heading panel-table-actions-heading--center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {links.length === 0 && !loading ? (
              <tr>
                <td colSpan={7} className="panel-table-empty">
                  Aún no hay enlaces. Genera el primero arriba.
                </td>
              </tr>
            ) : null}
            {pagination.pageItems.map((link) => {
              const url = buildInvitationLinkUrl(projectId, link.id)
              const rsvpStatus = getGuestLinkRsvpStatus(link, confirmationIndex)
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
                    <GuestLinkEtiquetasPills link={link} />
                  </td>
                  <td>{link.mesa || '—'}</td>
                  <td>
                    <GuestLinkStatusToggle
                      active={link.active}
                      disabled={togglingLinkId === link.id || loading}
                      onChange={(active) => void handleToggle(link.id, active)}
                    />
                  </td>
                  <td>
                    <GuestLinkConfirmPill status={rsvpStatus} />
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
                          id: 'copy-sms',
                          label: 'Copiar mensaje SMS',
                          onClick: () =>
                            void copyGuestSmsMessage(
                              renderSmsTemplate(smsTemplate, {
                                linkUrl: url,
                                guestLabel: link.guestLabel,
                              }),
                            ),
                        },
                        {
                          id: 'tags',
                          label: 'Editar mesa y etiquetas',
                          onClick: () => setTagsEditLink(link),
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

      <GuestLinkCreateModal
        open={createModalOpen}
        disabled={limitReached || loading}
        busy={creatingLink}
        onClose={() => {
          if (!creatingLink) setCreateModalOpen(false)
        }}
        onSubmit={handleCreate}
      />

      <GuestLinkEditTagsModal
        open={Boolean(tagsEditLink)}
        guestLabel={tagsEditLink?.guestLabel}
        initialMesa={tagsEditLink?.mesa ?? ''}
        initialEtiquetaLado={tagsEditLink?.etiquetaLado ?? ''}
        initialEtiquetaGrupo={tagsEditLink?.etiquetaGrupo ?? ''}
        busy={savingTags}
        onClose={() => {
          if (!savingTags) setTagsEditLink(null)
        }}
        onConfirm={(values) => void handleSaveTags(values)}
      />
    </div>
  )
}
