import { useState } from 'react'
import { toast } from 'sonner'
import { signInWithEmail } from '../services/authService.js'
import { getAuthErrorMessage } from '../utils/authErrors.js'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    <form onSubmit={handleSubmit} className="sm-form" noValidate>
      <div className="sm-field">
        <label htmlFor="login-email">Correo</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(error) || undefined}
          required
        />
      </div>

      <div className="sm-field">
        <label htmlFor="login-password">Contraseña</label>
        <div className="sm-field-row">
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(error) || undefined}
            required
          />
          <button
            type="button"
            className="sm-field-toggle"
            onClick={() => setShowPassword((value) => !value)}
            aria-pressed={showPassword}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
      </div>

      {error ? (
        <p className="sm-form-error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={submitting} className="sm-btn sm-btn--block">
        {submitting ? 'Ingresando…' : 'Iniciar sesión'}
      </button>
    </form>
  )
}
