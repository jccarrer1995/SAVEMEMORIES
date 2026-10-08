/**
 * @param {{ cupos: number }} props
 */
export function ReservedPlaces({ cupos }) {
  const count = Number.isFinite(cupos) && cupos > 0 ? cupos : 0
  const placesLabel = count === 1 ? 'Lugar en su honor' : 'Lugares en su honor'

  return (
    <div className="boda-reserved">
      <ReservedPlacesIcon />
      <p className="boda-reserved-label">Hemos reservado</p>
      <p className="boda-reserved-count">{count}</p>
      <p className="boda-reserved-label">{placesLabel}</p>
    </div>
  )
}

function ReservedPlacesIcon() {
  return (
    <svg className="boda-reserved-icon" viewBox="0 0 64 40" fill="none" aria-hidden>
      <circle cx="24" cy="11" r="5.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M13.5 33c.8-7.2 4.6-11.2 10.5-11.2S34.2 25.8 35 33"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="41" cy="10" r="5.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M29.5 33c1-8 5.4-12.4 11.8-12.4S52.2 25 53.2 33"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
