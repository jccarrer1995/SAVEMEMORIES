import { Link } from 'react-router-dom'
import { MarketingShell } from '../../marketing/components/MarketingShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'

export function ClientDashboardPage() {
  return (
    <MarketingShell title="Panel cliente">
      <div className="marketing-card rounded-2xl p-6">
        <p className="marketing-kicker text-xs uppercase">Rol: {ROLES.CLIENT}</p>
        <p className="marketing-muted mt-4 text-sm leading-relaxed">
          Etapa 6: ver respuestas, crear enlaces dentro del límite y exportar Excel.
        </p>
        <Link to="/" className="marketing-link mt-6 inline-block text-sm font-medium underline-offset-2 hover:underline">
          Volver al inicio
        </Link>
      </div>
    </MarketingShell>
  )
}
