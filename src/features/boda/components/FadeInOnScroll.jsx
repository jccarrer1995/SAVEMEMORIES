import { motion } from 'framer-motion'

/**
 * @param {{ children: import('react').ReactNode, className?: string, delay?: number }} props
 */
export function FadeInOnScroll({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
