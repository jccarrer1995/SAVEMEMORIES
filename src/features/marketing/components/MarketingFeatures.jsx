import { FEATURES } from '../data/siteContent.js'
import { MarketingSection } from './MarketingSection.jsx'

export function MarketingFeatures() {
  return (
    <MarketingSection id="servicios" kicker="Qué incluye" title="Todo lo que tu evento necesita en un solo link">
      <div className="grid gap-5 md:grid-cols-3">
        {FEATURES.map((item) => (
          <article key={item.title} className="marketing-card rounded-2xl p-6">
            <div className="mb-4 h-1 w-10 rounded-full bg-[#d4926f]/60" />
            <h3 className="marketing-serif text-2xl text-[#6b3f2a]">{item.title}</h3>
            <p className="marketing-muted mt-3 text-sm leading-relaxed">{item.text}</p>
          </article>
        ))}
      </div>
    </MarketingSection>
  )
}
