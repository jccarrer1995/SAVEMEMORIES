import { useEffect, useId } from 'react'
import { GuestLinkForm } from './GuestLinkForm.jsx'

/**
 * @param {{
 *   open: boolean,
 *   disabled?: boolean,
 *   busy?: boolean,
 *   onSubmit: (values: import('../../invitations/core/types/guestLink.js').GuestLinkFormValues) => Promise<void>,
 *   onClose: () => void,
 * }} props
 */
export function GuestLinkCreateModal({ open, disabled = false, busy = false, onSubmit, onClose }) {
  const titleId = useId()

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
        className="panel-confirm-dialog panel-confirm-dialog--wide panel-confirm-dialog--form"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h2 id={titleId} className="panel-confirm-title">
          Nuevo enlace
        </h2>
        <GuestLinkForm
          variant="modal"
          disabled={disabled || busy}
          onSubmit={onSubmit}
          onCancel={onClose}
          onCreated={onClose}
        />
      </div>
    </div>
  )
}
