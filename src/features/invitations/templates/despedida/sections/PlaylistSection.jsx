import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'

/** @type {Record<string, string>} */
const ICONS = {
  glasses: '🥂',
  people: '🎲',
  dinner: '🍕',
  music: '💃',
  clock: '🌙',
  gift: '🎁',
  church: '💍',
}

export function PlaylistSection() {
  const project = useInvitationProject()
  const items = project.cronograma ?? []
  const ref = useRef(/** @type {HTMLElement | null} */ (null))
  const inView = useInView(ref, { amount: 0.3 })
  const [active, setActive] = useState(0)
  const nombre = project.novia || 'La novia'

  useEffect(() => {
    if (!inView || items.length < 2) return
    const id = window.setInterval(() => setActive((prev) => (prev + 1) % items.length), 2600)
    return () => window.clearInterval(id)
  }, [inView, items.length])

  if (items.length === 0) return null

  return (
    <section ref={ref} className="dsp-bg-ink px-5 py-20 text-white">
      <div className="flex items-center gap-4">
        <div
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl text-[48px]"
          style={{ background: 'linear-gradient(135deg, #ff3d9a, #7b4dff)' }}
          aria-hidden
        >
          <span className="dsp-disco inline-block">💿</span>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#cdf564]">Playlist</p>
          <h2 className="dsp-display mt-1 text-[28px] leading-none">Plan de la noche</h2>
          <p className="mt-2 text-[13px] text-white/70">
            {nombre} · {items.length} momentos
          </p>
        </div>
      </div>

      <ol className="mt-8 space-y-1">
        {items.map((item, index) => {
          const isActive = index === active
          return (
            <motion.li
              key={item.id}
              className="flex items-center gap-4 rounded-xl px-3 py-3"
              style={{ background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.06 }}
            >
              <span className="flex w-5 justify-center text-[14px] text-white/50">
                {isActive ? (
                  <span className="dsp-eq" aria-hidden>
                    <span />
                    <span />
                    <span />
                  </span>
                ) : (
                  index + 1
                )}
              </span>
              <span className="text-[22px]" aria-hidden>
                {ICONS[item.icon] ?? '✨'}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className="block truncate text-[15px] font-semibold"
                  style={{ color: isActive ? '#cdf564' : '#fff' }}
                >
                  {item.label}
                </span>
                <span className="block text-[12px] text-white/55">{nombre} & las chicas</span>
              </span>
              <span className="text-[13px] tabular-nums text-white/70">{item.hora}</span>
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}
