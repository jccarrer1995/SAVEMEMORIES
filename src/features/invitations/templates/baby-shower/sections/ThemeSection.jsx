import { Sparkles } from 'lucide-react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../../boda/components/FadeInOnScroll.jsx'

export function ThemeSection() {
  const project = useInvitationProject()

  return (
    <section className="bs-cream px-0 py-4">
      <FadeInOnScroll>
        <div className="bs-lavender mx-6 rounded-2xl px-6 py-10 text-center">
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-[#8f78ad]" strokeWidth={1.4} />
          <h2 className="bs-serif text-[30px] text-[#5c4a6a]">Paleta sugerida</h2>
          <p className="mt-2 text-[17px] text-[#5c4a6a]">{project.dressCode.estilo}</p>
          <p className="mt-2 text-[12px] text-[#7a6888]">{project.dressCode.detalle}</p>
        </div>
      </FadeInOnScroll>
    </section>
  )
}
