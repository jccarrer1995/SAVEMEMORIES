import { Music } from 'lucide-react'

/**
 * @param {{ playing: boolean, onToggle: () => void }} props
 */
export function MusicToggle({ playing, onToggle }) {
  return (
    <div
      className="pointer-events-none fixed bottom-6 z-50"
      style={{ left: 'max(1rem, calc(50% - 215px + 1rem))' }}
    >
      {playing ? (
        <div className="bs-notes pointer-events-none absolute bottom-12 left-3 text-[#8f78ad]/60">
          <span className="absolute">♪</span>
          <span className="absolute left-4">♫</span>
          <span className="absolute left-1">♩</span>
        </div>
      ) : null}
      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? 'Pausar música' : 'Reproducir música'}
        className="pointer-events-auto relative flex h-11 w-11 items-center justify-center rounded-full bg-[#f3ebf8] text-[#6b5a7a] shadow-md ring-1 ring-[#c9b8dc]/40"
      >
        <Music className="h-[18px] w-[18px]" strokeWidth={1.7} />
        {!playing ? <span className="absolute h-5 w-px rotate-45 bg-[#6b5a7a]/70" /> : null}
      </button>
    </div>
  )
}
