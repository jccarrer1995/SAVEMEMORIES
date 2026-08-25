import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { BODA } from '../data.js'

/**
 * @param {{ onOpened: () => void, onOpenStart?: () => void }} props
 */
export function EnvelopeScene({ onOpened, onOpenStart }) {
  const [started, setStarted] = useState(false)
  const [opened, setOpened] = useState(false)
  const timersRef = useRef(/** @type {number[]} */ ([]))

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  function start() {
    if (started) return
    setStarted(true)
    onOpenStart?.()
    timersRef.current.push(window.setTimeout(() => setOpened(true), 50))
    timersRef.current.push(window.setTimeout(() => onOpened(), 2300))
  }

  return (
    <button
      type="button"
      className="boda-paper relative h-[100dvh] w-full cursor-pointer overflow-hidden border-0 p-0"
      onClick={start}
      aria-label="Abrir invitación"
    >
      <motion.div
        className="boda-liner"
        animate={opened ? { opacity: 1 } : { opacity: 0.35 }}
        transition={{ duration: 0.8 }}
      />

      <div className="boda-flap boda-flap-left" />
      <div className="boda-flap boda-flap-right" />
      <div className="boda-flap boda-flap-bottom" />

      <svg className="pointer-events-none absolute inset-0 z-[6] h-full w-full" aria-hidden>
        <line x1="0" y1="0" x2="50%" y2="52%" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        <line x1="100%" y1="0" x2="50%" y2="52%" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
        <line x1="0" y1="100%" x2="50%" y2="52%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="100%" y1="100%" x2="50%" y2="52%" stroke="rgba(0,0,0,0.16)" strokeWidth="1" />
      </svg>

      <motion.div
        className="boda-flap boda-flap-top origin-top"
        animate={
          opened
            ? { y: '-62%', opacity: 0.2 }
            : { y: '0%', opacity: 1 }
        }
        transition={{ duration: 1.2, ease: [0.22, 0.8, 0.28, 1] }}
      />

      <motion.div
        className="absolute left-1/2 z-20 -translate-x-1/2"
        animate={opened ? { top: '8%', scale: 0.9 } : { top: '41%', scale: 1 }}
        transition={{ duration: 1.15, ease: [0.22, 0.8, 0.28, 1] }}
      >
        <WaxSeal />
      </motion.div>

      <p
        className="boda-serif absolute left-1/2 top-[56%] z-20 -translate-x-1/2 text-[42px] tracking-[0.18em] text-[#e8eef6]"
        style={{ textShadow: '0 1px 0 rgba(255,255,255,0.18), 0 8px 16px rgba(0,0,0,0.25)' }}
      >
        {BODA.iniciales}
      </p>

      {!started ? (
        <motion.p
          className="absolute bottom-24 left-0 right-0 text-center text-[11px] tracking-[0.35em] text-white/70 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Toca para abrir
        </motion.p>
      ) : null}
    </button>
  )
}

function WaxSeal() {
  return (
    <div
      className="relative h-[92px] w-[92px] rounded-full"
      style={{
        background:
          'radial-gradient(circle at 35% 30%, #4a6284 0%, #2b405c 42%, #1a2a40 78%)',
        boxShadow:
          'inset 0 2px 4px rgba(255,255,255,0.18), inset 0 -6px 10px rgba(0,0,0,0.35), 0 8px 16px rgba(0,0,0,0.28)',
      }}
    >
      <svg viewBox="0 0 64 64" className="absolute inset-[18%] text-[#d7e0ec]" aria-hidden>
        <path
          d="M32 10c2 8 8 12 14 12-6 2-10 8-10 16 0-8-6-14-14-16 6 0 10-4 10-12z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M32 22c3 6 8 9 13 8-6 4-9 10-8 16-2-6-8-10-14-10 6-1 8-6 9-14z"
          fill="currentColor"
          opacity="0.55"
        />
        <circle cx="32" cy="34" r="4.5" fill="currentColor" />
      </svg>
    </div>
  )
}
