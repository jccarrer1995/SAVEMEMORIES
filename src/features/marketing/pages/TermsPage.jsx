import { MarketingLayout } from '../components/MarketingLayout.jsx'
import { LegalDocument } from '../components/LegalDocument.jsx'
import { TERMS_SECTIONS } from '../content/termsSections.jsx'
import { useMarketingFonts } from '../hooks/useMarketingFonts.js'
import { SITE } from '../data/siteContent.js'

export function TermsPage() {
  useMarketingFonts(`Términos y condiciones · ${SITE.name}`)

  return (
    <MarketingLayout>
      <LegalDocument
        title="Términos y condiciones"
        intro={`Reglas de uso de ${SITE.name}: invitaciones digitales, enlaces por invitado, confirmaciones RSVP y paneles de gestión apoyados en Firebase.`}
        sections={TERMS_SECTIONS}
        siblingRoute="privacy"
      />
    </MarketingLayout>
  )
}
