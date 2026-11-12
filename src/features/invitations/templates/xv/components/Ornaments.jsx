import { motion } from 'framer-motion'

/*
 * Ilustraciones a línea fina (estilo papelería fina). Las piezas simétricas se dibujan
 * una sola mitad y se reflejan, así quedan limpias y coherentes entre sí.
 * Todas usan currentColor: el color lo define la sección (oro champagne por defecto).
 */

const EASE = [0.22, 1, 0.36, 1]

/**
 * Trazo que se "dibuja" al entrar en pantalla.
 * @param {{ d: string, delay?: number, duration?: number, width?: number, fill?: string }} props
 */
function DrawPath({ d, delay = 0, duration = 1.6, width = 1, fill = 'none' }) {
  return (
    <motion.path
      d={d}
      fill={fill}
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ pathLength: { duration, ease: EASE, delay }, opacity: { duration: 0.2, delay } }}
    />
  )
}

/** Mitad derecha del separador; se refleja para la izquierda. */
const FLOURISH_HALF = [
  'M128 12 C146 12 152 5 166 5 C178 5 184 12 196 12 H232',
  'M166 5 C159 8 161 16 168 15.5 C173 15 173 9.5 168.5 9.5',
  'M144 12 C151 16 160 19 170 17',
  'M196 12 C202 9 206 9 210 11',
]

/** Separador con volutas y rombo central. */
export function Flourish({ className = '', width = 220 }) {
  return (
    <svg className={className} width={width} viewBox="0 0 240 24" aria-hidden="true">
      <g>
        {FLOURISH_HALF.map((d, i) => (
          <DrawPath key={`r${i}`} d={d} delay={0.1 + i * 0.12} width={0.9} />
        ))}
      </g>
      <g transform="translate(240 0) scale(-1 1)">
        {FLOURISH_HALF.map((d, i) => (
          <DrawPath key={`l${i}`} d={d} delay={0.1 + i * 0.12} width={0.9} />
        ))}
      </g>
      <motion.path
        d="M120 5 L127 12 L120 19 L113 12 Z"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
        style={{ transformOrigin: '120px 12px' }}
      />
      <circle cx="236" cy="12" r="1.6" fill="currentColor" />
      <circle cx="4" cy="12" r="1.6" fill="currentColor" />
    </svg>
  )
}

/** Esquina barroca (superior izquierda); rotar con CSS para las demás. */
export function CornerFlourish({ className = '' }) {
  const paths = [
    'M4 116 V32 C4 15 15 4 32 4 H116',
    'M12 108 V42 C12 24 24 12 42 12 H108',
    'M30 31 C22 23 25 13 33 14.5 C39 16 38 23.5 32.5 22.5',
    'M31 30 C39 38 48 34.5 46.5 27 C45 21 37.5 22 38.5 28',
    'M52 12 C60 20 71 22 84 18',
    'M12 52 C20 60 22 71 18 84',
    'M66 19.5 C70 15 75 15 78 18',
    'M19.5 66 C15 70 15 75 18 78',
  ]
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      {paths.map((d, i) => (
        <DrawPath key={i} d={d} delay={i * 0.08} width={i < 2 ? 0.8 : 1} />
      ))}
      <circle cx="116" cy="4" r="1.8" fill="currentColor" />
      <circle cx="4" cy="116" r="1.8" fill="currentColor" />
    </svg>
  )
}

/** Tiara a línea. */
export function Tiara({ className = '', animate = true }) {
  const outline =
    'M18 60 C22 45 29 37 36 30 C40 40 45 45.5 50 48 C52 34 56 22 60 12 C64 22 68 34 70 48 C75 45.5 80 40 84 30 C91 37 98 45 102 60'
  const bands = ['M18 60 C40 54 80 54 102 60', 'M22 66 C42 61 78 61 98 66']
  const drop = 'M60 31 C64.5 37 64.5 43.5 60 46 C55.5 43.5 55.5 37 60 31 Z'
  const inner = ['M36 30 C38 37 40 41 42 44', 'M84 30 C82 37 80 41 78 44', 'M60 12 C60 20 60 26 60 30']

  if (!animate) {
    return (
      <svg className={className} viewBox="0 0 120 72" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
        <path d={outline} strokeLinejoin="round" />
        {bands.map((d) => (
          <path key={d} d={d} />
        ))}
        <path d={drop} fill="currentColor" fillOpacity="0.18" />
        {inner.map((d) => (
          <path key={d} d={d} strokeOpacity="0.55" />
        ))}
        <TiaraJewels />
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 120 72" aria-hidden="true">
      <DrawPath d={outline} duration={2} />
      {bands.map((d, i) => (
        <DrawPath key={d} d={d} delay={0.6 + i * 0.2} />
      ))}
      <DrawPath d={drop} delay={1.1} fill="none" />
      {inner.map((d, i) => (
        <DrawPath key={d} d={d} delay={1.2 + i * 0.1} width={0.6} />
      ))}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <TiaraJewels />
      </motion.g>
    </svg>
  )
}

function TiaraJewels() {
  return (
    <g fill="currentColor">
      <circle cx="60" cy="9.5" r="3" />
      <circle cx="36" cy="27.5" r="2.4" />
      <circle cx="84" cy="27.5" r="2.4" />
      {[30, 45, 60, 75, 90].map((cx) => (
        <circle key={cx} cx={cx} cy={cx === 60 ? 55.4 : 56.4} r="1.4" />
      ))}
    </g>
  )
}

/** Rama de rosa a línea fina, para esquinas y marcos. */
export function RoseSprig({ className = '', delay = 0 }) {
  const paths = [
    'M80 70 C74 66 76 58 83 59 C90 60 90 70 82 72 C72 74 68 62 74 55 C80 48 94 50 96 62 C98 74 88 82 78 80',
    'M64 64 C58 76 66 90 80 90 C94 90 104 78 98 64',
    'M64 64 C62 54 68 46 76 44',
    'M98 64 C100 54 94 46 86 44',
    'M70 88 C66 98 74 104 82 100 C90 104 98 96 92 88',
    'M82 100 C84 120 78 138 70 156',
    'M80 120 C92 112 108 114 116 122 C106 128 92 128 80 120 Z',
    'M86 121 C95 120 104 120 112 122',
    'M76 138 C64 130 50 132 44 140 C54 146 66 146 76 138 Z',
    'M72 139 C64 138 56 139 48 140',
    'M100 40 C104 30 114 28 118 34 C116 42 108 46 100 40 Z',
    'M100 40 C96 50 92 56 92 62',
    'M112 132 C120 128 126 130 130 136',
  ]
  return (
    <svg className={className} viewBox="0 0 160 160" aria-hidden="true">
      {paths.map((d, i) => (
        <DrawPath key={i} d={d} delay={delay + i * 0.07} duration={1.4} width={0.9} />
      ))}
    </svg>
  )
}

/** Mitad derecha de la silla de reina (se refleja sobre x = 100). */
const THRONE_HALF = [
  // Copete y respaldo
  'M100 30 C116 30 132 25 143 33 C156 43 150 62 156 80 C162 100 158 120 150 136',
  'M100 18 C107 18 112 13 110 7 C108 2 101 3 102 8',
  'M100 30 C104 25 108 22 114 22 C122 22 126 28 132 28',
  // Panel capitoné
  'M100 44 C114 44 126 44 132 52 C140 64 136 90 140 108 C142 120 138 130 132 136 H100',
  'M100 60 L116 78 L100 96 L116 114 L100 132',
  // Brazo con voluta
  'M150 136 C164 132 177 138 175 150 C173 160 162 161 160 155 C158 149 166 146 167 152',
  'M156 158 C164 170 164 182 156 190',
  // Asiento y faldón
  'M100 150 H146 C160 150 167 158 161 166 C156 172 142 172 100 172',
  'M100 172 V186 H156 C159 196 151 204 140 202 H100',
  'M110 186 C114 192 122 192 126 186 M130 186 C134 192 142 192 146 186',
  // Patas cabriolé
  'M146 202 C157 214 161 230 151 244 C147 250 152 255 159 252',
  'M134 204 C140 215 140 230 134 242',
]

/** Silla de reina (trono de quinceañera) a línea fina. */
export function ThroneChair({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 200 262" aria-hidden="true">
      <g>
        {THRONE_HALF.map((d, i) => (
          <DrawPath key={`r${i}`} d={d} delay={i * 0.12} duration={1.8} width={1.1} />
        ))}
      </g>
      <g transform="translate(200 0) scale(-1 1)">
        {THRONE_HALF.map((d, i) => (
          <DrawPath key={`l${i}`} d={d} delay={i * 0.12} duration={1.8} width={1.1} />
        ))}
      </g>
      <motion.g
        fill="currentColor"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.4, duration: 0.7, ease: EASE }}
        style={{ transformOrigin: '100px 80px' }}
      >
        {[
          [100, 60],
          [116, 78],
          [84, 78],
          [100, 96],
          [116, 114],
          [84, 114],
          [100, 132],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.8" />
        ))}
        <circle cx="100" cy="6" r="2.6" />
      </motion.g>
    </svg>
  )
}

/** Vestido de gala (ícono del código de vestimenta). */
export function GownIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 64" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 4 C20 9 28 9 30 4" />
      <path d="M18 4 L16.5 22 H31.5 L30 4" />
      <path d="M16.5 22 C11 35 7 48 4 60 C16 63.5 32 63.5 44 60 C41 48 37 35 31.5 22" />
      <path d="M20 22 C17 36 15 48 14 61 M28 22 C31 36 33 48 34 61" strokeOpacity="0.5" />
    </svg>
  )
}

/** Corbatín (ícono del código de vestimenta). */
export function BowTieIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 16 L5 6.5 C3 11 3 21 5 25.5 Z" />
      <path d="M28 16 L43 6.5 C45 11 45 21 43 25.5 Z" />
      <rect x="20" y="11.5" width="8" height="9" rx="2" />
    </svg>
  )
}

/** Sobre (lluvia de sobres). */
export function EnvelopeIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 44" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="58" height="38" rx="3" />
      <path d="M3 6 L32 26 L61 6" />
      <path d="M3 41 L24 21 M61 41 L40 21" strokeOpacity="0.5" />
      <circle cx="32" cy="26" r="4" fill="currentColor" fillOpacity="0.2" />
    </svg>
  )
}
