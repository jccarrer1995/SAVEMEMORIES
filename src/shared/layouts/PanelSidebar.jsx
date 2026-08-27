import { Link, useLocation } from 'react-router-dom'

/**
 * @param {{
 *   items: Array<{ label: string, href: string, disabled?: boolean }>,
 *   roleLabel: string,
 *   email?: string,
 * }} props
 */
export function PanelSidebar({ items, roleLabel, email }) {
  const location = useLocation()

  return (
    <aside className="panel-sidebar">
      <div className="px-5 py-6">
        <Link to="/" className="marketing-serif text-lg tracking-[0.12em] text-[#7a4a32]">
          SAVEMEMORIES
        </Link>
        <p className="panel-role-badge mt-3">{roleLabel}</p>
        {email ? <p className="marketing-muted mt-2 truncate text-xs">{email}</p> : null}
      </div>

      <nav className="flex flex-col gap-1 px-3 pb-6">
        {items.map((item) => {
          const isActive = location.pathname === item.href
          if (item.disabled) {
            return (
              <span key={item.href} className="panel-nav-item is-disabled" aria-disabled="true">
                {item.label}
                <span className="panel-soon">Pronto</span>
              </span>
            )
          }

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`panel-nav-item ${isActive ? 'is-active' : ''}`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
