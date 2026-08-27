import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { EventDateTimeFields } from './EventDateTimeFields.jsx'
import { ClientOwnerField } from './ClientOwnerField.jsx'
import { TEMPLATE_OPTIONS } from '../data/templateOptions.js'
import { panelFieldClass } from '../utils/panelFieldClass.js'
import { slugify } from '../utils/slugify.js'
import {
  mapSaveErrorToFields,
  summarizeFieldErrors,
  validateProjectForm,
} from '../utils/validateProjectForm.js'
import { scrollToFirstInvalidField } from '../utils/formUiHelpers.js'

/**
 * @param {{
 *   initialValues: import('../types/projectRecord.js').ProjectFormValues,
 *   isNew: boolean,
 *   onSubmit: (values: import('../types/projectRecord.js').ProjectFormValues) => Promise<void>,
 * }} props
 */
export function ProjectForm({ initialValues, isNew, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState(/** @type {Record<string, string>} */ ({}))

  const previewUrl = useMemo(() => `/invitacion/${values.slug || 'slug'}`, [values.slug])

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

  function handleTitleChange(title) {
    setValues((prev) => ({
      ...prev,
      title,
      slug: !slugTouched && isNew ? slugify(title) : prev.slug,
    }))
    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next.title
      if (!slugTouched && isNew) delete next.slug
      return next
    })
    if (error) setError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const validation = validateProjectForm(values)
    if (!validation.valid) {
      setFieldErrors(validation.fieldErrors)
      const summary = summarizeFieldErrors(validation.fieldErrors)
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
      const message = err instanceof Error ? err.message : 'No se pudo guardar el proyecto.'
      const mapped = mapSaveErrorToFields(message)
      if (Object.keys(mapped).length > 0) setFieldErrors(mapped)
      setError(message)
      toast.error(message)
      scrollToFirstInvalidField()
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="panel-form" onSubmit={(event) => void handleSubmit(event)}>
      {error ? <p className="panel-form-error">{error}</p> : null}

      <section className="panel-form-section">
        <h2 className="panel-form-heading">Datos generales</h2>
        <div className="panel-form-grid">
          <label className={panelFieldClass(fieldErrors, 'title')}>
            <span>Título del proyecto</span>
            <input
              type="text"
              value={values.title}
              onChange={(event) => handleTitleChange(event.target.value)}
            />
            {fieldErrors.title ? <span className="panel-field-error">{fieldErrors.title}</span> : null}
          </label>
          <label className={panelFieldClass(fieldErrors, 'slug')}>
            <span>Identificador (URL)</span>
            <input
              type="text"
              value={values.slug}
              onChange={(event) => {
                setSlugTouched(true)
                updateField('slug', slugify(event.target.value))
              }}
              disabled={!isNew}
            />
            {fieldErrors.slug ? <span className="panel-field-error">{fieldErrors.slug}</span> : null}
          </label>
          <label className="panel-field">
            <span>Plantilla</span>
            <select
              value={values.templateId}
              onChange={(event) => updateField('templateId', event.target.value)}
            >
              {TEMPLATE_OPTIONS.map((option) => (
                <option key={option.id} value={option.id} disabled={!option.available}>
                  {option.label}
                  {!option.available ? ' (pronto)' : ''}
                </option>
              ))}
            </select>
          </label>
          <label className="panel-field">
            <span>Estado</span>
            <select value={values.status} onChange={(event) => updateField('status', event.target.value)}>
              <option value="draft">Borrador</option>
              <option value="active">Activo</option>
              <option value="archived">Archivado</option>
            </select>
          </label>
          <ClientOwnerField value={values.ownerId} onChange={(uid) => updateField('ownerId', uid)} />
          <label className="panel-field">
            <span>Límite de enlaces</span>
            <input
              type="number"
              min={0}
              value={values.linkLimit}
              onChange={(event) => updateField('linkLimit', Number(event.target.value))}
            />
          </label>
        </div>
        {values.slug ? (
          <p className="panel-form-hint">
            Vista previa pública:{' '}
            <Link to={previewUrl} className="marketing-link" target="_blank" rel="noreferrer">
              {previewUrl}
            </Link>
          </p>
        ) : null}
      </section>

      <section className="panel-form-section">
        <h2 className="panel-form-heading">Pareja y fecha</h2>
        <div className="panel-form-grid">
          <label className={panelFieldClass(fieldErrors, 'novio')}>
            <span>Novio</span>
            <input type="text" value={values.novio} onChange={(e) => updateField('novio', e.target.value)} />
            {fieldErrors.novio ? <span className="panel-field-error">{fieldErrors.novio}</span> : null}
          </label>
          <label className={panelFieldClass(fieldErrors, 'novia')}>
            <span>Novia</span>
            <input type="text" value={values.novia} onChange={(e) => updateField('novia', e.target.value)} />
            {fieldErrors.novia ? <span className="panel-field-error">{fieldErrors.novia}</span> : null}
          </label>
          <label className="panel-field">
            <span>Iniciales</span>
            <input type="text" value={values.iniciales} onChange={(e) => updateField('iniciales', e.target.value)} />
          </label>
          <label className={panelFieldClass(fieldErrors, 'fechaLabel')}>
            <span>Fecha (texto)</span>
            <input
              type="text"
              value={values.fechaLabel}
              onChange={(e) => updateField('fechaLabel', e.target.value)}
            />
            {fieldErrors.fechaLabel ? <span className="panel-field-error">{fieldErrors.fechaLabel}</span> : null}
          </label>
          <EventDateTimeFields values={values} fieldErrors={fieldErrors} onFieldChange={updateField} />
          <label className="panel-field panel-field--wide">
            <span>Cita / mensaje</span>
            <textarea value={values.cita} onChange={(e) => updateField('cita', e.target.value)} rows={2} />
          </label>
        </div>
      </section>

      <section className="panel-form-section">
        <h2 className="panel-form-heading">Recepción y detalles</h2>
        <div className="panel-form-grid">
          <label className="panel-field">
            <span>Título recepción</span>
            <input
              type="text"
              value={values.recepcionTitulo}
              onChange={(e) => updateField('recepcionTitulo', e.target.value)}
            />
          </label>
          <label className="panel-field">
            <span>Hora</span>
            <input
              type="text"
              value={values.recepcionHora}
              onChange={(e) => updateField('recepcionHora', e.target.value)}
            />
          </label>
          <label className="panel-field">
            <span>Lugar</span>
            <input
              type="text"
              value={values.recepcionLugar}
              onChange={(e) => updateField('recepcionLugar', e.target.value)}
            />
          </label>
          <label className="panel-field panel-field--wide">
            <span>Dirección</span>
            <input
              type="text"
              value={values.recepcionDireccion}
              onChange={(e) => updateField('recepcionDireccion', e.target.value)}
            />
          </label>
          <label className="panel-field panel-field--wide">
            <span>URL Google Maps</span>
            <input
              type="url"
              value={values.recepcionMapsUrl}
              onChange={(e) => updateField('recepcionMapsUrl', e.target.value)}
            />
          </label>
          <label className="panel-field panel-field--wide">
            <span>Padres del novio (una línea por persona)</span>
            <textarea value={values.padresNovio} onChange={(e) => updateField('padresNovio', e.target.value)} rows={2} />
          </label>
          <label className="panel-field panel-field--wide">
            <span>Padres de la novia (una línea por persona)</span>
            <textarea value={values.padresNovia} onChange={(e) => updateField('padresNovia', e.target.value)} rows={2} />
          </label>
          <label className="panel-field panel-field--wide">
            <span>Regalos</span>
            <textarea value={values.regalosTexto} onChange={(e) => updateField('regalosTexto', e.target.value)} rows={2} />
          </label>
          <label className="panel-field">
            <span>Dress code</span>
            <input
              type="text"
              value={values.dressCodeEstilo}
              onChange={(e) => updateField('dressCodeEstilo', e.target.value)}
            />
          </label>
          <label className="panel-field">
            <span>Detalle dress code</span>
            <input
              type="text"
              value={values.dressCodeDetalle}
              onChange={(e) => updateField('dressCodeDetalle', e.target.value)}
            />
          </label>
          <label className="panel-field panel-field--wide">
            <span>Política niños</span>
            <input type="text" value={values.noNinos} onChange={(e) => updateField('noNinos', e.target.value)} />
          </label>
        </div>
      </section>

      <section className="panel-form-section">
        <h2 className="panel-form-heading">Medios e invitado demo</h2>
        <div className="panel-form-grid">
          <label className="panel-field panel-field--wide">
            <span>Foto hero (URL)</span>
            <input type="text" value={values.fotoHero} onChange={(e) => updateField('fotoHero', e.target.value)} />
          </label>
          <label className="panel-field panel-field--wide">
            <span>Galería (una URL por línea)</span>
            <textarea value={values.fotosGaleria} onChange={(e) => updateField('fotosGaleria', e.target.value)} rows={3} />
          </label>
          <label className="panel-field panel-field--wide">
            <span>Música (URL)</span>
            <input type="text" value={values.musicaSrc} onChange={(e) => updateField('musicaSrc', e.target.value)} />
          </label>
          <label className="panel-field">
            <span>Invitado demo</span>
            <input
              type="text"
              value={values.invitadoDefault}
              onChange={(e) => updateField('invitadoDefault', e.target.value)}
            />
          </label>
          <label className="panel-field">
            <span>Cupos demo</span>
            <input
              type="number"
              min={1}
              value={values.cuposDefault}
              onChange={(e) => updateField('cuposDefault', Number(e.target.value))}
            />
          </label>
        </div>
      </section>

      <div className="panel-form-actions">
        <Link to="/admin/proyectos" className="marketing-btn-secondary rounded-full px-5 py-2 text-sm font-medium">
          Cancelar
        </Link>
        <button type="submit" disabled={saving} className="panel-btn-primary rounded-full px-5 py-2 text-sm font-medium">
          {saving ? 'Guardando…' : 'Guardar proyecto'}
        </button>
      </div>
    </form>
  )
}
