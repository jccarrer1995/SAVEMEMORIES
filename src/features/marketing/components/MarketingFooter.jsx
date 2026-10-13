import { Link } from 'react-router-dom'
import { LEGAL_MENU_LINKS } from '../data/legalMeta.js'
import { SITE } from '../data/siteContent.js'

export function MarketingFooter() {
  return (
    <footer className="relative z-10 border-t border-[rgba(201,123,92,0.15)] px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="marketing-serif text-lg text-[#7a4a32]">{SITE.name}</p>
          <p className="marketing-muted mt-1 text-sm">{SITE.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {LEGAL_MENU_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="marketing-link">
              {link.label}
            </Link>
          ))}
          <Link to="/login" className="marketing-link">
            Acceso clientes
          </Link>
        </nav>
      </div>
      <p className="marketing-muted mx-auto mt-8 max-w-5xl text-center text-xs">
        © {new Date().getFullYear()} {SITE.name}. Invitaciones digitales hechas con cariño.
      </p>
    </footer>
  )
}
