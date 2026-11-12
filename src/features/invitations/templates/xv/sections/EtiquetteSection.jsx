import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { Reveal } from '../components/Effects.jsx'
import { BowTieIcon, EnvelopeIcon, Flourish, GownIcon } from '../components/Ornaments.jsx'

/** Código de vestimenta + regalos, en una sola sección de "etiqueta". */
export function EtiquetteSection() {
  const project = useInvitationProject()
  const dress = project.dressCode ?? { estilo: '', detalle: '' }
  const gifts = project.regalos?.texto?.trim() ?? ''
  const avoid = [dress.mujeresEvitar, dress.hombresEvitar].map((text) => text?.trim()).filter(Boolean)
  const hasDress = Boolean(dress.estilo || dress.mujeres || dress.hombres)

  if (!hasDress && !gifts) return null

  return (
    <section className="xv-section xv-etiquette">
      {hasDress ? (
        <>
          <Reveal>
            <p className="xv-kicker">Código de vestimenta</p>
            <h2 className="xv-title">
              <em>{dress.estilo || 'Formal'}</em>
            </h2>
            {dress.detalle ? <p className="xv-lead">{dress.detalle}</p> : null}
          </Reveal>

          <div className="xv-dress-grid">
            {dress.mujeres ? (
              <Reveal delay={0.1} className="xv-dress">
                <GownIcon className="xv-dress-icon" />
                <p className="xv-family-label">Damas</p>
                <p>{dress.mujeres}</p>
              </Reveal>
            ) : null}
            {dress.hombres ? (
              <Reveal delay={0.2} className="xv-dress">
                <BowTieIcon className="xv-dress-icon xv-dress-icon--bow" />
                <p className="xv-family-label">Caballeros</p>
                <p>{dress.hombres}</p>
              </Reveal>
            ) : null}
          </div>

          {avoid.length > 0 ? (
            <Reveal delay={0.25}>
              {avoid.map((text) => (
                <p key={text} className="xv-note">
                  {text}
                </p>
              ))}
            </Reveal>
          ) : null}
        </>
      ) : null}

      {hasDress && gifts ? <Flourish className="xv-gold xv-etiquette-divider" /> : null}

      {gifts ? (
        <Reveal className="xv-gifts">
          <EnvelopeIcon className="xv-gifts-icon" />
          <p className="xv-kicker">Regalos</p>
          <p className="xv-lead">{gifts}</p>
        </Reveal>
      ) : null}
    </section>
  )
}
