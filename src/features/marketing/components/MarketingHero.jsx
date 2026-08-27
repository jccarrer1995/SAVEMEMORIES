import { Link } from 'react-router-dom'
import { LEGACY_BODA_PROJECT_ID } from '../../../app/router/routes.js'

export function MarketingHero() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 pb-8 pt-4">
      <p className="marketing-kicker text-xs uppercase">Invitaciones digitales</p>
      <h1 className="marketing-serif mt-5 max-w-2xl text-4xl leading-[1.15] text-[#5c3a2e] md:text-[3.25rem]">
        Invitaciones con estilo para bodas, XV años y momentos especiales
      </h1>
      <p className="marketing-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
        Diseños delicados, confirmaciones organizadas y enlaces personalizados para cada invitado.
        Creamos la experiencia digital de tu evento con un toque cálido y elegante.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="mailto:contacto@savememories.com?subject=Cotización%20invitación%20digital"
          className="marketing-btn-primary rounded-full px-7 py-3 text-sm font-medium transition"
        >
          Solicitar cotización
        </a>
        <Link
          to={`/invitacion/${LEGACY_BODA_PROJECT_ID}`}
          className="marketing-btn-secondary rounded-full px-7 py-3 text-sm font-medium transition"
        >
          Ver demo de boda
        </Link>
      </div>
    </section>
  )
}
