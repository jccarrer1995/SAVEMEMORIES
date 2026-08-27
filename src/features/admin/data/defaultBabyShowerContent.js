import { publicUrl } from '../../invitations/core/utils/publicUrl.js'

export function createDefaultBabyShowerContent() {
  return {
    novio: 'Emma',
    novia: 'Ana',
    iniciales: 'E',
    fechaLabel: 'Domingo 15 de marzo, 2026',
    fechaIso: '2026-03-15T15:00:00-05:00',
    cita: 'Un nuevo milagro está por llegar y queremos compartir esta alegría contigo.',
    padres: {
      novio: ['María González', 'Carlos González'],
      novia: ['Patricia Ruiz', 'Jorge Ruiz'],
    },
    recepcion: {
      titulo: 'Celebración',
      hora: '3:00pm',
      lugar: 'Salón Jardines del Valle',
      direccion: 'Av. Principal 123, Quito',
      mapsUrl: 'https://maps.google.com',
    },
    cronograma: [
      { id: 'bienvenida', hora: '15:00 hrs', label: 'BIENVENIDA', icon: 'people' },
      { id: 'juegos', hora: '16:00 hrs', label: 'JUEGOS', icon: 'glasses' },
      { id: 'regalos', hora: '17:00 hrs', label: 'REGALOS', icon: 'gift' },
      { id: 'pastel', hora: '18:00 hrs', label: 'PASTEL', icon: 'music' },
    ],
    regalos: {
      texto:
        'Tu cariño es nuestro mayor regalo.\nSi deseas obsequiar algo, agradecemos sobres o pañales talla M.',
    },
    dressCode: {
      estilo: 'Tonos pasteles',
      detalle: 'Rosa · Menta · Lavanda · Amarillo suave',
    },
    noNinos: 'Niños bienvenidos. Contamos con rincón de diversión para los pequeños.',
    invitadosPorDefecto: {
      nombre: 'Invitado demo',
      cupos: 2,
    },
    fotos: {
      hero: publicUrl('/baby-shower/hero.jpg'),
      galeria: [publicUrl('/baby-shower/gallery-1.jpg'), publicUrl('/baby-shower/gallery-2.jpg')],
    },
    musicaSrc: publicUrl('/baby-shower/baby-shower.mp3'),
  }
}

/** @param {string} slug @param {string} title @param {ReturnType<typeof createDefaultBabyShowerContent>} content */
export function buildBabyShowerProjectConfig(slug, title, content) {
  return {
    id: slug,
    templateId: 'babyshower',
    title,
    ...content,
  }
}
