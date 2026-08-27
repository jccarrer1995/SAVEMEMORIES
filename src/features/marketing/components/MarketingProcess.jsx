import { PROCESS_STEPS } from '../data/siteContent.js'
import { MarketingSection } from './MarketingSection.jsx'

export function MarketingProcess() {
  return (
    <MarketingSection id="proceso" kicker="Cómo funciona" title="De la idea a las confirmaciones en cuatro pasos">
      <ol className="grid gap-4 md:grid-cols-2">
        {PROCESS_STEPS.map((item) => (
          <li key={item.step} className="marketing-card rounded-2xl p-6">
            <span className="marketing-kicker text-sm">{item.step}</span>
            <h3 className="marketing-serif mt-2 text-xl text-[#6b3f2a]">{item.title}</h3>
            <p className="marketing-muted mt-2 text-sm leading-relaxed">{item.text}</p>
          </li>
        ))}
      </ol>
    </MarketingSection>
  )
}
