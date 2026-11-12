import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LEGACY_BODA_PROJECT_ID } from '../../../app/router/routes.js'
import { SITE, whatsappUrl } from '../data/siteContent.js'
import { ArrowIcon, Photo, SplitText } from './HomeMotion.jsx'
import { EASE, IMAGES } from './homeMedia.js'

const RSVP_FEED = [
  { initials: 'FP', name: 'Familia Pérez', detail: 'Confirmó · 4 personas' },
  { initials: 'AL', name: 'Andrea y Luis', detail: 'Confirmaron · 2 personas' },
  { initials: 'TC', name: 'Tía Carmen', detail: 'Confirmó · 1 persona' },
  { initials: 'JM', name: 'Familia Mora', detail: 'Confirmó · 3 personas' },
]

const EVENT_DATE = new Date('2027-03-14T16:00:00')

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const diff = Math.max(0, target.getTime() - now)
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}

function MiniInvitation() {
  const time = useCountdown(EVENT_DATE)
  const units = [
    ['Días', time.days],
    ['Hrs', time.hours],
    ['Min', time.minutes],
    ['Seg', time.seconds],
  ]

  return (
    <div className="sm-inv">
      <div className="sm-inv-photo">
        <Photo img={IMAGES.palmCouple} eager sizes="280px" />
      </div>
      <p className="sm-inv-kicker">Nuestra boda</p>
      <p className="sm-inv-names">
        Valentina <span>&amp;</span> Mateo
      </p>
      <p className="sm-inv-date">14 · Marzo · 2027</p>
      <div className="sm-inv-count">
        {units.map(([label, value]) => (
          <div key={label}>
            <strong>{String(value).padStart(2, '0')}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="sm-inv-rule" />
      <p className="sm-inv-kicker">Lugares reservados</p>
      <p className="sm-inv-seats">2</p>
      <span className="sm-inv-btn">Confirmar asistencia</span>
      <div className="sm-inv-rule" />
      <p className="sm-inv-kicker">Ceremonia</p>
      <p className="sm-inv-text">16:00 · Hacienda Los Olivos</p>
      <p className="sm-inv-kicker">Recepción</p>
      <p className="sm-inv-text">19:00 · Jardín principal</p>
      <span className="sm-inv-btn sm-inv-btn--ghost">Ver ubicación</span>
    </div>
  )
}

function RsvpToast() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % RSVP_FEED.length), 3200)
    return () => window.clearInterval(timer)
  }, [])
  const item = RSVP_FEED[index]

  return (
    <div className="sm-toast-slot" aria-live="polite">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={item.name}
          className="sm-toast"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.98 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span className="sm-toast-avatar">{item.initials}</span>
          <span className="sm-toast-body">
            <strong>{item.name}</strong>
            <span>{item.detail}</span>
          </span>
          <span className="sm-toast-check" aria-hidden>
            <svg viewBox="0 0 16 16" fill="none">
              <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function RotatingBadge() {
  return (
    <div className="sm-badge" aria-hidden>
      <svg viewBox="0 0 120 120" className="sm-badge-ring">
        <defs>
          <path id="sm-badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text>
          <textPath href="#sm-badge-circle">SAVE THE DATE · CONFIRMA TU ASISTENCIA · </textPath>
        </text>
      </svg>
      <span className="sm-badge-core">✦</span>
    </div>
  )
}

export function HomeHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const archY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const phoneY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18])

  return (
    <section ref={ref} className="sm-hero">
      <div className="sm-container sm-hero-grid">
        <div className="sm-hero-copy">
          <motion.p
            className="sm-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="sm-dot" /> Invitaciones digitales · Bodas, XV años y Baby shower
          </motion.p>

          <h1 className="sm-display sm-h1">
            <SplitText text="Tu evento empieza con una *invitación* que nadie olvida." delay={0.15} />
          </h1>

          <motion.p
            className="sm-lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
          >
            Diseñamos invitaciones elegantes con confirmación de asistencia, un enlace personal para
            cada familia y un panel para organizar a tus invitados sin estrés.
          </motion.p>

          <motion.div
            className="sm-hero-ctas"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          >
            <a
              href={whatsappUrl(SITE.whatsapp, SITE.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="sm-btn"
            >
              Cotizar por WhatsApp
              <span className="sm-btn-arrow">
                <ArrowIcon />
              </span>
            </a>
            <Link to={`/invitacion/${LEGACY_BODA_PROJECT_ID}`} className="sm-btn sm-btn--ghost">
              Ver demo en vivo
            </Link>
          </motion.div>

          <motion.ul
            className="sm-hero-facts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.15 }}
          >
            <li>
              <strong>01</strong> Enlace por invitado
            </li>
            <li>
              <strong>02</strong> Confirmación en vivo
            </li>
            <li>
              <strong>03</strong> Panel y mesas
            </li>
          </motion.ul>
        </div>

        <div className="sm-hero-visual">
          <motion.div
            className="sm-arch"
            style={{ y: archY }}
            initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 28px 28px)' }}
            animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 28px 28px)' }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          >
            <motion.div className="sm-arch-img" style={{ scale: imgScale }}>
              <Photo img={IMAGES.heroCouple} eager sizes="(min-width: 1024px) 34vw, 75vw" />
            </motion.div>
          </motion.div>

          <motion.div className="sm-phone-wrap" style={{ y: phoneY }}>
            <motion.div
              className="sm-phone"
              initial={{ opacity: 0, y: 80, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.55 }}
            >
              <span className="sm-phone-island" aria-hidden />
              <div className="sm-phone-screen">
                <div className="sm-phone-scroll">
                  <MiniInvitation />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="sm-hero-toast"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
          >
            <RsvpToast />
          </motion.div>

          <motion.div
            className="sm-hero-badge"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
          >
            <RotatingBadge />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
