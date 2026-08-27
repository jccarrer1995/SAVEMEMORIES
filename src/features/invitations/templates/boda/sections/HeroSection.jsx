import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FloralMotif } from '../components/FloralMotif.jsx'

export function HeroSection() {
  const project = useInvitationProject()

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden text-center">
      <img
        src={project.fotos.hero}
        alt=""
        className="boda-hero-photo absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="boda-hero-veil pointer-events-none absolute inset-0" />
      <FloralMotif className="pointer-events-none absolute -left-12 -top-8 z-10 w-52 opacity-40 brightness-[2.4]" />
      <FloralMotif className="pointer-events-none absolute -right-10 top-16 z-10 w-40 rotate-12 opacity-30 brightness-[2.4]" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center px-6 pb-28 pt-[14vh]">
        <p className="boda-hero-kicker">Nuestra Boda</p>
        <h1 className="boda-hero-name mt-6">{project.novio}</h1>
        <p className="boda-hero-amp">&</p>
        <h1 className="boda-hero-name">{project.novia}</h1>
      </div>
    </section>
  )
}
