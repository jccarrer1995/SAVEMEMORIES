/** Contenido de la invitación. Más adelante se personaliza por grupo de invitados. */

function publicUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export const BODA = {
  novio: 'Juan Carlos',
  novia: 'Jessica',
  iniciales: 'JC&J',
  fechaLabel: '18 de Octubre, 2026',
  /** Inicio de ceremonia (zona Guadalajara). */
  fechaIso: '2026-10-18T18:00:00-06:00',
  cita: 'Con tu emoción y entusiasmo complementarás un día demasiado especial y esperado en nuestras vidas.',
  padres: {
    novio: ['Antonio Gutiérrez Victoriano', 'Ernesto Ramírez Marcelino'],
    novia: ['Samuel Castillo Martínez', 'Ángeles Torres Gómez'],
  },
  ceremonia: {
    titulo: 'Ceremonia',
    hora: '6:00pm',
    lugar: 'Parroquia de San Francisco Javier de las Colinas',
    direccion: 'P° Loma Ancha 3460, Colinas de San Javier, 44660 Guadalajara, Jal.',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Parroquia+de+San+Francisco+Javier+de+las+Colinas+Loma+Ancha+Guadalajara',
  },
  recepcion: {
    titulo: 'Recepción',
    hora: '8:00pm',
    lugar: 'Casa Américas Salón de Eventos',
    direccion: 'C. Arista 2259, Ladrón de Guevara, 44600 Guadalajara, Jal.',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Casa+Americas+Salon+de+Eventos+Arista+2259+Guadalajara',
  },
  cronograma: [
    { id: 'ceremonia', hora: '18:00 hrs', label: 'CEREMONIA', icon: 'church' },
    { id: 'civil', hora: '20:00 hrs', label: 'CIVIL', icon: 'rings' },
    { id: 'recepcion', hora: '21:00 hrs', label: 'RECEPCIÓN', icon: 'people' },
    { id: 'cena', hora: '22:00 hrs', label: 'CENA', icon: 'glasses' },
    { id: 'fiesta', hora: '22:30 hrs', label: 'FIESTA', icon: 'music' },
  ],
  regalos: {
    texto:
      'Tu presencia es nuestro mayor regalo, pero si deseas obsequiarnos algo ponemos a tu disposición nuestras sugerencias',
    tienda: 'Liverpool',
    numero: 'No. 000000',
    url: 'https://mesaderegalos.liverpool.com.mx/',
  },
  dressCode: {
    estilo: 'Formal casual',
    detalle: 'Mujeres vestido midi | Hombres saco y camisa',
  },
  noNinos:
    'Amamos a sus pequeños, pero queremos que en este día sólo tengan que preocuparse por pasarla increíble.',
  invitadosPorDefecto: {
    nombre: 'Fam. Martínez Ramírez',
    cupos: 2,
  },
  fotos: {
    hero: publicUrl('/boda/hero-couple.jpg'),
    galeria: [
      publicUrl('/boda/couple-1.jpg'),
      publicUrl('/boda/couple-2.jpg'),
      publicUrl('/boda/couple-3.jpg'),
    ],
  },
  /** Coloca el archivo en `public/boda/musica.mp3`. */
  musicaSrc: publicUrl('/boda/musica.mp3'),
}

/**
 * Personalización por grupo: `/?invitados=Fam.%20Pérez&cupos=4`
 * @param {string} search
 */
export function getInviteFromSearch(search) {
  const params = new URLSearchParams(search)
  const nombre = params.get('invitados')?.trim()
  const cuposRaw = params.get('cupos')
  const cupos = cuposRaw ? Number.parseInt(cuposRaw, 10) : NaN

  return {
    nombre: nombre || BODA.invitadosPorDefecto.nombre,
    cupos: Number.isFinite(cupos) && cupos > 0 ? cupos : BODA.invitadosPorDefecto.cupos,
  }
}
