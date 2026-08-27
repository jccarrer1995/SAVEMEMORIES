import { MapPin } from 'lucide-react'
import { FadeInOnScroll } from '../../boda/components/FadeInOnScroll.jsx'
import { BabyDecor } from '../components/BabyDecor.jsx'

/**
 * @param {{ venue: import('../../../core/types/invitationProject.js').InvitationVenue }} props
 */
export function VenueSection({ venue }) {
  return (
    <section className="bs-mint relative overflow-hidden px-8 py-16 text-center">
      <BabyDecor className="pointer-events-none absolute -right-6 top-6 w-32 text-[#b8dccf]" />
      <FadeInOnScroll>
        <MapPin className="mx-auto mb-3 h-8 w-8 text-[#6b9888]" strokeWidth={1.4} />
        <h2 className="bs-serif text-[36px] text-[#4a6a5c]">{venue.titulo}</h2>
        <p className="mt-1 text-sm text-[#5c4a6a]">{venue.hora}</p>
        <p className="mt-5 text-[15px] font-medium text-[#3d4a5c]">{venue.lugar}</p>
        <p className="mx-auto mt-2 max-w-xs text-[12px] leading-relaxed text-[#7a6888]">{venue.direccion}</p>
        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="bs-map-btn-light mt-6 inline-flex rounded-full px-8 py-2.5 text-sm"
        >
          Ver mapa
        </a>
      </FadeInOnScroll>
    </section>
  )
}
