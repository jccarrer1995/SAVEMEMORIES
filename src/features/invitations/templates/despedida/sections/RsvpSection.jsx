import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { normalizeMesa } from '../../../../../shared/utils/normalizeMesa.js'
import { fetchGuestRsvpState } from '../../boda/services/saveRsvp.js'
import { isAttendanceConfirmed } from '../../boda/utils/rsvpConfirmation.js'
import { ConfettiBurst } from '../components/ConfettiBurst.jsx'
import { DespedidaRsvpForm } from '../components/DespedidaRsvpForm.jsx'
import { StickerLayer } from '../components/StickerLayer.jsx'

/** @type {import('../components/StickerLayer.jsx').StickerDef[]} */
const RSVP_STICKERS = [
  { id: 'heart', content: '💖', top: '3%', left: '7%', size: 40, rotate: -14 },
  { id: 'bride', content: 'BRIDE SQUAD', kind: 'text', top: '4%', right: '5%', rotate: 8, bg: '#ffe066' },
  { id: 'nails', content: '💅', top: '90%', right: '10%', size: 38, rotate: 10 },
]

/**
 * @param {{ invitadosLabel: string, cupos: number, mesa?: string }} props
 */
function VipPass({ invitadosLabel, cupos, mesa }) {
  const project = useInvitationProject()

  return (
    <motion.div
      className="dsp-ticket dsp-chunky-shadow overflow-hidden text-left"
      style={{ '--dsp-ticket-notch': '#ff3d9a' }}
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1, rotate: -2 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
    >
      <div className="bg-[#2a0f2e] px-6 py-5 text-white">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#cdf564]">Pase VIP</p>
        <p className="dsp-display mt-1 text-[28px] leading-none">¡Estás dentro! 🎉</p>
      </div>
      <div className="space-y-3 px-6 pb-5 pt-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5a3a5e]">Invitada(s)</p>
          <p className="mt-0.5 text-[16px] font-semibold">{invitadosLabel}</p>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5a3a5e]">Pases</p>
            <p className="mt-0.5 text-[16px] font-semibold">{cupos}</p>
          </div>
          {mesa ? (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5a3a5e]">Mesa</p>
              <p className="mt-0.5 text-[16px] font-semibold">{mesa}</p>
            </div>
          ) : null}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5a3a5e]">Fecha</p>
            <p className="mt-0.5 text-[14px] font-semibold leading-snug">{project.fechaLabel}</p>
          </div>
        </div>
      </div>
      <div className="dsp-ticket-cut px-6 pb-6 pt-4 text-[13px] leading-relaxed text-[#5a3a5e]">
        📸 Haz captura de este pase y muéstralo al llegar. ¡Nos vemos en la pista!
      </div>
    </motion.div>
  )
}

/**
 * @param {{ invitadosLabel: string, cupos: number }} props
 */
function DeclineCard({ invitadosLabel, cupos }) {
  const project = useInvitationProject()
  const plural = cupos !== 1

  return (
    <motion.div
      className="dsp-chunky-shadow rounded-3xl bg-white px-6 py-8 text-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <p className="text-[48px]" aria-hidden>
        😢
      </p>
      <p className="dsp-display mt-2 text-[24px]">{plural ? '¡Las vamos a extrañar!' : '¡Te vamos a extrañar!'}</p>
      <p className="mt-3 text-[14px] leading-relaxed text-[#5a3a5e]">
        Gracias por avisar, {invitadosLabel}. Brindaremos por {plural ? 'ustedes' : 'ti'} igual 🥂
      </p>
      <p className="dsp-hand mt-4 text-[22px] text-[#e01f7c]">— {project.novia} & las chicas</p>
    </motion.div>
  )
}

/**
 * @param {{ grupoInvitados: string, cupos: number, linkCode?: string, mesa?: string }} props
 */
export function RsvpSection({ grupoInvitados, cupos, linkCode, mesa }) {
  const project = useInvitationProject()
  const constraintsRef = useRef(/** @type {HTMLElement | null} */ (null))
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
    setState({ kind: 'loading' })

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
    <section ref={constraintsRef} className="dsp-bg-pink relative overflow-hidden px-5 pb-24 pt-24">
      <div className="relative z-[2] text-center">
        <h2 className="dsp-display dsp-outline-title text-[46px]">¿Te apuntas?</h2>
        <p className="mt-4 text-[14px] font-medium text-white">
          Pase reservado para: <b>{grupoInvitados}</b> ({cupos} {cupos === 1 ? 'persona' : 'personas'})
        </p>
      </div>

      <div className="relative z-[2] mx-auto mt-8 max-w-sm">
        {state.kind === 'loading' ? (
          <p className="rounded-3xl bg-white px-6 py-8 text-center text-[14px] text-[#5a3a5e]">Cargando… 💭</p>
        ) : state.kind === 'confirmed' ? (
          <VipPass invitadosLabel={state.nombres || grupoInvitados} cupos={cupos} mesa={state.mesa} />
        ) : state.kind === 'declined' ? (
          <DeclineCard invitadosLabel={state.nombres || grupoInvitados} cupos={cupos} />
        ) : (
          <motion.div
            className="dsp-chunky-shadow rounded-3xl bg-white px-5 py-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <DespedidaRsvpForm
              grupoInvitados={grupoInvitados}
              cupos={cupos}
              linkCode={linkCode}
              mesaAsignada={mesaAsignada}
              onConfirmed={handleConfirmed}
            />
          </motion.div>
        )}
      </div>

      <StickerLayer stickers={RSVP_STICKERS} constraintsRef={constraintsRef} />
      {celebrate ? <ConfettiBurst /> : null}
    </section>
  )
}
