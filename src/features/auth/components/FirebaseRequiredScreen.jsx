import '../../../features/marketing/styles/marketing.css'

export function FirebaseRequiredScreen() {
  return (
    <div className="marketing-page flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="marketing-kicker text-xs uppercase">Configuración</p>
      <h1 className="marketing-serif mt-4 text-2xl text-[#5c3a2e]">Firebase requerido</h1>
      <p className="marketing-muted mt-3 max-w-sm text-sm">
        Los paneles protegidos necesitan las variables de Firebase en <code>.env</code>. Consulta{' '}
        <code>docs/AUTH.md</code>.
      </p>
    </div>
  )
}
