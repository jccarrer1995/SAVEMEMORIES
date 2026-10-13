/**
 * @param {Record<string, unknown>} a
 * @param {Record<string, unknown>} b
 * @param {(data: Record<string, unknown>) => string} createdAtIso
 */
function isRowNewer(a, b, createdAtIso) {
  const ta = Date.parse(createdAtIso(a)) || 0
  const tb = Date.parse(createdAtIso(b)) || 0
  return ta >= tb
}

/**
 * @param {Array<Record<string, unknown>>} rows
 * @param {(data: Record<string, unknown>) => string} createdAtIso
 */
export function sumLatestRespondedCupos(rows, createdAtIso) {
  /** @type {Map<string, Record<string, unknown>>} */
  const latestByKey = new Map()

  for (const row of rows) {
    const linkCode = typeof row.linkCode === 'string' ? row.linkCode.trim() : ''
    const group = typeof row.grupoInvitados === 'string' ? row.grupoInvitados.trim() : ''
    const key = linkCode || (group ? `g:${group}` : '')
    if (!key) continue

    const prev = latestByKey.get(key)
    if (!prev || isRowNewer(row, prev, createdAtIso)) {
      latestByKey.set(key, row)
    }
  }

  let total = 0
  for (const row of latestByKey.values()) {
    const cupos = Number(row.cupos)
    if (Number.isFinite(cupos) && cupos > 0) total += cupos
  }
  return total
}

/**
 * @param {{
 *   invitedPeople: number,
 *   respondedPeople: number,
 *   loading?: boolean,
 * }} props
 */
export function ClientRsvpProgressBar({ invitedPeople, respondedPeople, loading = false }) {
  if (loading) {
    return (
      <div className="panel-rsvp-progress" aria-busy="true">
        <p className="panel-rsvp-progress-label marketing-muted text-sm">Calculando respuestas…</p>
      </div>
    )
  }

  if (invitedPeople <= 0) {
    return (
      <div className="panel-rsvp-progress">
        <p className="panel-rsvp-progress-label marketing-muted text-sm">
          Aún no hay cupos en enlaces. Genera invitados para ver el avance de confirmaciones.
        </p>
      </div>
    )
  }

  const clampedResponded = Math.min(Math.max(respondedPeople, 0), invitedPeople)
  const percent = Math.round((clampedResponded / invitedPeople) * 100)
  const nounInvited = invitedPeople === 1 ? 'persona invitada' : 'personas invitadas'
  const nounResponded = respondedPeople === 1 ? 'persona respondió' : 'personas respondieron'

  return (
    <div className="panel-rsvp-progress">
      <div className="panel-rsvp-progress-header">
        <p className="panel-rsvp-progress-title">Avance de respuestas</p>
        <p className="panel-rsvp-progress-stats">
          <strong>{respondedPeople}</strong> {nounResponded} · <strong>{invitedPeople}</strong> {nounInvited}
        </p>
      </div>
      <div
        className="panel-rsvp-progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={invitedPeople}
        aria-valuenow={clampedResponded}
        aria-label={`${respondedPeople} de ${invitedPeople} personas respondieron`}
      >
        <div className="panel-rsvp-progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="panel-rsvp-progress-foot">{percent}% del total de cupos con respuesta</p>
    </div>
  )
}
