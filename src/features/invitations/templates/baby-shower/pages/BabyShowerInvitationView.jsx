import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { InvitationProjectProvider } from '../../../core/context/InvitationProjectProvider.jsx'
import { getDefaultGuestInvite, getGuestInviteFromSearch } from '../../../core/utils/guestInvite.js'
import { useInvitationMusic } from '../../boda/hooks/useInvitationMusic.js'
import { BabyShowerLanding } from '../BabyShowerLanding.jsx'
import { EnvelopeScene } from '../components/EnvelopeScene.jsx'
import { MusicToggle } from '../components/MusicToggle.jsx'
import '../styles/baby-shower.css'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500&family=Quicksand:wght@400;500;600&display=swap'

/**
 * @param {{
 *   project: import('../../../core/types/invitationProject.js').InvitationProjectConfig,
 *   guestInvite?: import('../../../core/types/invitationProject.js').GuestInvite,
 *   allowQueryParams?: boolean,
 * }} props
 */
export function BabyShowerInvitationView({ project, guestInvite, allowQueryParams = false }) {
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

    if (!document.getElementById('baby-shower-fonts')) {
      const link = document.createElement('link')
      link.id = 'baby-shower-fonts'
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
      <div className="bs-site min-h-[100dvh] bg-[#ede8f0] md:flex md:justify-center">
        <div className="relative mx-auto min-h-[100dvh] w-full max-w-[430px] overflow-x-hidden bg-[#faf7fb] shadow-[0_0_40px_rgba(120,90,140,0.18)]">
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
                <BabyShowerLanding grupoInvitados={invite.nombre} cupos={invite.cupos} />
              </motion.div>
            )}
          </AnimatePresence>
          <MusicToggle playing={musicPlaying} onToggle={toggleMusic} />
        </div>
      </div>
    </InvitationProjectProvider>
  )
}
