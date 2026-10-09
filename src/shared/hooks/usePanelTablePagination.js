import { useEffect, useMemo, useState } from 'react'

export const PANEL_TABLE_PAGE_SIZE = 10

/**
 * @template T
 * @param {T[]} items
 * @param {number} [pageSize]
 */
export function usePanelTablePagination(items, pageSize = PANEL_TABLE_PAGE_SIZE) {
  const [page, setPage] = useState(1)
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1)

  useEffect(() => {
    setPage(1)
  }, [total, pageSize])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, page, pageSize])

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return {
    page,
    setPage,
    totalPages,
    pageItems,
    pageSize,
    total,
    from,
    to,
    showPagination: total > pageSize,
  }
}
