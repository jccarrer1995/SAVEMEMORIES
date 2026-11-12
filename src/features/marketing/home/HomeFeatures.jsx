import { motion } from 'framer-motion'
import { Photo, Reveal, SplitText } from './HomeMotion.jsx'
import { EASE, IMAGES } from './homeMedia.js'

const RSVP_BARS = [
  { label: 'Confirmados', value: 86, tone: 'olive' },
  { label: 'Pendientes', value: 30, tone: 'sand' },
  { label: 'No asisten', value: 9, tone: 'clay' },
]

const EXCEL_ROWS = [
  ['Familia Pérez', 'Mesa 3', '4'],
  ['Andrea y Luis', 'Mesa 5', '2'],
  ['Tía Carmen', 'Mesa 1', '1'],
]

function SeatTable({ seats, delay }) {
  return (
    <div className="sm-seat-table">
      <span className="sm-seat-core" />
      {Array.from({ length: seats }, (_, index) => {
        const angle = (index / seats) * Math.PI * 2 - Math.PI / 2
        return (
          <motion.span
            key={index}
            className="sm-seat"
            style={{ left: `${50 + Math.cos(angle) * 44}%`, top: `${50 + Math.sin(angle) * 44}%` }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + index * 0.07, duration: 0.5, ease: EASE }}
          />
        )
      })}
    </div>
  )
}

export function HomeFeatures() {
  return (
    <section id="servicios" className="sm-section">
      <div className="sm-container">
        <div className="sm-section-head">
          <Reveal>
            <p className="sm-eyebrow">
              <span className="sm-dot" /> Qué incluye
            </p>
          </Reveal>
          <h2 className="sm-display sm-h2">
            <SplitText text="Todo tu evento, *en un solo* enlace." inView />
          </h2>
        </div>

        <div className="sm-bento">
          <Reveal className="sm-bento-card sm-bento-photo">
            <Photo img={IMAGES.stationery} sizes="(min-width: 1024px) 60vw, 92vw" />
            <div className="sm-bento-caption">
              <span className="sm-tag">Diseño personalizado</span>
              <p>Textos, fotos, música, ubicación y cronograma adaptados a tu evento. Cada detalle con tu estilo.</p>
            </div>
          </Reveal>

          <Reveal className="sm-bento-card sm-bento-link" delay={0.08}>
            <span className="sm-tag">Enlaces por invitado</span>
            <h3 className="sm-display sm-h3">Cada familia recibe su propio enlace.</h3>
            <div className="sm-url">
              <span className="sm-url-lock" aria-hidden>●</span>
              savememories.com/<b>familia-perez</b>
            </div>
            <div className="sm-pill-row">
              <span className="sm-pill">4 lugares reservados</span>
              <span className="sm-pill is-soft">Mesa 3</span>
            </div>
          </Reveal>

          <Reveal className="sm-bento-card sm-bento-rsvp" delay={0.12}>
            <span className="sm-tag">Confirmaciones en vivo</span>
            <h3 className="sm-display sm-h3">Mira quién viene, al instante.</h3>
            <div className="sm-bars">
              {RSVP_BARS.map((bar, index) => (
                <div key={bar.label} className="sm-bar">
                  <div className="sm-bar-meta">
                    <span>{bar.label}</span>
                    <strong>{bar.value}</strong>
                  </div>
                  <div className="sm-bar-track">
                    <motion.span
                      className={`sm-bar-fill is-${bar.tone}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: bar.value / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, ease: EASE, delay: 0.2 + index * 0.12 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="sm-bento-card sm-bento-excel">
            <span className="sm-tag">Exporta a Excel</span>
            <h3 className="sm-display sm-h3">Tu lista, ordenada y lista para el catering.</h3>
            <div className="sm-sheet" role="presentation">
              <div className="sm-sheet-row is-head">
                <span>Invitado</span>
                <span>Mesa</span>
                <span>Cupos</span>
              </div>
              {EXCEL_ROWS.map((row, index) => (
                <motion.div
                  key={row[0]}
                  className="sm-sheet-row"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + index * 0.1, duration: 0.6, ease: EASE }}
                >
                  {row.map((cell) => (
                    <span key={cell}>{cell}</span>
                  ))}
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal className="sm-bento-card sm-bento-dark" delay={0.08}>
            <span className="sm-tag is-light">Simulación de mesas</span>
            <h3 className="sm-display sm-h3">Organiza a tus invitados antes del gran día.</h3>
            <div className="sm-seats">
              <SeatTable seats={8} delay={0.1} />
              <SeatTable seats={6} delay={0.4} />
              <SeatTable seats={10} delay={0.7} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
