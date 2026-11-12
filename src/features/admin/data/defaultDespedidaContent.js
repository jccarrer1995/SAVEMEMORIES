export const DESPEDIDA_TEMPLATE_ID = 'despedida'

export function createDefaultDespedidaContent() {
  return {
    novio: '',
    novia: 'Valentina',
    iniciales: 'V',
    fechaLabel: 'Sábado 13 de febrero, 2027',
    fechaIso: '2027-02-13T18:00:00-05:00',
    cita: 'Antes del "sí, acepto" viene el "sí, una más". Ven a despedir mi soltería con risas, baile y cero arrepentimientos. 💋',
    padres: { novio: [], novia: [] },
    recepcion: {
      titulo: 'Punto de encuentro',
      hora: '6:00pm',
      lugar: 'Rooftop Luna Rosa',
      direccion: 'Av. República de El Salvador N34-120, Quito',
      mapsUrl: 'https://maps.google.com',
    },
    cronograma: [
      { id: 'llegada', hora: '18:00', label: 'Llegada y brindis', icon: 'glasses' },
      { id: 'juegos', hora: '19:00', label: 'Juegos y retos', icon: 'people' },
      { id: 'cena', hora: '20:00', label: 'Cena', icon: 'dinner' },
      { id: 'after', hora: '23:00', label: 'After (si aguantas)', icon: 'clock' },
    ],
    regalos: {
      texto: [
        'Snacks para compartir 🍿',
        'Tu bebida favorita 🍾',
        'Un accesorio rosa 💖',
        'Batería del celular al 100% 🔋',
      ].join('\n'),
    },
    dressCode: { estilo: '', detalle: '' },
    noNinos: '',
    invitadosPorDefecto: {
      nombre: 'Invitada demo',
      cupos: 1,
    },
    fotos: {
      hero: '',
      galeria: [],
    },
    musicaSrc: '',
  }
}

/** @param {string} slug @param {string} title @param {ReturnType<typeof createDefaultDespedidaContent>} content */
export function buildDespedidaProjectConfig(slug, title, content) {
  return {
    id: slug,
    templateId: DESPEDIDA_TEMPLATE_ID,
    title,
    ...content,
  }
}
