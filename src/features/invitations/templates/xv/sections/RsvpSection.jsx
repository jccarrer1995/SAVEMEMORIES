import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { normalizeMesa } from '../../../../../shared/utils/normalizeMesa.js'
import { fetchGuestRsvpState } from '../../boda/services/saveRsvp.js'
import { isAttendanceConfirmed } from '../../boda/utils/rsvpConfirmation.js'
import { Petals, Reveal } from '../components/Effects.jsx'
import { Tiara, ThroneChair } from '../components/Ornaments.jsx'
import { XvRsvpForm } from '../components/XvRsvpForm.jsx'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Pase con borde de pan de oro que se ilumina.
 * @param {{ invitadosLabel: string, cupos: number, mesa?: string }} props
 */
function HonorPass({ invitadosLabel, cupos, mesa }) {
  const project = useInvitationProject()

  return (
    <motion.div
      className="xv-pass"
      initial={{ opacity: 0, rotateX: -70, y: 40 }}
      animate={{ opacity: 1, rotateX: 0, y: 0 }}
      transition={{ duration: 1.3, ease: EASE }}
    >
      <span className="xv-pass-shine" aria-hidden="true" />
      <Tiara className="xv-pass-tiara" animate={false} />
      <p className="xv-kicker">Pase de honor</p>
      <p className="xv-pass-name">{invitadosLabel}</p>
      <dl className="xv-pass-grid">
        <div>
          <dt>Pases</dt>
          <dd>{cupos}</dd>
        </div>
        {mesa ? (
          <div>
            <dt>Mesa</dt>
            <dd>{mesa}</dd>
          </div>
        ) : null}
        <div>
          <dt>Fecha</dt>
          <dd>{project.fechaLabel}</dd>
        </div>
      </dl>
      <p className="xv-pass-foot">Presenta este pase al llegar. Te espero.</p>
      <p className="xv-signature xv-signature--sm">{project.novia}</p>
    </motion.div>
  )
}

/** @param {{ invitadosLabel: string, cupos: number }} props */
function DeclineNote({ invitadosLabel, cupos }) {
  const project = useInvitationProject()
  return (
    <motion.div
      className="xv-pass xv-pass--soft"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE }}
    >
      <p className="xv-kicker">Gracias por avisar</p>
      <p className="xv-pass-name">{invitadosLabel}</p>
      <p className="xv-lead">
        {cupos === 1 ? 'Te voy a extrañar' : 'Los voy a extrañar'} esa noche. Gracias por acompañarme con el corazón.
      </p>
      <p className="xv-signature xv-signature--sm">{project.novia}</p>
    </motion.div>
  )
}

/**
 * @param {{ grupoInvitados: string, cupos: number, linkCode?: string, mesa?: string }} props
 */
export function RsvpSection({ grupoInvitados, cupos, linkCode, mesa }) {
  const project = useInvitationProject()
  const mesaAsignada = useMemo(
    () => normalizeMesa(mesa) ?? normalizeMesa(project.mesaAsignada),
    [mesa, project.mesaAsignada],
  )
  const [state, setState] = useState(
    /** @type {{ kind: 'loading' | 'none' | 'confirmed' | 'declined', nombres?: string, mesa?: string }} */ ({
      kind: 'loading',
    }),
  )
  const [celebrate, setCelebrate] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchGuestRsvpState(project.id, { grupoInvitados, linkCode })
      .then((result) => {
        if (cancelled) return
        if (result.kind === 'confirmed') {
          setState({
            kind: 'confirmed',
            nombres: result.data.nombres,
            mesa: normalizeMesa(result.data.mesaAsignada) ?? mesaAsignada,
          })
        } else if (result.kind === 'declined') {
          setState({ kind: 'declined', nombres: result.data.nombres })
        } else {
          setState({ kind: 'none' })
        }
      })
      .catch(() => {
        if (!cancelled) setState({ kind: 'none' })
      })
    return () => {
      cancelled = true
    }
  }, [project.id, grupoInvitados, linkCode, mesaAsignada])

  function handleConfirmed({ confirmacion, nombres }) {
    if (isAttendanceConfirmed(confirmacion)) {
      setState({ kind: 'confirmed', nombres, mesa: mesaAsignada })
      setCelebrate(true)
      return
    }
    setState({ kind: 'declined', nombres })
  }

  return (
    <section id="xv-rsvp" className="xv-section xv-rsvp">
      <ThroneChair className="xv-throne" />

      <Reveal>
        <p className="xv-kicker">Confirmación</p>
        <h2 className="xv-title">
          Tu lugar <em>está reservado</em>
        </h2>
        <p className="xv-lead">
          Reservé <strong>{cupos}</strong> {cupos === 1 ? 'lugar' : 'lugares'} para{' '}
          <strong>{grupoInvitados}</strong>.
        </p>
      </Reveal>

      <div className="xv-rsvp-body">
        {state.kind === 'loading' ? (
          <p className="xv-lead xv-muted">Cargando…</p>
        ) : state.kind === 'confirmed' ? (
          <HonorPass invitadosLabel={state.nombres || grupoInvitados} cupos={cupos} mesa={state.mesa} />
        ) : state.kind === 'declined' ? (
          <DeclineNote invitadosLabel={state.nombres || grupoInvitados} cupos={cupos} />
        ) : (
          <Reveal className="xv-card">
            <XvRsvpForm
              grupoInvitados={grupoInvitados}
              cupos={cupos}
              linkCode={linkCode}
              mesaAsignada={mesaAsignada}
              onConfirmed={handleConfirmed}
            />
          </Reveal>
        )}
      </div>

      {celebrate ? <Petals count={28} burst /> : null}
    </section>
  )
}
