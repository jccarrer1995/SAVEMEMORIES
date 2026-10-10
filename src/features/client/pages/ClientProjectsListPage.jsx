import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth.js'
import { listMyProjectsWithLinkUsage } from '../services/clientProjectService.js'
import { CLIENT_NAV } from '../data/clientNav.js'
import { ClientProjectsList } from '../components/ClientProjectsListViews.jsx'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'

export function ClientProjectsListPage() {
  const { profile } = useAuth()
  const [projects, setProjects] = useState(
    /** @type {Array<import('../../admin/types/projectRecord.js').ProjectRecord & { linksUsed: number }>} */ ([]),
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!profile?.uid) return

    listMyProjectsWithLinkUsage(profile.uid)
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

      <ClientProjectsList
        projects={projects}
        loading={loading}
        ownerId={profile?.uid ?? ''}
        onSmsTemplateSaved={(projectId, smsTemplate) => {
          setProjects((prev) =>
            prev.map((project) =>
              project.id === projectId ? { ...project, smsTemplate } : project,
            ),
          )
        }}
      />
    </PanelShell>
  )
}
