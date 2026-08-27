import { useInvitationProject } from '../../core/hooks/useInvitationProject.js'
import { GallerySection } from './sections/GallerySection.jsx'
import { GiftsSection } from './sections/GiftsSection.jsx'
import { HeroSection } from './sections/HeroSection.jsx'
import { QuoteAndFamilySection } from './sections/QuoteAndFamilySection.jsx'
import { RsvpSection } from './sections/RsvpSection.jsx'
import { SaveTheDateSection } from './sections/SaveTheDateSection.jsx'
import { ThemeSection } from './sections/ThemeSection.jsx'
import { TimelineSection } from './sections/TimelineSection.jsx'
import { VenueSection } from './sections/VenueSection.jsx'

/**
 * @param {{ grupoInvitados: string, cupos: number }} props
 */
export function BabyShowerLanding({ grupoInvitados, cupos }) {
  const project = useInvitationProject()

  return (
    <div className="bs-cream min-h-[100dvh]">
      <HeroSection />
      <SaveTheDateSection />
      <QuoteAndFamilySection />
      <GallerySection />
      <VenueSection venue={project.recepcion} />
      <TimelineSection />
      <GiftsSection />
      <ThemeSection />
      <RsvpSection grupoInvitados={grupoInvitados} cupos={cupos} />
    </div>
  )
}
