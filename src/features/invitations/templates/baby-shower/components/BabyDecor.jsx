/**
 * @param {{ className?: string, variant?: 'cloud' | 'star' | 'divider' }} props
 */
export function BabyDecor({ className = '', variant = 'cloud' }) {
  if (variant === 'star') {
    return (
      <svg className={className} viewBox="0 0 64 64" aria-hidden>
        <path
          d="M32 6l4.8 14.8H53l-12.2 8.9 4.7 14.8L32 35.6 18.5 44.5l4.7-14.8L11 20.8h16.2L32 6z"
          fill="currentColor"
          opacity="0.35"
        />
      </svg>
    )
  }

  if (variant === 'divider') {
    return (
      <svg className={className} viewBox="0 0 220 24" aria-hidden>
        <path d="M10 12h80" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <circle cx="110" cy="12" r="5" fill="currentColor" opacity="0.45" />
        <path d="M130 12h80" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 120 64" aria-hidden>
      <ellipse cx="40" cy="36" rx="28" ry="18" fill="currentColor" opacity="0.18" />
      <ellipse cx="62" cy="30" rx="34" ry="22" fill="currentColor" opacity="0.22" />
      <ellipse cx="84" cy="36" rx="24" ry="16" fill="currentColor" opacity="0.16" />
    </svg>
  )
}
