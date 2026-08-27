import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../../boda/components/FadeInOnScroll.jsx'
import { BabyDecor } from '../components/BabyDecor.jsx'

export function QuoteAndFamilySection() {
  const project = useInvitationProject()

  return (
    <>
      <section className="bs-blush px-8 py-14 text-center">
        <FadeInOnScroll>
          <p className="text-[15px] leading-relaxed text-[#5c4a6a]">“{project.cita}”</p>
        </FadeInOnScroll>
      </section>
      <section className="bs-cream relative overflow-hidden px-6 py-14 text-center">
        <BabyDecor className="pointer-events-none absolute -left-4 top-8 w-28 text-[#d4c4e8]" />
        <FadeInOnScroll>
          <BabyDecor className="mx-auto mb-6 w-48 text-[#c9b8dc]" variant="divider" />
          <h2 className="bs-serif text-[34px] text-[#5c4a6a]">Con la bendición de</h2>
          <div className="relative z-10 mt-8 space-y-6 text-sm text-[#5c4a6a]">
            <div>
              <p className="mb-2 text-[11px] tracking-[0.2em] text-[#9a88aa]">FAMILIA MATERNA</p>
              {project.padres.novio.map((name) => (
                <p key={name} className="leading-7">
                  {name}
                </p>
              ))}
            </div>
            <div>
              <p className="mb-2 text-[11px] tracking-[0.2em] text-[#9a88aa]">FAMILIA PATERNA</p>
              {project.padres.novia.map((name) => (
                <p key={name} className="leading-7">
                  {name}
                </p>
              ))}
            </div>
          </div>
          <BabyDecor className="mx-auto mt-8 w-48 text-[#c9b8dc]" variant="divider" />
        </FadeInOnScroll>
      </section>
    </>
  )
}
