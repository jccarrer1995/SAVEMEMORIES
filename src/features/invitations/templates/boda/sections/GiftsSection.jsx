import { Gift } from 'lucide-react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'
import { FloralMotif } from '../components/FloralMotif.jsx'

export function GiftsSection() {
  const project = useInvitationProject()

  return (
    <section className="boda-cream-warm relative overflow-hidden px-6 py-16">
      <FloralMotif className="pointer-events-none absolute -left-6 bottom-0 w-40" variant="spray" />
      <FadeInOnScroll>
        <div className="relative mx-auto max-w-sm bg-white px-6 py-10 text-center shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
          <Gift className="mx-auto h-10 w-10 text-[#2c2c2c]" strokeWidth={1.3} />
          <h2 className="boda-serif mt-4 text-[30px] text-[#2c2c2c]">Mesa de Regalos</h2>
          <p className="mt-4 whitespace-pre-line text-[13px] leading-relaxed text-[#6b645c]">
            {project.regalos.texto}
          </p>
        </div>
      </FadeInOnScroll>
    </section>
  )
}
