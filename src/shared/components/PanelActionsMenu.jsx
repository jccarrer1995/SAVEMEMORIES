import { MoreVertical } from 'lucide-react'
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * @typedef {object} PanelActionsMenuItem
 * @property {string} id
 * @property {string} label
 * @property {() => void} [onClick]
 * @property {string} [href]
 * @property {boolean} [external]
 * @property {boolean} [destructive]
 * @property {boolean} [disabled]
 */

/**
 * @param {{
 *   label?: string,
 *   items: PanelActionsMenuItem[],
 *   align?: 'start' | 'center' | 'end',
 * }} props
 */
export function PanelActionsMenu({ label = 'Acciones', items, align = 'center' }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState(/** @type {{ top: number, left: number } | null} */ (null))
  const rootRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const buttonRef = useRef(/** @type {HTMLButtonElement | null} */ (null))
  const menuRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const menuId = useId()
  const visibleItems = items.filter((item) => item.label)

  useLayoutEffect(() => {
    if (!open) {
      setCoords(null)
      return undefined
    }

    function place() {
      const button = buttonRef.current
      const menu = menuRef.current
      if (!button || !menu) return

      const rect = button.getBoundingClientRect()
      const menuRect = menu.getBoundingClientRect()
      const gap = 6
      const margin = 8
      const openUp =
        rect.bottom + gap + menuRect.height > window.innerHeight - margin &&
        rect.top > menuRect.height + gap
      const top = openUp ? rect.top - gap - menuRect.height : rect.bottom + gap
      let left = rect.left
      if (align === 'end') left = rect.right - menuRect.width
      if (align === 'center') left = rect.left + rect.width / 2 - menuRect.width / 2
      const maxLeft = window.innerWidth - margin - menuRect.width
      left = Math.min(Math.max(left, margin), Math.max(maxLeft, margin))
      const clampedTop = Math.min(Math.max(top, margin), window.innerHeight - margin - menuRect.height)

      setCoords({ top: clampedTop, left })
    }

    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open, align, visibleItems.length])

  useEffect(() => {
    if (!open) return undefined

    function onPointerDown(event) {
      if (rootRef.current && !rootRef.current.contains(/** @type {Node} */ (event.target))) {
        setOpen(false)
      }
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  if (visibleItems.length === 0) return null

  return (
    <div ref={rootRef} className={`panel-actions-menu panel-actions-menu--${align}`}>
      <button
        ref={buttonRef}
        type="button"
        className="panel-icon-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={label}
        title={label}
        onClick={() => setOpen((value) => !value)}
      >
        <MoreVertical size={17} strokeWidth={1.75} aria-hidden="true" />
      </button>

      {open ? (
        <div
          ref={menuRef}
          id={menuId}
          className="panel-actions-menu-popover"
          role="menu"
          aria-label={label}
          style={{
            top: coords?.top ?? 0,
            left: coords?.left ?? 0,
            visibility: coords ? 'visible' : 'hidden',
          }}
        >
          {visibleItems.map((item) => {
            const className = item.destructive
              ? 'panel-actions-menu-item panel-actions-menu-item--danger'
              : 'panel-actions-menu-item'

            if (item.href) {
              if (item.external) {
                return (
                  <a
                    key={item.id}
                    role="menuitem"
                    href={item.href}
                    className={className}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              }

              return (
                <Link
                  key={item.id}
                  role="menuitem"
                  to={item.href}
                  className={className}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )
            }

            return (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                className={className}
                disabled={item.disabled}
                onClick={() => {
                  setOpen(false)
                  item.onClick?.()
                }}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
