import { MarketingLayout } from '../components/MarketingLayout.jsx'
import { useMarketingFonts } from '../hooks/useMarketingFonts.js'

/**
 * @param {{ children: import('react').ReactNode, title?: string, pageTitle?: string }} props
 */
export function MarketingShell({ children, title, pageTitle }) {
  useMarketingFonts(pageTitle ?? (title ? `${title} · SAVEMEMORIES` : undefined))

  return (
    <MarketingLayout>
      <section className="mx-auto max-w-3xl px-6 py-10">
        {title ? <h1 className="marketing-serif text-3xl text-[#5c3a2e]">{title}</h1> : null}
        <div className={title ? 'mt-6' : ''}>{children}</div>
      </section>
    </MarketingLayout>
  )
}
