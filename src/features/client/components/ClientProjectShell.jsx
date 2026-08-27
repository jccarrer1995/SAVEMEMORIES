import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth.js'
import { getMyProject } from '../services/clientProjectService.js'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'

/**
 * @param {{
 *   title: string,
 *   subtitle?: string,
 *   navItems: Array<{ label: string, href: string, disabled?: boolean }>,
 *   children: (project: import('../../admin/types/projectRecord.js').ProjectRecord) => import('react').ReactNode,
 * }} props
 */
export function ClientProjectShell({ title, subtitle, navItems, children }) {
  const { projectId = '' } = useParams()
  const { profile } = useAuth()
  const [project, setProject] = useState(
    /** @type {import('../../admin/types/projectRecord.js').ProjectRecord | null} */ (null),
  )
  const [loading, setLoading] = useState(true)
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    if (!profile?.uid) return

    getMyProject(projectId, profile.uid)
      .then((record) => {
        if (!record) {
          setDenied(true)
          return
        }
        setProject(record)
      })
      .catch(() => setDenied(true))
      .finally(() => setLoading(false))
  }, [projectId, profile?.uid])

  if (denied) {
    return <Navigate to="/cliente/proyectos" replace />
  }

  if (loading || !project) {
    return (
      <PanelShell
        roleLabel={`Rol ${ROLES.CLIENT}`}
        title={title}
        subtitle={subtitle}
        navItems={navItems}
      >
        <p className="marketing-muted text-sm">Cargando proyecto…</p>
      </PanelShell>
    )
  }

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.CLIENT}`}
      title={title}
      subtitle={subtitle ?? project.title}
      navItems={navItems}
    >
      {children(project)}
    </PanelShell>
  )
}
