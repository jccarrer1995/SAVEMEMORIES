import { useState } from 'react'
import { toast } from 'sonner'
import {
  GUEST_LINK_ETIQUETA_GRUPO_OPTIONS,
  GUEST_LINK_ETIQUETA_LADO_OPTIONS,
} from '../../invitations/core/constants/guestLinkTags.js'
import { GuestLinkTagSelect } from './GuestLinkTagSelect.jsx'

/**
 * @param {{
 *   onSubmit: (values: import('../../invitations/core/types/guestLink.js').GuestLinkFormValues) => Promise<void>,
 *   disabled?: boolean,
 *   variant?: 'page' | 'modal',
 *   onCancel?: () => void,
 *   onCreated?: () => void,
 * }} props
 */
export function GuestLinkForm({
  onSubmit,
  disabled = false,
  variant = 'page',
  onCancel,
  onCreated,
}) {
  const [guestLabel, setGuestLabel] = useState('')
  const [cupos, setCupos] = useState(2)
  const [mesa, setMesa] = useState('')
  const [etiquetaLado, setEtiquetaLado] = useState('')
  const [etiquetaGrupo, setEtiquetaGrupo] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSaving(true)
    try {
      await onSubmit({ guestLabel, cupos, mesa, etiquetaLado, etiquetaGrupo })
      setGuestLabel('')
      setCupos(2)
      setMesa('')
      setEtiquetaLado('')
      setEtiquetaGrupo('')
      toast.success('Enlace creado')
      onCreated?.()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo crear el enlace.'
      setError(message)
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  const fieldDisabled = disabled || saving
  const inModal = variant === 'modal'

  return (
    <form
      className={inModal ? 'panel-form-modal' : 'panel-form-section'}
      onSubmit={(event) => void handleSubmit(event)}
    >
      {!inModal ? <h2 className="panel-form-heading">Nuevo enlace</h2> : null}
      {error ? <p className="panel-form-error">{error}</p> : null}
      <div className="panel-form-grid">
        <label className="panel-field">
          <span>Invitado o grupo</span>
          <input
            type="text"
            value={guestLabel}
            onChange={(event) => setGuestLabel(event.target.value)}
            placeholder="Fam. Pérez"
            disabled={fieldDisabled}
          />
        </label>
        <label className="panel-field">
          <span>Cupos</span>
          <input
            type="number"
            min={1}
            value={cupos}
            onChange={(event) => setCupos(Number(event.target.value))}
            disabled={fieldDisabled}
          />
        </label>
        <label className="panel-field panel-field--wide">
          <span>Mesa asignada (opcional)</span>
          <input
            type="text"
            value={mesa}
            onChange={(event) => setMesa(event.target.value)}
            placeholder="Ej. Mesa N.° 12"
            disabled={fieldDisabled}
          />
        </label>

        <GuestLinkTagSelect
          legend="Lado"
          options={GUEST_LINK_ETIQUETA_LADO_OPTIONS}
          value={etiquetaLado}
          disabled={fieldDisabled}
          onChange={setEtiquetaLado}
        />

        <GuestLinkTagSelect
          legend="Relación"
          options={GUEST_LINK_ETIQUETA_GRUPO_OPTIONS}
          value={etiquetaGrupo}
          disabled={fieldDisabled}
          onChange={setEtiquetaGrupo}
        />
      </div>
      <div className={`panel-form-actions${inModal ? ' panel-form-actions--modal' : ''}`}>
        {onCancel ? (
          <button
            type="button"
            className="panel-confirm-btn panel-confirm-btn--ghost"
            disabled={fieldDisabled}
            onClick={onCancel}
          >
            Cancelar
          </button>
        ) : null}
        <button
          type="submit"
          disabled={fieldDisabled}
          className="panel-btn-primary rounded-full px-5 py-2 text-sm font-medium"
        >
          {saving ? 'Generando…' : 'Generar enlace'}
        </button>
      </div>
    </form>
  )
}
