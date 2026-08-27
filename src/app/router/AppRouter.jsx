import { Route, Routes, useParams } from 'react-router-dom'
import { AdminDashboardPage } from '../../features/admin/pages/AdminDashboardPage.jsx'
import { ProtectedRoute } from '../../features/auth/components/ProtectedRoute.jsx'
import { LoginPage } from '../../features/auth/pages/LoginPage.jsx'
import { ClientDashboardPage } from '../../features/client/pages/ClientDashboardPage.jsx'
import {
  InvalidInvitationPage,
  InvitationPage,
  LegacyBodaPage,
  LegacyResponsesPage,
  ProjectResponsesPage,
} from '../../features/invitations/pages/InvitationPage.jsx'
import { HomeOrLegacyInvitationPage } from '../../features/marketing/pages/HomeOrLegacyInvitationPage.jsx'
import { ROLES } from '../../shared/constants/roles.js'

function InvitationRoute() {
  const { projectId, linkCode } = useParams()
  if (!projectId) return <InvalidInvitationPage />
  if (linkCode) {
    // Etapa 5: validar linkCode en Firestore.
  }
  return <InvitationPage projectId={projectId} />
}

function ProjectResponsesRoute() {
  const { projectId } = useParams()
  if (!projectId) return <InvalidInvitationPage reason="Proyecto no especificado." />
  return <ProjectResponsesPage projectId={projectId} />
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomeOrLegacyInvitationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cliente"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/invitacion/:projectId/:linkCode?" element={<InvitationRoute />} />
      <Route path="/respuestas/:projectId" element={<ProjectResponsesRoute />} />
      <Route path="/demo/boda" element={<LegacyBodaPage />} />
      <Route path="/respuestas" element={<LegacyResponsesPage />} />
      <Route path="*" element={<InvalidInvitationPage reason="Página no encontrada." />} />
    </Routes>
  )
}
