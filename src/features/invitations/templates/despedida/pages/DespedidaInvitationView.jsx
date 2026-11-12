import { AnimatePresence, motion } from 'framer-motion'
import { Music } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { InvitationProjectProvider } from '../../../core/context/InvitationProjectProvider.jsx'
import { getDefaultGuestInvite, getGuestInviteFromSearch } from '../../../core/utils/guestInvite.js'
import { useInvitationMusic } from '../../boda/hooks/useInvitationMusic.js'
import { DespedidaLanding } from '../DespedidaLanding.jsx'
import { ConfettiBurst } from '../components/ConfettiBurst.jsx'
import { LockScreenIntro } from '../components/LockScreenIntro.jsx'
import '../styles/despedida.css'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Caveat:wght@500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap'

/**
 * @param {{
 *   project: import('../../../core/types/invitationProject.js').InvitationProjectConfig,
 *   guestInvite?: import('../../../core/types/invitationProject.js').GuestInvite,
 *   allowQueryParams?: boolean,
 * }} props
 */
export function DespedidaInvitationView({ project, guestInvite, allowQueryParams = false }) {
  const [searchParams] = useSearchParams()
  const invite =
    guestInvite ??
    (allowQueryParams
      ? getGuestInviteFromSearch(project, `?${searchParams.toString()}`)
      : getDefaultGuestInvite(project))
  const [opened, setOpened] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const hasMusic = Boolean(project.musicaSrc)
  const { musicPlaying, playMusic, toggleMusic, audioRef, resolvedSrc } = useInvitationMusic(
    project.musicaSrc,
  )

  useEffect(() => {
    document.title = project.title
    const prevOverflow = document.body.style.overflow
    if (!opened) document.body.style.overflow = 'hidden'

    if (!document.getElementById('despedida-fonts')) {
      const link = document.createElement('link')
      link.id = 'despedida-fonts'
      link.rel = 'stylesheet'
      link.href = FONT_HREF
      document.head.appendChild(link)
    }

    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [opened, project.title])

  function handleUnlock() {
    if (hasMusic) void playMusic()
    setConfetti(true)
    window.setTimeout(() => {
      setOpened(true)
      window.scrollTo(0, 0)
    }, 450)
  }

  return (
    <InvitationProjectProvider project={project}>
      <div className="dsp-site relative min-h-[100dvh] bg-[#1a0920] md:flex md:justify-center">
        {hasMusic ? (
          <audio ref={audioRef} src={resolvedSrc} loop playsInline preload="auto" className="hidden" aria-hidden />
        ) : null}

        <div className="dsp-frame relative mx-auto min-h-[100dvh] w-full max-w-[430px] overflow-x-hidden shadow-[0_0_50px_rgba(255,61,154,0.25)]">
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="lock"
                className="fixed inset-y-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2"
                exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
                transition={{ duration: 0.5 }}
              >
                <LockScreenIntro grupoInvitados={invite.nombre} onUnlock={handleUnlock} />
              </motion.div>
            ) : (
              <motion.div
                key="landing"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <DespedidaLanding
                  grupoInvitados={invite.nombre}
                  cupos={invite.cupos}
                  linkCode={invite.linkCode}
                  mesa={invite.mesa}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {confetti ? <ConfettiBurst pieces={60} /> : null}

        {hasMusic && opened ? (
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={musicPlaying ? 'Pausar música' : 'Reproducir música'}
            className="fixed bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border-[2.5px] border-[#2a0f2e] bg-[#ffe066] text-[#2a0f2e] shadow-[3px_4px_0_#2a0f2e]"
            style={{ left: 'max(1rem, calc(50% - 215px + 1rem))' }}
          >
            <Music className={`h-5 w-5 ${musicPlaying ? 'dsp-disco' : ''}`} strokeWidth={2} />
            {!musicPlaying ? <span className="absolute h-6 w-[2.5px] rotate-45 bg-[#2a0f2e]" /> : null}
          </button>
        ) : null}
      </div>
    </InvitationProjectProvider>
  )
}
