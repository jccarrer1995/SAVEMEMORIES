import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'
import { OliveSectionDecor } from '../components/OliveSectionDecor.jsx'
import { DressIcon, ShirtIcon } from '../components/TimelineIcons.jsx'

export function DressCodeSection() {
  const project = useInvitationProject()

  return (
    <section className="boda-cream relative overflow-hidden px-0 py-4">
      <FadeInOnScroll className="boda-section-content mx-6">
        <div className="boda-olive-panel relative overflow-hidden px-6 py-10 text-center">
          <OliveSectionDecor flowers={['tl']} branches={['br']} />
          <div className="relative z-[1]">
            <div className="mb-3 flex items-center justify-center gap-3 text-white">
              <ShirtIcon className="h-10 w-10 text-white" />
              <DressIcon className="h-10 w-10 text-white" />
            </div>
            <h2 className="boda-serif text-[30px] text-white">Dress Code</h2>
            <p className="mt-2 text-[17px] text-white">{project.dressCode.estilo}</p>
            <p className="mt-2 text-[12px] text-white/85">{project.dressCode.detalle}</p>
          </div>
        </div>
      </FadeInOnScroll>
    </section>
  )
}
