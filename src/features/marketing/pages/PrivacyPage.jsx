import { MarketingLayout } from '../components/MarketingLayout.jsx'
import { LegalDocument } from '../components/LegalDocument.jsx'
import { PRIVACY_SECTIONS } from '../content/privacySections.jsx'
import { useMarketingFonts } from '../hooks/useMarketingFonts.js'
import { SITE } from '../data/siteContent.js'

export function PrivacyPage() {
  useMarketingFonts(`Política de privacidad · ${SITE.name}`)

  return (
    <MarketingLayout>
      <LegalDocument
        title="Política de privacidad"
        intro={`Cómo ${SITE.name} trata datos personales de invitados, clientes y administradores, con detalle de Firebase Authentication, Cloud Firestore, Hosting y reglas de acceso aplicables.`}
        sections={PRIVACY_SECTIONS}
        siblingRoute="terms"
      />
    </MarketingLayout>
  )
}
