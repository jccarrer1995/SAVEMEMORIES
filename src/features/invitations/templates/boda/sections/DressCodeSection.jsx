import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'
import { DressIcon, ShirtIcon } from '../components/TimelineIcons.jsx'

export function DressCodeSection() {
  const project = useInvitationProject()

  return (
    <section className="boda-cream px-0 py-4">
      <FadeInOnScroll>
        <div className="boda-bluegray mx-6 px-6 py-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3 text-[#2c2c2c]">
            <ShirtIcon />
            <DressIcon />
          </div>
          <h2 className="boda-serif text-[30px] text-[#2c2c2c]">Dress Code</h2>
          <p className="mt-2 text-[17px] text-[#2c2c2c]">{project.dressCode.estilo}</p>
          <p className="mt-2 text-[12px] text-[#6b645c]">{project.dressCode.detalle}</p>
        </div>
      </FadeInOnScroll>
    </section>
  )
}
