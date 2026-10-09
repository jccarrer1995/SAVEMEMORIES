import { publicUrl } from '../../../core/utils/publicUrl.js'

const BRANCH_LEFT = publicUrl('/boda/rama-aesthetic-izquierda.png')
const BRANCH_RIGHT = publicUrl('/boda/rama-aesthetic-derecha.png')

/** @type {Record<'tl' | 'tr' | 'bl' | 'br', string>} */
const CORNER_CLASS = {
  tl: 'boda-olive-branch boda-olive-branch--tl',
  tr: 'boda-olive-branch boda-olive-branch--tr',
  bl: 'boda-olive-branch boda-olive-branch--bl',
  br: 'boda-olive-branch boda-olive-branch--br',
}

/**
 * @param {{ corner?: 'tl' | 'tr' | 'bl' | 'br', className?: string, variant?: 'default' | 'hero' }} props
 */
export function OliveBranchCorner({ corner = 'tl', className = '', variant = 'default' }) {
  const usesLeftAsset = corner === 'tl' || corner === 'bl'
  const variantClass = variant === 'hero' ? 'boda-olive-branch--hero' : ''

  return (
    <img
      src={usesLeftAsset ? BRANCH_LEFT : BRANCH_RIGHT}
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
export function OliveBranchCorners({ corners, variant = 'default' }) {
  return corners.map((corner) => (
    <OliveBranchCorner key={corner} corner={corner} variant={variant} />
  ))
}
