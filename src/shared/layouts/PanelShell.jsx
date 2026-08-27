import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useAuth } from '../../features/auth/hooks/useAuth.js'
import { useMarketingFonts } from '../../features/marketing/hooks/useMarketingFonts.js'
import { PanelSidebar } from './PanelSidebar.jsx'
import '../../features/marketing/styles/marketing.css'
import './panel.css'

/**
 * @param {{
 *   roleLabel: string,
 *   title: string,
 *   subtitle?: string,
 *   navItems: Array<{ label: string, href: string, disabled?: boolean }>,
 *   children: import('react').ReactNode,
 * }} props
 */
export function PanelShell({ roleLabel, title, subtitle, navItems, children }) {
  useMarketingFonts(`${title} · SAVEMEMORIES`)
  const { profile } = useAuth()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return

    function handleEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [menuOpen])

  return (
    <div className={`panel-shell font-[Outfit,sans-serif] ${menuOpen ? 'panel-shell--menu-open' : ''}`}>
      <PanelSidebar items={navItems} isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="panel-main">
        <header className="panel-topbar">
          <div className="panel-topbar-meta">
            <button
              type="button"
              className="panel-menu-toggle"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <div className="panel-topbar-user">
              <p className="panel-role-badge">{roleLabel}</p>
              {profile?.email ? <p className="panel-topbar-email">{profile.email}</p> : null}
            </div>
          </div>
          <div className="panel-topbar-heading">
            <h1 className="marketing-serif text-2xl text-[#5c3a2e]">{title}</h1>
            {subtitle ? <p className="marketing-muted mt-1 text-sm">{subtitle}</p> : null}
          </div>
        </header>
        <div className="panel-content">{children}</div>
      </div>
    </div>
  )
}
