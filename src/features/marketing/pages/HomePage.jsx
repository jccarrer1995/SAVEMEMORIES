import { useEffect } from 'react'
import { MarketingDecor } from '../components/MarketingDecor.jsx'
import { MarketingFeatures } from '../components/MarketingFeatures.jsx'
import { MarketingHeader } from '../components/MarketingHeader.jsx'
import { MarketingHero } from '../components/MarketingHero.jsx'
import '../styles/marketing.css'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500&display=swap'

export function HomePage() {
  useEffect(() => {
    document.title = 'SAVEMEMORIES · Invitaciones digitales'

    if (!document.getElementById('marketing-fonts')) {
      const link = document.createElement('link')
      link.id = 'marketing-fonts'
      link.rel = 'stylesheet'
      link.href = FONT_HREF
      document.head.appendChild(link)
    }
  }, [])

  return (
    <div className="marketing-page relative overflow-hidden font-[Outfit,sans-serif]">
      <MarketingDecor />
      <MarketingHeader />
      <main>
        <MarketingHero />
        <MarketingFeatures />
      </main>
    </div>
  )
}
