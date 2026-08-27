import { Link } from 'react-router-dom'
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

  return (
    <div className="panel-shell font-[Outfit,sans-serif]">
      <PanelSidebar items={navItems} roleLabel={roleLabel} />
      <div className="panel-main">
        <header className="panel-topbar">
          <div>
            <h1 className="marketing-serif text-2xl text-[#5c3a2e]">{title}</h1>
            {subtitle ? <p className="marketing-muted mt-1 text-sm">{subtitle}</p> : null}
          </div>
          <Link to="/" className="marketing-link text-sm font-medium">
            ← Volver al sitio
          </Link>
        </header>
        <div className="panel-content">{children}</div>
      </div>
    </div>
  )
}
