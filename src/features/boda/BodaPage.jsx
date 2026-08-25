import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './boda.css'
import { BodaLanding } from './BodaLanding.jsx'
import { EnvelopeScene } from './components/EnvelopeScene.jsx'
import { MusicToggle } from './components/MusicToggle.jsx'
import { BODA, getInviteFromSearch } from './data.js'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Allura&family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Great+Vibes&family=Outfit:wght@300;400;500&display=swap'

export function BodaPage() {
  const [searchParams] = useSearchParams()
  const invite = getInviteFromSearch(`?${searchParams.toString()}`)
  const [opened, setOpened] = useState(false)
  const audioRef = useRef(/** @type {HTMLAudioElement | null} */ (null))
  const [musicPlaying, setMusicPlaying] = useState(false)

  useEffect(() => {
    document.title = `${BODA.novio} & ${BODA.novia}`
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
      document.title = `${BODA.novio} & ${BODA.novia}`
    }
  }, [opened])

  useEffect(() => {
    if (opened) document.body.style.overflow = ''
  }, [opened])

  useEffect(() => {
    const audio = new Audio(BODA.musicaSrc)
    audio.loop = true
    audio.preload = 'auto'
    const syncPlaying = () => setMusicPlaying(!audio.paused)
    const onError = () => setMusicPlaying(false)
    audio.addEventListener('playing', syncPlaying)
    audio.addEventListener('pause', syncPlaying)
    audio.addEventListener('ended', syncPlaying)
    audio.addEventListener('error', onError)
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.removeEventListener('playing', syncPlaying)
      audio.removeEventListener('pause', syncPlaying)
      audio.removeEventListener('ended', syncPlaying)
      audio.removeEventListener('error', onError)
      audioRef.current = null
    }
  }, [])

  function playMusic() {
    const audio = audioRef.current
    if (!audio) return
    audio.play().catch(() => setMusicPlaying(false))
  }

  function toggleMusic() {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused) {
      audio.pause()
      return
    }
    playMusic()
  }

  return (
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
  )
}
