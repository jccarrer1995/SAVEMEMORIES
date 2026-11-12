import { motion, useScroll, useSpring } from 'framer-motion'
import { Cake, Church, Clock3, Crown, Gift, Music2, Sparkles, UsersRound, UtensilsCrossed, Wine } from 'lucide-react'
import { useRef } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { Reveal } from '../components/Effects.jsx'

const ICONS = {
  church: Church,
  glasses: Wine,
  waltz: Crown,
  dinner: UtensilsCrossed,
  music: Music2,
  cake: Cake,
  gift: Gift,
  people: UsersRound,
  clock: Clock3,
}

export function ProgramSection() {
  const project = useInvitationProject()
  const items = Array.isArray(project.cronograma) ? project.cronograma : []
  const listRef = useRef(/** @type {HTMLOListElement | null} */ (null))
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  if (items.length === 0) return null

  return (
    <section className="xv-section xv-program">
      <Reveal>
        <p className="xv-kicker">Programa</p>
        <h2 className="xv-title">
          Una noche <em>para recordar</em>
        </h2>
      </Reveal>

      <ol ref={listRef} className="xv-timeline">
        <span className="xv-timeline-track" aria-hidden="true">
          <motion.span className="xv-timeline-fill" style={{ scaleY: progress }} />
        </span>

        {items.map((item, index) => {
          const Icon = ICONS[item.icon] ?? Sparkles
          return (
            <motion.li
              key={item.id ?? index}
              className="xv-timeline-item"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="xv-timeline-dot"
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              >
                <Icon size={18} strokeWidth={1.3} aria-hidden="true" />
              </motion.span>
              <span className="xv-timeline-time">{item.hora}</span>
              <span className="xv-timeline-label">{item.label}</span>
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}
