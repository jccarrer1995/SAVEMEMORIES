import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'
import { OliveSectionDecor } from '../components/OliveSectionDecor.jsx'

/**
 * @param {{ venue: import('../../../core/types/invitationProject.js').InvitationVenue, icon?: import('react').ReactNode, darkButton?: boolean, floral?: 'left' | 'right' }} props
 */
export function VenueSection({ venue, icon, darkButton = false, floral = 'left' }) {
  const flowers = floral === 'right' ? ['br'] : ['tl']
  const branches = floral === 'right' ? ['tr'] : ['bl']

  return (
    <section className="boda-cream relative overflow-hidden px-8 py-16 text-center">
      <OliveSectionDecor flowers={flowers} branches={branches} />
      <FadeInOnScroll className="boda-section-content">
        {icon ? <div className="mb-3 flex justify-center text-[#2c2c2c]">{icon}</div> : null}
        <h2 className="boda-serif text-[36px] text-[#5c6b4f]">{venue.titulo}</h2>
        <p className="mt-1 text-sm text-[#3a3a3a]">{venue.hora}</p>
        <p className="mt-5 text-[15px] font-medium text-[#2c2c2c]">{venue.lugar}</p>
        <p className="mx-auto mt-2 max-w-xs text-[12px] leading-relaxed text-[#6d7564]">
          {venue.direccion}
        </p>
        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className={`boda-cta-btn mt-6 ${darkButton ? 'boda-map-btn' : 'boda-map-btn-light'}`}
        >
          Ver Mapa
        </a>
      </FadeInOnScroll>
    </section>
  )
}
