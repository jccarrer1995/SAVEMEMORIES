import { CountdownSection } from './sections/CountdownSection.jsx'
import { EtiquetteSection } from './sections/EtiquetteSection.jsx'
import { FamilySection } from './sections/FamilySection.jsx'
import { FooterSection } from './sections/FooterSection.jsx'
import { GallerySection } from './sections/GallerySection.jsx'
import { HeroSection } from './sections/HeroSection.jsx'
import { MessageSection } from './sections/MessageSection.jsx'
import { ProgramSection } from './sections/ProgramSection.jsx'
import { RsvpSection } from './sections/RsvpSection.jsx'
import { VenuesSection } from './sections/VenuesSection.jsx'

/**
 * @param {{ grupoInvitados: string, cupos: number, linkCode?: string, mesa?: string }} props
 */
export function XvLanding({ grupoInvitados, cupos, linkCode, mesa }) {
  return (
    <main>
      <HeroSection />
      <MessageSection />
      <CountdownSection />
      <FamilySection />
      <VenuesSection />
      <ProgramSection />
      <GallerySection />
      <EtiquetteSection />
      <RsvpSection grupoInvitados={grupoInvitados} cupos={cupos} linkCode={linkCode} mesa={mesa} />
      <FooterSection />
    </main>
  )
}
