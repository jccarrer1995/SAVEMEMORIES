import { useState } from 'react'
import { toast } from 'sonner'

/**
 * @param {{
 *   onSubmit: (values: import('../../invitations/core/types/guestLink.js').GuestLinkFormValues) => Promise<void>,
 *   disabled?: boolean,
 * }} props
 */
export function GuestLinkForm({ onSubmit, disabled = false }) {
  const [guestLabel, setGuestLabel] = useState('')
  const [cupos, setCupos] = useState(2)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSaving(true)
    try {
      await onSubmit({ guestLabel, cupos })
      setGuestLabel('')
      setCupos(2)
      toast.success('Enlace creado')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo crear el enlace.'
      setError(message)
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="panel-form-section" onSubmit={(event) => void handleSubmit(event)}>
      <h2 className="panel-form-heading">Nuevo enlace</h2>
      {error ? <p className="panel-form-error">{error}</p> : null}
      <div className="panel-form-grid">
        <label className="panel-field">
          <span>Invitado o grupo</span>
          <input
            type="text"
            value={guestLabel}
            onChange={(event) => setGuestLabel(event.target.value)}
            placeholder="Fam. Pérez"
            disabled={disabled || saving}
          />
        </label>
        <label className="panel-field">
          <span>Cupos</span>
          <input
            type="number"
            min={1}
            value={cupos}
            onChange={(event) => setCupos(Number(event.target.value))}
            disabled={disabled || saving}
          />
        </label>
      </div>
      <div className="panel-form-actions">
        <button
          type="submit"
          disabled={disabled || saving}
          className="panel-btn-primary rounded-full px-5 py-2 text-sm font-medium"
        >
          {saving ? 'Generando…' : 'Generar enlace'}
        </button>
      </div>
    </form>
  )
}
