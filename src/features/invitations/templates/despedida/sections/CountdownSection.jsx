import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'

function getRemaining(targetMs) {
  const diff = Math.max(0, targetMs - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    done: diff === 0,
    units: [
      { id: 'dias', label: 'días', value: Math.floor(totalSeconds / 86400) },
      { id: 'horas', label: 'horas', value: Math.floor((totalSeconds % 86400) / 3600) },
      { id: 'min', label: 'min', value: Math.floor((totalSeconds % 3600) / 60) },
      { id: 'seg', label: 'seg', value: totalSeconds % 60 },
    ],
  }
}

const TILE_COLORS = ['#ff3d9a', '#7b4dff', '#cdf564', '#8fd8ff']
const TILE_TILT = [-4, 3, -2, 4]

export function CountdownSection() {
  const project = useInvitationProject()
  const targetMs = new Date(project.fechaIso).getTime()
  const [time, setTime] = useState(() => getRemaining(targetMs))

  useEffect(() => {
    const id = window.setInterval(() => setTime(getRemaining(targetMs)), 1000)
    return () => window.clearInterval(id)
  }, [targetMs])

  if (!Number.isFinite(targetMs)) return null

  return (
    <section className="dsp-bg-grid px-5 pb-16 pt-20 text-center">
      <motion.h2
        className="dsp-display text-[34px] leading-tight text-[#2a0f2e]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        {time.done ? '¡Es hoy, es hoy! 🎉' : 'Cuenta regresiva'}
      </motion.h2>
      <p className="dsp-hand mt-1 text-[24px] text-[#e01f7c]">para la noche más épica</p>

      <div className="mt-9 grid grid-cols-4 gap-2.5">
        {time.units.map((unit, index) => (
          <motion.div
            key={unit.id}
            className="dsp-chunky-shadow flex flex-col items-center rounded-2xl py-3"
            style={{ background: TILE_COLORS[index], color: index < 2 ? '#fff' : '#2a0f2e' }}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: TILE_TILT[index] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 220, damping: 13, delay: index * 0.08 }}
          >
            <motion.span
              key={unit.value}
              className="dsp-display text-[30px] leading-none"
              initial={{ y: -8, opacity: 0.4 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {String(unit.value).padStart(2, '0')}
            </motion.span>
            <span className="mt-1 text-[11px] font-semibold uppercase tracking-wider">{unit.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
