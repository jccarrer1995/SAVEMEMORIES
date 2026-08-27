import { useState } from 'react'
import { toast } from 'sonner'
import { signInWithEmail } from '../services/authService.js'
import { getAuthErrorMessage } from '../utils/authErrors.js'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Ingresa correo y contraseña.')
      return
    }

    setSubmitting(true)
    try {
      await signInWithEmail(email, password)
      toast.success('Sesión iniciada')
    } catch (err) {
      const message = getAuthErrorMessage(err)
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="block text-left text-xs tracking-wide text-[#8b5e4b]">
          Correo
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          className="mt-1 w-full rounded-xl border border-[rgba(201,123,92,0.25)] bg-white/80 px-4 py-2.5 text-sm text-[#5c3a2e] outline-none focus:border-[#c97b5c]"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="login-password" className="block text-left text-xs tracking-wide text-[#8b5e4b]">
          Contraseña
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          className="mt-1 w-full rounded-xl border border-[rgba(201,123,92,0.25)] bg-white/80 px-4 py-2.5 text-sm text-[#5c3a2e] outline-none focus:border-[#c97b5c]"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      {error ? <p className="text-left text-xs text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="marketing-btn-primary w-full rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60"
      >
        {submitting ? 'Ingresando…' : 'Iniciar sesión'}
      </button>
    </form>
  )
}
