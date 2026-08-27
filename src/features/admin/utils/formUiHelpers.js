export function scrollToFirstInvalidField() {
  requestAnimationFrame(() => {
    document.querySelector('.panel-field.is-invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}

/**
 * @param {boolean} isNew
 * @param {boolean} saving
 */
export function getClientSubmitLabel(isNew, saving) {
  if (saving) return 'Guardando…'
  if (isNew) return 'Crear cliente'
  return 'Guardar cambios'
}

/**
 * @param {unknown} err
 */
export function resolveClientSubmitError(err) {
  if (err instanceof Error && 'cause' in err) return err.cause
  return err
}
