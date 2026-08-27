import { Link } from 'react-router-dom'
import '../../../features/marketing/styles/marketing.css'

/**
 * @param {{ requiredRole?: string }} props
 */
export function UnauthorizedPage({ requiredRole }) {
  return (
    <div className="marketing-page flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="marketing-kicker text-xs uppercase">Acceso restringido</p>
      <h1 className="marketing-serif mt-4 text-3xl text-[#5c3a2e]">No tienes permiso</h1>
      <p className="marketing-muted mt-3 max-w-sm text-sm">
        {requiredRole
          ? `Esta sección requiere rol ${requiredRole}. Inicia sesión con la cuenta correcta.`
          : 'No tienes permiso para ver esta página.'}
      </p>
      <Link to="/login" className="marketing-btn-primary mt-8 rounded-full px-6 py-2.5 text-sm font-medium">
        Ir a acceso
      </Link>
    </div>
  )
}
