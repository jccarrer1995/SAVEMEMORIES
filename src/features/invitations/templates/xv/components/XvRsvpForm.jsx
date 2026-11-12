import { useState } from 'react'
import { toast } from 'sonner'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { saveRsvp } from '../../boda/services/saveRsvp.js'
import { isAttendanceConfirmed } from '../../boda/utils/rsvpConfirmation.js'

/**
 * Mismas opciones que la boda para que el panel interprete las respuestas igual.
 * @param {number} cupos
 */
function confirmationOptions(cupos) {
  if (cupos === 1) return ['Confirmo mi asistencia', 'No podré asistir']
  if (cupos === 2) return ['Asistiremos los 2', 'Solo irá 1', 'No podremos asistir']
  return ['Asistiremos todos', 'Solo iremos 2', 'Solo irá 1', 'No podremos asistir']
}

/**
 * @param {{
 *   grupoInvitados: string,
 *   cupos: number,
 *   linkCode?: string,
 *   mesaAsignada?: string,
 *   onConfirmed: (data: { confirmacion: string, nombres: string }) => void,
 * }} props
 */
export function XvRsvpForm({ grupoInvitados, cupos, linkCode, mesaAsignada, onConfirmed }) {
  const project = useInvitationProject()
  const [confirmacion, setConfirmacion] = useState('')
  const [nombres, setNombres] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!confirmacion || !nombres.trim() || !telefono.trim()) {
      setError('Elige una opción y completa tu nombre y teléfono.')
      return
    }

    setSubmitting(true)
    try {
      await saveRsvp(project.id, {
        confirmacion,
        nombres: nombres.trim(),
        telefono: telefono.trim(),
        mensaje: mensaje.trim(),
        grupoInvitados,
        cupos,
        linkCode,
        mesaAsignada,
      })
      toast.success(isAttendanceConfirmed(confirmacion) ? 'Tu asistencia quedó confirmada' : 'Gracias por avisarnos')
      onConfirmed({ confirmacion, nombres: nombres.trim() })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="xv-form" noValidate>
      <fieldset className="xv-form-options">
        <legend className="xv-form-label">¿Nos acompañas?</legend>
        <div>
          {confirmationOptions(cupos).map((option) => (
            <button
              key={option}
              type="button"
              className="xv-choice"
              aria-pressed={confirmacion === option}
              onClick={() => setConfirmacion(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="xv-field">
        <span className="xv-form-label">{cupos === 1 ? 'Tu nombre' : 'Nombres de quienes asisten'}</span>
        <input value={nombres} onChange={(event) => setNombres(event.target.value)} autoComplete="name" required />
      </label>

      <label className="xv-field">
        <span className="xv-form-label">Teléfono</span>
        <input
          value={telefono}
          onChange={(event) => setTelefono(event.target.value)}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
        />
      </label>

      <label className="xv-field">
        <span className="xv-form-label">Unas palabras para {project.novia || 'la quinceañera'}</span>
        <textarea value={mensaje} onChange={(event) => setMensaje(event.target.value)} rows={3} />
      </label>

      {error ? <p className="xv-form-error">{error}</p> : null}

      <button type="submit" disabled={submitting} className="xv-btn xv-btn--solid">
        {submitting ? 'Enviando…' : 'Enviar respuesta'}
      </button>
    </form>
  )
}
