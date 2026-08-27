/**
 * @param {{ id?: string, kicker: string, title: string, children: import('react').ReactNode, className?: string }} props
 */
export function MarketingSection({ id, kicker, title, children, className = '' }) {
  return (
    <section id={id} className={`mx-auto max-w-5xl scroll-mt-24 px-6 py-10 md:py-14 ${className}`}>
      <p className="marketing-kicker text-xs uppercase">{kicker}</p>
      <h2 className="marketing-serif mt-3 max-w-2xl text-3xl leading-tight text-[#5c3a2e] md:text-4xl">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  )
}
