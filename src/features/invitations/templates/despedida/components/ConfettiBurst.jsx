import { motion } from 'framer-motion'
import { useMemo } from 'react'

const COLORS = ['#ff3d9a', '#ffe066', '#cdf564', '#8fd8ff', '#7b4dff', '#ffffff']
const SHAPES = ['💖', '✨', '💋', '⭐']

/**
 * Lluvia de confeti a pantalla completa (se monta una sola vez).
 * @param {{ pieces?: number }} props
 */
export function ConfettiBurst({ pieces = 46 }) {
  const items = useMemo(
    () =>
      Array.from({ length: pieces }, (_, index) => ({
        id: index,
        x: Math.random() * 100,
        drift: (Math.random() - 0.5) * 160,
        delay: Math.random() * 0.35,
        duration: 1.8 + Math.random() * 1.4,
        rotate: (Math.random() - 0.5) * 720,
        color: COLORS[index % COLORS.length],
        emoji: index % 7 === 0 ? SHAPES[index % SHAPES.length] : null,
        width: 6 + Math.random() * 6,
      })),
    [pieces],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="absolute top-0 block"
          style={{ left: `${item.x}%` }}
          initial={{ y: -40, x: 0, rotate: 0, opacity: 1 }}
          animate={{ y: '105vh', x: item.drift, rotate: item.rotate, opacity: [1, 1, 0.9, 0] }}
          transition={{ duration: item.duration, delay: item.delay, ease: [0.2, 0.6, 0.4, 1] }}
        >
          {item.emoji ? (
            <span className="text-xl">{item.emoji}</span>
          ) : (
            <span
              className="block rounded-[2px]"
              style={{ width: item.width, height: item.width * 1.6, background: item.color }}
            />
          )}
        </motion.span>
      ))}
    </div>
  )
}
