import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { GoldDust, Reveal } from '../components/Effects.jsx'

function getRemaining(targetMs) {
  const diff = Math.max(0, targetMs - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    done: diff === 0,
    units: [
      { id: 'dias', label: 'Días', value: Math.floor(totalSeconds / 86400) },
      { id: 'horas', label: 'Horas', value: Math.floor((totalSeconds % 86400) / 3600) },
      { id: 'min', label: 'Minutos', value: Math.floor((totalSeconds % 3600) / 60) },
      { id: 'seg', label: 'Segundos', value: totalSeconds % 60 },
    ],
  }
}

/** Número que rueda hacia arriba cuando cambia. */
function RollingNumber({ value }) {
  const text = String(value).padStart(2, '0')
  return (
    <span className="xv-roll">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function CountdownSection() {
  const project = useInvitationProject()
  const targetMs = new Date(project.fechaIso).getTime()
  const [time, setTime] = useState(() => getRemaining(targetMs))
  const ref = useRef(/** @type {HTMLElement | null} */ (null))
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const numeralScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.15])
  const numeralOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    const id = window.setInterval(() => setTime(getRemaining(targetMs)), 1000)
    return () => window.clearInterval(id)
  }, [targetMs])

  if (!Number.isFinite(targetMs)) return null

  return (
    <section ref={ref} className="xv-section xv-night xv-countdown">
      <GoldDust density={30} />
      <motion.span
        className="xv-numeral"
        style={{ scale: numeralScale, opacity: numeralOpacity }}
        aria-hidden="true"
      >
        XV
      </motion.span>

      <div className="xv-countdown-inner">
        <Reveal>
          <p className="xv-kicker xv-kicker--light">{time.done ? 'El gran día' : 'Falta muy poco'}</p>
          <h2 className="xv-title xv-title--light">
            {time.done ? <>¡Hoy es <em>la noche</em>!</> : <>Cuenta <em>regresiva</em></>}
          </h2>
        </Reveal>

        <ol className="xv-countdown-grid">
          {time.units.map((unit, index) => (
            <motion.li
              key={unit.id}
              className="xv-countdown-unit"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 + index * 0.1 }}
            >
              <RollingNumber value={unit.value} />
              <span className="xv-countdown-label">{unit.label}</span>
            </motion.li>
          ))}
        </ol>

        <Reveal delay={0.4}>
          <p className="xv-countdown-date">{project.fechaLabel}</p>
        </Reveal>
      </div>
    </section>
  )
}
