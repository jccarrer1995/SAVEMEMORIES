import { useSearchParams } from 'react-router-dom'
import { HomePage } from '../../marketing/pages/HomePage.jsx'
import { LegacyBodaPage } from '../../invitations/pages/InvitationPage.jsx'

/** Parámetros legacy compartidos antes del home comercial. */
function hasLegacyInviteParams(searchParams) {
  return searchParams.has('invitados') || searchParams.has('cupos')
}

export function HomeOrLegacyInvitationPage() {
  const [searchParams] = useSearchParams()

  if (hasLegacyInviteParams(searchParams)) {
    return <LegacyBodaPage />
  }

  return <HomePage />
}
