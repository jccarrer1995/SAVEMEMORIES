import { Link } from 'react-router-dom'
import { MarketingShell } from '../../marketing/components/MarketingShell.jsx'

export function LoginPage() {
  return (
    <MarketingShell title="Acceso">
      <div className="marketing-card rounded-2xl p-6">
        <p className="marketing-muted text-sm leading-relaxed">
          Autenticación con roles (admin / cliente) — etapa 3.
        </p>
        <Link to="/" className="marketing-link mt-6 inline-block text-sm font-medium underline-offset-2 hover:underline">
          Volver al inicio
        </Link>
      </div>
    </MarketingShell>
  )
}
