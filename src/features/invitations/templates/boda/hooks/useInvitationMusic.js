import { useEffect, useRef, useState } from 'react'

/**
 * @param {string} musicaSrc
 */
export function useInvitationMusic(musicaSrc) {
  const audioRef = useRef(/** @type {HTMLAudioElement | null} */ (null))
  const [musicPlaying, setMusicPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(musicaSrc)
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
  }, [musicaSrc])

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

  return { musicPlaying, playMusic, toggleMusic }
}
