import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'
import { FloralMotif } from '../components/FloralMotif.jsx'

/**
 * @param {{ venue: import('../../../core/types/invitationProject.js').InvitationVenue, icon?: import('react').ReactNode, darkButton?: boolean, floral?: 'left' | 'right' }} props
 */
export function VenueSection({ venue, icon, darkButton = false, floral = 'left' }) {
  return (
    <section className="boda-cream relative overflow-hidden px-8 py-16 text-center">
      <FloralMotif
        className={`pointer-events-none absolute w-40 opacity-90 ${
          floral === 'right' ? '-right-10 top-0' : '-left-10 top-0'
        }`}
      />
      <FadeInOnScroll>
        {icon ? <div className="mb-3 flex justify-center text-[#2c2c2c]">{icon}</div> : null}
        <h2 className="boda-serif text-[36px] text-[#6b5744]">{venue.titulo}</h2>
        <p className="mt-1 text-sm text-[#3a3a3a]">{venue.hora}</p>
        <p className="mt-5 text-[15px] font-medium text-[#2c2c2c]">{venue.lugar}</p>
        <p className="mx-auto mt-2 max-w-xs text-[12px] leading-relaxed text-[#7a7368]">
          {venue.direccion}
        </p>
        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className={`mt-6 inline-flex rounded-lg px-8 py-2.5 text-sm ${
            darkButton ? 'boda-map-btn' : 'boda-map-btn-light'
          }`}
        >
          Ver Mapa
        </a>
      </FadeInOnScroll>
    </section>
  )
}
