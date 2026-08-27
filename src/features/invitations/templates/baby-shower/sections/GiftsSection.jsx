import { Gift } from 'lucide-react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../../boda/components/FadeInOnScroll.jsx'

export function GiftsSection() {
  const project = useInvitationProject()

  return (
    <section className="bs-blush relative overflow-hidden px-6 py-16">
      <FadeInOnScroll>
        <div className="bs-card relative mx-auto max-w-sm rounded-2xl px-6 py-10 text-center">
          <Gift className="mx-auto h-10 w-10 text-[#8f78ad]" strokeWidth={1.3} />
          <h2 className="bs-serif mt-4 text-[30px] text-[#5c4a6a]">Mesa de regalos</h2>
          <p className="mt-4 whitespace-pre-line text-[13px] leading-relaxed text-[#7a6888]">
            {project.regalos.texto}
          </p>
        </div>
      </FadeInOnScroll>
    </section>
  )
}
