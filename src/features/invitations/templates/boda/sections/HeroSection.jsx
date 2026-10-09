import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { OliveSectionDecor } from '../components/OliveSectionDecor.jsx'
import { RingsIcon } from '../components/TimelineIcons.jsx'

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
      <OliveSectionDecor flowers={['tl', 'tr']} branches={['bl', 'br']} variant="hero" />

      <div className="boda-section-content relative z-10 flex min-h-[100dvh] flex-col items-center px-6 pb-28 pt-[14vh]">
        <p className="boda-hero-kicker">Nuestra Boda</p>
        <h1 className="boda-hero-name mt-6">{project.novia}</h1>
        <p className="boda-hero-amp">&</p>
        <h1 className="boda-hero-name">{project.novio}</h1>
        <RingsIcon className="boda-hero-emblem" />
      </div>
    </section>
  )
}
