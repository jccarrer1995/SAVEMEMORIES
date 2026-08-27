import { useState } from 'react'
import { toast } from 'sonner'
import { saveRsvp } from '../saveRsvp.js'

/**
 * @param {number} cupos
 */
function confirmationOptions(cupos) {
  if (cupos === 1) {
    return ['Confirmo mi asistencia', 'No podré asistir']
  }

  if (cupos === 2) {
    return ['No podremos asistir', 'Solo irá 1', 'Asistiremos los 2']
  }

  return ['No podremos asistir', 'Solo irá 1', 'Solo iremos 2', 'Asistiremos todos']
}

/**
 * @param {{ grupoInvitados: string, cupos: number }} props
 */
export function RsvpForm({ grupoInvitados, cupos }) {
  const [confirmacion, setConfirmacion] = useState('')
  const [nombres, setNombres] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!confirmacion || !nombres.trim() || !telefono.trim()) {
      setError('Completa confirmación, nombres y teléfono.')
      return
    }

    setSubmitting(true)
    try {
      await saveRsvp({
        confirmacion,
        nombres: nombres.trim(),
        telefono: telefono.trim(),
        mensaje: mensaje.trim(),
        grupoInvitados,
        cupos,
      })
      setSent(true)
      toast.success('Confirmación enviada. ¡Gracias!')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo enviar. Intenta de nuevo.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="px-4 py-10 text-center">
        <p className="boda-serif text-2xl text-[#3a3228]">¡Gracias!</p>
        <p className="mt-2 text-sm text-[#6b645c]">
          Recibimos la confirmación de {grupoInvitados}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-left">
      <label className="block text-[11px] tracking-wide text-[#6b645c]">
        Confirmación
        <select
          className="boda-input mt-1"
          value={confirmacion}
          onChange={(event) => setConfirmacion(event.target.value)}
          required
        >
          <option value="">Selecciona</option>
          {confirmationOptions(cupos).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-[11px] tracking-wide text-[#6b645c]">
        Nombre de los asistentes
        <input
          className="boda-input mt-1"
          value={nombres}
          onChange={(event) => setNombres(event.target.value)}
          autoComplete="name"
          required
        />
      </label>

      <label className="block text-[11px] tracking-wide text-[#6b645c]">
        Teléfono
        <input
          className="boda-input mt-1"
          value={telefono}
          onChange={(event) => setTelefono(event.target.value)}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
        />
      </label>

      <label className="block text-[11px] tracking-wide text-[#6b645c]">
        Mensaje para los novios
        <textarea
          className="boda-input mt-1 min-h-[88px] resize-y"
          value={mensaje}
          onChange={(event) => setMensaje(event.target.value)}
          rows={3}
        />
      </label>

      {error ? <p className="text-xs text-red-700">{error}</p> : null}

      <div className="flex justify-end pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-[#d8d4ce] px-5 py-2 text-sm text-[#3a3228] disabled:opacity-60"
        >
          {submitting ? 'Enviando…' : 'Enviar'}
        </button>
      </div>
    </form>
  )
}
