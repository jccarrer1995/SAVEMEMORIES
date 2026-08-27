import { serverTimestamp } from 'firebase/firestore'
import {
  fetchProjectRecord,
  listProjectRecords,
  persistProjectRecord,
} from '../../../lib/firebase/projectStore.js'
import { asText } from '../../../shared/utils/asText.js'
import { createDefaultBodaContent } from '../data/defaultBodaContent.js'
import { joinFechaIso, splitFechaIso } from '../utils/eventDateTime.js'

/**
 * @param {import('../types/projectRecord.js').ProjectFormValues} values
 */
function buildContentFromForm(values) {
  return {
    novio: values.novio.trim(),
    novia: values.novia.trim(),
    iniciales: values.iniciales.trim(),
    fechaLabel: values.fechaLabel.trim(),
    fechaIso: joinFechaIso(values.fechaEvento, values.horaEvento),
    cita: values.cita.trim(),
    padres: {
      novio: values.padresNovio.split('\n').map((line) => line.trim()).filter(Boolean),
      novia: values.padresNovia.split('\n').map((line) => line.trim()).filter(Boolean),
    },
    recepcion: {
      titulo: values.recepcionTitulo.trim(),
      hora: values.recepcionHora.trim(),
      lugar: values.recepcionLugar.trim(),
      direccion: values.recepcionDireccion.trim(),
      mapsUrl: values.recepcionMapsUrl.trim(),
    },
    cronograma: createDefaultBodaContent().cronograma,
    regalos: { texto: values.regalosTexto.trim() },
    dressCode: {
      estilo: values.dressCodeEstilo.trim(),
      detalle: values.dressCodeDetalle.trim(),
    },
    noNinos: values.noNinos.trim(),
    invitadosPorDefecto: {
      nombre: values.invitadoDefault.trim(),
      cupos: values.cuposDefault,
    },
    fotos: {
      hero: values.fotoHero.trim(),
      galeria: values.fotosGaleria.split('\n').map((line) => line.trim()).filter(Boolean),
    },
    musicaSrc: values.musicaSrc.trim(),
  }
}

/**
 * @param {import('../types/projectRecord.js').ProjectRecord} project
 * @returns {import('../types/projectRecord.js').ProjectFormValues}
 */
export function projectToFormValues(project) {
  const content = project.content
  const padres = /** @type {{ novio?: string[], novia?: string[] }} */ (content.padres ?? {})
  const recepcion = /** @type {Record<string, string>} */ (content.recepcion ?? {})
  const regalos = /** @type {{ texto?: string }} */ (content.regalos ?? {})
  const dressCode = /** @type {{ estilo?: string, detalle?: string }} */ (content.dressCode ?? {})
  const invitados = /** @type {{ nombre?: string, cupos?: number }} */ (content.invitadosPorDefecto ?? {})
  const fotos = /** @type {{ hero?: string, galeria?: string[] }} */ (content.fotos ?? {})
  const { fechaEvento, horaEvento } = splitFechaIso(asText(content.fechaIso))

  return {
    slug: project.slug,
    templateId: project.templateId,
    status: project.status,
    title: project.title,
    ownerId: project.ownerId,
    linkLimit: project.linkLimit,
    novio: asText(content.novio),
    novia: asText(content.novia),
    iniciales: asText(content.iniciales),
    fechaLabel: asText(content.fechaLabel),
    fechaEvento,
    horaEvento,
    cita: asText(content.cita),
    padresNovio: (padres.novio ?? []).join('\n'),
    padresNovia: (padres.novia ?? []).join('\n'),
    recepcionTitulo: recepcion.titulo ?? '',
    recepcionHora: recepcion.hora ?? '',
    recepcionLugar: recepcion.lugar ?? '',
    recepcionDireccion: recepcion.direccion ?? '',
    recepcionMapsUrl: recepcion.mapsUrl ?? '',
    regalosTexto: regalos.texto ?? '',
    dressCodeEstilo: dressCode.estilo ?? '',
    dressCodeDetalle: dressCode.detalle ?? '',
    noNinos: asText(content.noNinos),
    invitadoDefault: invitados.nombre ?? '',
    cuposDefault: Number(invitados.cupos ?? 1),
    fotoHero: fotos.hero ?? '',
    fotosGaleria: (fotos.galeria ?? []).join('\n'),
    musicaSrc: asText(content.musicaSrc),
  }
}

/** @returns {import('../types/projectRecord.js').ProjectFormValues} */
export function createEmptyProjectForm() {
  const content = createDefaultBodaContent()
  return projectToFormValues({
    id: '',
    slug: '',
    templateId: 'boda',
    status: 'draft',
    title: '',
    ownerId: '',
    linkLimit: 20,
    content,
  })
}

export async function listProjects() {
  return listProjectRecords()
}

export async function getProjectById(projectId) {
  return fetchProjectRecord(projectId)
}

/**
 * @param {import('../types/projectRecord.js').ProjectFormValues} values
 * @param {boolean} isNew
 */
export async function saveProject(values, isNew) {
  const slug = values.slug.trim()
  if (!slug) throw new Error('El identificador (slug) es obligatorio.')

  const payload = {
    slug,
    templateId: values.templateId,
    status: values.status,
    title: values.title.trim(),
    ownerId: values.ownerId.trim(),
    linkLimit: Number(values.linkLimit) || 0,
    content: buildContentFromForm(values),
    updatedAt: serverTimestamp(),
  }

  return persistProjectRecord(slug, payload, isNew)
}
