import { Link } from 'react-router-dom'
import { MarketingLayout } from '../../marketing/components/MarketingLayout.jsx'
import { useMarketingFonts } from '../../marketing/hooks/useMarketingFonts.js'

export function LoginPage() {
  useMarketingFonts('Acceso · SAVEMEMORIES')

  return (
    <MarketingLayout>
      <section className="mx-auto flex min-h-[70dvh] max-w-md flex-col justify-center px-6 py-16">
        <div className="marketing-card rounded-2xl p-8">
          <p className="marketing-kicker text-xs uppercase">Acceso</p>
          <h1 className="marketing-serif mt-3 text-3xl text-[#5c3a2e]">Inicia sesión</h1>
          <p className="marketing-muted mt-3 text-sm leading-relaxed">
            Autenticación con roles de administrador y cliente — disponible en la etapa 3.
          </p>

          <button
            type="button"
            disabled
            className="marketing-btn-primary mt-8 w-full rounded-full px-6 py-3 text-sm font-medium opacity-60"
          >
            Continuar (próximamente)
          </button>

          <Link to="/" className="marketing-link mt-6 inline-block text-sm font-medium underline-offset-2 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </section>
    </MarketingLayout>
  )
}
