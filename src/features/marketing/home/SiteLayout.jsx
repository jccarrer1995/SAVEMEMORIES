import { MotionConfig } from 'framer-motion'
import { useEffect } from 'react'
import { HomeFooter } from './HomeFooter.jsx'
import { HomeHeader } from './HomeHeader.jsx'
import { HOME_FONTS_HREF } from './homeMedia.js'
import './home.css'
import './site-pages.css'

function useSiteFonts() {
  useEffect(() => {
    if (document.getElementById('home-fonts')) return
    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = 'https://fonts.gstatic.com'
    preconnect.crossOrigin = ''
    const link = document.createElement('link')
    link.id = 'home-fonts'
    link.rel = 'stylesheet'
    link.href = HOME_FONTS_HREF
    document.head.append(preconnect, link)
  }, [])
}

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
