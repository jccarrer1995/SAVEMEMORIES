import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Photo, SplitText } from './HomeMotion.jsx'
import { IMAGES } from './homeMedia.js'

const ROW_A = [IMAGES.heroCouple, IMAGES.candleTable, IMAGES.quinceNight, IMAGES.bouquet, IMAGES.babyCake]
const ROW_B = [IMAGES.stationeryLinen, IMAGES.hands, IMAGES.gardenTable, IMAGES.quince, IMAGES.palmCouple]

export function HomeGallery() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const xA = useTransform(scrollYProgress, [0, 1], ['4%', '-28%'])
  const xB = useTransform(scrollYProgress, [0, 1], ['-26%', '2%'])

  return (
    <section ref={ref} className="sm-gallery" aria-label="Galería de celebraciones">
      <div className="sm-container">
        <p className="sm-display sm-gallery-title">
          <SplitText text="Momentos que merecen una *gran entrada.*" inView />
        </p>
      </div>
      <div className="sm-gallery-rows">
        <motion.div className="sm-gallery-row" style={{ x: xA }}>
          {ROW_A.map((img, index) => (
            <figure key={img.src} className={`sm-gallery-item ${index % 2 ? 'is-tall' : ''}`}>
              <Photo img={img} sizes="(min-width: 1024px) 26vw, 60vw" />
            </figure>
          ))}
        </motion.div>
        <motion.div className="sm-gallery-row" style={{ x: xB }}>
          {ROW_B.map((img, index) => (
            <figure key={img.src} className={`sm-gallery-item ${index % 2 ? '' : 'is-tall'}`}>
              <Photo img={img} sizes="(min-width: 1024px) 26vw, 60vw" />
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
