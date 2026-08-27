import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../../boda/components/FadeInOnScroll.jsx'
import { RsvpForm } from '../../boda/components/RsvpForm.jsx'
import { BabyDecor } from '../components/BabyDecor.jsx'

/**
 * @param {{ grupoInvitados: string, cupos: number }} props
 */
export function RsvpSection({ grupoInvitados, cupos }) {
  const project = useInvitationProject()

  return (
    <section className="bs-cream relative overflow-hidden px-6 pb-24 pt-10 text-center">
      <BabyDecor className="pointer-events-none absolute -right-4 top-0 w-28 text-[#d4c4e8]" />
      <FadeInOnScroll>
        <BabyDecor className="mx-auto w-48 text-[#c9b8dc]" variant="divider" />
        <h2 className="bs-serif mt-4 text-[32px] text-[#9a88aa]">Detalle</h2>
        <p className="mx-auto mt-4 max-w-sm text-[13px] leading-relaxed text-[#7a6888]">{project.noNinos}</p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1} className="mt-10">
        <div className="bs-card relative mx-auto max-w-sm rounded-2xl px-5 py-8">
          <BabyDecor className="mx-auto mb-3 w-28 text-[#c9b8dc]" variant="divider" />
          <p className="text-[13px] text-[#5c4a6a]">
            Pase reservado para: {grupoInvitados} ({cupos} {cupos === 1 ? 'persona' : 'personas'})
          </p>
          <h3 className="bs-serif mt-4 text-[26px] text-[#5c4a6a]">Confirma tu asistencia</h3>
          <div className="mt-5">
            <RsvpForm grupoInvitados={grupoInvitados} cupos={cupos} />
          </div>
        </div>
      </FadeInOnScroll>
    </section>
  )
}
