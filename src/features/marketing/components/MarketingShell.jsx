import { MarketingDecor } from './MarketingDecor.jsx'
import { MarketingHeader } from './MarketingHeader.jsx'
import '../styles/marketing.css'

/**
 * @param {{ children: import('react').ReactNode, title?: string }} props
 */
export function MarketingShell({ children, title }) {
  return (
    <div className="marketing-page relative overflow-hidden font-[Outfit,sans-serif]">
      <MarketingDecor />
      <MarketingHeader />
      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-4">
        {title ? (
          <h1 className="marketing-serif text-3xl text-[#5c3a2e]">{title}</h1>
        ) : null}
        <div className={title ? 'mt-6' : ''}>{children}</div>
      </main>
    </div>
  )
}
