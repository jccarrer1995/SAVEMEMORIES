import { Link } from 'react-router-dom'

export function MarketingHeader() {
  return (
    <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
      <p className="marketing-serif text-xl tracking-[0.2em] text-[#7a4a32]">SAVEMEMORIES</p>
      <nav className="flex gap-4 text-sm">
        <Link to="/login" className="marketing-link font-medium transition-colors">
          Acceso clientes
        </Link>
      </nav>
    </header>
  )
}
