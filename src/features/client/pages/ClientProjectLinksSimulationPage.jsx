import { ClientProjectShell } from '../components/ClientProjectShell.jsx'
import { GuestMesaSimulationView } from '../components/GuestMesaSimulationView.jsx'
import { CLIENT_NAV } from '../data/clientNav.js'

/**
 * Datos del evento para el encabezado del PDF de mesas.
 * @param {import('../../admin/types/projectRecord.js').ProjectRecord} project
 */
function buildPdfEvent(project) {
  const content = project.content ?? {}
  const novia = typeof content.novia === 'string' ? content.novia.trim() : ''
  const novio = typeof content.novio === 'string' ? content.novio.trim() : ''
  const couple = novia && novio ? `${novio} & ${novia}` : ''
  const fecha = typeof content.fechaLabel === 'string' ? content.fechaLabel.trim() : ''

  return {
    title: couple || project.title || 'Distribución de mesas',
    subtitle: fecha || (couple ? project.title : undefined),
    fileName: `mesas-${project.slug || project.id}`,
  }
}

export function ClientProjectLinksSimulationPage() {
  return (
    <ClientProjectShell title="Simular mesas" navItems={CLIENT_NAV}>
      {(project) => (
        <GuestMesaSimulationView
          projectId={project.id}
          backHref={`/cliente/proyectos/${project.slug}/enlaces`}
          event={buildPdfEvent(project)}
        />
      )}
    </ClientProjectShell>
  )
}
