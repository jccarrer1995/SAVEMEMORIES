import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { Countdown } from '../../boda/components/Countdown.jsx'
import { FadeInOnScroll } from '../../boda/components/FadeInOnScroll.jsx'
import { BabyDecor } from '../components/BabyDecor.jsx'

export function SaveTheDateSection() {
  const project = useInvitationProject()

  return (
    <section className="bs-cream px-6 py-12 text-center">
      <FadeInOnScroll>
        <BabyDecor className="mx-auto mb-6 w-56 text-[#c9b8dc]" variant="divider" />
        <p className="bs-serif text-[32px] text-[#5c4a6a]">Baby Shower de {project.novio}</p>
        <Countdown className="mt-3 text-[20px] text-[#6b5a7a]" targetIso={project.fechaIso} />
        <p className="mt-3 text-sm text-[#7a6888]">{project.fechaLabel}</p>
        <BabyDecor className="mx-auto mt-6 w-56 text-[#c9b8dc]" variant="divider" />
      </FadeInOnScroll>
    </section>
  )
}
