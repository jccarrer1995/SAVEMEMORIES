import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Polvo dorado que flota y titila (canvas, se pausa fuera de pantalla).
 * @param {{ density?: number, className?: string, color?: string }} props
 */
export function GoldDust({ density = 42, className = '', color = '220, 194, 143' }) {
  const canvasRef = useRef(/** @type {HTMLCanvasElement | null} */ (null))
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let width = 0
    let height = 0
    let frame = 0
    let visible = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const particles = Array.from({ length: density }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 1.6,
      speed: 0.00012 + Math.random() * 0.00035,
      drift: (Math.random() - 0.5) * 0.00018,
      phase: Math.random() * Math.PI * 2,
      twinkle: 0.6 + Math.random() * 1.6,
    }))

    function resize() {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function tick(time) {
      frame = requestAnimationFrame(tick)
      if (!visible) return
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.y -= p.speed
        p.x += p.drift
        if (p.y < -0.05) {
          p.y = 1.05
          p.x = Math.random()
        }
        const alpha = 0.25 + 0.75 * Math.abs(Math.sin(time * 0.001 * p.twinkle + p.phase))
        const x = p.x * width
        const y = p.y * height
        const glow = ctx.createRadialGradient(x, y, 0, x, y, p.r * 4)
        glow.addColorStop(0, `rgba(${color}, ${alpha})`)
        glow.addColorStop(1, `rgba(${color}, 0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(x, y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    observer.observe(canvas)
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    resize()
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
    }
  }, [density, color, reduced])

  return <canvas ref={canvasRef} className={`xv-dust ${className}`} aria-hidden="true" />
}

const PETAL_PATH = 'M10 0 C17 6 19 15 10 24 C1 15 3 6 10 0 Z'

/**
 * Pétalos que caen lento, girando (CSS, sin JS por cuadro).
 * @param {{ count?: number, burst?: boolean }} props
 */
export function Petals({ count = 14, burst = false }) {
  const reduced = useReducedMotion()
  if (reduced) return null

  const petals = Array.from({ length: count }, (_, i) => {
    const seed = (i * 37) % 100
    return {
      left: `${(i * 61 + 7) % 100}%`,
      size: 10 + (seed % 10),
      duration: burst ? 4 + (seed % 30) / 10 : 11 + (seed % 9),
      delay: burst ? (seed % 12) / 10 : -((i * 1.7) % 14),
      sway: (seed % 2 === 0 ? 1 : -1) * (24 + (seed % 40)),
      tint: i % 3,
    }
  })

  return (
    <div className={`xv-petals ${burst ? 'is-burst' : ''}`} aria-hidden="true">
      {petals.map((petal, i) => (
        <span
          key={i}
          className={`xv-petal is-tint-${petal.tint}`}
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.2,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            '--sway': `${petal.sway}px`,
          }}
        >
          <svg viewBox="0 0 20 24">
            <path d={PETAL_PATH} />
          </svg>
        </span>
      ))}
    </div>
  )
}

/**
 * Bloque que aparece suave al entrar en pantalla.
 * @param {{ children: import('react').ReactNode, delay?: number, y?: number, className?: string, as?: 'div' | 'p' | 'li' | 'h2' }} props
 */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}
