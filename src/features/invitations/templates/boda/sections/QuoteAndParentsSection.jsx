import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'
import { FloralMotif, OrnamentLine } from '../components/FloralMotif.jsx'

export function QuoteAndParentsSection() {
  const project = useInvitationProject()

  return (
    <>
      <section className="boda-quote-bg px-8 py-14 text-center">
        <FadeInOnScroll>
          <p className="text-[15px] leading-relaxed text-[#3a3a3a]">“{project.cita}”</p>
        </FadeInOnScroll>
      </section>
      <section className="boda-cream-warm relative overflow-hidden px-6 py-14 text-center">
        <FloralMotif className="pointer-events-none absolute -left-8 top-8 w-36" variant="spray" />
        <FadeInOnScroll>
          <OrnamentLine className="mx-auto mb-6 w-48" />
          <h2 className="boda-serif text-[34px] text-[#2c2c2c]">Nuestros Padres</h2>
          <div className="relative z-10 mt-8 space-y-6 text-sm text-[#3a3a3a]">
            <div>
              <p className="mb-2 text-[11px] tracking-[0.2em] text-[#7a7368]">PADRES DEL NOVIO</p>
              {project.padres.novio.map((name) => (
                <p key={name} className="leading-7">
                  {name}
                </p>
              ))}
            </div>
            <div>
              <p className="mb-2 text-[11px] tracking-[0.2em] text-[#7a7368]">PADRES DE LA NOVIA</p>
              {project.padres.novia.map((name) => (
                <p key={name} className="leading-7">
                  {name}
                </p>
              ))}
            </div>
          </div>
          <OrnamentLine className="mx-auto mt-8 w-48" />
        </FadeInOnScroll>
      </section>
    </>
  )
}
