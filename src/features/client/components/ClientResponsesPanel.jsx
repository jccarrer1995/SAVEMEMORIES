import { useCallback, useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  deleteRsvp,
  downloadRsvpsExcel,
  listRsvps,
} from '../../invitations/templates/boda/services/saveRsvp.js'
import { listGuestLinks } from '../services/clientProjectService.js'
import { PanelConfirmDialog } from '../../../shared/components/PanelConfirmDialog.jsx'
import { PanelTablePagination } from '../../../shared/components/PanelTablePagination.jsx'
import { usePanelTablePagination } from '../../../shared/hooks/usePanelTablePagination.js'
import { asText } from '../../../shared/utils/asText.js'

/**
 * @param {{ projectId: string, projectTitle: string }} props
 */
export function ClientResponsesPanel({ projectId, projectTitle }) {
  const [rows, setRows] = useState(/** @type {Array<Record<string, unknown>>} */ ([]))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pendingDelete, setPendingDelete] = useState(
    /** @type {Record<string, unknown> | null} */ (null),
  )
  const [deleting, setDeleting] = useState(false)
  const [mesaByLinkCode, setMesaByLinkCode] = useState(/** @type {Record<string, string>} */ ({}))

  const loadRows = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [data, links] = await Promise.all([listRsvps(projectId), listGuestLinks(projectId)])
      const mesaMap = /** @type {Record<string, string>} */ ({})
      for (const link of links) {
        if (link.mesa) mesaMap[link.id] = link.mesa
      }
      setMesaByLinkCode(mesaMap)
      setRows(data)
    } catch {
      setError('No se pudieron cargar las confirmaciones.')
    } finally {
      setLoading(false)
    }
  }, [projectId])

  function resolveRowMesa(row) {
    const stored = asText(row.mesaAsignada)
    if (stored) return stored
    const linkCode = asText(row.linkCode)
    if (linkCode && mesaByLinkCode[linkCode]) return mesaByLinkCode[linkCode]
    return '—'
  }

  useEffect(() => {
    void loadRows()
  }, [loadRows])

  const confirmations = rows.filter((row) => {
    const value = asText(row.confirmacion).toLowerCase()
    return value.includes('sí') || value.includes('si') || value.includes('yes') || value.includes('confirm')
  })

  const pagination = usePanelTablePagination(rows)

  async function handleConfirmDelete() {
    if (!pendingDelete) return

    setDeleting(true)
    try {
      await deleteRsvp(projectId, pendingDelete)
      toast.success('Registro eliminado')
      setPendingDelete(null)
      await loadRows()
    } catch (err) {
      const isPermission =
        err && typeof err === 'object' && 'code' in err && err.code === 'permission-denied'
      toast.error(
        isPermission
          ? 'Sin permiso para eliminar. Inicia sesión como dueño del proyecto y publica las reglas (npm run deploy:rules). Si el registro es antiguo, intenta de nuevo tras actualizar reglas.'
          : err instanceof Error
            ? err.message
            : 'No se pudo eliminar el registro.',
      )
    } finally {
      setDeleting(false)
    }
  }

  const pendingLabel = pendingDelete
    ? `${asText(pendingDelete.grupoInvitados, 'Invitados')} · ${asText(pendingDelete.nombres, '—')}`
    : ''

  return (
    <div className="flex flex-col gap-4">
      <div className="panel-toolbar">
        <p className="marketing-muted text-sm">
          {loading ? 'Cargando…' : `${rows.length} respuesta(s) · ${confirmations.length} confirmación(es)`}
        </p>
        <button
          type="button"
          disabled={loading}
          onClick={() => void downloadRsvpsExcel(projectId, projectTitle, rows)}
          className="panel-btn-primary rounded-full px-4 py-2 text-sm font-medium"
        >
          Descargar Excel
        </button>
      </div>

      {error ? <p className="panel-form-error">{error}</p> : null}

      <div className="panel-table-wrap">
        <table className="panel-table">
          <thead>
            <tr>
              <th>Grupo</th>
              <th>Confirmación</th>
              <th>Asistentes</th>
              <th>Teléfono</th>
              <th>Mesa</th>
              <th className="panel-table-actions-heading panel-table-actions-heading--center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !loading ? (
              <tr>
                <td colSpan={6} className="panel-table-empty">
                  Aún no hay confirmaciones para este evento.
                </td>
              </tr>
            ) : null}
            {pagination.pageItems.map((row, index) => {
              const rowKey = asText(row.id, `row-${pagination.page}-${index}`)
              return (
                <tr key={rowKey}>
                  <td>{asText(row.grupoInvitados, '—')}</td>
                  <td>{asText(row.confirmacion, '—')}</td>
                  <td>{asText(row.nombres, '—')}</td>
                  <td>{asText(row.telefono, '—')}</td>
                  <td>{resolveRowMesa(row)}</td>
                  <td className="panel-table-actions panel-table-actions--center">
                    <button
                      type="button"
                      className="panel-icon-btn panel-icon-btn--danger"
                      disabled={loading || deleting}
                      aria-label="Eliminar confirmación"
                      title="Eliminar"
                      onClick={() => setPendingDelete(row)}
                    >
                      <Trash2 size={17} strokeWidth={1.75} aria-hidden="true" />
                    </button>
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
        disabled={loading || deleting}
        onPageChange={pagination.setPage}
      />

      <PanelConfirmDialog
        open={Boolean(pendingDelete)}
        title="¿Eliminar esta confirmación?"
        description={`Se borrará el registro de ${pendingLabel}. El invitado volverá a ver el formulario de confirmación en su enlace. Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        destructive
        busy={deleting}
        onCancel={() => {
          if (!deleting) setPendingDelete(null)
        }}
        onConfirm={() => void handleConfirmDelete()}
      />
    </div>
  )
}
