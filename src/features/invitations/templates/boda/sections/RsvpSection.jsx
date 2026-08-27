import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'
import { FloralMotif } from '../components/FloralMotif.jsx'
import { RsvpForm } from '../components/RsvpForm.jsx'

/**
 * @param {{ grupoInvitados: string, cupos: number }} props
 */
export function RsvpSection({ grupoInvitados, cupos }) {
  const project = useInvitationProject()

  return (
    <section className="boda-cream relative overflow-hidden px-6 pb-24 pt-10 text-center">
      <FloralMotif className="pointer-events-none absolute -right-8 top-0 w-36" />
      <FadeInOnScroll>
        <FloralMotif className="mx-auto w-48" variant="divider" />
        <h2 className="boda-serif mt-4 text-[32px] text-[#b7b0a6]">No niños</h2>
        <p className="mx-auto mt-4 max-w-sm text-[13px] leading-relaxed text-[#6b645c]">
          {project.noNinos}
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1} className="mt-10">
        <div className="relative mx-auto max-w-sm rounded-md bg-white px-5 py-8 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
          <FloralMotif className="mx-auto mb-3 w-28" variant="divider" />
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
  )
}
