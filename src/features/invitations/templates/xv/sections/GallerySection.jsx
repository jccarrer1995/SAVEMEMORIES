import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { Reveal } from '../components/Effects.jsx'

const EASE = [0.22, 1, 0.36, 1]

export function GallerySection() {
  const project = useInvitationProject()
  const photos = (project.fotos?.galeria ?? []).filter(Boolean)
  const trackRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(/** @type {number | null} */ (null))

  const scrollTo = useCallback((index) => {
    const track = trackRef.current
    const slide = track?.children[index]
    if (!track || !(slide instanceof HTMLElement)) return
    track.scrollTo({ left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    function onScroll() {
      const center = track.scrollLeft + track.clientWidth / 2
      let best = 0
      let bestDistance = Infinity
      Array.from(track.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) return
        const distance = Math.abs(child.offsetLeft + child.clientWidth / 2 - center)
        if (distance < bestDistance) {
          bestDistance = distance
          best = index
        }
      })
      setActive(best)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open === null) return undefined
    function onKey(event) {
      if (event.key === 'Escape') setOpen(null)
      if (event.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % photos.length))
      if (event.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, photos.length])

  if (photos.length === 0) return null

  return (
    <section className="xv-section xv-gallery">
      <Reveal>
        <p className="xv-kicker">Galería</p>
        <h2 className="xv-title">
          Instantes <em>de mí</em>
        </h2>
      </Reveal>

      <div ref={trackRef} className="xv-gallery-track">
        {photos.map((src, index) => (
          <motion.button
            key={src}
            type="button"
            className={`xv-gallery-slide ${index % 2 === 0 ? 'is-arch' : ''} ${active === index ? 'is-active' : ''}`}
            onClick={() => setOpen(index)}
            aria-label={`Ver foto ${index + 1} de ${photos.length}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE, delay: Math.min(index, 3) * 0.1 }}
          >
            <motion.img layoutId={`xv-photo-${index}`} src={src} alt="" loading="lazy" draggable={false} />
          </motion.button>
        ))}
      </div>

      <div className="xv-gallery-dots" role="tablist" aria-label="Fotos">
        {photos.map((src, index) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-label={`Foto ${index + 1}`}
            className={active === index ? 'is-active' : ''}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {open !== null ? (
          <motion.div
            className="xv-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ${open + 1} de ${photos.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.img
              key={open}
              layoutId={`xv-photo-${open}`}
              src={photos[open]}
              alt=""
              className="xv-lightbox-img"
              transition={{ duration: 0.6, ease: EASE }}
              onClick={(event) => event.stopPropagation()}
            />
            <button type="button" className="xv-lightbox-close" aria-label="Cerrar" onClick={() => setOpen(null)}>
              <X size={20} strokeWidth={1.5} />
            </button>
            {photos.length > 1 ? (
              <div className="xv-lightbox-nav" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  aria-label="Foto anterior"
                  onClick={() => setOpen((i) => ((i ?? 0) - 1 + photos.length) % photos.length)}
                >
                  <ChevronLeft size={20} strokeWidth={1.5} />
                </button>
                <span>
                  {open + 1} / {photos.length}
                </span>
                <button
                  type="button"
                  aria-label="Foto siguiente"
                  onClick={() => setOpen((i) => ((i ?? 0) + 1) % photos.length)}
                >
                  <ChevronRight size={20} strokeWidth={1.5} />
                </button>
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
