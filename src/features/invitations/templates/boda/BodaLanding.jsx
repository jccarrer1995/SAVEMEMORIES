import { useInvitationProject } from '../../core/hooks/useInvitationProject.js'
import { DressCodeSection } from './sections/DressCodeSection.jsx'
import { GiftsSection } from './sections/GiftsSection.jsx'
import { HeroSection } from './sections/HeroSection.jsx'
import { QuoteAndParentsSection } from './sections/QuoteAndParentsSection.jsx'
import { RsvpSection } from './sections/RsvpSection.jsx'
import { SaveTheDateSection } from './sections/SaveTheDateSection.jsx'
import { TimelineSection } from './sections/TimelineSection.jsx'
import { VenueSection } from './sections/VenueSection.jsx'

/**
 * @param {{ grupoInvitados: string, cupos: number, linkCode?: string, mesa?: string }} props
 */
export function BodaLanding({ grupoInvitados, cupos, linkCode, mesa }) {
  const project = useInvitationProject()

  return (
    <div className="boda-cream min-h-[100dvh]">
      <HeroSection />
      <SaveTheDateSection />
      <QuoteAndParentsSection />
      <VenueSection venue={project.recepcion} floral="right" />
      <TimelineSection />
      <GiftsSection />
      <DressCodeSection />
      <RsvpSection
        grupoInvitados={grupoInvitados}
        cupos={cupos}
        linkCode={linkCode}
        mesa={mesa}
      />
    </div>
  )
}
