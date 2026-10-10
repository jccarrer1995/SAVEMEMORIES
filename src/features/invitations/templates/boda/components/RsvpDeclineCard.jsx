import { OrnamentLine } from './FloralMotif.jsx'

/**
 * @param {{
 *   invitadosLabel: string,
 *   cupos: number,
 *   novio: string,
 *   novia: string,
 * }} props
 */
export function RsvpDeclineCard({ invitadosLabel, cupos, novio, novia }) {
  const plural = cupos !== 1

  return (
    <div className="boda-rsvp-decline text-left">
      <div className="boda-rsvp-decline-inner">
        <OrnamentLine className="mx-auto mb-4 w-32" />
        <h4 className="boda-serif text-center text-[22px] leading-snug text-[#3d4535]">
          Gracias por avisarnos
        </h4>
        <p className="mt-4 text-center text-[13px] leading-relaxed text-[#5c564e]">
          Queridos <span className="font-medium text-[#4a5244]">{invitadosLabel}</span>,
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-[#5c564e]">
          {plural
            ? 'Entendemos que no podrán acompañarnos en este día tan especial. Les agradecemos de corazón que nos hayan confirmado; hubiéramos amado compartirlo con ustedes.'
            : 'Entendemos que no podrás acompañarnos en este día tan especial. Te agradecemos de corazón que nos hayas confirmado; hubiéramos amado compartirlo contigo.'}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-[#5c564e]">
          {plural
            ? 'Les enviamos un abrazo lleno de cariño y nuestros mejores deseos.'
            : 'Te enviamos un abrazo lleno de cariño y nuestros mejores deseos.'}
        </p>
        <div className="boda-rsvp-ticket-divider my-5" aria-hidden />
        <p className="boda-serif text-center text-[17px] text-[#54582f]">
          Con cariño,
          <br />
          {novia} & {novio}
        </p>
        <OrnamentLine className="mx-auto mt-5 w-28" />
      </div>
    </div>
  )
}
