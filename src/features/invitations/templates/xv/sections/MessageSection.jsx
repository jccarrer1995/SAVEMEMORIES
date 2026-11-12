import { motion } from 'framer-motion'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { Flourish } from '../components/Ornaments.jsx'

const EASE = [0.22, 1, 0.36, 1]

/** Divide la cita en frases para que aparezcan una tras otra. */
function splitSentences(text) {
  return text
    .split(/(?<=[.!?…])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

export function MessageSection() {
  const project = useInvitationProject()
  const sentences = splitSentences(project.cita || '')
  if (sentences.length === 0) return null

  return (
    <section id="xv-mensaje" className="xv-section xv-message">
      <Flourish className="xv-gold" />

      <blockquote className="xv-quote">
        {sentences.map((sentence, index) => (
          <motion.span
            key={index}
            className="xv-quote-line"
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE, delay: index * 0.18 }}
          >
            {sentence}{' '}
          </motion.span>
        ))}
      </blockquote>

      {/* El observador va en el contenedor: un elemento recortado al 100 % nunca "entra" en pantalla. */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <motion.p
          className="xv-signature"
          variants={{
            hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
            show: { opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.6, ease: EASE, delay: 0.3 } },
          }}
        >
          {project.novia}
        </motion.p>
      </motion.div>
    </section>
  )
}
