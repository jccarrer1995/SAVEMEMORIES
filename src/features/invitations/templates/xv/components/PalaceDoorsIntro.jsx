import { motion } from 'framer-motion'
import { useState } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { GoldDust } from './Effects.jsx'
import { Tiara } from './Ornaments.jsx'

const EASE = [0.22, 1, 0.36, 1]
const OPEN_MS = 1700

/**
 * Portada: dos puertas de salón con un sello al centro. Al tocar, el sello se
 * desvanece, las puertas se abren en 3D y entra la luz.
 * @param {{ grupoInvitados: string, onOpen: () => void, onOpening?: () => void }} props
 */
export function PalaceDoorsIntro({ grupoInvitados, onOpen, onOpening }) {
  const project = useInvitationProject()
  const [opening, setOpening] = useState(false)
  const initial = (project.iniciales || project.novia || 'XV').trim().slice(0, 2)

  function handleOpen() {
    if (opening) return
    setOpening(true)
    onOpening?.()
    window.setTimeout(onOpen, OPEN_MS)
  }

  return (
    <div className={`xv-doors ${opening ? 'is-opening' : ''}`}>
      <div className="xv-doors-light" aria-hidden="true" />
      <GoldDust density={36} />

      <div className="xv-doors-stage">
        {['left', 'right'].map((side) => (
          <motion.div
            key={side}
            className={`xv-door xv-door--${side}`}
            initial={{ rotateY: 0 }}
            animate={opening ? { rotateY: side === 'left' ? -108 : 108 } : { rotateY: 0 }}
            transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.35 }}
            aria-hidden="true"
          >
            <span className="xv-door-panel xv-door-panel--arch" />
            <span className="xv-door-panel xv-door-panel--low" />
            <span className="xv-door-handle" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="xv-doors-content"
        animate={opening ? { opacity: 0, scale: 0.92, filter: 'blur(6px)' } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <motion.p
          className="xv-kicker xv-kicker--light"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        >
          Una invitación para
        </motion.p>
        <motion.p
          className="xv-doors-guest"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        >
          {grupoInvitados}
        </motion.p>

        <motion.button
          type="button"
          className="xv-seal"
          onClick={handleOpen}
          aria-label="Abrir la invitación"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.8 }}
          whileTap={{ scale: 0.94 }}
        >
          <span className="xv-seal-ring" aria-hidden="true" />
          <Tiara className="xv-seal-tiara" animate={false} />
          <span className="xv-seal-initial">{initial}</span>
          <span className="xv-seal-xv">XV</span>
        </motion.button>

        <motion.p
          className="xv-doors-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          Toca el sello para entrar
        </motion.p>
      </motion.div>
    </div>
  )
}
