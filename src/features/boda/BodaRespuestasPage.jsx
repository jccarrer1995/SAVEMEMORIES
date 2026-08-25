import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BODA } from './data.js'
import { downloadRsvpsExcel, listRsvps } from './saveRsvp.js'

export function BodaRespuestasPage() {
  const [rows, setRows] = useState(/** @type {Array<Record<string, unknown>>} */ ([]))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = `Confirmaciones · ${BODA.novio} & ${BODA.novia}`
    let cancelled = false

    listRsvps()
      .then((data) => {
        if (!cancelled) setRows(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'No se pudieron cargar las respuestas.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-[#f4efe6] px-4 py-8 text-[#2c2c2c]">
      <p className="text-sm">
        <Link to="/" className="underline">
          Volver a la invitación
        </Link>
      </p>
      <h1 className="mt-4 text-2xl font-semibold">Confirmaciones</h1>
      <p className="mt-1 text-sm text-[#6b645c]">
        Las respuestas se guardan en este dispositivo (y en Firestore si configuraste .env) y se pueden descargar como Excel.
      </p>

      <button
        type="button"
        onClick={() => {
          void downloadRsvpsExcel(rows)
        }}
        disabled={loading}
        className="mt-4 rounded-lg bg-[#2c2c2c] px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        Descargar Excel
      </button>

      {loading ? <p className="mt-6 text-sm">Cargando…</p> : null}
      {error ? <p className="mt-6 text-sm text-red-700">{error}</p> : null}

      {!loading && rows.length === 0 ? (
        <p className="mt-6 text-sm text-[#6b645c]">Aún no hay confirmaciones.</p>
      ) : null}

      <ul className="mt-6 space-y-3">
        {rows.map((row, index) => (
          <li key={String(row.id ?? index)} className="rounded-lg bg-white p-4 text-sm shadow-sm">
            <p className="font-medium">{String(row.grupoInvitados ?? 'Invitados')}</p>
            <p>{String(row.confirmacion ?? '')}</p>
            <p>{String(row.nombres ?? '')}</p>
            <p className="text-[#6b645c]">{String(row.telefono ?? '')}</p>
            {row.mensaje ? <p className="mt-1 italic">{String(row.mensaje)}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
