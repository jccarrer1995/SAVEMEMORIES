import { panelFieldClass } from '../utils/panelFieldClass.js'
import { formatFechaEventoFeedback, formatHoraEventoFeedback } from '../utils/eventDateTime.js'

/**
 * @param {{
 *   values: import('../types/projectRecord.js').ProjectFormValues,
 *   fieldErrors: Record<string, string>,
 *   onFieldChange: (field: keyof import('../types/projectRecord.js').ProjectFormValues, value: string) => void,
 * }} props
 */
export function EventDateTimeFields({ values, fieldErrors, onFieldChange }) {
  const fechaFeedback = formatFechaEventoFeedback(values.fechaEvento)
  const horaFeedback = formatHoraEventoFeedback(values.horaEvento)

  return (
    <>
      <label className={panelFieldClass(fieldErrors, 'fechaEvento')}>
        <span>Fecha del evento</span>
        <input
          type="date"
          value={values.fechaEvento}
          onChange={(event) => onFieldChange('fechaEvento', event.target.value)}
        />
        {fechaFeedback ? <span className="panel-field-hint">{fechaFeedback}</span> : null}
        {fieldErrors.fechaEvento ? <span className="panel-field-error">{fieldErrors.fechaEvento}</span> : null}
      </label>
      <label className={panelFieldClass(fieldErrors, 'horaEvento')}>
        <span>Hora del evento</span>
        <input
          type="time"
          value={values.horaEvento}
          onChange={(event) => onFieldChange('horaEvento', event.target.value)}
        />
        {horaFeedback ? <span className="panel-field-hint">{horaFeedback}</span> : null}
        {fieldErrors.horaEvento ? <span className="panel-field-error">{fieldErrors.horaEvento}</span> : null}
      </label>
    </>
  )
}
