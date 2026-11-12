import { Link } from 'react-router-dom'
import { SiteStatusScreen } from '../../marketing/home/SiteLayout.jsx'

/**
 * @param {{ requiredRole?: string }} props
 */
export function UnauthorizedPage({ requiredRole }) {
  return (
    <SiteStatusScreen>
      <p className="sm-eyebrow">
        <span className="sm-dot" /> Acceso restringido
      </p>
      <h1 className="sm-display sm-h2">
        No tienes <em>permiso.</em>
      </h1>
      <p className="sm-lead">
        {requiredRole
          ? `Esta sección requiere rol ${requiredRole}. Inicia sesión con la cuenta correcta.`
          : 'No tienes permiso para ver esta página.'}
      </p>
      <div className="sm-status-actions">
        <Link to="/login" className="sm-btn">
          Ir a acceso
        </Link>
        <Link to="/" className="sm-btn sm-btn--ghost">
          Volver al inicio
        </Link>
      </div>
    </SiteStatusScreen>
  )
}
