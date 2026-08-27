import { Gift, Music2, Users, Wine } from 'lucide-react'

/**
 * @param {{ className?: string }} props
 */
export function ChurchIcon({ className = 'h-10 w-10 text-[#2c2c2c]' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <path d="M24 4v8M20 8h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10 44V22l14-10 14 10v22" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 44v-10h8v10" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 22h28" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

/**
 * @param {{ type: string }} props
 */
export function TimelineIcon({ type }) {
  const className = 'h-8 w-8 text-[#2c2c2c]'
  if (type === 'church') return <ChurchIcon className={className} />
  if (type === 'people') return <Users className={className} strokeWidth={1.3} />
  if (type === 'glasses') return <Wine className={className} strokeWidth={1.3} />
  if (type === 'music') return <Music2 className={className} strokeWidth={1.3} />
  if (type === 'gift') return <Gift className={className} strokeWidth={1.3} />
  return <RingsIcon />
}

export function RingsIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-8 w-10 text-[#2c2c2c]" fill="none" aria-hidden>
      <circle cx="18" cy="16" r="10" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="30" cy="16" r="10" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function ShirtIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" aria-hidden>
      <path d="M13 8l7 4 7-4 5 4v6l-5-2v16H13V16l-5 2V12l5-4z" stroke="#2c2c2c" strokeWidth="1.3" />
    </svg>
  )
}

export function DressIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" aria-hidden>
      <path d="M16 6h8l2 8 6 16H8l6-16 2-8z" stroke="#2c2c2c" strokeWidth="1.3" />
      <path d="M16 6c0 3 8 3 8 0" stroke="#2c2c2c" strokeWidth="1.3" />
    </svg>
  )
}
