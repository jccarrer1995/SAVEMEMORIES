import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { PROCESS_STEPS } from '../data/siteContent.js'
import { Photo, Reveal, SplitText } from './HomeMotion.jsx'
import { EASE, IMAGES } from './homeMedia.js'

const STEP_IMAGES = [IMAGES.stationeryLinen, IMAGES.bouquet, IMAGES.hands, IMAGES.candleTable]

function ProcessStep({ step, index, onActive }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })

  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])

  return (
    <li ref={ref} className={`sm-step ${inView ? 'is-active' : ''}`}>
      <span className="sm-step-num sm-display">{step.step}</span>
      <div>
        <h3 className="sm-display sm-step-title">{step.title}</h3>
        <p className="sm-step-text">{step.text}</p>
      </div>
      <div className="sm-step-photo">
        <Photo img={STEP_IMAGES[index]} sizes="90vw" />
      </div>
    </li>
  )
}

export function HomeProcess() {
  const [active, setActive] = useState(0)

  return (
    <section id="proceso" className="sm-section sm-process">
      <div className="sm-container sm-process-grid">
        <div className="sm-process-aside">
          <Reveal>
            <p className="sm-eyebrow is-light">
              <span className="sm-dot" /> Cómo funciona
            </p>
          </Reveal>
          <h2 className="sm-display sm-h2">
            <SplitText text="De la idea a las *confirmaciones* en cuatro pasos." inView />
          </h2>

          <div className="sm-process-frame">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="sm-process-img"
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={{ clipPath: 'inset(0 0 0% 0)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <Photo img={STEP_IMAGES[active]} sizes="(min-width: 1024px) 38vw, 90vw" />
              </motion.div>
            </AnimatePresence>
            <span className="sm-process-counter">
              0{active + 1} <i>/ 0{PROCESS_STEPS.length}</i>
            </span>
          </div>
        </div>

        <ol className="sm-steps">
          {PROCESS_STEPS.map((step, index) => (
            <ProcessStep key={step.step} step={step} index={index} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  )
}
