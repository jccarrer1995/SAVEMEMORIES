import { MotionConfig } from 'framer-motion'
import { HomeFooter } from './HomeFooter.jsx'
import { HomeHeader } from './HomeHeader.jsx'
import { useSiteFonts } from './useSiteFonts.js'
import './home.css'
import './site-pages.css'

/**
 * Estructura pública del sitio (home, acceso y páginas legales): header, contenido y footer.
 * @param {{ children: import('react').ReactNode, className?: string }} props
 */
export function SiteLayout({ children, className = '' }) {
  useSiteFonts()

  return (
    <MotionConfig reducedMotion="user">
      <div className={`sm-home ${className}`}>
        <HomeHeader />
        <main>{children}</main>
        <HomeFooter />
      </div>
    </MotionConfig>
  )
}

/**
 * Pantalla simple centrada (sin header/footer) para estados de acceso.
 * @param {{ children: import('react').ReactNode }} props
 */
export function SiteStatusScreen({ children }) {
  useSiteFonts()

  return (
    <div className="sm-home sm-status">
      <div className="sm-status-card">{children}</div>
    </div>
  )
}
