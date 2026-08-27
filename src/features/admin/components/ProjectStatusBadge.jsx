/** @param {{ status: import('../types/projectRecord.js').ProjectStatus }} props */
export function ProjectStatusBadge({ status }) {
  const labels = {
    draft: 'Borrador',
    active: 'Activo',
    archived: 'Archivado',
  }

  return <span className={`panel-badge panel-badge--${status}`}>{labels[status] ?? status}</span>
}
