import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS, SITE } from '../data/siteContent.js'
import { scrollToSection } from '../hooks/useMarketingFonts.js'

function NavAnchor({ id, label }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  if (isHome) {
    return (
      <button
        type="button"
        onClick={() => scrollToSection(id)}
        className="marketing-nav-link"
      >
        {label}
      </button>
    )
  }

  return (
    <Link to={`/#${id}`} className="marketing-nav-link">
      {label}
    </Link>
  )
}

export function MarketingHeader() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <header className="marketing-header sticky top-0 z-20">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link
          to="/"
          className="marketing-serif min-w-0 truncate text-xl tracking-[0.18em] text-[#7a4a32]"
        >
          {SITE.name}
        </Link>

        <nav className={`hidden items-center gap-5 md:flex ${isLoginPage ? 'ml-auto' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavAnchor key={link.id} id={link.id} label={link.label} />
          ))}
        </nav>

        {!isLoginPage ? (
          <Link
            to="/login"
            className="marketing-btn-secondary shrink-0 rounded-full px-4 py-2 text-xs font-medium md:text-sm"
          >
            Acceso
          </Link>
        ) : null}
      </div>
    </header>
  )
}
