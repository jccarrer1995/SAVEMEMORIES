import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { Petals } from '../components/Effects.jsx'
import { RoseSprig, Tiara } from '../components/Ornaments.jsx'
import { getXvDateParts } from '../utils/xvDate.js'

const EASE = [0.22, 1, 0.36, 1]

export function HeroSection() {
  const project = useInvitationProject()
  const ref = useRef(/** @type {HTMLElement | null} */ (null))
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const date = getXvDateParts(project.fechaIso)
  const hero = project.fotos?.hero

  return (
    <section ref={ref} className="xv-hero">
      <Petals count={16} />

      <motion.div
        className="xv-hero-top"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      >
        <span className="xv-rule" aria-hidden="true" />
        <p className="xv-kicker">Mis quince años</p>
        <span className="xv-rule" aria-hidden="true" />
      </motion.div>

      <div className="xv-hero-arch-wrap">
        <Tiara className="xv-hero-tiara" />

        <motion.div
          className="xv-arch"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
        >
          {hero ? (
            <motion.img
              src={hero}
              alt={`Retrato de ${project.novia}`}
              className="xv-arch-img"
              style={{ y: photoY, scale: photoScale }}
              initial={{ filter: 'blur(14px) saturate(0.6)' }}
              animate={{ filter: 'blur(0px) saturate(1)' }}
              transition={{ duration: 2.2, ease: EASE, delay: 0.4 }}
            />
          ) : (
            <span className="xv-arch-empty" aria-hidden="true">
              XV
            </span>
          )}
          <span className="xv-arch-sheen" aria-hidden="true" />
        </motion.div>
        <span className="xv-arch-outline" aria-hidden="true" />

        <RoseSprig className="xv-hero-rose xv-hero-rose--left" delay={1.2} />
        <RoseSprig className="xv-hero-rose xv-hero-rose--right" delay={1.4} />
      </div>

      <motion.div className="xv-hero-text" style={{ y: nameY }}>
        <h1 className="xv-hero-name">
          <motion.span
            className="xv-foil xv-hero-name-text"
            initial={{ opacity: 0, letterSpacing: '0.45em', filter: 'blur(14px)' }}
            animate={{ opacity: 1, letterSpacing: '-0.02em', filter: 'blur(0px)' }}
            transition={{ duration: 2.4, ease: EASE, delay: 1 }}
          >
            {project.novia || 'Quinceañera'}
          </motion.span>
        </h1>

        {date ? (
          <motion.div
            className="xv-datestrip"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 1.9 }}
          >
            <span className="xv-datestrip-side">{date.weekday}</span>
            <span className="xv-datestrip-day">{date.day}</span>
            <span className="xv-datestrip-side">
              {date.monthName} {date.year}
            </span>
          </motion.div>
        ) : (
          <p className="xv-hero-date">{project.fechaLabel}</p>
        )}
      </motion.div>

      <motion.a
        href="#xv-mensaje"
        className="xv-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
      >
        <span>Desliza</span>
        <span className="xv-scroll-line" aria-hidden="true" />
      </motion.a>
    </section>
  )
}
