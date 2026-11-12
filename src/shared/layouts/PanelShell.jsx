import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useAuth } from '../../features/auth/hooks/useAuth.js'
import { useSiteFonts } from '../../features/marketing/home/useSiteFonts.js'
import { PanelSidebar } from './PanelSidebar.jsx'
import '../../features/marketing/styles/marketing.css'
import './panel.css'

/**
 * @param {{
 *   roleLabel: string,
 *   title: string,
 *   subtitle?: string,
 *   eyebrow?: string,
 *   navItems: Array<{ label: string, href: string, disabled?: boolean }>,
 *   children: import('react').ReactNode,
 * }} props
 */
export function PanelShell({ roleLabel, title, subtitle, eyebrow, navItems, children }) {
  useSiteFonts()
  const { profile } = useAuth()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const roleName = roleLabel.replace(/^Rol\s+/i, '')
  const displayRole = roleName === 'admin' ? 'Administrador' : roleName === 'client' ? 'Cliente' : roleName

  useEffect(() => {
    document.title = `${title} · SAVEMEMORIES`
  }, [title])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return undefined

    function handleEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className={`panel-shell ${menuOpen ? 'panel-shell--menu-open' : ''}`}>
      <PanelSidebar
        items={navItems}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        roleLabel={displayRole}
        email={profile?.email}
      />
      <div className="panel-main">
        <div className="panel-mobilebar">
          <Link to="/" className="panel-logo panel-logo--dark">
            <span className="panel-logo-mark" aria-hidden>
              S
            </span>
            <span className="panel-logo-word">SAVEMEMORIES</span>
          </Link>
          <button
            type="button"
            className="panel-menu-toggle"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span>Menú</span>
            <span className="panel-menu-toggle-icon">
              <Menu size={16} strokeWidth={2} aria-hidden="true" />
            </span>
          </button>
        </div>

        <header className="panel-topbar">
          <p className="panel-eyebrow">
            <span className="panel-dot" aria-hidden />
            {eyebrow ?? `Panel ${displayRole.toLowerCase()}`}
          </p>
          <h1 className="panel-title">{title}</h1>
          {subtitle ? <p className="panel-subtitle">{subtitle}</p> : null}
        </header>
        <div className="panel-content">{children}</div>
      </div>
    </div>
  )
}
