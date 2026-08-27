import { Route, Routes, useParams } from 'react-router-dom'
import { AdminDashboardPage } from '../../features/admin/pages/AdminDashboardPage.jsx'
import { AdminProjectLinksPage } from '../../features/admin/pages/AdminProjectLinksPage.jsx'
import { AdminProjectEditPage, AdminProjectNewPage } from '../../features/admin/pages/AdminProjectFormPage.jsx'
import { AdminProjectsListPage } from '../../features/admin/pages/AdminProjectsListPage.jsx'
import { ProtectedRoute } from '../../features/auth/components/ProtectedRoute.jsx'
import { LoginPage } from '../../features/auth/pages/LoginPage.jsx'
import { ClientDashboardPage } from '../../features/client/pages/ClientDashboardPage.jsx'
import { ClientProjectLinksPage } from '../../features/client/pages/ClientProjectLinksPage.jsx'
import { ClientProjectResponsesPage } from '../../features/client/pages/ClientProjectResponsesPage.jsx'
import { ClientProjectsListPage } from '../../features/client/pages/ClientProjectsListPage.jsx'
import {
  InvalidInvitationPage,
  InvitationPage,
  LegacyBodaPage,
  LegacyResponsesPage,
  ProjectResponsesPage,
} from '../../features/invitations/pages/InvitationPage.jsx'
import { HomeOrLegacyInvitationPage } from '../../features/marketing/pages/HomeOrLegacyInvitationPage.jsx'
import { ROLES } from '../../shared/constants/roles.js'
import { adminClientRoutes } from './adminClientRoutes.jsx'

function InvitationRoute() {
  const { projectId, linkCode } = useParams()
  if (!projectId) return <InvalidInvitationPage />
  return <InvitationPage projectId={projectId} linkCode={linkCode} />
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
        path="/admin/proyectos"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminProjectsListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/proyectos/nuevo"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminProjectNewPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/proyectos/:projectId/enlaces"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminProjectLinksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/proyectos/:projectId"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminProjectEditPage />
          </ProtectedRoute>
        }
      />
      {adminClientRoutes()}
      <Route
        path="/cliente"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cliente/proyectos"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientProjectsListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cliente/proyectos/:projectId/enlaces"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientProjectLinksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cliente/proyectos/:projectId/respuestas"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CLIENT]}>
            <ClientProjectResponsesPage />
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
