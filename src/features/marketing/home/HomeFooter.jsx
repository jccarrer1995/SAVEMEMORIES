import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LEGAL_MENU_LINKS } from '../data/legalMeta.js'
import { NAV_LINKS, SITE } from '../data/siteContent.js'
import { EASE } from './homeMedia.js'
import { useSectionNav } from './useSectionNav.js'

export function HomeFooter() {
  const scrollToSection = useSectionNav()
  return (
    <footer className="sm-footer">
      <div className="sm-container">
        <div className="sm-footer-top">
          <p className="sm-footer-tagline sm-display">{SITE.tagline}.</p>
          <nav className="sm-footer-cols" aria-label="Pie de página">
            <div>
              <p className="sm-footer-label">Explora</p>
              {NAV_LINKS.map((link) => (
                <button key={link.id} type="button" onClick={() => scrollToSection(link.id)}>
                  {link.label}
                </button>
              ))}
            </div>
            <div>
              <p className="sm-footer-label">Legal</p>
              {LEGAL_MENU_LINKS.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
              <Link to="/login">Acceso clientes</Link>
            </div>
          </nav>
        </div>

        <motion.p
          className="sm-footer-word sm-display"
          initial={{ y: '40%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          aria-hidden
        >
          SaveMemories
        </motion.p>

        <div className="sm-footer-bottom">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <span>Invitaciones digitales hechas con cariño.</span>
        </div>
      </div>
    </footer>
  )
}
