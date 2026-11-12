import { SiteStatusScreen } from '../../marketing/home/SiteLayout.jsx'

export function FirebaseRequiredScreen() {
  return (
    <SiteStatusScreen>
      <p className="sm-eyebrow">
        <span className="sm-dot" /> Configuración
      </p>
      <h1 className="sm-display sm-h2">
        Firebase <em>requerido.</em>
      </h1>
      <p className="sm-lead">
        Los paneles protegidos necesitan las variables de Firebase en <code>.env</code>. Consulta{' '}
        <code>docs/AUTH.md</code>.
      </p>
    </SiteStatusScreen>
  )
}
