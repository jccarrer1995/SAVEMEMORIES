import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listClients } from '../services/clientService.js'

/**
 * @param {{ value: string, onChange: (uid: string) => void }} props
 */
export function ClientOwnerField({ value, onChange }) {
  const [clients, setClients] = useState(/** @type {import('../types/clientRecord.js').ClientRecord[]} */ ([]))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listClients()
      .then(setClients)
      .catch(() => setClients([]))
      .finally(() => setLoading(false))
  }, [])

  const activeClients = clients.filter((client) => client.active)
  const selectedClient = clients.find((client) => client.uid === value)
  const optionClients =
    value && selectedClient && !selectedClient.active
      ? [selectedClient, ...activeClients.filter((client) => client.uid !== value)]
      : activeClients

  return (
    <label className="panel-field">
      <span>Cliente asignado</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} disabled={loading}>
        <option value="">{loading ? 'Cargando clientes…' : 'Sin asignar'}</option>
        {optionClients.map((client) => (
          <option key={client.uid} value={client.uid}>
            {client.displayName || client.email}
            {!client.active ? ' (inactivo)' : ''}
          </option>
        ))}
      </select>
      <span className="panel-form-hint">
        {activeClients.length === 0 && !loading ? (
          <>
            No hay clientes activos.{' '}
            <Link to="/admin/clientes/nuevo" className="marketing-link">
              Crear cliente
            </Link>
          </>
        ) : (
          <>
            O asigna manualmente el UID en{' '}
            <Link to="/admin/clientes" className="marketing-link">
              Clientes
            </Link>
            .
          </>
        )}
      </span>
    </label>
  )
}
