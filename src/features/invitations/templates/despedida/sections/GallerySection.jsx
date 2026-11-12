import { motion } from 'framer-motion'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'

const TILTS = [-5, 4, -3, 6, -6]
const CAPTIONS = ['besties 💕', 'iconic', 'core memory ✨', 'las de siempre', 'POV: nosotras']

export function GallerySection() {
  const project = useInvitationProject()
  const fotos = project.fotos?.galeria ?? []

  if (fotos.length === 0) return null

  return (
    <section className="dsp-bg-pink overflow-hidden py-16">
      <h2 className="dsp-display px-6 text-center text-[32px] text-white">Fotos con historia</h2>
      <p className="mt-1 text-center text-[12px] font-medium text-white/85">desliza →</p>

      <div className="dsp-scroll-snap mt-8 flex gap-6 overflow-x-auto px-[16%] pb-8 pt-4">
        {fotos.map((src, index) => (
          <motion.figure
            key={src}
            className="dsp-polaroid w-[68%] max-w-[260px] shrink-0"
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: TILTS[index % TILTS.length] }}
            viewport={{ once: true, amount: 0.3 }}
            whileTap={{ rotate: 0, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 160, damping: 14, delay: index * 0.06 }}
          >
            <span className="dsp-tape" aria-hidden />
            <img
              src={src}
              alt={`Recuerdo ${index + 1}`}
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
            <figcaption className="dsp-hand absolute inset-x-0 bottom-1.5 text-center text-[20px] text-[#2a0f2e]">
              {CAPTIONS[index % CAPTIONS.length]}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
