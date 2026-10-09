import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'
import { OrnamentLine } from '../components/FloralMotif.jsx'
import { OliveLongBranchSide } from '../components/OliveLongBranchSide.jsx'
import { RsvpForm } from '../components/RsvpForm.jsx'
import { NoNinosSection } from './NoNinosSection.jsx'

/**
 * @param {{ grupoInvitados: string, cupos: number }} props
 */
export function RsvpSection({ grupoInvitados, cupos }) {
  return (
    <>
      <NoNinosSection />

      <section className="boda-cream relative overflow-hidden px-6 pb-24 pt-10 text-center">
        <OliveLongBranchSide side="right" className="boda-olive-long-branch--rsvp" />
        <FadeInOnScroll className="boda-section-content">
          <div className="relative z-[1] mx-auto max-w-sm rounded-md bg-white px-5 py-8 shadow-[0_12px_30px_rgba(70,80,58,0.1)]">
              <OrnamentLine className="mx-auto mb-3 w-28" />
              <p className="text-[13px] text-[#3a3a3a]">
                Pase reservado para: {grupoInvitados} ({cupos} {cupos === 1 ? 'persona' : 'personas'})
              </p>
              <h3 className="boda-serif mt-4 text-[26px] text-[#2c2c2c]">Confirma tu Asistencia</h3>
              <div className="mt-5">
                <RsvpForm grupoInvitados={grupoInvitados} cupos={cupos} />
              </div>
            </div>
        </FadeInOnScroll>
      </section>
    </>
  )
}
