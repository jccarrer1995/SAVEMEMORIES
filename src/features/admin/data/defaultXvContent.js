import { publicUrl } from '../../invitations/core/utils/publicUrl.js'

export const XV_TEMPLATE_ID = 'xv'

/** Foto de Unsplash (licencia libre, misma sesión de fotos para que la demo se sienta real). */
function unsplash(id, width = 1200) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=78`
}

export function createDefaultXvContent() {
  return {
    novio: '',
    novia: 'Isabella',
    iniciales: 'I',
    fechaLabel: 'Sábado 20 de marzo de 2027',
    fechaIso: '2027-03-20T17:00:00-05:00',
    cita:
      'Hay momentos que se esperan toda una vida. Hoy dejo atrás la niña que fui para abrazar los sueños que vienen, y quiero vivirlo rodeada de las personas que más quiero.',
    padres: {
      novio: ['Andrés Salazar', 'María Fernanda Ruiz'],
      novia: ['Jorge Ruiz', 'Carolina Vega'],
    },
    ceremonia: {
      titulo: 'Misa de acción de gracias',
      hora: '5:00 pm',
      lugar: 'Iglesia de San Francisco',
      direccion: 'Plaza de San Francisco, Cuenca y Sucre, Quito',
      mapsUrl: 'https://maps.google.com',
    },
    recepcion: {
      titulo: 'Recepción',
      hora: '7:30 pm',
      lugar: 'Salón Imperial · Hacienda Los Álamos',
      direccion: 'Vía a Cumbayá km 4, Quito',
      mapsUrl: 'https://maps.google.com',
    },
    cronograma: [
      { id: 'momento-1', hora: '17:00', label: 'Misa de acción de gracias', icon: 'church' },
      { id: 'momento-2', hora: '19:30', label: 'Recepción y cóctel', icon: 'glasses' },
      { id: 'momento-3', hora: '20:30', label: 'Entrada y vals', icon: 'waltz' },
      { id: 'momento-4', hora: '21:30', label: 'Cena', icon: 'dinner' },
      { id: 'momento-5', hora: '22:30', label: 'Fiesta', icon: 'music' },
    ],
    regalos: {
      texto:
        'Tu presencia es el regalo más especial. Si deseas tener un detalle conmigo, habrá lluvia de sobres.',
    },
    dressCode: {
      estilo: 'Formal',
      detalle: '',
      mujeres: 'Vestido largo o de cóctel',
      mujeresEvitar: 'Te pedimos reservar el azul cielo para la quinceañera.',
      hombres: 'Traje oscuro y corbata',
      hombresEvitar: '',
    },
    noNinos: '',
    invitadosPorDefecto: {
      nombre: 'Familia Mendoza',
      cupos: 2,
    },
    fotos: {
      hero: unsplash('1763959952707-7f4b2c3c2219'),
      galeria: [
        unsplash('1776013246171-0dae766accb7', 900),
        unsplash('1763959945078-c4f5daa3d766', 900),
        unsplash('1763959951409-430bfebd5515', 900),
        unsplash('1763959949900-f02238028b2d', 900),
        unsplash('1775871190007-326b71f1332c', 900),
        unsplash('1763959951338-f9363788d9fa', 900),
      ],
    },
    musicaSrc: publicUrl('/boda/musica.mp3'),
  }
}

/** @param {string} slug @param {string} title @param {ReturnType<typeof createDefaultXvContent>} content */
export function buildXvProjectConfig(slug, title, content) {
  return {
    id: slug,
    templateId: XV_TEMPLATE_ID,
    title,
    ...content,
  }
}
