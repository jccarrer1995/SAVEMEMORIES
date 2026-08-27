import { mailtoQuote, whatsappUrl, SITE } from '../data/siteContent.js'
import { MarketingSection } from './MarketingSection.jsx'

export function MarketingContact() {
  return (
    <MarketingSection id="contacto" kicker="Hablemos" title="Cuéntanos sobre tu evento">
      <div className="marketing-card rounded-2xl p-6 md:p-8">
        <p className="marketing-muted max-w-xl text-sm leading-relaxed md:text-base">
          Escríbenos con la fecha, tipo de evento y cantidad aproximada de invitados. Te respondemos
          con una propuesta personalizada.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={whatsappUrl(SITE.whatsapp, SITE.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="marketing-btn-primary rounded-full px-6 py-3 text-sm font-medium"
          >
            WhatsApp
          </a>
          <a href={mailtoQuote()} className="marketing-btn-secondary rounded-full px-6 py-3 text-sm font-medium">
            Enviar correo
          </a>
        </div>

        <p className="marketing-muted mt-6 text-xs">
          Correo:{' '}
          <a href={mailtoQuote()} className="marketing-link underline-offset-2 hover:underline">
            {SITE.email}
          </a>
        </p>
      </div>
    </MarketingSection>
  )
}
