import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../../boda/components/FadeInOnScroll.jsx'

export function GallerySection() {
  const project = useInvitationProject()

  return (
    <section className="bs-cream space-y-4 px-5 py-8">
      {project.fotos.galeria.map((src, index) => (
        <FadeInOnScroll key={src} delay={index * 0.08}>
          <img
            src={src}
            alt={`Recuerdo ${project.novio} ${index + 1}`}
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[0_10px_28px_rgba(120,90,140,0.12)]"
          />
        </FadeInOnScroll>
      ))}
    </section>
  )
}
