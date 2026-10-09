import { motion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { formatEnvelopeDate } from '../utils/formatEnvelopeDate.js'
import { OliveSectionDecor } from './OliveSectionDecor.jsx'
import { ReservedPlaces } from './ReservedPlaces.jsx'

/**
 * @param {{ cupos: number, onOpened: () => void, onOpenStart?: () => void }} props
 */
export function EnvelopeScene({ cupos, onOpened, onOpenStart }) {
  const project = useInvitationProject()
  const [started, setStarted] = useState(false)
  const [opened, setOpened] = useState(false)
  const timersRef = useRef(/** @type {number[]} */ ([]))

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  function start() {
    if (started) return
    setStarted(true)
    onOpenStart?.()
    timersRef.current.push(
      window.setTimeout(() => setOpened(true), 50),
      window.setTimeout(() => onOpened(), 2300),
    )
  }

  return (
    <button
      type="button"
      className="boda-envelope-stage"
      onClick={start}
      aria-label="Abrir invitación"
    >
      <OliveSectionDecor flowers={['tl', 'br']} branches={['tr']} />

      <header className="boda-envelope-header">
        <p className="boda-envelope-kicker">Nuestra boda</p>
        <p className="boda-envelope-couple">
          {project.novia} & {project.novio}
        </p>
        <p className="boda-envelope-date">{formatEnvelopeDate(project.fechaIso)}</p>
      </header>

      <div className="boda-envelope-wrap">
        <EnvelopeTapArrow className="boda-envelope-tap-arrow" />
        <div className="boda-envelope">
          <div className="boda-envelope-body" />
          <motion.div
            className="boda-letter"
            animate={opened ? { y: '-38%' } : { y: '22%' }}
            transition={{ duration: 1.1, ease: [0.22, 0.8, 0.28, 1] }}
          />

          <div className="boda-flap boda-flap-left" />
          <div className="boda-flap boda-flap-right" />
          <div className="boda-flap boda-flap-bottom" />

          <svg className="pointer-events-none absolute inset-0 z-[6] h-full w-full" aria-hidden>
            <line x1="0" y1="0" x2="50%" y2="58%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="100%" y1="0" x2="50%" y2="58%" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
            <line x1="0" y1="100%" x2="50%" y2="58%" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="100%" y1="100%" x2="50%" y2="58%" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          </svg>

          <motion.div
            className="boda-flap boda-flap-top origin-top"
            animate={opened ? { rotateX: -168 } : { rotateX: 0 }}
            transition={{ duration: 1.15, ease: [0.22, 0.8, 0.28, 1] }}
          />

          <motion.div
            className="absolute left-1/2 z-20 -translate-x-1/2"
            animate={opened ? { top: '-18%', scale: 0.86, opacity: 0.35 } : { top: '46%', scale: 1, opacity: 1 }}
            transition={{ duration: 1.15, ease: [0.22, 0.8, 0.28, 1] }}
          >
            <WaxSeal />
          </motion.div>
        </div>
      </div>

      {!started ? (
        <motion.p
          className="boda-envelope-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          Toca para abrir la invitación
        </motion.p>
      ) : (
        <span className="boda-envelope-hint boda-envelope-hint--hidden">Toca para abrir la invitación</span>
      )}

      <ReservedPlaces cupos={cupos} />
    </button>
  )
}

/**
 * @param {{ className?: string }} props
 */
function EnvelopeTapArrow({ className = '' }) {
  const markerId = useId().replaceAll(':', '')

  return (
    <svg className={className} viewBox="0 0 150 96" fill="none" aria-hidden>
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 12 12"
          refX="10"
          refY="6"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M1 1.5 L10.5 6 L1 10.5 Z" fill="currentColor" />
        </marker>
      </defs>
      <path
        d="M6 88 C 32 72, 54 54, 76 44 C 96 38, 118 36, 132 35"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeDasharray="3.5 4.5"
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
      />
    </svg>
  )
}

function WaxSeal() {
  return (
    <div
      className="relative h-[72px] w-[72px] rounded-full"
      style={{
        background:
          'radial-gradient(circle at 35% 28%, #f0d48a 0%, #d4ad56 38%, #b8923f 72%, #9a7830 100%)',
        boxShadow:
          'inset 0 2px 5px rgba(255,255,255,0.35), inset 0 -6px 10px rgba(0,0,0,0.22), 0 8px 16px rgba(0,0,0,0.22)',
      }}
    >
      <svg viewBox="0 0 64 64" className="absolute inset-[18%] text-[#8a6b28]" aria-hidden>
        <path
          d="M32 10c2 8 8 12 14 12-6 2-10 8-10 16 0-8-6-14-14-16 6 0 10-4 10-12z"
          fill="currentColor"
          opacity="0.85"
        />
        <path
          d="M32 22c3 6 8 9 13 8-6 4-9 10-8 16-2-6-8-10-14-10 6-1 8-6 9-14z"
          fill="currentColor"
          opacity="0.5"
        />
        <circle cx="32" cy="34" r="4.5" fill="currentColor" />
      </svg>
    </div>
  )
}
