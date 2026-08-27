import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { Countdown } from '../components/Countdown.jsx'
import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'
import { FrameLine } from '../components/FloralMotif.jsx'

export function SaveTheDateSection() {
  const project = useInvitationProject()

  return (
    <section className="boda-cream px-6 py-12 text-center">
      <FadeInOnScroll>
        <FrameLine className="mx-auto mb-6 w-64" />
        <p className="boda-serif text-[32px] text-[#2c2c2c]">Nuestra Boda</p>
        <Countdown className="mt-3 text-[20px]" targetIso={project.fechaIso} />
        <p className="mt-3 text-sm text-[#5c5c5c]">{project.fechaLabel}</p>
        <FrameLine className="mx-auto mt-6 w-64" />
      </FadeInOnScroll>
    </section>
  )
}
