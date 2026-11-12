import { motion } from 'framer-motion'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { LEGAL_MENU_LINKS } from '../../marketing/data/legalMeta.js'
import { MarketingLayout } from '../../marketing/components/MarketingLayout.jsx'
import { Photo, SplitText } from '../../marketing/home/HomeMotion.jsx'
import { EASE, IMAGES } from '../../marketing/home/homeMedia.js'
import { useMarketingFonts } from '../../marketing/hooks/useMarketingFonts.js'
import { LoginForm } from '../components/LoginForm.jsx'
import { AuthLoadingScreen } from '../components/AuthLoadingScreen.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { getHomePathForRole, isPathAllowedForRole } from '../utils/roleRedirects.js'

const PANEL_POINTS = ['Enlaces por invitado', 'Confirmaciones en vivo', 'Mesas y exportación a Excel']

export function LoginPage() {
  useMarketingFonts('Acceso · SAVEMEMORIES')
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, profile, loading, isConfigured, authError } = useAuth()

  useEffect(() => {
    if (!isAuthenticated || !profile) return

    const redirectPath = typeof location.state?.from === 'string' ? location.state.from : ''
    if (redirectPath && isPathAllowedForRole(redirectPath, profile.role)) {
      navigate(redirectPath, { replace: true })
      return
    }

    navigate(getHomePathForRole(profile.role), { replace: true })
  }, [isAuthenticated, profile, location.state, navigate])

  useEffect(() => {
    if (authError) toast.error(authError)
  }, [authError])

  if (loading) return <AuthLoadingScreen />

  if (isAuthenticated && profile) {
    return <Navigate to={getHomePathForRole(profile.role)} replace />
  }

  return (
    <MarketingLayout>
      <section className="sm-auth">
        <div className="sm-container sm-auth-grid">
          <motion.aside
            className="sm-auth-media"
            initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 28px 28px)' }}
            animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 28px 28px)' }}
            transition={{ duration: 1.3, ease: EASE }}
          >
            <Photo img={IMAGES.bouquet} eager sizes="(min-width: 1024px) 40vw, 90vw" />
            <motion.div
              className="sm-auth-note"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            >
              <p className="sm-display">Todo tu evento, en un solo panel.</p>
              <ul>
                {PANEL_POINTS.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.div>
          </motion.aside>

          <div className="sm-auth-panel">
            <motion.p
              className="sm-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="sm-dot" /> Acceso clientes
            </motion.p>
            <h1 className="sm-display sm-h2">
              <SplitText text="Bienvenido *de vuelta.*" delay={0.1} />
            </h1>
            <motion.div
              className="sm-auth-body"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
            >
              <p className="sm-lead">Panel para administradores y clientes con invitaciones activas.</p>

              {!isConfigured ? (
                <p className="sm-notice">
                  Firebase no está configurado en este entorno. En local usa <code>.env</code>; en
                  producción configura los secrets <code>VITE_FIREBASE_*</code> en GitHub y vuelve a
                  desplegar.
                </p>
              ) : (
                <LoginForm />
              )}

              <div className="sm-auth-links">
                <Link to="/" className="sm-inline-link">
                  ← Volver al inicio
                </Link>
                <span>
                  {LEGAL_MENU_LINKS.map((link) => (
                    <Link key={link.to} to={link.to}>
                      {link.label}
                    </Link>
                  ))}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
