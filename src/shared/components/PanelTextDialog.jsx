import { useEffect, useId, useState } from 'react'

/**
 * @param {{
 *   open: boolean,
 *   title: string,
 *   description?: string,
 *   label: string,
 *   initialValue?: string,
 *   placeholder?: string,
 *   confirmLabel?: string,
 *   cancelLabel?: string,
 *   busy?: boolean,
 *   onConfirm: (value: string) => void,
 *   onCancel: () => void,
 * }} props
 */
export function PanelTextDialog({
  open,
  title,
  description,
  label,
  initialValue = '',
  placeholder = '',
  confirmLabel = 'Guardar',
  cancelLabel = 'Cancelar',
  busy = false,
  onConfirm,
  onCancel,
}) {
  const titleId = useId()
  const descriptionId = useId()
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (open) setValue(initialValue)
  }, [open, initialValue])

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
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
      >
        <h2 id={titleId} className="panel-confirm-title">
          {title}
        </h2>
        {description ? (
          <p id={descriptionId} className="panel-confirm-description">
            {description}
          </p>
        ) : null}
        <label className="panel-field mt-4 block">
          <span>{label}</span>
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            disabled={busy}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>
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
            className="panel-confirm-btn panel-confirm-btn--primary"
            disabled={busy}
            onClick={() => onConfirm(value)}
          >
            {busy ? 'Guardando…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
