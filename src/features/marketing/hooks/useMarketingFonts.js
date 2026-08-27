import { useEffect } from 'react'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500&display=swap'

/**
 * @param {string} [title]
 */
export function useMarketingFonts(title) {
  useEffect(() => {
    if (title) document.title = title

    if (!document.getElementById('marketing-fonts')) {
      const link = document.createElement('link')
      link.id = 'marketing-fonts'
      link.rel = 'stylesheet'
      link.href = FONT_HREF
      document.head.appendChild(link)
    }
  }, [title])
}

/**
 * @param {string} sectionId
 */
export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
