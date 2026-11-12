const ITEMS = ['Bodas', 'Save the date', 'XV años', 'Confirmación RSVP', 'Baby shower', 'Mesas y cupos', 'Música y mapa']

export function HomeMarquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="sm-marquee" aria-label={ITEMS.join(', ')}>
      <div className="sm-marquee-track" aria-hidden>
        {[0, 1].map((copy) => (
          <div className="sm-marquee-group" key={copy}>
            {row.map((item, index) => (
              <span key={`${copy}-${index}`} className={index % 2 ? 'sm-marquee-item is-italic' : 'sm-marquee-item'}>
                {item}
                <span className="sm-marquee-star">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
