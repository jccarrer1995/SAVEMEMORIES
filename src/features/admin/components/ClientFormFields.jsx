import { panelFieldClass } from '../utils/panelFieldClass.js'

/**
 * @param {{
 *   isNew: boolean,
 *   values: import('../types/clientRecord.js').ClientFormValues,
 *   fieldErrors: Record<string, string>,
 *   onFieldChange: (field: string, value: string | boolean) => void,
 * }} props
 */
export function ClientFormFields({ isNew, values, fieldErrors, onFieldChange }) {
  return (
    <div className="panel-form-grid">
      <label className={panelFieldClass(fieldErrors, 'displayName')}>
        <span>Nombre</span>
        <input
          type="text"
          value={values.displayName}
          onChange={(event) => onFieldChange('displayName', event.target.value)}
          placeholder="Ej. Juan y Jessica"
        />
        {fieldErrors.displayName ? (
          <span className="panel-field-error">{fieldErrors.displayName}</span>
        ) : null}
      </label>
      <label className={panelFieldClass(fieldErrors, 'email')}>
        <span>Correo</span>
        <input
          type="email"
          value={values.email}
          onChange={(event) => onFieldChange('email', event.target.value)}
          disabled={!isNew}
          autoComplete="off"
        />
        {fieldErrors.email ? <span className="panel-field-error">{fieldErrors.email}</span> : null}
        {!isNew ? (
          <span className="panel-form-hint">El correo de acceso no se puede cambiar desde aquí.</span>
        ) : null}
      </label>
      {isNew ? (
        <label className={panelFieldClass(fieldErrors, 'temporarySecret')}>
          <span>Contraseña temporal</span>
          <input
            type="password"
            value={values.temporarySecret}
            onChange={(event) => onFieldChange('temporarySecret', event.target.value)}
            autoComplete="new-password"
          />
          {fieldErrors.temporarySecret ? (
            <span className="panel-field-error">{fieldErrors.temporarySecret}</span>
          ) : null}
        </label>
      ) : null}
      {!isNew ? (
        <label className="panel-field">
          <span>Estado</span>
          <select
            value={values.active ? 'active' : 'inactive'}
            onChange={(event) => onFieldChange('active', event.target.value === 'active')}
          >
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </label>
      ) : null}
    </div>
  )
}

/**
 * @param {{
 *   values: import('../types/clientRecord.js').ClientFormValues,
 *   onResetPassword?: (email: string) => Promise<void>,
 *   resetting: boolean,
 *   onReset: () => void,
 * }} props
 */
export function ClientFormExtras({ values, onResetPassword, resetting, onReset }) {
  return (
    <>
      {values.uid ? (
        <p className="panel-form-hint">
          UID: <code className="text-xs">{values.uid}</code> — úsalo al asignar proyectos.
        </p>
      ) : null}

      {onResetPassword ? (
        <div className="mt-4">
          <button
            type="button"
            disabled={resetting || !values.email.trim()}
            onClick={onReset}
            className="marketing-btn-secondary rounded-full px-4 py-2 text-sm font-medium"
          >
            {resetting ? 'Enviando…' : 'Enviar restablecimiento de contraseña'}
          </button>
        </div>
      ) : null}
    </>
  )
}
