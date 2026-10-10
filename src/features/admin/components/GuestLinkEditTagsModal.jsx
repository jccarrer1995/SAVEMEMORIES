import { useEffect, useId, useState } from 'react'
import {
  GUEST_LINK_ETIQUETA_GRUPO_OPTIONS,
  GUEST_LINK_ETIQUETA_LADO_OPTIONS,
  normalizeEtiquetaGrupo,
  normalizeEtiquetaLado,
} from '../../invitations/core/constants/guestLinkTags.js'
import { GuestLinkTagSelect } from './GuestLinkTagSelect.jsx'

/**
 * @param {{
 *   open: boolean,
 *   guestLabel?: string,
 *   initialMesa?: string,
 *   initialEtiquetaLado?: string,
 *   initialEtiquetaGrupo?: string,
 *   busy?: boolean,
 *   onConfirm: (values: import('../../invitations/core/types/guestLink.js').GuestLinkMetaValues) => void,
 *   onClose: () => void,
 * }} props
 */
export function GuestLinkEditTagsModal({
  open,
  guestLabel,
  initialMesa = '',
  initialEtiquetaLado = '',
  initialEtiquetaGrupo = '',
  busy = false,
  onConfirm,
  onClose,
}) {
  const titleId = useId()
  const [mesa, setMesa] = useState(initialMesa)
  const [etiquetaLado, setEtiquetaLado] = useState('')
  const [etiquetaGrupo, setEtiquetaGrupo] = useState('')

  useEffect(() => {
    if (!open) return
    setMesa(initialMesa)
    setEtiquetaLado(normalizeEtiquetaLado(initialEtiquetaLado))
    setEtiquetaGrupo(normalizeEtiquetaGrupo(initialEtiquetaGrupo))
  }, [open, initialMesa, initialEtiquetaLado, initialEtiquetaGrupo])

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
          Editar mesa y etiquetas
        </h2>
        {guestLabel ? (
          <p className="panel-confirm-description">Invitado: {guestLabel}</p>
        ) : null}

        <div className="panel-form-modal">
          <div className="panel-form-grid">
            <label className="panel-field panel-field--wide">
              <span>Mesa asignada (opcional)</span>
              <input
                type="text"
                value={mesa}
                placeholder="Ej. Mesa N.° 12"
                disabled={busy}
                onChange={(event) => setMesa(event.target.value)}
              />
            </label>

            <GuestLinkTagSelect
              legend="Lado"
              options={GUEST_LINK_ETIQUETA_LADO_OPTIONS}
              value={etiquetaLado}
              disabled={busy}
              onChange={setEtiquetaLado}
            />

            <GuestLinkTagSelect
              legend="Relación"
              options={GUEST_LINK_ETIQUETA_GRUPO_OPTIONS}
              value={etiquetaGrupo}
              disabled={busy}
              onChange={setEtiquetaGrupo}
            />
          </div>

          <p className="panel-form-hint mt-3">
            Pulsa de nuevo una etiqueta seleccionada para quitarla.
          </p>

          <div className="panel-form-actions panel-form-actions--modal">
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
              disabled={busy}
              onClick={() =>
                onConfirm({
                  mesa,
                  etiquetaLado,
                  etiquetaGrupo,
                })
              }
            >
              {busy ? 'Guardando…' : 'Guardar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
