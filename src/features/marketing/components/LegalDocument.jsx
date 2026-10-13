import { Link } from 'react-router-dom'
import { LEGAL_LAST_UPDATED, LEGAL_MENU_LINKS, LEGAL_ROUTES } from '../data/legalMeta.js'

/**
 * @param {{
 *   title: string,
 *   intro: string,
 *   sections: Array<{ id: string, title: string, body: import('react').ReactNode }>,
 *   siblingRoute?: keyof typeof LEGAL_ROUTES,
 * }} props
 */
export function LegalDocument({ title, intro, sections, siblingRoute }) {
  const sibling = siblingRoute
    ? LEGAL_MENU_LINKS.find((item) => item.to === LEGAL_ROUTES[siblingRoute])
    : null

  return (
    <article className="marketing-legal mx-auto max-w-3xl px-6 py-12 md:py-16">
      <p className="marketing-kicker text-xs uppercase">Información legal</p>
      <h1 className="marketing-serif mt-3 text-3xl text-[#5c3a2e] md:text-4xl">{title}</h1>
      <p className="marketing-muted mt-4 text-sm leading-relaxed">{intro}</p>
      <p className="marketing-muted mt-2 text-xs">Última actualización: {LEGAL_LAST_UPDATED}</p>

      <div className="marketing-legal-body mt-10 flex flex-col gap-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="marketing-legal-section">
            <h2 className="marketing-serif text-xl text-[#5c3a2e]">{section.title}</h2>
            <div className="marketing-legal-prose mt-4">{section.body}</div>
          </section>
        ))}
      </div>

      {sibling ? (
        <p className="marketing-muted mt-12 border-t border-[rgba(201,123,92,0.2)] pt-8 text-sm">
          Consulta también{' '}
          <Link to={sibling.to} className="marketing-link font-medium">
            {sibling.label}
          </Link>
          .
        </p>
      ) : null}
    </article>
  )
}
