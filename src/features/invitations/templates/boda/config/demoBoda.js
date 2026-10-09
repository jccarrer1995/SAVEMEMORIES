import { publicUrl } from '../../../core/utils/publicUrl.js'

/** Contenido ficticio para /invitacion/boda-demo-1 (misma plantilla, datos de ejemplo). */
/** @type {import('../../../core/types/invitationProject.js').InvitationProjectConfig} */
export const demoBodaProject = {
  id: 'boda-demo-1',
  templateId: 'boda',
  title: 'Valentina & Mateo',
  novio: 'Mateo',
  novia: 'Valentina',
  iniciales: 'V & M',
  fechaLabel: 'Sábado 14 de marzo, 2027',
  fechaIso: '2027-03-14T18:30:00-05:00',
  cita: 'Hay momentos que se vuelven recuerdos para siempre; queremos compartir uno de ellos contigo.',
  padres: {
    novio: ['Roberto Mendoza', 'Patricia Núñez'],
    novia: ['Elena Vásquez', 'Carlos Rivadeneira'],
  },
  recepcion: {
    titulo: 'Recepción',
    hora: '6:30pm',
    lugar: 'Hacienda Los Arrayanes',
    direccion: 'Km 12 vía a la costa, Guayaquil (referencia demo)',
    mapsUrl: 'https://www.google.com/maps/search/Hacienda+Los+Arrayanes+Guayaquil',
  },
  cronograma: [
    { id: 'recepcion', hora: '18:30 hrs', label: 'RECEPCIÓN', icon: 'people' },
    { id: 'civil', hora: '19:30 hrs', label: 'CEREMONIA', icon: 'rings' },
    { id: 'cena', hora: '20:30 hrs', label: 'CENA', icon: 'glasses' },
    { id: 'fiesta', hora: '22:00 hrs', label: 'BAILE', icon: 'music' },
  ],
  regalos: {
    texto:
      'Tu compañía es el regalo más valioso. Si deseas obsequiarnos algo, agradecemos un detalle en sobre para nuestro hogar.\nGracias por ser parte de este día de ejemplo.',
  },
  dressCode: {
    estilo: 'Elegante',
    detalle: 'Colores neutros | Evitar blanco y negro',
  },
  noNinos:
    'Esta invitación demo está pensada para adultos. En un evento real, aquí iría el mensaje sobre celebración sin niños.',
  invitadosPorDefecto: {
    nombre: 'Familia Demo',
    cupos: 2,
  },
  fotos: {
    hero: publicUrl('/boda/couple-1.jpg'),
    galeria: [publicUrl('/boda/couple-3.jpg')],
  },
  musicaSrc: publicUrl('/boda/musica.mp3'),
}
