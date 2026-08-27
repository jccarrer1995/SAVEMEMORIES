import { Link } from 'react-router-dom'
import { SITE } from '../data/siteContent.js'

export function MarketingFooter() {
  return (
    <footer className="relative z-10 border-t border-[rgba(201,123,92,0.15)] px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="marketing-serif text-lg text-[#7a4a32]">{SITE.name}</p>
          <p className="marketing-muted mt-1 text-sm">{SITE.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link to="/login" className="marketing-link">
            Acceso clientes
          </Link>
          <Link to="/admin" className="marketing-link">
            Admin
          </Link>
        </nav>
      </div>
      <p className="marketing-muted mx-auto mt-8 max-w-5xl text-center text-xs">
        © {new Date().getFullYear()} {SITE.name}. Invitaciones digitales hechas con cariño.
      </p>
    </footer>
  )
}
