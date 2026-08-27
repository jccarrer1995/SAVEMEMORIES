import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProjectForm } from '../components/ProjectForm.jsx'
import { ADMIN_NAV } from '../data/adminNav.js'
import {
  createEmptyProjectForm,
  getProjectById,
  projectToFormValues,
  saveProject,
} from '../services/projectService.js'
import { PanelShell } from '../../../shared/layouts/PanelShell.jsx'
import { ROLES } from '../../../shared/constants/roles.js'

export function AdminProjectNewPage() {
  const navigate = useNavigate()

  async function handleSubmit(values) {
    await saveProject(values, true)
    toast.success('Proyecto creado con éxito')
    navigate('/admin/proyectos')
  }

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.ADMIN}`}
      title="Nuevo proyecto"
      subtitle="Completa los datos de la invitación."
      navItems={ADMIN_NAV}
    >
      <ProjectForm initialValues={createEmptyProjectForm()} isNew onSubmit={handleSubmit} />
    </PanelShell>
  )
}

export function AdminProjectEditPage() {
  const { projectId = '' } = useParams()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getProjectById(projectId)
      .then((project) => {
        if (!project) {
          setError('Proyecto no encontrado.')
          return
        }
        setInitialValues(projectToFormValues(project))
      })
      .catch(() => setError('No se pudo cargar el proyecto.'))
  }, [projectId])

  async function handleSubmit(values) {
    await saveProject(values, false)
    toast.success('Proyecto actualizado con éxito')
    navigate('/admin/proyectos')
  }

  if (error) {
    return (
      <PanelShell
        roleLabel={`Rol ${ROLES.ADMIN}`}
        title="Editar proyecto"
        navItems={ADMIN_NAV}
      >
        <p className="panel-form-error">{error}</p>
      </PanelShell>
    )
  }

  if (!initialValues) {
    return (
      <PanelShell
        roleLabel={`Rol ${ROLES.ADMIN}`}
        title="Editar proyecto"
        navItems={ADMIN_NAV}
      >
        <p className="marketing-muted text-sm">Cargando proyecto…</p>
      </PanelShell>
    )
  }

  return (
    <PanelShell
      roleLabel={`Rol ${ROLES.ADMIN}`}
      title="Editar proyecto"
      subtitle={initialValues.title || initialValues.slug}
      navItems={ADMIN_NAV}
    >
      <p className="panel-notice mb-4">
        <Link to={`/admin/proyectos/${projectId}/enlaces`} className="marketing-link font-medium">
          Gestionar enlaces de invitados
        </Link>{' '}
        con códigos únicos y cupos validados en la nube.
      </p>
      <ProjectForm initialValues={initialValues} isNew={false} onSubmit={handleSubmit} />
    </PanelShell>
  )
}
