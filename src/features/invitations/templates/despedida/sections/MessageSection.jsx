import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'

const REACTIONS = ['❤️', '🔥', '😂', '🥂']

export function MessageSection() {
  const project = useInvitationProject()
  const ref = useRef(/** @type {HTMLElement | null} */ (null))
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [typing, setTyping] = useState(true)
  const nombre = project.novia || 'La novia'
  const inicial = (project.iniciales || nombre).trim().charAt(0).toUpperCase()

  useEffect(() => {
    if (!inView) return
    const id = window.setTimeout(() => setTyping(false), 1400)
    return () => window.clearTimeout(id)
  }, [inView])

  if (!project.cita) return null

  return (
    <section ref={ref} className="dsp-bg-grid px-5 pb-20 pt-4">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5a3a5e]">
        Mensaje de {nombre}
      </p>

      <div className="mt-6 flex items-end gap-2.5">
        <span
          className="dsp-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[2.5px] border-[#2a0f2e] bg-[#ffe066] text-[18px]"
          aria-hidden
        >
          {inicial}
        </span>

        <div className="min-w-0 flex-1">
          <p className="mb-1 ml-1 text-[12px] font-semibold text-[#e01f7c]">{nombre}</p>
          <AnimatePresence mode="wait">
            {typing ? (
              <motion.div
                key="typing"
                className="dsp-bubble dsp-chunky-shadow dsp-typing inline-flex"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                aria-label="Escribiendo"
              >
                <span />
                <span />
                <span />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                className="dsp-bubble dsp-chunky-shadow"
                initial={{ opacity: 0, scale: 0.85, originX: 0, originY: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                {project.cita}
              </motion.div>
            )}
          </AnimatePresence>

          {!typing ? (
            <div className="ml-2 mt-3 flex gap-1.5">
              {REACTIONS.map((emoji, index) => (
                <motion.span
                  key={emoji}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#2a0f2e] bg-white text-[15px]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.3 + index * 0.12 }}
                  aria-hidden
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
