import { Link } from 'react-router-dom'
import { LEGACY_BODA_PROJECT_ID } from '../../../app/router/routes.js'
import { mailtoQuote, whatsappUrl, SITE } from '../data/siteContent.js'
import { scrollToSection } from '../hooks/useMarketingFonts.js'

export function MarketingHero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-12 pt-6">
      <p className="marketing-kicker text-xs uppercase">{SITE.tagline}</p>
      <h1 className="marketing-serif mt-5 max-w-2xl text-4xl leading-[1.12] text-[#5c3a2e] md:text-[3.4rem]">
        La invitación perfecta para el día que llevas meses soñando
      </h1>
      <p className="marketing-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
        Creamos invitaciones digitales elegantes con confirmación de asistencia, enlaces
        personalizados y un panel para que organices a tus invitados sin estrés.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <a href={whatsappUrl(SITE.whatsapp, SITE.whatsappMessage)} target="_blank" rel="noreferrer" className="marketing-btn-primary rounded-full px-7 py-3 text-sm font-medium transition">
          Cotizar por WhatsApp
        </a>
        <button type="button" onClick={() => scrollToSection('contacto')} className="marketing-btn-secondary rounded-full px-7 py-3 text-sm font-medium transition">
          Solicitar cotización
        </button>
        <Link to={`/invitacion/${LEGACY_BODA_PROJECT_ID}`} className="marketing-link self-center text-sm font-medium underline-offset-4 hover:underline">
          Ver demo en vivo →
        </Link>
      </div>
    </section>
  )
}
