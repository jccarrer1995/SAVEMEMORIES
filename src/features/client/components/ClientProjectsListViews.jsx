import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { ProjectStatusBadge } from '../../admin/components/ProjectStatusBadge.jsx'
import { getTemplateLabel } from '../../admin/data/templateOptions.js'
import {
  SMS_TEMPLATE_GUEST_TOKEN,
  SMS_TEMPLATE_LINK_TOKEN,
  getProjectSmsTemplate,
} from '../../invitations/core/utils/smsTemplate.js'
import { PanelTextareaDialog } from '../../../shared/components/PanelTextareaDialog.jsx'
import { WhatsappIcon } from '../../../shared/components/WhatsappIcon.jsx'
import { formatGuestLinksUsage, saveMyProjectSmsTemplate } from '../services/clientProjectService.js'

/**
 * @param {{
 *   project: import('../../admin/types/projectRecord.js').ProjectRecord,
 *   onOpenSmsTemplate: () => void,
 * }} props
 */
function ClientProjectActions({ project, onOpenSmsTemplate }) {
  return (
    <>
      <Link to={`/cliente/proyectos/${project.slug}/respuestas`} className="panel-action-link">
        Respuestas
      </Link>
      <Link to={`/cliente/proyectos/${project.slug}/enlaces`} className="panel-action-link">
        Enlaces
      </Link>
      <button type="button" className="panel-action-link" onClick={onOpenSmsTemplate}>
        <WhatsappIcon className="panel-action-link__icon" />
        Plantilla SMS
      </button>
    </>
  )
}

/**
 * @param {{
 *   projects: Array<import('../../admin/types/projectRecord.js').ProjectRecord & { linksUsed: number }>,
 *   loading: boolean,
 *   ownerId: string,
 *   onSmsTemplateSaved: (projectId: string, smsTemplate: string) => void,
 * }} props
 */
export function ClientProjectsList({ projects, loading, ownerId, onSmsTemplateSaved }) {
  const [smsEditProject, setSmsEditProject] = useState(
    /** @type {import('../../admin/types/projectRecord.js').ProjectRecord | null} */ (null),
  )
  const [smsSaving, setSmsSaving] = useState(false)

  const smsDialogValue = smsEditProject ? getProjectSmsTemplate(smsEditProject) : ''

  async function handleSaveSmsTemplate(value) {
    if (!smsEditProject || !ownerId) return

    setSmsSaving(true)
    try {
      const trimmed = value.trim()
      if (
        trimmed &&
        !trimmed.includes(SMS_TEMPLATE_LINK_TOKEN) &&
        !trimmed.includes('{{link}}')
      ) {
        toast.warning(
          `Incluye ${SMS_TEMPLATE_LINK_TOKEN} donde irá el enlace único de cada invitado.`,
        )
      }

      await saveMyProjectSmsTemplate(smsEditProject.id, ownerId, value)
      onSmsTemplateSaved(smsEditProject.id, value.trim())
      toast.success('Plantilla SMS guardada')
      setSmsEditProject(null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo guardar la plantilla.')
    } finally {
      setSmsSaving(false)
    }
  }

  if (projects.length === 0 && !loading) {
    return (
      <div className="panel-card-empty">
        No tienes eventos asignados. Pide al administrador que ponga tu UID en el campo{' '}
        <strong>ownerId</strong> del proyecto.
      </div>
    )
  }

  return (
    <>
      <div className="panel-card-list panel-card-list--projects">
        {projects.map((project) => (
          <article key={project.id} className="panel-project-card">
            <div className="panel-project-card-header">
              <div className="min-w-0">
                <p className="font-medium">{project.title || project.slug}</p>
                <p className="marketing-muted text-xs">/{project.slug}</p>
              </div>
              <ProjectStatusBadge status={project.status} />
            </div>

            <dl className="panel-project-card-meta">
              <div>
                <dt>Plantilla</dt>
                <dd>{getTemplateLabel(project.templateId)}</dd>
              </div>
              <div>
                <dt>Enlaces</dt>
                <dd>{formatGuestLinksUsage(project.linksUsed ?? 0, project.linkLimit)}</dd>
              </div>
            </dl>

            <div className="panel-project-card-actions">
              <ClientProjectActions
                project={project}
                onOpenSmsTemplate={() => setSmsEditProject(project)}
              />
            </div>
          </article>
        ))}
      </div>

      <PanelTextareaDialog
        open={Boolean(smsEditProject)}
        title={smsEditProject ? `Plantilla SMS — ${smsEditProject.title || smsEditProject.slug}` : 'Plantilla SMS'}
        description={`Usa ${SMS_TEMPLATE_LINK_TOKEN} donde debe ir el enlace único de cada invitado. Opcional: ${SMS_TEMPLATE_GUEST_TOKEN} para el nombre del grupo.`}
        label="Mensaje"
        initialValue={smsDialogValue}
        placeholder={`Ejemplo: …\n${SMS_TEMPLATE_LINK_TOKEN}`}
        busy={smsSaving}
        onCancel={() => {
          if (!smsSaving) setSmsEditProject(null)
        }}
        onConfirm={(value) => void handleSaveSmsTemplate(value)}
      />
    </>
  )
}
