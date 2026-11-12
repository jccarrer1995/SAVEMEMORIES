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

/** @type {Record<string, string>} */
const OPTION_LABELS = {
  'Confirmo mi asistencia': '¡Me apunto! 🙋‍♀️',
  'Asistiremos los 2': '¡Vamos las 2! 👯‍♀️',
  'Asistiremos todos': '¡Vamos todas! 👯‍♀️',
  'Solo iremos 2': 'Solo iremos 2',
  'Solo irá 1': 'Solo irá 1',
  'No podré asistir': 'No puedo 😢',
  'No podremos asistir': 'No podemos 😢',
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
export function DespedidaRsvpForm({ grupoInvitados, cupos, linkCode, mesaAsignada, onConfirmed }) {
  const project = useInvitationProject()
  const [confirmacion, setConfirmacion] = useState('')
  const [nombres, setNombres] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const nombreNovia = project.novia || 'la novia'

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!confirmacion || !nombres.trim() || !telefono.trim()) {
      setError('Elige una opción y completa nombre y teléfono.')
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
      toast.success(
        isAttendanceConfirmed(confirmacion) ? '¡Listo! Ya estás en la lista 💅' : 'Recibimos tu respuesta 💌',
      )
      onConfirmed({ confirmacion, nombres: nombres.trim() })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <fieldset>
        <legend className="mb-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5a3a5e]">
          ¿Vienes?
        </legend>
        <div className="flex flex-wrap gap-2">
          {confirmationOptions(cupos).map((option) => (
            <button
              key={option}
              type="button"
              className="dsp-choice"
              aria-pressed={confirmacion === option}
              onClick={() => setConfirmacion(option)}
            >
              {OPTION_LABELS[option] ?? option}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5a3a5e]">
        {cupos === 1 ? 'Tu nombre' : 'Nombres de quienes van'}
        <input
          className="dsp-input mt-1.5 normal-case tracking-normal"
          value={nombres}
          onChange={(event) => setNombres(event.target.value)}
          autoComplete="name"
          required
        />
      </label>

      <label className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5a3a5e]">
        Teléfono
        <input
          className="dsp-input mt-1.5 normal-case tracking-normal"
          value={telefono}
          onChange={(event) => setTelefono(event.target.value)}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
        />
      </label>

      <label className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5a3a5e]">
        Mensaje para {nombreNovia}
        <textarea
          className="dsp-input mt-1.5 min-h-[88px] resize-y normal-case tracking-normal"
          value={mensaje}
          onChange={(event) => setMensaje(event.target.value)}
          placeholder="Un consejo, un chisme, un deseo… 😏"
          rows={3}
        />
      </label>

      {error ? <p className="text-[13px] font-medium text-[#c0154f]">{error}</p> : null}

      <div className="pt-1 text-center">
        <button type="submit" disabled={submitting} className="dsp-btn">
          {submitting ? 'Enviando…' : 'Enviar respuesta'}
        </button>
      </div>
    </form>
  )
}
