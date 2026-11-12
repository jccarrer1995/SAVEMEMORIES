import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS, SITE, whatsappUrl } from '../data/siteContent.js'
import { EASE } from './homeMedia.js'
import { useSectionNav } from './useSectionNav.js'

export function HomeHeader() {
  const goToSection = useSectionNav()
  const isLoginPage = useLocation().pathname === '/login'
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const goTo = (id) => {
    const wasOpen = open
    setOpen(false)
    goToSection(id, wasOpen ? 320 : 0)
  }

  return (
    <>
      <header className={`sm-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <div className="sm-container sm-header-row">
          <Link to="/" className="sm-logo" aria-label={`${SITE.name}, inicio`}>
            <span className="sm-logo-mark" aria-hidden>S</span>
            <span className="sm-logo-word">{SITE.name}</span>
          </Link>

          <nav className="sm-nav" aria-label="Secciones">
            {NAV_LINKS.map((link) => (
              <button key={link.id} type="button" className="sm-nav-link" onClick={() => goTo(link.id)}>
                {link.label}
              </button>
            ))}
          </nav>

          <div className="sm-header-actions">
            {!isLoginPage ? (
              <Link to="/login" className="sm-header-login">
                Acceso
              </Link>
            ) : null}
            <a
              href={whatsappUrl(SITE.whatsapp, SITE.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="sm-btn sm-btn--sm sm-header-cta"
            >
              Cotizar
            </a>
            <button
              type="button"
              className="sm-menu-btn"
              aria-expanded={open}
              aria-controls="sm-mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sm-menu-btn-label">{open ? 'Cerrar' : 'Menú'}</span>
              <span className="sm-menu-btn-icon" aria-hidden>
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
        <motion.div className="sm-progress" style={{ scaleX: progress }} aria-hidden />
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="sm-mobile-menu"
            className="sm-mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav className="sm-container sm-mobile-nav" aria-label="Menú principal">
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => goTo(link.id)}
                  className="sm-mobile-link"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.06, duration: 0.6, ease: EASE }}
                >
                  <span className="sm-mobile-index">0{index + 1}</span>
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                className="sm-mobile-foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/login" className="sm-btn sm-btn--ghost">
                  Acceso clientes
                </Link>
                <a
                  href={whatsappUrl(SITE.whatsapp, SITE.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="sm-btn"
                >
                  Cotizar por WhatsApp
                </a>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
