import { Route } from 'react-router-dom'
import { AdminClientsListPage } from '../../features/admin/pages/AdminClientsListPage.jsx'
import { AdminClientEditPage, AdminClientNewPage } from '../../features/admin/pages/AdminClientFormPage.jsx'
import { ProtectedRoute } from '../../features/auth/components/ProtectedRoute.jsx'
import { ROLES } from '../../shared/constants/roles.js'

/** @returns {import('react').ReactElement[]} */
export function adminClientRoutes() {
  const guard = (page) => (
    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>{page}</ProtectedRoute>
  )

  return [
    <Route key="admin-clientes" path="/admin/clientes" element={guard(<AdminClientsListPage />)} />,
    <Route key="admin-clientes-nuevo" path="/admin/clientes/nuevo" element={guard(<AdminClientNewPage />)} />,
    <Route
      key="admin-clientes-edit"
      path="/admin/clientes/:clientUid"
      element={guard(<AdminClientEditPage />)}
    />,
  ]
}
