import { useState } from 'react'
import { FAQ_ITEMS } from '../data/siteContent.js'
import { MarketingSection } from './MarketingSection.jsx'

export function MarketingFaq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <MarketingSection id="faq" kicker="Preguntas frecuentes" title="Resolvemos tus dudas">
      <ul className="space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <li key={item.question} className="marketing-card rounded-2xl px-5 py-4">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span className="text-sm font-medium text-[#6b3f2a] md:text-base">{item.question}</span>
                <span className="marketing-muted text-xl leading-none">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen ? (
                <p className="marketing-muted mt-3 text-sm leading-relaxed">{item.answer}</p>
              ) : null}
            </li>
          )
        })}
      </ul>
    </MarketingSection>
  )
}
