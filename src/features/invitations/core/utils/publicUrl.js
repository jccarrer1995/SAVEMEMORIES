/**
 * @param {string} path
 */
export function publicUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

/**
 * Ajusta URLs guardadas sin el base path de la app (p. ej. Firestore `/boda/musica.mp3`).
 * @param {string | undefined | null} url
 */
export function resolvePublicAssetUrl(url) {
  if (!url || typeof url !== 'string') return url ?? ''
  if (/^https?:\/\//i.test(url)) return url

  const base = import.meta.env.BASE_URL
  if (base !== '/' && url.startsWith(base)) return url

  const path = url.startsWith('/') ? url : `/${url}`
  return publicUrl(path)
}
