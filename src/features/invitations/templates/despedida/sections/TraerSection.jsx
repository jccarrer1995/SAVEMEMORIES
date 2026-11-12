import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'

/** @param {string} text */
function parseItems(text) {
  return text
    .split('\n')
    .map((line) => line.replace(/^[-•*·\s]+/, '').trim())
    .filter(Boolean)
}

export function TraerSection() {
  const project = useInvitationProject()
  const items = useMemo(() => parseItems(project.regalos?.texto ?? ''), [project.regalos?.texto])
  const [checked, setChecked] = useState(/** @type {Set<number>} */ (new Set()))

  if (items.length === 0) return null

  const allDone = checked.size === items.length

  function toggle(index) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <section className="dsp-bg-lime px-5 py-20">
      <h2 className="dsp-display text-center text-[34px] leading-tight text-[#2a0f2e]">Traer</h2>
      <p className="dsp-hand mt-1 text-center text-[23px] text-[#2a0f2e]/80">márcalo cuando ya lo tengas ✍️</p>

      <motion.ul
        className="dsp-chunky-shadow mx-auto mt-9 max-w-sm space-y-1 rounded-3xl bg-white p-3"
        initial={{ opacity: 0, y: 30, rotate: 3 }}
        whileInView={{ opacity: 1, y: 0, rotate: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: 'spring', stiffness: 140, damping: 15 }}
      >
        {items.map((item, index) => {
          const isOn = checked.has(index)
          return (
            <li key={`${item}-${index}`}>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-pressed={isOn}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-[#fff0f7]"
              >
                <motion.span
                  className={`dsp-check ${isOn ? 'dsp-check--on' : ''}`}
                  animate={isOn ? { scale: [1, 1.3, 1], rotate: [0, -12, 0] } : { scale: 1 }}
                  transition={{ duration: 0.35 }}
                  aria-hidden
                >
                  {isOn ? '✓' : ''}
                </motion.span>
                <span
                  className={`text-[15px] font-medium transition-opacity ${isOn ? 'line-through opacity-50' : ''}`}
                >
                  {item}
                </span>
              </button>
            </li>
          )
        })}
      </motion.ul>

      <AnimatePresence>
        {allDone ? (
          <motion.p
            className="dsp-display mt-7 text-center text-[20px] text-[#2a0f2e]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 12 }}
          >
            ¡Lista para la fiesta! 💅
          </motion.p>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
