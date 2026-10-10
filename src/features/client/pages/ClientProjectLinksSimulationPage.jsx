import { ClientProjectShell } from '../components/ClientProjectShell.jsx'
import { GuestMesaSimulationView } from '../components/GuestMesaSimulationView.jsx'
import { CLIENT_NAV } from '../data/clientNav.js'

export function ClientProjectLinksSimulationPage() {
  return (
    <ClientProjectShell title="Simular mesas" navItems={CLIENT_NAV}>
      {(project) => (
        <GuestMesaSimulationView
          projectId={project.id}
          backHref={`/cliente/proyectos/${project.slug}/enlaces`}
        />
      )}
    </ClientProjectShell>
  )
}
