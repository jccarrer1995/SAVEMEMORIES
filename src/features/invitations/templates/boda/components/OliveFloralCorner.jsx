import { publicUrl } from '../../../core/utils/publicUrl.js'

const OLIVE_FLORAL_TOP = publicUrl('/boda/floral-verde-olivo-superior-izquierda.png')
const OLIVE_FLORAL_BOTTOM = publicUrl('/boda/floral-verde-olivo-inferior-derecha.png')

/** @type {Record<'tl' | 'tr' | 'bl' | 'br', string>} */
const CORNER_CLASS = {
  tl: 'boda-olive-floral boda-olive-floral--tl',
  tr: 'boda-olive-floral boda-olive-floral--tr',
  bl: 'boda-olive-floral boda-olive-floral--bl',
  br: 'boda-olive-floral boda-olive-floral--br',
}

/**
 * @param {{ corner?: 'tl' | 'tr' | 'bl' | 'br', className?: string, variant?: 'default' | 'hero' }} props
 */
export function OliveFloralCorner({ corner = 'tl', className = '', variant = 'default' }) {
  const usesTopAsset = corner === 'tl' || corner === 'tr'
  const variantClass = variant === 'hero' ? 'boda-olive-floral--hero' : ''

  return (
    <img
      src={usesTopAsset ? OLIVE_FLORAL_TOP : OLIVE_FLORAL_BOTTOM}
      alt=""
      aria-hidden
      decoding="async"
      className={`${CORNER_CLASS[corner]} ${variantClass} ${className}`.trim()}
    />
  )
}

/**
 * @param {{ corners: Array<'tl' | 'tr' | 'bl' | 'br'>, variant?: 'default' | 'hero' }} props
 */
export function OliveFloralCorners({ corners, variant = 'default' }) {
  return corners.map((corner) => (
    <OliveFloralCorner key={corner} corner={corner} variant={variant} />
  ))
}
