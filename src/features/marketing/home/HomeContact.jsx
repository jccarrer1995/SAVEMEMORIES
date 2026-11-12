import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { mailtoQuote, SITE, whatsappUrl } from '../data/siteContent.js'
import { ArrowIcon, Photo, Reveal, SplitText } from './HomeMotion.jsx'
import { IMAGES } from './homeMedia.js'

export function HomeContact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="contacto" ref={ref} className="sm-section sm-contact">
      <div className="sm-container sm-contact-grid">
        <div>
          <Reveal>
            <p className="sm-eyebrow is-light">
              <span className="sm-dot" /> Hablemos
            </p>
          </Reveal>
          <h2 className="sm-display sm-h1 sm-contact-title">
            <SplitText text="¿Cuándo es *el gran día?*" inView />
          </h2>
          <Reveal delay={0.1}>
            <p className="sm-lead is-light">
              Escríbenos con la fecha, el tipo de evento y la cantidad aproximada de invitados. Te
              respondemos con una propuesta personalizada.
            </p>
          </Reveal>
          <Reveal delay={0.18} className="sm-contact-ctas">
            <a
              href={whatsappUrl(SITE.whatsapp, SITE.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="sm-btn sm-btn--light"
            >
              Escribir por WhatsApp
              <span className="sm-btn-arrow">
                <ArrowIcon />
              </span>
            </a>
            <a href={mailtoQuote()} className="sm-btn sm-btn--ghost-light">
              {SITE.email}
            </a>
          </Reveal>
        </div>

        <Reveal className="sm-contact-media" delay={0.1}>
          <motion.div className="sm-contact-img" style={{ y: imgY }}>
            <Photo img={IMAGES.gardenTable} sizes="(min-width: 1024px) 36vw, 90vw" />
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
