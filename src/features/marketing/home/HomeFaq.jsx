import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FAQ_ITEMS, SITE, whatsappUrl } from '../data/siteContent.js'
import { Reveal, SplitText } from './HomeMotion.jsx'
import { EASE } from './homeMedia.js'

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="sm-section">
      <div className="sm-container sm-faq-grid">
        <div className="sm-faq-aside">
          <Reveal>
            <p className="sm-eyebrow">
              <span className="sm-dot" /> Preguntas frecuentes
            </p>
          </Reveal>
          <h2 className="sm-display sm-h2">
            <SplitText text="Resolvemos *tus dudas.*" inView />
          </h2>
          <Reveal delay={0.1}>
            <p className="sm-lead sm-lead--narrow">
              ¿No encuentras lo que buscas?{' '}
              <a
                href={whatsappUrl(SITE.whatsapp, SITE.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="sm-inline-link"
              >
                Escríbenos por WhatsApp
              </a>
              .
            </p>
          </Reveal>
        </div>

        <ul className="sm-faq">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `sm-faq-panel-${index}`
            return (
              <Reveal key={item.question} delay={index * 0.05}>
                <li className={`sm-faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="sm-faq-q"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="sm-faq-num">0{index + 1}</span>
                    <span className="sm-faq-text">{item.question}</span>
                    <span className="sm-faq-icon" aria-hidden />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        className="sm-faq-a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                      >
                        <p>{item.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
