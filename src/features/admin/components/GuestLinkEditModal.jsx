import { useEffect, useId, useState } from 'react'

/**
 * @param {{
 *   open: boolean,
 *   initialGuestLabel: string,
 *   initialCupos: number,
 *   busy?: boolean,
 *   onConfirm: (values: { guestLabel: string, cupos: number }) => void,
 *   onClose: () => void,
 * }} props
 */
export function GuestLinkEditModal({
  open,
  initialGuestLabel,
  initialCupos,
  busy = false,
  onConfirm,
  onClose,
}) {
  const titleId = useId()
  const [guestLabel, setGuestLabel] = useState(initialGuestLabel)
  const [cupos, setCupos] = useState(initialCupos)

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event) {
      if (event.key === 'Escape' && !busy) onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, busy, onClose])

  if (!open) return null

  const validCupos = Number.isInteger(Number(cupos)) && Number(cupos) >= 1

  return (
    <div className="panel-confirm-root" role="presentation">
      <button
        type="button"
        className="panel-confirm-backdrop"
        aria-label="Cerrar"
        disabled={busy}
        onClick={onClose}
      />
      <div
        className="panel-confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h2 id={titleId} className="panel-confirm-title">
          Editar invitado
        </h2>
        <label className="panel-field mt-4 block">
          <span>Invitado o grupo</span>
          <input
            type="text"
            value={guestLabel}
            disabled={busy}
            onChange={(event) => setGuestLabel(event.target.value)}
          />
        </label>
        <label className="panel-field mt-4 block">
          <span>Cupos</span>
          <input
            type="number"
            min={1}
            step={1}
            value={cupos}
            disabled={busy}
            onChange={(event) => setCupos(event.target.value)}
          />
        </label>
        <div className="panel-confirm-actions">
          <button
            type="button"
            className="panel-confirm-btn panel-confirm-btn--ghost"
            disabled={busy}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="panel-confirm-btn panel-confirm-btn--primary"
            disabled={busy || !guestLabel.trim() || !validCupos}
            onClick={() => onConfirm({ guestLabel: guestLabel.trim(), cupos: Number(cupos) })}
          >
            {busy ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}