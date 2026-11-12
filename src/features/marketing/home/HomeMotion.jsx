import { motion } from 'framer-motion'
import { Fragment } from 'react'
import { EASE } from './homeMedia.js'

/**
 * Aparece suavemente al entrar en pantalla.
 * @param {{ children: import('react').ReactNode, delay?: number, y?: number, className?: string }} props
 */
export function Reveal({ children, delay = 0, y = 28, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Título que entra palabra por palabra. Las palabras entre *asteriscos* van en cursiva.
 * @param {{ text: string, delay?: number, inView?: boolean }} props
 */
export function SplitText({ text, delay = 0, inView = false }) {
  const words = text.split(' ')
  const trigger = inView
    ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
    : { animate: 'show' }

  return (
    <motion.span
      className="sm-split"
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text.replaceAll('*', '')}
    >
      {words.map((raw, index) => {
        const isEm = raw.startsWith('*')
        const word = raw.replaceAll('*', '')
        return (
          <Fragment key={`${word}-${index}`}>
            <span className="sm-split-mask" aria-hidden>
              <motion.span
                className={isEm ? 'sm-split-word sm-em' : 'sm-split-word'}
                variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
                transition={{ duration: 1, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
            {index < words.length - 1 ? ' ' : null}
          </Fragment>
        )
      })}
    </motion.span>
  )
}

/**
 * @param {{ img: { src: string, srcSet?: string, alt: string }, sizes?: string, className?: string, eager?: boolean }} props
 */
export function Photo({ img, sizes = '(min-width: 1024px) 40vw, 90vw', className, eager = false }) {
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={img.srcSet ? sizes : undefined}
      alt={img.alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}

export function ArrowIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
