/**
 * @param {string} text
 * @returns {boolean}
 */
function copyWithExecCommand(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '0'
  textarea.style.width = '1px'
  textarea.style.height = '1px'
  textarea.style.opacity = '0'
  textarea.style.pointerEvents = 'none'
  document.body.appendChild(textarea)

  const selection = document.getSelection()
  const selectedRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null

  textarea.focus()
  textarea.select()
  textarea.setSelectionRange(0, text.length)

  let copied = false
  try {
    // Fallback síncrono requerido en Safari/iOS cuando Clipboard API no está disponible.
    copied = document.execCommand('copy') // NOSONAR
  } catch {
    copied = false
  } finally {
    textarea.remove()
    if (selectedRange && selection) {
      selection.removeAllRanges()
      selection.addRange(selectedRange)
    }
  }

  return copied
}

/**
 * Copia texto al portapapeles. Usa fallback síncrono primero (iOS/Safari móvil).
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export function copyTextToClipboard(text) {
  if (copyWithExecCommand(text)) {
    return Promise.resolve(true)
  }

  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => false,
    )
  }

  return Promise.resolve(false)
}
