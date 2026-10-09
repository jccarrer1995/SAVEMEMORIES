import { Gift } from 'lucide-react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'
import { OliveSectionDecor } from '../components/OliveSectionDecor.jsx'

export function GiftsSection() {
  const project = useInvitationProject()

  return (
    <section className="boda-cream-warm relative overflow-hidden px-6 py-16">
      <OliveSectionDecor flowers={['tr']} branches={['bl']} />
      <FadeInOnScroll className="boda-section-content">
        <div className="relative mx-auto max-w-sm bg-white px-6 py-10 text-center shadow-[0_12px_30px_rgba(70,80,58,0.1)]">
          <Gift className="mx-auto h-10 w-10 text-[#5c6b4f]" strokeWidth={1.3} />
          <h2 className="boda-serif mt-4 text-[30px] text-[#2c2c2c]">Mesa de Regalos</h2>
          <p className="mt-4 whitespace-pre-line text-[13px] leading-relaxed text-[#6b645c]">
            {project.regalos.texto}
          </p>
        </div>
      </FadeInOnScroll>
    </section>
  )
}
