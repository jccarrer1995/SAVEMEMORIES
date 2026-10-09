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
  if (!url || typeof url !== 'string') return ''
  const trimmed = url.trim()
  if (!trimmed) return ''

  const base = import.meta.env.BASE_URL

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed)

      if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
        return publicUrl(parsed.pathname)
      }

      const baseSegment = base.replace(/^\/|\/$/g, '')
      if (
        base !== '/' &&
        baseSegment &&
        !parsed.pathname.includes(`/${baseSegment}/`) &&
        (/^\/boda\//.test(parsed.pathname) || /^\/baby-shower\//.test(parsed.pathname))
      ) {
        return `${parsed.origin}${base}${parsed.pathname.replace(/^\//, '')}`
      }
    } catch {
      return trimmed
    }
    return trimmed
  }

  if (base !== '/' && trimmed.startsWith(base)) return trimmed

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return publicUrl(path)
}

/**
 * @param {string | undefined | null} musicaSrc
 * @param {string} fallbackPath
 */
export function resolveMusicSrc(musicaSrc, fallbackPath) {
  return resolvePublicAssetUrl(musicaSrc) || publicUrl(fallbackPath)
}
