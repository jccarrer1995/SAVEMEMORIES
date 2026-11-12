import { useEffect, useMemo, useState } from 'react'
import { TemplateCatalogView } from '../components/TemplateCatalogView.jsx'
import { ADMIN_NAV } from '../data/adminNav.js'
import { listProjects } from '../services/projectService.js'
import { buildTemplateCatalog } from '../utils/templateCatalogModel.js'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'

export function AdminTemplatesPage() {
  const [projects, setProjects] = useState(/** @type {import('../types/projectRecord.js').ProjectRecord[]} */ ([]))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    listProjects()
      .then((list) => {
        if (!cancelled) setProjects(list)
      })
      .catch(() => {
        if (!cancelled) setError('No se pudo cargar el uso de las plantillas. El catálogo se muestra igual.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const catalog = useMemo(() => buildTemplateCatalog(projects), [projects])

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.ADMIN}`}
      title="Plantillas"
      subtitle="El catálogo de diseños: revisa qué incluye cada uno, mira su demo y crea un proyecto a partir de él."
      navItems={ADMIN_NAV}
    >
      <TemplateCatalogView catalog={catalog} loading={loading} error={error} />
    </PanelShell>
  )
}
