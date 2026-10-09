import { MoreVertical } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
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
  const rootRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const menuId = useId()
  const visibleItems = items.filter((item) => item.label)

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
        <div id={menuId} className="panel-actions-menu-popover" role="menu" aria-label={label}>
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
