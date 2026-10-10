/**
 * @param {{
 *   legend: string,
 *   options: ReadonlyArray<{ id: string, label: string }>,
 *   value: string,
 *   onChange: (id: string) => void,
 *   disabled?: boolean,
 * }} props
 */
export function GuestLinkTagSelect({ legend, options, value, onChange, disabled = false }) {
  return (
    <fieldset className="panel-tag-fieldset panel-field--wide">
      <legend className="panel-tag-legend">
        {legend} <span className="panel-tag-legend-optional">(opcional)</span>
      </legend>
      <div className="panel-tag-select" role="radiogroup" aria-label={legend}>
        {options.map((option) => {
          const selected = value === option.id
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              className={`panel-tag-option${selected ? ' panel-tag-option--selected' : ''}`}
              onClick={() => onChange(selected ? '' : option.id)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
