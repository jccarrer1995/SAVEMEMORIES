import { CountdownSection } from './sections/CountdownSection.jsx'
import { FooterSection } from './sections/FooterSection.jsx'
import { GallerySection } from './sections/GallerySection.jsx'
import { HeroSection } from './sections/HeroSection.jsx'
import { MessageSection } from './sections/MessageSection.jsx'
import { PlaylistSection } from './sections/PlaylistSection.jsx'
import { RsvpSection } from './sections/RsvpSection.jsx'
import { TraerSection } from './sections/TraerSection.jsx'
import { VenueSection } from './sections/VenueSection.jsx'

/**
 * @param {{ grupoInvitados: string, cupos: number, linkCode?: string, mesa?: string }} props
 */
export function DespedidaLanding({ grupoInvitados, cupos, linkCode, mesa }) {
  return (
    <div className="min-h-[100dvh]">
      <HeroSection />
      <CountdownSection />
      <MessageSection />
      <GallerySection />
      <VenueSection />
      <PlaylistSection />
      <TraerSection />
      <RsvpSection grupoInvitados={grupoInvitados} cupos={cupos} linkCode={linkCode} mesa={mesa} />
      <FooterSection />
    </div>
  )
}
