import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { BabyDecor } from '../components/BabyDecor.jsx'

export function HeroSection() {
  const project = useInvitationProject()

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden text-center">
      <img
        src={project.fotos.hero}
        alt=""
        className="bs-hero-photo absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="bs-hero-veil pointer-events-none absolute inset-0" />
      <BabyDecor className="pointer-events-none absolute -left-6 top-10 z-10 w-32 text-[#fff]" variant="cloud" />
      <BabyDecor className="pointer-events-none absolute right-4 top-24 z-10 w-10 text-[#fff]" variant="star" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center px-6 pb-28 pt-[14vh]">
        <p className="bs-hero-kicker">Baby Shower</p>
        <h1 className="bs-hero-name mt-6">{project.novio}</h1>
        <p className="bs-hero-sub">Con amor, {project.novia}</p>
      </div>
    </section>
  )
}
