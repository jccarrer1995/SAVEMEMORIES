import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'
import { OrnamentLine } from '../components/FloralMotif.jsx'
import { OliveSectionDecor } from '../components/OliveSectionDecor.jsx'

export function NoNinosSection() {
  const project = useInvitationProject()

  return (
    <section className="boda-cream-warm relative overflow-hidden px-6 py-14 text-center">
      <OliveSectionDecor flowers={['tr']} branches={['bl']} />
      <FadeInOnScroll className="boda-section-content">
        <OrnamentLine className="mx-auto w-48" />
        <h2 className="boda-serif mt-4 text-[32px] text-[#333232]">No niños</h2>
        <p className="mx-auto mt-4 max-w-sm text-[13px] leading-relaxed text-[#6b645c]">
          {project.noNinos}
        </p>
        <OrnamentLine className="mx-auto mt-8 w-48" />
      </FadeInOnScroll>
    </section>
  )
}
