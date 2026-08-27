import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth.js'
import { listMyProjects } from '../services/clientProjectService.js'
import { CLIENT_NAV } from '../data/clientNav.js'
import {
  ClientProjectsDesktopTable,
  ClientProjectsMobileList,
} from '../components/ClientProjectsListViews.jsx'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'

export function ClientProjectsListPage() {
  const { profile } = useAuth()
  const [projects, setProjects] = useState(/** @type {import('../../admin/types/projectRecord.js').ProjectRecord[]} */ ([]))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!profile?.uid) return

    listMyProjects(profile.uid)
      .then(setProjects)
      .catch((err) => {
        const isPermission =
          err && typeof err === 'object' && 'code' in err && err.code === 'permission-denied'
        setError(
          isPermission
            ? 'Sin permiso para leer tus proyectos. Verifica las reglas de Firestore y que el admin asignó tu UID en ownerId.'
            : 'No se pudieron cargar tus proyectos.',
        )
      })
      .finally(() => setLoading(false))
  }, [profile?.uid])

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.CLIENT}`}
      title="Mis proyectos"
      subtitle="Eventos asignados a tu cuenta."
      navItems={CLIENT_NAV}
    >
      <p className="marketing-muted mb-4 text-sm">
        {loading ? 'Cargando…' : `${projects.length} evento(s) asignado(s)`}
      </p>

      {error ? <p className="panel-form-error">{error}</p> : null}

      <ClientProjectsMobileList projects={projects} loading={loading} />
      <ClientProjectsDesktopTable projects={projects} loading={loading} />
    </PanelShell>
  )
}
