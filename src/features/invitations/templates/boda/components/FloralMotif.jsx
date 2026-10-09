/**
 * @param {{ className?: string, variant?: 'corner' | 'spray' | 'divider' | 'watercolor' }} props
 */
export function FloralMotif({ className = '', variant = 'corner' }) {
  if (variant === 'watercolor') {
    return (
      <svg viewBox="0 0 180 220" className={className} aria-hidden>
        <ellipse cx="72" cy="68" rx="36" ry="26" fill="#efb09a" opacity="0.92" transform="rotate(-28 72 68)" />
        <ellipse cx="108" cy="56" rx="30" ry="22" fill="#f5c4b0" opacity="0.88" transform="rotate(18 108 56)" />
        <ellipse cx="90" cy="88" rx="28" ry="20" fill="#e8a08a" opacity="0.9" />
        <ellipse cx="52" cy="102" rx="20" ry="15" fill="#f0b8a4" opacity="0.85" transform="rotate(-16 52 102)" />
        <path d="M88 108c6 26 4 52-8 78" stroke="#6f8f62" strokeWidth="2.2" fill="none" opacity="0.85" />
        <ellipse cx="76" cy="142" rx="15" ry="7" fill="#7a9a6a" transform="rotate(-32 76 142)" />
        <ellipse cx="98" cy="164" rx="17" ry="8" fill="#688c5a" transform="rotate(24 98 164)" />
        <ellipse cx="68" cy="182" rx="13" ry="6" fill="#7a9a6a" transform="rotate(-18 68 182)" />
      </svg>
    )
  }

  if (variant === 'divider') {
    return (
      <svg viewBox="0 0 220 70" className={className} aria-hidden>
        <g fill="none" stroke="#1d2a40" strokeWidth="1.1">
          <path d="M10 48c18-28 38-34 58-18 8 6 12 16 10 26" />
          <path d="M210 48c-18-28-38-34-58-18-8 6-12 16-10 26" />
        </g>
        <ellipse cx="78" cy="28" rx="16" ry="12" fill="#1a2740" transform="rotate(-28 78 28)" />
        <ellipse cx="96" cy="22" rx="14" ry="10" fill="#243552" transform="rotate(18 96 22)" />
        <ellipse cx="88" cy="36" rx="12" ry="9" fill="#162033" />
        <ellipse cx="142" cy="28" rx="16" ry="12" fill="#1a2740" transform="rotate(24 142 28)" />
        <ellipse cx="124" cy="22" rx="14" ry="10" fill="#243552" transform="rotate(-16 124 22)" />
        <path d="M70 40c-8 10-6 22 4 28" stroke="#3f5a3a" strokeWidth="1.4" fill="none" />
        <path d="M150 40c8 10 6 22-4 28" stroke="#3f5a3a" strokeWidth="1.4" fill="none" />
        <ellipse cx="66" cy="52" rx="8" ry="4" fill="#4e6a45" transform="rotate(-40 66 52)" />
        <ellipse cx="154" cy="52" rx="8" ry="4" fill="#4e6a45" transform="rotate(40 154 52)" />
      </svg>
    )
  }

  if (variant === 'spray') {
    return (
      <svg viewBox="0 0 180 220" className={className} aria-hidden>
        <ellipse cx="70" cy="70" rx="38" ry="28" fill="#1a2740" transform="rotate(-30 70 70)" />
        <ellipse cx="108" cy="58" rx="32" ry="24" fill="#243552" transform="rotate(20 108 58)" />
        <ellipse cx="92" cy="92" rx="30" ry="22" fill="#121c2e" />
        <ellipse cx="48" cy="108" rx="22" ry="16" fill="#1e334f" transform="rotate(-18 48 108)" />
        <path d="M90 110c8 28 6 58-10 86" stroke="#3f5a3a" strokeWidth="2" fill="none" />
        <ellipse cx="78" cy="148" rx="16" ry="7" fill="#4e6a45" transform="rotate(-35 78 148)" />
        <ellipse cx="102" cy="170" rx="18" ry="8" fill="#3d5c38" transform="rotate(28 102 170)" />
        <ellipse cx="70" cy="188" rx="14" ry="6" fill="#4e6a45" transform="rotate(-20 70 188)" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 160 180" className={className} aria-hidden>
      <ellipse cx="86" cy="52" rx="34" ry="26" fill="#1a2740" transform="rotate(-25 86 52)" />
      <ellipse cx="54" cy="68" rx="28" ry="22" fill="#243552" transform="rotate(30 54 68)" />
      <ellipse cx="78" cy="78" rx="26" ry="20" fill="#121c2e" />
      <ellipse cx="108" cy="86" rx="20" ry="15" fill="#1e334f" transform="rotate(-10 108 86)" />
      <path d="M74 92c-6 22-22 40-40 52" stroke="#3f5a3a" strokeWidth="2" fill="none" />
      <path d="M90 96c12 24 18 40 16 62" stroke="#4e6a45" strokeWidth="1.7" fill="none" />
      <ellipse cx="42" cy="128" rx="18" ry="8" fill="#4e6a45" transform="rotate(-50 42 128)" />
      <ellipse cx="58" cy="146" rx="16" ry="7" fill="#3d5c38" transform="rotate(-20 58 146)" />
      <ellipse cx="112" cy="138" rx="15" ry="7" fill="#4e6a45" transform="rotate(40 112 138)" />
    </svg>
  )
}

export function OrnamentLine({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-[#b8c4a8]" />
      <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="#8d9a7c">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span className="h-px flex-1 bg-[#b8c4a8]" />
    </div>
  )
}

export function FrameLine({ className = '' }) {
  return (
    <svg viewBox="0 0 280 28" className={className} fill="none" aria-hidden>
      <path d="M12 14h90" stroke="#b7a48a" strokeWidth="1" />
      <path d="M178 14h90" stroke="#b7a48a" strokeWidth="1" />
      <path d="M20 17.5h74" stroke="#d4c4ae" strokeWidth="0.7" />
      <path d="M186 17.5h74" stroke="#d4c4ae" strokeWidth="0.7" />
      <path d="M8 14h8M264 14h8" stroke="#8a7a66" strokeWidth="1.1" strokeLinecap="square" />
      <rect
        x="105.2"
        y="10.2"
        width="7.6"
        height="7.6"
        transform="rotate(45 109 14)"
        stroke="#8a7a66"
        strokeWidth="0.9"
      />
      <rect
        x="167.2"
        y="10.2"
        width="7.6"
        height="7.6"
        transform="rotate(45 171 14)"
        stroke="#8a7a66"
        strokeWidth="0.9"
      />
      <rect
        x="132.8"
        y="6.8"
        width="14.4"
        height="14.4"
        transform="rotate(45 140 14)"
        stroke="#8a7a66"
        strokeWidth="1.05"
      />
      <rect x="137.2" y="11.2" width="5.6" height="5.6" transform="rotate(45 140 14)" fill="#8a7a66" />
    </svg>
  )
}
