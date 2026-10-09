/**
 * @param {{
 *   page: number,
 *   totalPages: number,
 *   from: number,
 *   to: number,
 *   total: number,
 *   onPageChange: (page: number) => void,
 *   disabled?: boolean,
 * }} props
 */
export function PanelTablePagination({
  page,
  totalPages,
  from,
  to,
  total,
  onPageChange,
  disabled = false,
}) {
  if (total <= 0) return null

  return (
    <div className="panel-table-pagination">
      <p className="panel-table-pagination-summary">
        Mostrando {from}–{to} de {total}
      </p>
      {totalPages > 1 ? (
        <div className="panel-table-pagination-controls">
          <button
            type="button"
            className="panel-table-pagination-btn"
            disabled={disabled || page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Anterior
          </button>
          <span className="panel-table-pagination-status">
            Página {page} de {totalPages}
          </span>
          <button
            type="button"
            className="panel-table-pagination-btn"
            disabled={disabled || page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Siguiente
          </button>
        </div>
      ) : null}
    </div>
  )
}
