import { useEffect, useId } from 'react'

/**
 * @param {{
 *   open: boolean,
 *   title: string,
 *   subtitle?: string,
 *   message: string,
 *   closeLabel?: string,
 *   onClose: () => void,
 * }} props
 */
export function PanelMessageDialog({
  open,
  title,
  subtitle,
  message,
  closeLabel = 'Cerrar',
  onClose,
}) {
  const titleId = useId()
  const bodyId = useId()

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  const trimmed = message.trim()

  return (
    <div className="panel-confirm-root" role="presentation">
      <button type="button" className="panel-confirm-backdrop" aria-label="Cerrar" onClick={onClose} />
      <div
        className="panel-confirm-dialog panel-confirm-dialog--wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={bodyId}
      >
        <h2 id={titleId} className="panel-confirm-title">
          {title}
        </h2>
        {subtitle ? <p className="panel-confirm-description">{subtitle}</p> : null}
        <div id={bodyId} className="panel-message-dialog-body">
          {trimmed ? trimmed : 'Sin mensaje para los novios.'}
        </div>
        <div className="panel-confirm-actions">
          <button type="button" className="panel-confirm-btn panel-confirm-btn--primary" onClick={onClose}>
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
