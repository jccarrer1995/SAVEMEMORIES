import { Link } from 'react-router-dom'
import '../../marketing/styles/marketing.css'
import { LEGACY_BODA_PROJECT_ID } from '../../../app/router/routes.js'
import { useGuestLinkValidation } from '../core/hooks/useGuestLinkValidation.js'
import { useProjectLoader } from '../core/hooks/useProjectLoader.js'
import { getDefaultGuestInvite } from '../core/utils/guestInvite.js'
import { BodaInvitationView } from '../templates/boda/pages/BodaInvitationView.jsx'
import { BodaResponsesView } from '../templates/boda/pages/BodaResponsesView.jsx'

function ProjectLoadingScreen() {
  return (
    <div className="marketing-page flex min-h-screen items-center justify-center px-6">
      <p className="marketing-muted text-sm">Cargando invitación…</p>
    </div>
  )
}

/**
 * @param {{
 *   projectId: string,
 *   linkCode?: string,
 *   allowQueryParams?: boolean,
 * }} props
 */
export function InvitationPage({ projectId, linkCode, allowQueryParams = false }) {
  const { loading, project } = useProjectLoader(projectId, 'public')
  const {
    loading: linkLoading,
    guestInvite: validatedInvite,
    error: linkError,
  } = useGuestLinkValidation(projectId, linkCode)

  if (loading || (linkCode && linkLoading)) return <ProjectLoadingScreen />

  if (!project) {
    return <InvalidInvitationPage reason="El proyecto no existe o fue desactivado." />
  }

  if (linkCode && linkError) {
    return <InvalidInvitationPage reason={linkError} />
  }

  if (project.templateId === 'boda') {
    const guestInvite = linkCode && validatedInvite ? validatedInvite : getDefaultGuestInvite(project.config)

    return (
      <BodaInvitationView
        project={project.config}
        guestInvite={guestInvite}
        allowQueryParams={allowQueryParams && !linkCode}
      />
    )
  }

  return <InvalidInvitationPage reason="Plantilla no disponible." />
}

/**
 * @param {{ projectId: string }} props
 */
export function ProjectResponsesPage({ projectId }) {
  const { loading, project } = useProjectLoader(projectId, 'responses')

  if (loading) return <ProjectLoadingScreen />

  if (!project) {
    return <InvalidInvitationPage reason="El proyecto no existe." />
  }

  if (project.templateId === 'boda') {
    return <BodaResponsesView project={project.config} />
  }

  return <InvalidInvitationPage reason="Plantilla no disponible." />
}

export function LegacyBodaPage() {
  return <InvitationPage projectId={LEGACY_BODA_PROJECT_ID} allowQueryParams />
}

export function LegacyResponsesPage() {
  return <ProjectResponsesPage projectId={LEGACY_BODA_PROJECT_ID} />
}

/**
 * @param {{ reason?: string }} props
 */
export function InvalidInvitationPage({ reason = 'Esta invitación no existe o el enlace fue modificado.' }) {
  return (
    <div className="marketing-page flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="marketing-kicker text-xs uppercase">SAVEMEMORIES</p>
      <h1 className="marketing-serif mt-4 text-3xl text-[#5c3a2e]">Invitación no disponible</h1>
      <p className="marketing-muted mt-3 max-w-sm text-sm">{reason}</p>
      <Link
        to="/"
        className="marketing-btn-primary mt-8 rounded-full px-6 py-2.5 text-sm font-medium"
      >
        Ir al inicio
      </Link>
    </div>
  )
}
