import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { StickerLayer } from '../components/StickerLayer.jsx'

/** @type {import('../components/StickerLayer.jsx').StickerDef[]} */
const VENUE_STICKERS = [
  { id: 'pin', content: '📍', top: '5%', right: '10%', size: 40, rotate: 12 },
  { id: 'sparkle', content: '✨', top: '78%', left: '6%', size: 34, rotate: -10 },
]

export function VenueSection() {
  const project = useInvitationProject()
  const venue = project.recepcion
  const constraintsRef = useRef(/** @type {HTMLElement | null} */ (null))

  if (!venue?.lugar) return null

  return (
    <section ref={constraintsRef} className="dsp-bg-violet relative overflow-hidden px-6 py-20">
      <h2 className="dsp-display relative z-[2] text-center text-[34px] text-white">
        {venue.titulo || 'Punto de encuentro'}
      </h2>

      <motion.div
        className="dsp-ticket dsp-chunky-shadow relative z-[2] mx-auto mt-9 max-w-sm"
        initial={{ opacity: 0, y: 40, rotate: 6 }}
        whileInView={{ opacity: 1, y: 0, rotate: -2 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ type: 'spring', stiffness: 140, damping: 14 }}
      >
        <div className="px-6 pb-6 pt-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e01f7c]">Pase · 1 noche</p>
          <p className="dsp-display mt-2 text-[26px] leading-tight">{venue.lugar}</p>
          {venue.direccion ? (
            <p className="mt-2 text-[13px] leading-relaxed text-[#5a3a5e]">{venue.direccion}</p>
          ) : null}
        </div>

        <div className="dsp-ticket-cut grid grid-cols-2 gap-3 px-6 pb-7 pt-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5a3a5e]">Fecha</p>
            <p className="mt-1 text-[14px] font-semibold leading-snug">{project.fechaLabel}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5a3a5e]">Hora</p>
            <p className="mt-1 text-[14px] font-semibold">{venue.hora}</p>
          </div>
        </div>
      </motion.div>

      {venue.mapsUrl ? (
        <div className="relative z-[2] mt-10 text-center">
          <a href={venue.mapsUrl} target="_blank" rel="noreferrer" className="dsp-btn">
            Cómo llegar 📍
          </a>
        </div>
      ) : null}

      <StickerLayer stickers={VENUE_STICKERS} constraintsRef={constraintsRef} />
    </section>
  )
}
