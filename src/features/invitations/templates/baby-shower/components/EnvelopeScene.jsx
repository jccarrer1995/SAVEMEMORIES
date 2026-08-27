import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'

/**
 * @param {{ onOpened: () => void, onOpenStart?: () => void }} props
 */
export function EnvelopeScene({ onOpened, onOpenStart }) {
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
    <button type="button" className="bs-envelope-stage" onClick={start} aria-label="Abrir invitación">
      <div className="bs-envelope">
        <div className="bs-envelope-body" />
        <motion.div
          className="bs-letter"
          animate={opened ? { y: '-38%' } : { y: '22%' }}
          transition={{ duration: 1.1, ease: [0.22, 0.8, 0.28, 1] }}
        />

        <div className="bs-flap bs-flap-left" />
        <div className="bs-flap bs-flap-right" />
        <div className="bs-flap bs-flap-bottom" />

        <svg className="pointer-events-none absolute inset-0 z-[6] h-full w-full" aria-hidden>
          <line x1="0" y1="0" x2="50%" y2="58%" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line x1="100%" y1="0" x2="50%" y2="58%" stroke="rgba(80, 60, 100, 0.16)" strokeWidth="1" />
          <line x1="0" y1="100%" x2="50%" y2="58%" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <line x1="100%" y1="100%" x2="50%" y2="58%" stroke="rgba(80, 60, 100, 0.14)" strokeWidth="1" />
        </svg>

        <motion.div
          className="bs-flap bs-flap-top origin-top"
          animate={opened ? { rotateX: -168 } : { rotateX: 0 }}
          transition={{ duration: 1.15, ease: [0.22, 0.8, 0.28, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        />

        <motion.div
          className="absolute left-1/2 z-20 -translate-x-1/2"
          animate={opened ? { top: '-18%', scale: 0.86, opacity: 0.35 } : { top: '46%', scale: 1, opacity: 1 }}
          transition={{ duration: 1.15, ease: [0.22, 0.8, 0.28, 1] }}
        >
          <div
            className="flex h-[72px] w-[72px] items-center justify-center rounded-full text-3xl"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #f8d9e8 0%, #e8b4cf 55%, #c995b8 100%)',
              boxShadow: '0 8px 18px rgba(120, 90, 140, 0.28)',
            }}
          >
            🍼
          </div>
        </motion.div>

        <p className="bs-envelope-initials">{project.iniciales}</p>
      </div>

      {!started ? (
        <motion.p
          className="bs-envelope-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          Toca para abrir
        </motion.p>
      ) : (
        <span className="bs-envelope-hint opacity-0">Toca para abrir</span>
      )}
    </button>
  )
}
