/**
 * @param {{
 *   active: boolean,
 *   disabled?: boolean,
 *   onChange: (active: boolean) => void,
 * }} props
 */
export function GuestLinkStatusToggle({ active, disabled = false, onChange }) {
  return (
    <label className={`panel-status-toggle ${disabled ? 'is-disabled' : ''}`}>
      <input
        type="checkbox"
        checked={active}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        aria-label={active ? 'Desactivar enlace' : 'Activar enlace'}
      />
      <span className="panel-status-toggle-track" aria-hidden="true" />
    </label>
  )
}
