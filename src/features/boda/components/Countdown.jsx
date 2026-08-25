import { useEffect, useState } from 'react'
import { BODA } from '../data.js'

function pad(value) {
  return String(value).padStart(2, '0')
}

function getRemaining(targetMs) {
  const diff = Math.max(0, targetMs - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

export function Countdown({ className = '' }) {
  const targetMs = new Date(BODA.fechaIso).getTime()
  const [time, setTime] = useState(() => getRemaining(targetMs))

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(getRemaining(targetMs))
    }, 1000)
    return () => window.clearInterval(id)
  }, [targetMs])

  return (
    <p className={`boda-serif tracking-[0.18em] text-[#3a3a3a] ${className}`}>
      {pad(time.days)} : {pad(time.hours)} : {pad(time.minutes)} : {pad(time.seconds)}
    </p>
  )
}
