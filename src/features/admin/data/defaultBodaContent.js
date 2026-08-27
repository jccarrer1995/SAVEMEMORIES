import { publicUrl } from '../../invitations/core/utils/publicUrl.js'

/** @returns {import('../../invitations/core/types/invitationProject.js').InvitationProjectConfig['content'] extends never ? never : Record<string, unknown>} */
export function createDefaultBodaContent() {
  return {
    novio: 'Nombre del novio',
    novia: 'Nombre de la novia',
    iniciales: 'J & M',
    fechaLabel: 'Sábado 1 de enero, 2027',
    fechaIso: '2027-01-01T19:00:00-05:00',
    cita: 'Tu presencia hará nuestro día aún más especial.',
    padres: {
      novio: ['Padre del novio', 'Madre del novio'],
      novia: ['Padre de la novia', 'Madre de la novia'],
    },
    recepcion: {
      titulo: 'Recepción',
      hora: '7:00pm',
      lugar: 'Nombre del salón',
      direccion: 'Dirección del evento',
      mapsUrl: 'https://maps.google.com',
    },
    cronograma: [
      { id: 'recepcion', hora: '19:00 hrs', label: 'RECEPCIÓN', icon: 'people' },
      { id: 'cena', hora: '21:00 hrs', label: 'CENA', icon: 'glasses' },
      { id: 'fiesta', hora: '22:00 hrs', label: 'FIESTA', icon: 'music' },
    ],
    regalos: {
      texto: 'Tu presencia es nuestro mayor regalo.',
    },
    dressCode: {
      estilo: 'Formal',
      detalle: 'Vestido de cocktail | Traje',
    },
    noNinos: 'Celebración solo para adultos.',
    invitadosPorDefecto: {
      nombre: 'Invitado demo',
      cupos: 2,
    },
    fotos: {
      hero: publicUrl('/boda/hero-couple.jpg'),
      galeria: [publicUrl('/boda/couple-1.jpg'), publicUrl('/boda/couple-2.jpg')],
    },
    musicaSrc: publicUrl('/boda/musica.mp3'),
  }
}

/** @param {string} slug @param {string} title @param {ReturnType<typeof createDefaultBodaContent>} content */
export function buildBodaProjectConfig(slug, title, content) {
  return {
    id: slug,
    templateId: 'boda',
    title,
    ...content,
  }
}
