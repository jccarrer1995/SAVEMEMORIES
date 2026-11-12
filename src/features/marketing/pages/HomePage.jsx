import { useEffect } from 'react'
import { HomeContact } from '../home/HomeContact.jsx'
import { HomeFaq } from '../home/HomeFaq.jsx'
import { HomeFeatures } from '../home/HomeFeatures.jsx'
import { HomeGallery } from '../home/HomeGallery.jsx'
import { HomeHero } from '../home/HomeHero.jsx'
import { HomeMarquee } from '../home/HomeMarquee.jsx'
import { HomeProcess } from '../home/HomeProcess.jsx'
import { HomeTemplates } from '../home/HomeTemplates.jsx'
import { SiteLayout } from '../home/SiteLayout.jsx'
import { scrollToSection } from '../hooks/useMarketingFonts.js'

export function HomePage() {
  useEffect(() => {
    document.title = 'SAVEMEMORIES · Invitaciones digitales para bodas, XV años y baby shower'
    const hash = window.location.hash.replace('#', '')
    if (!hash) return
    const timer = window.setTimeout(() => scrollToSection(hash), 160)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <SiteLayout>
      <HomeHero />
      <HomeMarquee />
      <HomeFeatures />
      <HomeProcess />
      <HomeTemplates />
      <HomeGallery />
      <HomeFaq />
      <HomeContact />
    </SiteLayout>
  )
}
