import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { ADMIN_NAV } from '../data/adminNav.js'
import { deleteClient, listClients } from '../services/clientService.js'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'
import { asText } from '../../../shared/utils/asText.js'

export function AdminClientsListPage() {
  const [clients, setClients] = useState(/** @type {import('../types/clientRecord.js').ClientRecord[]} */ ([]))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingUid, setDeletingUid] = useState('')

  async function loadClients() {
    setLoading(true)
    setError('')
    try {
      setClients(await listClients())
    } catch (err) {
      const isPermission =
        err && typeof err === 'object' && 'code' in err && err.code === 'permission-denied'
      setError(
        isPermission
          ? 'Sin permiso para leer clientes. Publica las reglas de Firestore con acceso admin a users.'
          : 'No se pudieron cargar los clientes.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadClients()
  }, [])

  async function handleDelete(uid, label) {
    const confirmed = window.confirm(
      `¿Eliminar el perfil de "${label}"?\n\nEl usuario no podrá iniciar sesión. La cuenta en Firebase Auth permanece y puede eliminarse desde la consola.`,
    )
    if (!confirmed) return

    setDeletingUid(uid)
    try {
      await deleteClient(uid)
      toast.success('Cliente eliminado')
      await loadClients()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo eliminar el cliente.')
    } finally {
      setDeletingUid('')
    }
  }

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.ADMIN}`}
      title="Clientes"
      subtitle="Cuentas con acceso al panel cliente."
      navItems={ADMIN_NAV}
    >
      <div className="panel-toolbar">
        <p className="marketing-muted text-sm">
          {loading ? 'Cargando…' : `${clients.length} cliente(s) registrado(s)`}
        </p>
        <Link to="/admin/clientes/nuevo" className="panel-btn-primary rounded-full px-4 py-2 text-sm font-medium">
          + Nuevo cliente
        </Link>
      </div>

      {error ? <p className="panel-form-error">{error}</p> : null}

      <div className="panel-table-wrap">
        <table className="panel-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>UID</th>
              <th>Estado</th>
              <th aria-label="Acciones" />
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 && !loading ? (
              <tr>
                <td colSpan={5} className="panel-table-empty">
                  Aún no hay clientes. Crea el primero para asignarlo a un proyecto.
                </td>
              </tr>
            ) : null}
            {clients.map((client) => (
              <tr key={client.uid}>
                <td className="font-medium">{client.displayName || '—'}</td>
                <td>{client.email || '—'}</td>
                <td>
                  <code className="text-xs">{client.uid.slice(0, 8)}…</code>
                </td>
                <td>
                  <span className={`panel-badge panel-badge--${client.active ? 'active' : 'archived'}`}>
                    {client.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="panel-table-actions">
                  <Link to={`/admin/clientes/${client.uid}`} className="panel-action-link">
                    Editar
                  </Link>
                  <button
                    type="button"
                    className="panel-action-link"
                    disabled={deletingUid === client.uid}
                    onClick={() => void handleDelete(client.uid, asText(client.displayName, client.email))}
                  >
                    {deletingUid === client.uid ? 'Eliminando…' : 'Eliminar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelShell>
  )
}
