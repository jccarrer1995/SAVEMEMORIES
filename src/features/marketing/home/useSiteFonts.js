import { useEffect } from 'react'
import { HOME_FONTS_HREF } from './homeMedia.js'

/** Carga una sola vez las tipografías del sitio (Instrument Serif, Geist, Pinyon Script). */
export function useSiteFonts() {
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
