/**
 * @param {unknown} error
 */
function getFirebaseAuthErrorCode(error) {
  if (typeof error !== 'object' || error === null || !('code' in error)) {
    return ''
  }

  const code = error.code
  return typeof code === 'string' ? code : ''
}

/**
 * @param {unknown} error
 */
export function getAuthErrorMessage(error) {
  const code = getFirebaseAuthErrorCode(error)

  switch (code) {
    case 'auth/invalid-email':
      return 'El correo no es válido.'
    case 'auth/user-disabled':
      return 'Esta cuenta fue desactivada.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Correo o contraseña incorrectos.'
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Espera un momento e inténtalo de nuevo.'
    case 'auth/network-request-failed':
      return 'Sin conexión. Revisa tu internet.'
    default:
      return error instanceof Error ? error.message : 'No se pudo iniciar sesión.'
  }
}
