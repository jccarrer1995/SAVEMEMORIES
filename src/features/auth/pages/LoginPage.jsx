import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { MarketingLayout } from '../../marketing/components/MarketingLayout.jsx'
import { useMarketingFonts } from '../../marketing/hooks/useMarketingFonts.js'
import { LoginForm } from '../components/LoginForm.jsx'
import { AuthLoadingScreen } from '../components/AuthLoadingScreen.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { getHomePathForRole, isPathAllowedForRole } from '../utils/roleRedirects.js'

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
      <section className="mx-auto flex min-h-[70dvh] max-w-md flex-col justify-center px-6 py-16">
        <div className="marketing-card rounded-2xl p-8">
          <p className="marketing-kicker text-xs uppercase">Acceso</p>
          <h1 className="marketing-serif mt-3 text-3xl text-[#5c3a2e]">Inicia sesión</h1>
          <p className="marketing-muted mt-3 text-sm leading-relaxed">
            Panel para administradores y clientes con invitaciones activas.
          </p>

          {!isConfigured ? (
            <p className="marketing-muted mt-6 rounded-xl border border-dashed border-[rgba(201,123,92,0.35)] bg-white/50 p-4 text-sm">
              Firebase no está configurado en este entorno. En local usa <code>.env</code>; en
              producción configura los secrets <code>VITE_FIREBASE_*</code> en GitHub y vuelve a
              desplegar.
            </p>
          ) : (
            <div className="mt-8">
              <LoginForm />
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="marketing-link text-sm font-medium underline-offset-2 hover:underline"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
