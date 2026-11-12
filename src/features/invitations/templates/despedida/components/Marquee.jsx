/**
 * Cinta de texto infinita.
 * @param {{ items: string[], className?: string, reverse?: boolean }} props
 */
export function Marquee({ items, className = '', reverse = false }) {
  const row = items.map((item, index) => (
    <span key={`${item}-${index}`} className="dsp-display mx-4 inline-flex items-center gap-4 text-[18px]">
      {item}
      <span aria-hidden>✦</span>
    </span>
  ))

  return (
    <div className={`dsp-marquee py-2.5 ${reverse ? 'dsp-marquee--reverse' : ''} ${className}`} aria-hidden>
      <div className="dsp-marquee-track">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  )
}
