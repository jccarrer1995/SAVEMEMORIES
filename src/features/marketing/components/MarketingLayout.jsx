import { SiteLayout } from '../home/SiteLayout.jsx'
import '../styles/marketing.css'

/**
 * Layout público (acceso, legales). Usa la misma cabecera y pie que el home.
 * @param {{ children: import('react').ReactNode }} props
 */
export function MarketingLayout({ children }) {
  return <SiteLayout className="sm-subpage">{children}</SiteLayout>
}
