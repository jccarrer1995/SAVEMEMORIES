import { useEffect, useState } from 'react'
import { downloadRsvpsExcel, listRsvps } from '../../invitations/templates/boda/services/saveRsvp.js'
import { asText } from '../../../shared/utils/asText.js'

/**
 * @param {{ projectId: string, projectTitle: string }} props
 */
export function ClientResponsesPanel({ projectId, projectTitle }) {
  const [rows, setRows] = useState(/** @type {Array<Record<string, unknown>>} */ ([]))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listRsvps(projectId)
      .then(setRows)
      .catch(() => setError('No se pudieron cargar las confirmaciones.'))
      .finally(() => setLoading(false))
  }, [projectId])

  const confirmations = rows.filter((row) => {
    const value = asText(row.confirmacion).toLowerCase()
    return value.includes('sí') || value.includes('si') || value.includes('yes') || value.includes('confirm')
  })

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
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !loading ? (
              <tr>
                <td colSpan={4} className="panel-table-empty">
                  Aún no hay confirmaciones para este evento.
                </td>
              </tr>
            ) : null}
            {rows.map((row, index) => (
              <tr key={asText(row.id, `row-${index}`)}>
                <td>{asText(row.grupoInvitados, '—')}</td>
                <td>{asText(row.confirmacion, '—')}</td>
                <td>{asText(row.nombres, '—')}</td>
                <td>{asText(row.telefono, '—')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
