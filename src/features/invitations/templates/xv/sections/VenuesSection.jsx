import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { Reveal } from '../components/Effects.jsx'
import { CornerFlourish } from '../components/Ornaments.jsx'

const EASE = [0.22, 1, 0.36, 1]

/**
 * @param {{ venue: import('../../../core/types/invitationProject.js').InvitationVenue, fallbackTitle: string, index: number }} props
 */
function VenueCard({ venue, fallbackTitle, index }) {
  return (
    <motion.article
      className="xv-venue"
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.1, ease: EASE, delay: index * 0.15 }}
    >
      {['tl', 'tr', 'br', 'bl'].map((corner) => (
        <CornerFlourish key={corner} className={`xv-corner xv-corner--${corner}`} />
      ))}
      <p className="xv-kicker">{venue.titulo || fallbackTitle}</p>
      {venue.hora ? <p className="xv-venue-time">{venue.hora}</p> : null}
      <h3 className="xv-venue-place">{venue.lugar}</h3>
      {venue.direccion ? <p className="xv-venue-address">{venue.direccion}</p> : null}
      {venue.mapsUrl ? (
        <a className="xv-btn xv-btn--ghost" href={venue.mapsUrl} target="_blank" rel="noreferrer">
          <MapPin size={15} strokeWidth={1.5} aria-hidden="true" />
          Cómo llegar
        </a>
      ) : null}
    </motion.article>
  )
}

export function VenuesSection() {
  const project = useInvitationProject()
  const venues = [
    { key: 'ceremonia', venue: project.ceremonia, fallbackTitle: 'Ceremonia' },
    { key: 'recepcion', venue: project.recepcion, fallbackTitle: 'Recepción' },
  ].filter((item) => item.venue?.lugar)

  if (venues.length === 0) return null

  return (
    <section className="xv-section xv-venues">
      <Reveal>
        <p className="xv-kicker">Te espero en</p>
        <h2 className="xv-title">
          Dónde <em>y cuándo</em>
        </h2>
      </Reveal>
      <div className="xv-venues-grid">
        {venues.map((item, index) => (
          <VenueCard key={item.key} venue={item.venue} fallbackTitle={item.fallbackTitle} index={index} />
        ))}
      </div>
    </section>
  )
}
