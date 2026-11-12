import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { Marquee } from '../components/Marquee.jsx'
import { StickerLayer } from '../components/StickerLayer.jsx'

/** @type {import('../components/StickerLayer.jsx').StickerDef[]} */
const HERO_STICKERS = [
  { id: 'party', content: '🎉', top: '5%', left: '6%', size: 46, rotate: -12 },
  { id: 'lips', content: '💋', top: '6%', right: '8%', size: 42, rotate: 14 },
  { id: 'soltera', content: '¡SOLTERA!', kind: 'text', top: '17%', right: '4%', rotate: 9, bg: '#cdf564' },
  { id: 'star', content: '⭐', top: '19%', left: '9%', size: 28, rotate: 20 },
  { id: 'cherry', content: '🍒', top: '64%', left: '5%', size: 38, rotate: -8 },
  { id: 'drink', content: '🍸', top: '68%', right: '8%', size: 40, rotate: 12 },
  { id: 'xoxo', content: 'XOXO', kind: 'text', top: '80%', left: '7%', rotate: -10, bg: '#8fd8ff' },
  { id: 'crown', content: '👑', top: '84%', right: '20%', size: 36, rotate: -6 },
]

export function HeroSection() {
  const project = useInvitationProject()
  const constraintsRef = useRef(/** @type {HTMLElement | null} */ (null))
  const nombre = project.novia || 'La novia'

  return (
    <header ref={constraintsRef} className="dsp-bg-pink relative overflow-hidden">
      <div className="relative z-[2] flex min-h-[92dvh] flex-col items-center justify-center px-6 pb-16 pt-20 text-center">
        <motion.span
          className="dsp-chunky-shadow inline-flex rounded-full bg-white px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.2em]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          Noche de chicas
        </motion.span>

        <motion.p
          className="dsp-hand mt-8 text-[30px] leading-none text-white"
          initial={{ opacity: 0, rotate: -8 }}
          animate={{ opacity: 1, rotate: -4 }}
          transition={{ delay: 0.3 }}
        >
          la última noche de soltera de
        </motion.p>

        <motion.h1
          className="dsp-display dsp-outline-title mt-3 break-words text-[clamp(64px,22vw,96px)]"
          initial={{ scale: 0.4, rotate: -10, opacity: 0 }}
          animate={{ scale: 1, rotate: -3, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 11, delay: 0.45 }}
        >
          {nombre}
        </motion.h1>

        {project.fotos?.hero ? (
          <motion.div
            className="dsp-polaroid mt-10 w-[68%] max-w-[260px]"
            initial={{ y: 60, rotate: 12, opacity: 0 }}
            animate={{ y: 0, rotate: 4, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.7 }}
          >
            <span className="dsp-tape" aria-hidden />
            <img src={project.fotos.hero} alt={nombre} className="aspect-[4/5] w-full object-cover" />
            <p className="dsp-hand absolute inset-x-0 bottom-1.5 text-center text-[20px] text-[#2a0f2e]">
              bride to be 💍
            </p>
          </motion.div>
        ) : null}

        <motion.p
          className="dsp-chunky-shadow mt-10 inline-flex rounded-2xl bg-[#ffe066] px-5 py-3 text-[15px] font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          📅 {project.fechaLabel}
        </motion.p>

        <motion.p
          className="mt-8 text-[12px] font-medium text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.6, 1] }}
          transition={{ delay: 1.6, duration: 1.6 }}
        >
          psst… los stickers se mueven 👆
        </motion.p>
      </div>

      <StickerLayer stickers={HERO_STICKERS} constraintsRef={constraintsRef} delay={0.6} />

      <Marquee
        className="relative z-[3] -mb-px rotate-[-2deg] scale-[1.06] bg-[#2a0f2e] text-[#cdf564]"
        items={['Soltera hasta el final', 'Lo que pasa aquí, se queda aquí', 'Noche de chicas']}
      />
    </header>
  )
}
