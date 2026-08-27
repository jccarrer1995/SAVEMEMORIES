import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { InvitationProjectProvider } from '../../../core/context/InvitationProjectProvider.jsx'
import { getDefaultGuestInvite, getGuestInviteFromSearch } from '../../../core/utils/guestInvite.js'
import { BodaLanding } from '../BodaLanding.jsx'
import { EnvelopeScene } from '../components/EnvelopeScene.jsx'
import { MusicToggle } from '../components/MusicToggle.jsx'
import { useInvitationMusic } from '../hooks/useInvitationMusic.js'
import '../styles/boda.css'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Allura&family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Great+Vibes&family=Outfit:wght@300;400;500&display=swap'

/**
 * @param {{
 *   project: import('../../features/invitations/core/types/invitationProject.js').InvitationProjectConfig,
 *   guestInvite?: import('../../features/invitations/core/types/invitationProject.js').GuestInvite,
 *   allowQueryParams?: boolean,
 * }} props
 */
export function BodaInvitationView({ project, guestInvite, allowQueryParams = false }) {
  const [searchParams] = useSearchParams()
  const invite =
    guestInvite ??
    (allowQueryParams
      ? getGuestInviteFromSearch(project, `?${searchParams.toString()}`)
      : getDefaultGuestInvite(project))
  const [opened, setOpened] = useState(false)
  const { musicPlaying, playMusic, toggleMusic } = useInvitationMusic(project.musicaSrc)

  useEffect(() => {
    document.title = project.title
    const prevOverflow = document.body.style.overflow
    if (!opened) document.body.style.overflow = 'hidden'

    if (!document.getElementById('boda-fonts')) {
      const link = document.createElement('link')
      link.id = 'boda-fonts'
      link.rel = 'stylesheet'
      link.href = FONT_HREF
      document.head.appendChild(link)
    }

    return () => {
      document.body.style.overflow = prevOverflow
      document.title = project.title
    }
  }, [opened, project.title])

  useEffect(() => {
    if (opened) document.body.style.overflow = ''
  }, [opened])

  return (
    <InvitationProjectProvider project={project}>
      <div className="boda-site min-h-[100dvh] bg-[#121212] md:flex md:justify-center">
        <div className="relative mx-auto min-h-[100dvh] w-full max-w-[430px] overflow-x-hidden bg-[#f4efe6] shadow-[0_0_40px_rgba(0,0,0,0.35)]">
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="envelope"
                className="fixed inset-y-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <EnvelopeScene
                  onOpenStart={playMusic}
                  onOpened={() => {
                    setOpened(true)
                    window.scrollTo(0, 0)
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.85 }}
              >
                <BodaLanding grupoInvitados={invite.nombre} cupos={invite.cupos} />
              </motion.div>
            )}
          </AnimatePresence>
          <MusicToggle playing={musicPlaying} onToggle={toggleMusic} />
        </div>
      </div>
    </InvitationProjectProvider>
  )
}
