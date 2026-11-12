import { IMAGES } from '../../marketing/home/homeMedia.js'
import { publicUrl } from '../../invitations/core/utils/publicUrl.js'
import { TEMPLATE_OPTIONS } from './templateOptions.js'

/**
 * @typedef {{
 *   id: string,
 *   label: string,
 *   available: boolean,
 *   tagline: string,
 *   description: string,
 *   cover: { src?: string, srcSet?: string, alt: string, gradient?: string },
 *   palette: string[],
 *   demoPath?: string,
 *   music?: { src: string, title: string },
 *   sections: string[],
 *   highlights: string[],
 * }} TemplateCatalogItem
 */

/** Ficha de catálogo de cada plantilla (lo que el admin necesita para venderla y usarla). */
const CATALOG_DETAILS = {
  boda: {
    tagline: 'Elegante · verde oliva',
    description:
      'Invitación editorial con sobre animado, ramas en verde oliva, cuenta regresiva y confirmación por cupos.',
    cover: { src: publicUrl('/boda/hero-couple.jpg'), alt: 'Novios celebrando con pétalos' },
    palette: ['#556248', '#8d9a7c', '#c9a962', '#ebe4d4', '#f3ede4'],
    demoPath: '/demo/boda',
    music: { src: publicUrl('/boda/musica.mp3'), title: 'Música de la boda' },
    sections: [
      'Sobre animado',
      'Portada con la pareja',
      'Cita y padres',
      'Save the date + cuenta regresiva',
      'Cronograma',
      'Lugar con mapa',
      'Código de vestimenta',
      'Aviso sin niños',
      'Regalos',
      'Confirmación (RSVP)',
    ],
    highlights: ['Sobre animado', 'Cuenta regresiva', 'Música', 'Mapa', 'RSVP por cupos'],
  },
  xv: {
    tagline: 'Festiva · paleta a medida',
    description: 'Estilo de gala con paleta personalizable y secciones modulares para la quinceañera.',
    cover: { ...IMAGES.quince },
    palette: ['#1f2a5c', '#6b7fd7', '#c9b8dc', '#e8d9a8', '#faf7fb'],
    sections: ['Portada', 'Mensaje de la quinceañera', 'Padres y padrinos', 'Cronograma', 'Lugar', 'RSVP'],
    highlights: ['Paleta personalizable', 'Secciones modulares'],
  },
  babyshower: {
    tagline: 'Tierna · tonos pastel',
    description: 'Tonos pastel, sobre animado, temática del bebé, galería y confirmación de asistencia.',
    cover: { src: publicUrl('/baby-shower/hero.jpg'), alt: 'Decoración de baby shower' },
    palette: ['#c9b8dc', '#ede8f5', '#fceef3', '#e8f6f1', '#fffaf8'],
    demoPath: '/demo/baby-shower',
    music: { src: publicUrl('/baby-shower/baby-shower.mp3'), title: 'Música del baby shower' },
    sections: [
      'Sobre animado',
      'Portada',
      'Cita y familia',
      'Save the date',
      'Temática',
      'Cronograma',
      'Lugar con mapa',
      'Galería',
      'Regalos',
      'Confirmación (RSVP)',
    ],
    highlights: ['Sobre animado', 'Galería', 'Música', 'Mapa', 'RSVP'],
  },
  despedida: {
    tagline: 'Juvenil · pop y neón',
    description:
      'Estética pop con stickers, pantalla de bloqueo, plan de la noche editable, playlist y lista de qué traer.',
    cover: {
      alt: 'Portada de la despedida de soltera',
      gradient:
        'radial-gradient(circle at 20% 20%, #ffe066 0 12%, transparent 13%), radial-gradient(circle at 82% 78%, #cdf564 0 10%, transparent 11%), linear-gradient(135deg, #ff3d9a 0%, #7b4dff 100%)',
    },
    palette: ['#ff3d9a', '#7b4dff', '#cdf564', '#ffe066', '#8fd8ff'],
    demoPath: '/demo/despedida',
    music: { src: publicUrl('/despedida/Beyonce-Crazy-In-Love.mp3'), title: 'Canción de la despedida' },
    sections: [
      'Pantalla de bloqueo',
      'Portada con stickers',
      'Cuenta regresiva',
      'Mensaje',
      'Plan de la noche',
      'Lugar con mapa',
      'Qué traer',
      'Playlist',
      'Galería',
      'Confirmación (RSVP)',
    ],
    highlights: ['Plan editable', 'Playlist', 'Confetti', 'Qué traer', 'RSVP'],
  },
}

/** @type {TemplateCatalogItem[]} */
export const TEMPLATE_CATALOG = TEMPLATE_OPTIONS.map((option) => ({
  ...option,
  tagline: '',
  description: '',
  cover: { alt: option.label },
  palette: [],
  sections: [],
  highlights: [],
  ...CATALOG_DETAILS[option.id],
}))
