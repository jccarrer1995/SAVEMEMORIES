import { OliveBranchCorners } from './OliveBranchCorner.jsx'
import { OliveFloralCorners } from './OliveFloralCorner.jsx'

/**
 * @param {{
 *   flowers?: Array<'tl' | 'tr' | 'bl' | 'br'>,
 *   branches?: Array<'tl' | 'tr' | 'bl' | 'br'>,
 *   variant?: 'default' | 'hero',
 * }} props
 */
export function OliveSectionDecor({ flowers = [], branches = [], variant = 'default' }) {
  return (
    <>
      <OliveFloralCorners corners={flowers} variant={variant} />
      <OliveBranchCorners corners={branches} variant={variant} />
    </>
  )
}
