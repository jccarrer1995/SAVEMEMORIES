import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'
import { OliveLongBranchSide } from '../components/OliveLongBranchSide.jsx'
import { OliveSectionDecor } from '../components/OliveSectionDecor.jsx'
import { TimelineIcon } from '../components/TimelineIcons.jsx'

export function TimelineSection() {
  const project = useInvitationProject()

  return (
    <section className="boda-bluegray relative overflow-hidden px-6 py-16">
      <OliveLongBranchSide side="left" />
      <OliveSectionDecor flowers={['br']} />
      <div className="boda-section-content mx-auto flex max-w-xs flex-col items-center">
        {project.cronograma.map((item, index) => (
          <FadeInOnScroll key={item.id} delay={index * 0.05} className="flex w-full flex-col items-center">
            <div className="flex flex-col items-center">
              <TimelineIcon type={item.icon} className="text-white" />
              <p className="boda-serif mt-3 text-[26px] text-white">{item.hora}</p>
              <p className="mt-1 text-[12px] tracking-[0.28em] text-white/85">{item.label}</p>
            </div>
            {index < project.cronograma.length - 1 ? (
              <div className="my-5 h-8 w-px bg-white/40" aria-hidden />
            ) : null}
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  )
}
