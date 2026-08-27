import { publicUrl } from '../../../core/utils/publicUrl.js'

/** @type {import('../../../core/types/invitationProject.js').InvitationProjectConfig} */
export const juanCarlosJessicaProject = {
  id: 'juan-carlos-jessica',
  templateId: 'boda',
  title: 'Juan Carlos & Jessica',
  novio: 'Juan Carlos',
  novia: 'Jessica',
  iniciales: 'JC & JG',
  fechaLabel: 'Sábado 21 de noviembre, 2026',
  fechaIso: '2026-11-21T19:00:00-05:00',
  cita: 'Con tu emoción y entusiasmo complementarás un día demasiado especial y esperado en nuestras vidas.',
  padres: {
    novio: ['Marianela Carrera', 'Jorge Lopez'],
    novia: ['Clara Tutiven', 'Jorge Gordillo'],
  },
  recepcion: {
    titulo: 'Recepción',
    hora: '7:00pm',
    lugar: 'Salón de eventos J&S',
    direccion: 'Esmeralda y Piedrahita, antiguo Club de Leones de Guayaquil',
    mapsUrl:
      'https://www.google.com/maps/place/Sal%C3%B3n+de+eventos+J%26S/@-2.1835886,-79.8921842,20.75z/data=!4m12!1m5!3m4!2zMsKwMTEnMDAuOCJTIDc5wrA1MyczMS4zIlc!8m2!3d-2.1835499!4d-79.8920215!3m5!1s0x902d6de2cd5bcdcf:0x6d16b748af3c8ff0!8m2!3d-2.1834991!4d-79.8920979!16s%2Fg%2F11x_k55m7x?hl=es&entry=ttu&g_ep=EgoyMDI2MDgyNC4wIKXMDSoASAFQAw%3D%3D',
  },
  cronograma: [
    { id: 'recepcion', hora: '19:00 hrs', label: 'RECEPCIÓN', icon: 'people' },
    { id: 'civil', hora: '20:00 hrs', label: 'CIVIL', icon: 'rings' },
    { id: 'cena', hora: '22:00 hrs', label: 'CENA', icon: 'glasses' },
    { id: 'fiesta', hora: '22:30 hrs', label: 'FIESTA', icon: 'music' },
  ],
  regalos: {
    texto:
      'Tu presencia es nuestro mayor regalo. Para nuestro nuevo comienzo, hemos elegido recibir nuestros obsequios en un sobre cerrado, que nos ayudará a hacer realidad nuestros sueños y proyectos como esposos.\nGracias por acompañarnos y ser parte de este momento tan especial.',
  },
  dressCode: {
    estilo: 'Formal casual',
    detalle: 'Mujeres vestido midi | Hombres saco y camisa',
  },
  noNinos:
    'Amamos a sus pequeños, pero queremos que en este día sólo tengan que preocuparse por pasarla increíble.',
  invitadosPorDefecto: {
    nombre: 'Gustavo, Betsy e Hija',
    cupos: 3,
  },
  fotos: {
    hero: publicUrl('/boda/Pareja1.jpeg'),
    galeria: [
      publicUrl('/boda/Pareja2.jpeg'),
      publicUrl('/boda/Pareja3.jpeg'),
      publicUrl('/boda/Pareja4.jpeg'),
    ],
  },
  musicaSrc: publicUrl('/boda/musica.mp3'),
}
