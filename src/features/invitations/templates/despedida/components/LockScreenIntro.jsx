import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'

function formatClock(date) {
  return date.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function formatLockDate(date) {
  const label = date.toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long' })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

/**
 * Intro con pantalla de bloqueo de celular: llegan mensajes del chat de amigas
 * y se desliza para entrar a la invitación.
 * @param {{ grupoInvitados: string, onUnlock: () => void }} props
 */
export function LockScreenIntro({ grupoInvitados, onUnlock }) {
  const project = useInvitationProject()
  const nombre = project.novia || 'la novia'
  const [now, setNow] = useState(() => new Date())
  const [unlocking, setUnlocking] = useState(false)
  const trackRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const thumbX = useMotionValue(0)
  const labelOpacity = useTransform(thumbX, [0, 140], [1, 0])

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15_000)
    return () => window.clearInterval(id)
  }, [])

  function unlock() {
    if (unlocking) return
    setUnlocking(true)
    onUnlock()
  }

  function handleDragEnd() {
    const track = trackRef.current
    if (!track) return
    const max = track.offsetWidth - 60
    if (thumbX.get() > max * 0.6) unlock()
  }

  const notifications = [
    { id: 'n1', from: 'Las chicas 💅', text: 'Sofi: ¿YA VIERON? 😱', icon: '💬', bg: '#34c759' },
    { id: 'n2', from: 'Las chicas 💅', text: `Cami: ${nombre} se nos casa 💍`, icon: '💬', bg: '#34c759' },
    {
      id: 'n3',
      from: 'Las chicas 💅',
      text: 'Cami: …pero antes nos vamos de despedida 💃🥂',
      icon: '💬',
      bg: '#34c759',
    },
  ]

  return (
    <div className="dsp-lock">
      <motion.span
        className="dsp-lock-blob"
        style={{ width: 260, height: 260, background: '#ff3d9a', top: '8%', left: '-20%' }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.span
        className="dsp-lock-blob"
        style={{ width: 220, height: 220, background: '#7b4dff', bottom: '18%', right: '-18%' }}
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      <div className="relative z-[1] flex flex-1 flex-col px-5 pt-14">
        <div className="text-center">
          <p className="text-[15px] font-medium text-white/85">{formatLockDate(now)}</p>
          <p className="dsp-lock-time mt-1">{formatClock(now)}</p>
        </div>

        <div className="mt-10 space-y-2.5">
          {notifications.map((item, index) => (
            <motion.div
              key={item.id}
              className="dsp-notif"
              initial={{ opacity: 0, y: -24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24, delay: 0.5 + index * 0.85 }}
            >
              <span className="dsp-notif-icon" style={{ background: item.bg }} aria-hidden>
                {item.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[13px] font-semibold">{item.from}</span>
                  <span className="text-[11px] text-white/60">ahora</span>
                </span>
                <span className="mt-0.5 block text-[14px] leading-snug text-white/95">{item.text}</span>
              </span>
            </motion.div>
          ))}

          <motion.button
            type="button"
            onClick={unlock}
            className="dsp-notif dsp-notif--highlight w-full"
            initial={{ opacity: 0, y: -24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: [0.94, 1.03, 1] }}
            transition={{ duration: 0.6, delay: 0.5 + notifications.length * 0.85 }}
          >
            <span className="dsp-notif-icon bg-[#ff3d9a]" aria-hidden>
              💌
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-semibold">Invitación VIP</span>
                <span className="text-[11px] text-[#5a3a5e]">ahora</span>
              </span>
              <span className="mt-0.5 block text-[14px] leading-snug">
                Tienes un pase a la despedida de <b>{nombre}</b> para <b>{grupoInvitados}</b> 🎟️
              </span>
            </span>
          </motion.button>
        </div>
      </div>

      <motion.div
        className="relative z-[1] px-6 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 + (notifications.length + 1) * 0.85 }}
      >
        <div ref={trackRef} className="dsp-slider">
          <motion.p
            className="dsp-slider-label pointer-events-none absolute inset-0 flex items-center justify-center pl-10 text-[15px] font-medium"
            style={{ opacity: labelOpacity }}
          >
            desliza para entrar →
          </motion.p>
          <motion.button
            type="button"
            className="dsp-slider-thumb"
            style={{ x: thumbX }}
            drag="x"
            dragConstraints={trackRef}
            dragElastic={0.05}
            dragMomentum={false}
            dragSnapToOrigin={!unlocking}
            onDragEnd={handleDragEnd}
            onTap={unlock}
            aria-label="Abrir invitación"
          >
            💃
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
