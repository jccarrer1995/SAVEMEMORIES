import { MarketingContact } from '../components/MarketingContact.jsx'
import { MarketingFaq } from '../components/MarketingFaq.jsx'
import { MarketingFeatures } from '../components/MarketingFeatures.jsx'
import { MarketingHero } from '../components/MarketingHero.jsx'
import { MarketingLayout } from '../components/MarketingLayout.jsx'
import { MarketingProcess } from '../components/MarketingProcess.jsx'
import { MarketingTemplates } from '../components/MarketingTemplates.jsx'
import { scrollToSection, useMarketingFonts } from '../hooks/useMarketingFonts.js'
import { useEffect } from 'react'

export function HomePage() {
  useMarketingFonts('SAVEMEMORIES · Invitaciones digitales')

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return
    const timer = window.setTimeout(() => scrollToSection(hash), 120)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <MarketingLayout>
      <MarketingHero />
      <MarketingFeatures />
      <MarketingTemplates />
      <MarketingProcess />
      <MarketingFaq />
      <MarketingContact />
    </MarketingLayout>
  )
}
