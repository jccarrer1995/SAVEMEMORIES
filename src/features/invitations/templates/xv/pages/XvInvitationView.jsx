import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { InvitationProjectProvider } from '../../../core/context/InvitationProjectProvider.jsx'
import { getDefaultGuestInvite, getGuestInviteFromSearch } from '../../../core/utils/guestInvite.js'
import { useInvitationMusic } from '../../boda/hooks/useInvitationMusic.js'
import { XvLanding } from '../XvLanding.jsx'
import { PalaceDoorsIntro } from '../components/PalaceDoorsIntro.jsx'
import '../styles/xv.css'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400..600&family=Jost:wght@300;400;500&family=Mrs+Saint+Delafield&display=swap'

/**
 * @param {{
 *   project: import('../../../core/types/invitationProject.js').InvitationProjectConfig,
 *   guestInvite?: import('../../../core/types/invitationProject.js').GuestInvite,
 *   allowQueryParams?: boolean,
 * }} props
 */
export function XvInvitationView({ project, guestInvite, allowQueryParams = false }) {
  const [searchParams] = useSearchParams()
  const invite =
    guestInvite ??
    (allowQueryParams
      ? getGuestInviteFromSearch(project, `?${searchParams.toString()}`)
      : getDefaultGuestInvite(project))
  const [opened, setOpened] = useState(false)
  const hasMusic = Boolean(project.musicaSrc)
  const { musicPlaying, playMusic, toggleMusic, audioRef, resolvedSrc } = useInvitationMusic(project.musicaSrc)

  useEffect(() => {
    document.title = project.title
    if (!document.getElementById('xv-fonts')) {
      const link = document.createElement('link')
      link.id = 'xv-fonts'
      link.rel = 'stylesheet'
      link.href = FONT_HREF
      document.head.appendChild(link)
    }
  }, [project.title])

  useEffect(() => {
    if (opened) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [opened])

  function handleOpened() {
    window.scrollTo(0, 0)
    setOpened(true)
  }

  return (
    <InvitationProjectProvider project={project}>
      <div className="xv-site">
        {hasMusic ? (
          <audio ref={audioRef} src={resolvedSrc} loop playsInline preload="auto" className="hidden" aria-hidden />
        ) : null}

        <AnimatePresence>
          {!opened ? (
            <motion.div
              key="doors"
              className="xv-intro-layer"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <PalaceDoorsIntro
                grupoInvitados={invite.nombre}
                onOpening={() => {
                  if (hasMusic) void playMusic()
                }}
                onOpen={handleOpened}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {opened ? (
          <XvLanding grupoInvitados={invite.nombre} cupos={invite.cupos} linkCode={invite.linkCode} mesa={invite.mesa} />
        ) : null}

        {hasMusic && opened ? (
          <motion.button
            type="button"
            onClick={toggleMusic}
            className={`xv-music ${musicPlaying ? 'is-playing' : ''}`}
            aria-label={musicPlaying ? 'Pausar música' : 'Reproducir música'}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.4, duration: 0.6 }}
          >
            <span className="xv-music-bars" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
          </motion.button>
        ) : null}
      </div>
    </InvitationProjectProvider>
  )
}
