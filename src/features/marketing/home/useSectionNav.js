import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '../hooks/useMarketingFonts.js'

/** Navega a una sección del home; desde otra página vuelve al home con el ancla. */
export function useSectionNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  return useCallback(
    (id, delay = 0) => {
      if (isHome) {
        window.setTimeout(() => scrollToSection(id), delay)
        return
      }
      navigate(`/#${id}`)
    },
    [isHome, navigate],
  )
}
