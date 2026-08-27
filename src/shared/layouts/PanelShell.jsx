import { Link } from 'react-router-dom'
import { useAuth } from '../../features/auth/hooks/useAuth.js'
import { signOutUser } from '../../features/auth/services/authService.js'
import { useMarketingFonts } from '../../features/marketing/hooks/useMarketingFonts.js'
import { PanelSidebar } from './PanelSidebar.jsx'
import '../../features/marketing/styles/marketing.css'
import './panel.css'

async function handleSignOut() {
  await signOutUser()
}

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

  return (
    <div className="panel-shell font-[Outfit,sans-serif]">
      <PanelSidebar items={navItems} roleLabel={roleLabel} email={profile?.email} />
      <div className="panel-main">
        <header className="panel-topbar">
          <div>
            <h1 className="marketing-serif text-2xl text-[#5c3a2e]">{title}</h1>
            {subtitle ? <p className="marketing-muted mt-1 text-sm">{subtitle}</p> : null}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="marketing-btn-secondary rounded-full px-4 py-2 text-xs font-medium"
            >
              Cerrar sesión
            </button>
            <Link to="/" className="marketing-link text-sm font-medium">
              ← Sitio
            </Link>
          </div>
        </header>
        <div className="panel-content">{children}</div>
      </div>
    </div>
  )
}
