import { useEffect, useId } from 'react'

/**
 * @param {{
 *   open: boolean,
 *   title: string,
 *   description: string,
 *   confirmLabel?: string,
 *   cancelLabel?: string,
 *   busy?: boolean,
 *   destructive?: boolean,
 *   onConfirm: () => void,
 *   onCancel: () => void,
 * }} props
 */
export function PanelConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  busy = false,
  destructive = false,
  onConfirm,
  onCancel,
}) {
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event) {
      if (event.key === 'Escape' && !busy) onCancel()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, busy, onCancel])

  if (!open) return null

  return (
    <div className="panel-confirm-root" role="presentation">
      <button
        type="button"
        className="panel-confirm-backdrop"
        aria-label="Cerrar"
        disabled={busy}
        onClick={onCancel}
      />
      <div
        className="panel-confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <h2 id={titleId} className="panel-confirm-title">
          {title}
        </h2>
        <p id={descriptionId} className="panel-confirm-description">
          {description}
        </p>
        <div className="panel-confirm-actions">
          <button
            type="button"
            className="panel-confirm-btn panel-confirm-btn--ghost"
            disabled={busy}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={
              destructive
                ? 'panel-confirm-btn panel-confirm-btn--danger'
                : 'panel-confirm-btn panel-confirm-btn--primary'
            }
            disabled={busy}
            onClick={onConfirm}
          >
            {busy ? 'Procesando…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
