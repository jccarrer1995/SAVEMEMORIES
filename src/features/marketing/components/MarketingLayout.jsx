import { MarketingDecor } from './MarketingDecor.jsx'
import { MarketingFooter } from './MarketingFooter.jsx'
import { MarketingHeader } from './MarketingHeader.jsx'
import '../styles/marketing.css'

/**
 * @param {{ children: import('react').ReactNode }} props
 */
export function MarketingLayout({ children }) {
  return (
    <div className="marketing-page relative overflow-hidden font-[Outfit,sans-serif]">
      <MarketingDecor />
      <MarketingHeader />
      <main className="relative z-10">{children}</main>
      <MarketingFooter />
    </div>
  )
}
