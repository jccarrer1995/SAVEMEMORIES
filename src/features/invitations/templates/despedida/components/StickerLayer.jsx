import { motion, useReducedMotion } from 'framer-motion'

/**
 * @typedef {object} StickerDef
 * @property {string} id
 * @property {string} content Emoji o texto del sticker.
 * @property {'emoji' | 'text'} [kind]
 * @property {string} top
 * @property {string} [left]
 * @property {string} [right]
 * @property {number} [size] Tamaño del emoji en px.
 * @property {number} [rotate]
 * @property {string} [bg]
 * @property {string} [color]
 * @property {number} [float] Duración de la animación flotante (s).
 */

/**
 * Stickers que flotan solos y se pueden arrastrar con el dedo.
 * @param {{
 *   stickers: StickerDef[],
 *   constraintsRef: import('react').RefObject<HTMLElement | null>,
 *   delay?: number,
 * }} props
 */
export function StickerLayer({ stickers, constraintsRef, delay = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <>
      {stickers.map((sticker, index) => {
        const rotate = sticker.rotate ?? 0
        const floatDuration = sticker.float ?? 3 + (index % 4) * 0.6

        return (
          <motion.div
            key={sticker.id}
            className="dsp-sticker"
            style={{ top: sticker.top, left: sticker.left, right: sticker.right }}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.25}
            dragMomentum
            whileDrag={{ scale: 1.25, zIndex: 20 }}
            whileTap={{ scale: 1.15 }}
            initial={{ scale: 0, rotate: rotate - 40 }}
            animate={{ scale: 1, rotate }}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: delay + index * 0.07 }}
            aria-hidden
          >
            <motion.span
              className="block"
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -8, 0], rotate: [0, index % 2 === 0 ? 6 : -6, 0] }
              }
              transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
            >
              {sticker.kind === 'text' ? (
                <span
                  className="dsp-sticker-text"
                  style={{ background: sticker.bg ?? '#ffe066', color: sticker.color ?? '#2a0f2e' }}
                >
                  {sticker.content}
                </span>
              ) : (
                <span className="dsp-sticker-emoji" style={{ fontSize: sticker.size ?? 40 }}>
                  {sticker.content}
                </span>
              )}
            </motion.span>
          </motion.div>
        )
      })}
    </>
  )
}
