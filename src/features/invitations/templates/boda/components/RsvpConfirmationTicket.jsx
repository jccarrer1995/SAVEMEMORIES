import { OrnamentLine } from './FloralMotif.jsx'

/**
 * @param {{
 *   invitadosLabel: string,
 *   mesaAsignada?: string,
 *   pases: number,
 * }} props
 */
export function RsvpConfirmationTicket({ invitadosLabel, mesaAsignada, pases }) {
  const pasesLabel = pases === 1 ? '1 pase' : `${pases} pases`

  return (
    <div className="boda-rsvp-ticket text-left">
      <div className="boda-rsvp-ticket-inner">
        <OrnamentLine className="mx-auto mb-4 w-32" />
        <h4 className="boda-serif text-center text-[22px] leading-snug text-[#3d4535]">
          ¡Confirmación Recibida!
        </h4>
        <p className="mt-4 text-center text-[13px] leading-relaxed text-[#5c564e]">
          ¡Muchas gracias! Estamos muy felices de que nos acompañes en este día tan especial. 🥂
        </p>

        <div className="boda-rsvp-ticket-divider my-5" aria-hidden />

        <p className="text-[11px] font-medium tracking-[0.22em] text-[#6d7564] uppercase">
          Tus detalles para el gran día
        </p>

        <ul className="mt-3 space-y-3 text-[13px] leading-relaxed text-[#3a3a3a]">
          {mesaAsignada ? (
            <li>
              <span className="mr-1" aria-hidden>
                📌
              </span>
              <span className="font-medium text-[#4a5244]">Mesa asignada:</span> {mesaAsignada}
            </li>
          ) : null}
          <li>
            <span className="mr-1" aria-hidden>
              📌
            </span>
            <span className="font-medium text-[#4a5244]">Invitado(s):</span> {invitadosLabel}
            <span className="mt-0.5 block text-[12px] text-[#6b645c]">({pasesLabel})</span>
          </li>
        </ul>

        <p className="mt-5 text-[12px] leading-relaxed text-[#6b645c]">
        📸 Toma una captura de pantalla o presenta esta sección de la web al momento de ingresar.
        </p>

        <p className="boda-serif mt-5 text-center text-[17px] text-[#54582f]">
          ¡Nos vemos pronto para celebrar! 🎉
        </p>
        <OrnamentLine className="mx-auto mt-5 w-28" />
      </div>
    </div>
  )
}
