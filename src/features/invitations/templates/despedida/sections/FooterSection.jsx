import { motion } from 'framer-motion'
import { Marquee } from '../components/Marquee.jsx'

export function FooterSection() {
  return (
    <footer className="dsp-bg-ink overflow-hidden pb-24 text-center text-white">
      <Marquee
        reverse
        className="bg-[#ffe066] text-[#2a0f2e]"
        items={['Bride squad', 'Última noche', 'Sin novio, sin reglas']}
      />
      <motion.p
        className="mt-14 text-[44px]"
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2 }}
        aria-hidden
      >
        🤫
      </motion.p>
      <p className="dsp-display mx-auto mt-3 max-w-[300px] px-6 text-[22px] leading-snug">
        Lo que pasa en la despedida, se queda en la despedida
      </p>
      <p className="mt-10 text-[10px] uppercase tracking-[0.3em] text-white/40">SAVEMEMORIES</p>
    </footer>
  )
}
