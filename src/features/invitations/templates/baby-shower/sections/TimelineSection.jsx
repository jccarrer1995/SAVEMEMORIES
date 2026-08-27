import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../../boda/components/FadeInOnScroll.jsx'
import { TimelineIcon } from '../../boda/components/TimelineIcons.jsx'

export function TimelineSection() {
  const project = useInvitationProject()

  return (
    <section className="bs-lavender px-6 py-16">
      <div className="mx-auto flex max-w-xs flex-col items-center">
        {project.cronograma.map((item, index) => (
          <FadeInOnScroll key={item.id} delay={index * 0.05} className="flex w-full flex-col items-center">
            <div className="flex flex-col items-center">
              <TimelineIcon type={item.icon} />
              <p className="bs-serif mt-3 text-[26px] text-[#5c4a6a]">{item.hora}</p>
              <p className="mt-1 text-[12px] tracking-[0.28em] text-[#7a6888]">{item.label}</p>
            </div>
            {index < project.cronograma.length - 1 ? (
              <div className="my-5 h-8 w-px bg-[#c9b8dc]/70" aria-hidden />
            ) : null}
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  )
}
