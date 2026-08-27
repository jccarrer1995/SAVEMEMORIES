import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { ClientForm } from '../components/ClientForm.jsx'
import { ADMIN_NAV } from '../data/adminNav.js'
import {
  clientToFormValues,
  createEmptyClientForm,
  getClientById,
  saveClient,
  sendClientPasswordReset,
} from '../services/clientService.js'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'

export function AdminClientNewPage() {
  const navigate = useNavigate()

  async function handleSubmit(values) {
    await saveClient(values, true)
    toast.success('Cliente creado con éxito')
    navigate('/admin/clientes')
  }

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.ADMIN}`}
      title="Nuevo cliente"
      subtitle="Se creará la cuenta de acceso al panel cliente."
      navItems={ADMIN_NAV}
    >
      <ClientForm initialValues={createEmptyClientForm()} isNew onSubmit={handleSubmit} />
    </PanelShell>
  )
}

export function AdminClientEditPage() {
  const { clientUid = '' } = useParams()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getClientById(clientUid)
      .then((client) => {
        if (!client) {
          setError('Cliente no encontrado.')
          return
        }
        setInitialValues(clientToFormValues(client))
      })
      .catch(() => setError('No se pudo cargar el cliente.'))
  }, [clientUid])

  async function handleSubmit(values) {
    await saveClient({ ...values, uid: clientUid }, false)
    toast.success('Cliente actualizado con éxito')
    navigate('/admin/clientes')
  }

  if (error) {
    return (
      <PanelShell roleLabel={`Rol ${ROLES.ADMIN}`} title="Editar cliente" navItems={ADMIN_NAV}>
        <p className="panel-form-error">{error}</p>
      </PanelShell>
    )
  }

  if (!initialValues) {
    return (
      <PanelShell roleLabel={`Rol ${ROLES.ADMIN}`} title="Editar cliente" navItems={ADMIN_NAV}>
        <p className="marketing-muted text-sm">Cargando cliente…</p>
      </PanelShell>
    )
  }

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.ADMIN}`}
      title="Editar cliente"
      subtitle={initialValues.displayName || initialValues.email}
      navItems={ADMIN_NAV}
    >
      <ClientForm
        initialValues={initialValues}
        isNew={false}
        onSubmit={handleSubmit}
        onResetPassword={sendClientPasswordReset}
      />
    </PanelShell>
  )
}
