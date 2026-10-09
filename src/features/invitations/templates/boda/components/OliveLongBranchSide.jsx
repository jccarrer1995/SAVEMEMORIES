import { publicUrl } from '../../../core/utils/publicUrl.js'

const LONG_BRANCH_LEFT = publicUrl('/boda/rama-larga-verde-olivo-izquierda.png')
const LONG_BRANCH_RIGHT = publicUrl('/boda/rama-larga-verde-olivo-derecha.png')

/**
 * @param {{ side?: 'left' | 'right', className?: string }} props
 */
export function OliveLongBranchSide({ side = 'left', className = '' }) {
  return (
    <img
      src={side === 'left' ? LONG_BRANCH_LEFT : LONG_BRANCH_RIGHT}
      alt=""
      aria-hidden
      decoding="async"
      className={`boda-olive-long-branch boda-olive-long-branch--${side} ${className}`.trim()}
    />
  )
}
