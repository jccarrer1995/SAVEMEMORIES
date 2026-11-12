import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LEGAL_LAST_UPDATED, LEGAL_MENU_LINKS, LEGAL_ROUTES } from '../data/legalMeta.js'
import { ArrowIcon, SplitText } from '../home/HomeMotion.jsx'
import { EASE } from '../home/homeMedia.js'
import { scrollToSection } from '../hooks/useMarketingFonts.js'

/** Resalta en el índice la sección visible. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids])

  return active
}

/** Quita la numeración inicial ("3. Roles") para el índice. */
function shortTitle(title) {
  return title.replace(/^\d+(\.\d+)*\.?\s*/, '')
}

/**
 * @param {{
 *   title: string,
 *   intro: string,
 *   sections: Array<{ id: string, title: string, body: import('react').ReactNode }>,
 *   siblingRoute?: keyof typeof LEGAL_ROUTES,
 * }} props
 */
export function LegalDocument({ title, intro, sections, siblingRoute }) {
  const [ids] = useState(() => sections.map((section) => section.id))
  const active = useActiveSection(ids)
  const sibling = siblingRoute
    ? LEGAL_MENU_LINKS.find((item) => item.to === LEGAL_ROUTES[siblingRoute])
    : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [title])

  const toc = (
    <ol className="sm-toc-list">
      {sections.map((section, index) => (
        <li key={section.id}>
          <button
            type="button"
            className={active === section.id ? 'is-active' : ''}
            onClick={() => scrollToSection(section.id)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {shortTitle(section.title)}
          </button>
        </li>
      ))}
    </ol>
  )

  return (
    <article className="sm-legal">
      <header className="sm-legal-hero">
        <div className="sm-container">
          <motion.p
            className="sm-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="sm-dot" /> Información legal
          </motion.p>
          <h1 className="sm-display sm-h1 sm-legal-title">
            <SplitText text={title} delay={0.1} />
          </h1>
          <motion.div
            className="sm-legal-meta"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          >
            <p className="sm-lead">{intro}</p>
            <p className="sm-legal-date">
              Última actualización
              <strong>{LEGAL_LAST_UPDATED}</strong>
            </p>
          </motion.div>
        </div>
      </header>

      <div className="sm-container sm-legal-grid">
        <aside className="sm-toc" aria-label="Contenido">
          <details className="sm-toc-mobile">
            <summary>Contenido · {sections.length} secciones</summary>
            {toc}
          </details>
          <div className="sm-toc-desktop">
            <p className="sm-footer-label">Contenido</p>
            {toc}
          </div>
        </aside>

        <div className="sm-legal-body">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="sm-legal-section">
              <h2 className="sm-display">{section.title}</h2>
              <div className="sm-prose">{section.body}</div>
            </section>
          ))}

          {sibling ? (
            <Link to={sibling.to} className="sm-legal-next">
              <span>
                <span className="sm-footer-label">Consulta también</span>
                <span className="sm-display">{sibling.label}</span>
              </span>
              <span className="sm-template-arrow" aria-hidden>
                <ArrowIcon />
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  )
}
