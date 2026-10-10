import { useEffect, useMemo, useState } from 'react'
import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'
import { OrnamentLine } from '../components/FloralMotif.jsx'
import { OliveLongBranchSide } from '../components/OliveLongBranchSide.jsx'
import { RsvpConfirmationTicket } from '../components/RsvpConfirmationTicket.jsx'
import { RsvpDeclineCard } from '../components/RsvpDeclineCard.jsx'
import { RsvpForm } from '../components/RsvpForm.jsx'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { fetchGuestRsvpState } from '../services/saveRsvp.js'
import { isAttendanceConfirmed } from '../utils/rsvpConfirmation.js'
import { normalizeMesa } from '../../../../../shared/utils/normalizeMesa.js'
import { NoNinosSection } from './NoNinosSection.jsx'

/**
 * @param {{ grupoInvitados: string, cupos: number, linkCode?: string, mesa?: string }} props
 */
export function RsvpSection({ grupoInvitados, cupos, linkCode, mesa }) {
  const project = useInvitationProject()
  const mesaAsignada = useMemo(
    () => normalizeMesa(mesa) ?? normalizeMesa(project.mesaAsignada),
    [mesa, project.mesaAsignada],
  )

  const [guestConfirmation, setGuestConfirmation] = useState(
    /** @type {import('../utils/rsvpConfirmation.js').GuestRsvpConfirmation | null} */ (null),
  )
  const [guestDecline, setGuestDecline] = useState(
    /** @type {import('../utils/rsvpConfirmation.js').GuestRsvpDecline | null} */ (null),
  )
  const [rsvpLoading, setRsvpLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setRsvpLoading(true)

    fetchGuestRsvpState(project.id, { grupoInvitados, linkCode })
      .then((state) => {
        if (cancelled) return
        if (state.kind === 'confirmed') {
          setGuestConfirmation(state.data)
          setGuestDecline(null)
        } else if (state.kind === 'declined') {
          setGuestDecline(state.data)
          setGuestConfirmation(null)
        } else {
          setGuestConfirmation(null)
          setGuestDecline(null)
        }
      })
      .finally(() => {
        if (!cancelled) setRsvpLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [project.id, grupoInvitados, linkCode])

  const showTicket = Boolean(guestConfirmation)
  const showDecline = Boolean(guestDecline)

  const ticketMesa =
    normalizeMesa(guestConfirmation?.mesaAsignada) ?? mesaAsignada

  function handleConfirmed({ confirmacion, nombres }) {
    if (isAttendanceConfirmed(confirmacion)) {
      setGuestDecline(null)
      setGuestConfirmation({
        confirmacion,
        nombres,
        grupoInvitados,
        cupos,
        createdAt: new Date().toISOString(),
        mesaAsignada,
      })
      return
    }

    setGuestConfirmation(null)
    setGuestDecline({
      confirmacion,
      nombres,
      grupoInvitados,
      cupos,
      createdAt: new Date().toISOString(),
      mesaAsignada,
    })
  }

  const invitadosTicketLabel = guestConfirmation?.nombres || grupoInvitados
  const invitadosDeclineLabel = guestDecline?.nombres || grupoInvitados

  return (
    <>
      <NoNinosSection />

      <section className="boda-cream relative overflow-hidden px-6 pb-24 pt-10 text-center">
        <OliveLongBranchSide side="right" className="boda-olive-long-branch--rsvp" />
        <FadeInOnScroll className="boda-section-content">
          <div className="relative z-[1] mx-auto max-w-sm rounded-md bg-white px-5 py-8 shadow-[0_12px_30px_rgba(70,80,58,0.1)]">
            {rsvpLoading ? (
              <p className="text-[13px] text-[#6b645c]">Cargando confirmación…</p>
            ) : showTicket ? (
              <RsvpConfirmationTicket
                invitadosLabel={invitadosTicketLabel}
                mesaAsignada={ticketMesa}
                pases={cupos}
              />
            ) : showDecline ? (
              <RsvpDeclineCard
                invitadosLabel={invitadosDeclineLabel}
                cupos={cupos}
                novio={project.novio}
                novia={project.novia}
              />
            ) : (
              <>
                <OrnamentLine className="mx-auto mb-3 w-28" />
                <p className="text-[13px] text-[#3a3a3a]">
                  Pase reservado para: {grupoInvitados} ({cupos}{' '}
                  {cupos === 1 ? 'persona' : 'personas'})
                </p>
                <h3 className="boda-serif mt-4 text-[26px] text-[#2c2c2c]">Confirma tu Asistencia</h3>
                <div className="mt-5">
                  <RsvpForm
                    grupoInvitados={grupoInvitados}
                    cupos={cupos}
                    linkCode={linkCode}
                    mesaAsignada={mesaAsignada}
                    onConfirmed={handleConfirmed}
                  />
                </div>
              </>
            )}
          </div>
        </FadeInOnScroll>
      </section>
    </>
  )
}
