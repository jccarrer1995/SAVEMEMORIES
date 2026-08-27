import { Link, useLocation } from 'react-router-dom'
import { LogOut, X } from 'lucide-react'
import { signOutUser } from '../../features/auth/services/authService.js'

/**
 * @param {{
 *   items: Array<{ label: string, href: string, disabled?: boolean }>,
 *   isOpen: boolean,
 *   onClose: () => void,
 * }} props
 */
export function PanelSidebar({ items, isOpen, onClose }) {
  const location = useLocation()

  async function handleSignOut() {
    onClose()
    await signOutUser()
  }

  return (
    <>
      <button
        type="button"
        className={`panel-sidebar-backdrop ${isOpen ? 'is-visible' : ''}`}
        aria-label="Cerrar menú"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />

      <aside className={`panel-sidebar ${isOpen ? 'is-open' : ''}`}>
        <div className="panel-sidebar-body">
          <div className="panel-sidebar-header">
            <Link to="/" className="marketing-serif text-lg tracking-[0.12em] text-[#7a4a32]" onClick={onClose}>
              SAVEMEMORIES
            </Link>
            <button type="button" className="panel-menu-close" aria-label="Cerrar menú" onClick={onClose}>
              <X size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <nav className="panel-sidebar-nav">
            {items.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href !== '/admin' &&
                  item.href !== '/cliente' &&
                  location.pathname.startsWith(`${item.href}/`))

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
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="panel-sidebar-footer">
          <button type="button" className="panel-sign-out" onClick={() => void handleSignOut()}>
            <LogOut size={16} strokeWidth={1.75} aria-hidden="true" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  )
}
