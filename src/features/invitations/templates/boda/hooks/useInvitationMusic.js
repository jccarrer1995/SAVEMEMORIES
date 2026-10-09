import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { resolveMusicSrc } from '../../../core/utils/publicUrl.js'

/**
 * @param {string | undefined} musicaSrc
 * @param {{ fallbackPath?: string }} [options]
 */
export function useInvitationMusic(musicaSrc, options = {}) {
  const fallbackPath = options.fallbackPath ?? '/boda/musica.mp3'
  const resolvedSrc = useMemo(
    () => resolveMusicSrc(musicaSrc, fallbackPath),
    [musicaSrc, fallbackPath],
  )
  const audioRef = useRef(/** @type {HTMLAudioElement | null} */ (null))
  const [musicPlaying, setMusicPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !resolvedSrc) return

    audio.src = resolvedSrc
    audio.loop = true
    audio.preload = 'auto'

    const syncPlaying = () => setMusicPlaying(!audio.paused)
    const onError = () => setMusicPlaying(false)

    audio.addEventListener('playing', syncPlaying)
    audio.addEventListener('pause', syncPlaying)
    audio.addEventListener('ended', syncPlaying)
    audio.addEventListener('error', onError)
    audio.load()

    return () => {
      audio.pause()
      audio.removeEventListener('playing', syncPlaying)
      audio.removeEventListener('pause', syncPlaying)
      audio.removeEventListener('ended', syncPlaying)
      audio.removeEventListener('error', onError)
    }
  }, [resolvedSrc])

  const playMusic = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !resolvedSrc) return

    try {
      await audio.play()
    } catch {
      setMusicPlaying(false)
    }
  }, [resolvedSrc])

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused) {
      audio.pause()
      return
    }
    void playMusic()
  }, [playMusic])

  return { musicPlaying, playMusic, toggleMusic, audioRef, resolvedSrc }
}
