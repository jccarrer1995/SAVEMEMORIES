import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { ClientFormExtras, ClientFormFields } from './ClientFormFields.jsx'
import {
  getClientSubmitLabel,
  resolveClientSubmitError,
  scrollToFirstInvalidField,
} from '../utils/formUiHelpers.js'
import {
  getClientSaveErrorMessage,
  mapClientSaveErrorToFields,
  summarizeClientFieldErrors,
  validateClientForm,
} from '../utils/validateClientForm.js'

/**
 * @param {{
 *   initialValues: import('../types/clientRecord.js').ClientFormValues,
 *   isNew: boolean,
 *   onSubmit: (values: import('../types/clientRecord.js').ClientFormValues) => Promise<void>,
 *   onResetPassword?: (email: string) => Promise<void>,
 * }} props
 */
export function ClientForm({ initialValues, isNew, onSubmit, onResetPassword }) {
  const [values, setValues] = useState(initialValues)
  const [saving, setSaving] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState(/** @type {Record<string, string>} */ ({}))

  function updateField(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
    if (error) setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const validation = validateClientForm(values, isNew)
    if (!validation.valid) {
      setFieldErrors(validation.fieldErrors)
      const summary = summarizeClientFieldErrors(validation.fieldErrors)
      setError(summary)
      toast.error(summary)
      scrollToFirstInvalidField()
      return
    }

    setFieldErrors({})
    setSaving(true)
    try {
      await onSubmit(values)
    } catch (err) {
      const cause = resolveClientSubmitError(err)
      const message = getClientSaveErrorMessage(cause)
      const mapped = mapClientSaveErrorToFields(cause)
      if (Object.keys(mapped).length > 0) setFieldErrors(mapped)
      setError(message)
      toast.error(message)
      scrollToFirstInvalidField()
    } finally {
      setSaving(false)
    }
  }

  async function handleResetPassword() {
    if (!onResetPassword || !values.email.trim()) return
    setResetting(true)
    try {
      await onResetPassword(values.email)
      toast.success('Correo de restablecimiento enviado')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo enviar el correo.')
    } finally {
      setResetting(false)
    }
  }

  const submitLabel = getClientSubmitLabel(isNew, saving)

  return (
    <form className="panel-form" onSubmit={(event) => void handleSubmit(event)}>
      {error ? <p className="panel-form-error">{error}</p> : null}

      <section className="panel-form-section">
        <h2 className="panel-form-heading">Datos del cliente</h2>
        <ClientFormFields
          isNew={isNew}
          values={values}
          fieldErrors={fieldErrors}
          onFieldChange={updateField}
        />

        {!isNew ? (
          <ClientFormExtras
            values={values}
            onResetPassword={onResetPassword}
            resetting={resetting}
            onReset={() => void handleResetPassword()}
          />
        ) : null}
      </section>

      <div className="panel-form-actions">
        <Link to="/admin/clientes" className="marketing-btn-secondary rounded-full px-5 py-2 text-sm font-medium">
          Cancelar
        </Link>
        <button type="submit" disabled={saving} className="panel-btn-primary rounded-full px-5 py-2 text-sm font-medium">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
