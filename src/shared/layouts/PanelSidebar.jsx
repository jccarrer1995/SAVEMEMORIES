import { Link, useLocation } from 'react-router-dom'
import {
  CalendarHeart,
  FolderOpen,
  House,
  LayoutTemplate,
  LogOut,
  Users,
  X,
} from 'lucide-react'
import { signOutUser } from '../../features/auth/services/authService.js'

const NAV_ICONS = {
  '/admin': House,
  '/admin/proyectos': FolderOpen,
  '/admin/clientes': Users,
  '/admin/plantillas': LayoutTemplate,
  '/cliente': House,
  '/cliente/proyectos': CalendarHeart,
}

/**
 * @param {{
 *   items: Array<{ label: string, href: string, disabled?: boolean }>,
 *   isOpen: boolean,
 *   onClose: () => void,
 *   roleLabel: string,
 *   email?: string,
 * }} props
 */
export function PanelSidebar({ items, isOpen, onClose, roleLabel, email }) {
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

      <aside className={`panel-sidebar ${isOpen ? 'is-open' : ''}`} aria-label="Navegación del panel">
        <div className="panel-sidebar-body">
          <div className="panel-sidebar-header">
            <Link to="/" className="panel-logo" onClick={onClose}>
              <span className="panel-logo-mark" aria-hidden>
                S
              </span>
              <span className="panel-logo-word">SAVEMEMORIES</span>
            </Link>
            <button type="button" className="panel-menu-close" aria-label="Cerrar menú" onClick={onClose}>
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <p className="panel-sidebar-role">{roleLabel}</p>

          <nav className="panel-sidebar-nav">
            {items.map((item) => {
              const Icon = NAV_ICONS[item.href] ?? House
              const isActive =
                location.pathname === item.href ||
                (item.href !== '/admin' &&
                  item.href !== '/cliente' &&
                  location.pathname.startsWith(`${item.href}/`))

              if (item.disabled) {
                return (
                  <span key={item.href} className="panel-nav-item is-disabled" aria-disabled="true">
                    <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                    <span className="panel-nav-label">{item.label}</span>
                    <span className="panel-soon">Pronto</span>
                  </span>
                )
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`panel-nav-item ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={onClose}
                >
                  <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                  <span className="panel-nav-label">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="panel-sidebar-footer">
          {email ? (
            <div className="panel-user">
              <span className="panel-user-avatar" aria-hidden>
                {email.slice(0, 1).toUpperCase()}
              </span>
              <span className="panel-user-email" title={email}>
                {email}
              </span>
            </div>
          ) : null}
          <button type="button" className="panel-sign-out" onClick={() => void handleSignOut()}>
            <LogOut size={16} strokeWidth={1.75} aria-hidden="true" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  )
}
