import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'

export function GallerySection() {
  const project = useInvitationProject()

  return (
    <section className="boda-cream space-y-4 px-5 py-8">
      {project.fotos.galeria.map((src, index) => (
        <FadeInOnScroll key={src} delay={index * 0.08}>
          <img
            src={src}
            alt={`${project.novio} y ${project.novia} ${index + 1}`}
            className="aspect-[4/5] w-full object-cover"
          />
        </FadeInOnScroll>
      ))}
    </section>
  )
}
