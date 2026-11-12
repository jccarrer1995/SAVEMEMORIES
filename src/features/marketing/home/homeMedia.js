import { publicUrl } from '../../invitations/core/utils/publicUrl.js'

/** Curva de animación compartida (ease-out suave, estilo editorial). */
export const EASE = [0.22, 1, 0.36, 1]

export const HOME_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&family=Pinyon+Script&display=swap'

/**
 * Foto de Unsplash (licencia libre) con srcset responsivo.
 * @param {string} id
 * @param {number[]} [widths]
 */
function unsplash(id, widths = [480, 800, 1200]) {
  const url = (w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`
  return {
    src: url(widths[1] ?? widths[0]),
    srcSet: widths.map((w) => `${url(w)} ${w}w`).join(', '),
  }
}

/** @param {string} path */
function local(path) {
  return { src: publicUrl(path), srcSet: undefined }
}

export const IMAGES = {
  heroCouple: { ...local('/boda/hero-couple.jpg'), alt: 'Novios besándose mientras los invitados lanzan pétalos' },
  palmCouple: { ...local('/boda/couple-3.jpg'), alt: 'Pareja de recién casados caminando de la mano al atardecer' },
  bouquet: { ...local('/boda/couple-1.jpg'), alt: 'Ramo de novia iluminado por el sol' },
  hands: { ...local('/boda/couple-2.jpg'), alt: 'Novios tomados de la mano sobre el césped' },
  quince: { ...unsplash('1763959953068-c10065818b6e'), alt: 'Quinceañera con vestido de gala azul y tiara' },
  quinceNight: { ...unsplash('1763959951338-f9363788d9fa'), alt: 'Quinceañera con vestido de gala por la noche' },
  babyBear: { ...unsplash('1760172551485-cea07abc5634'), alt: 'Pastel de baby shower con osito y globos' },
  babyCake: { ...unsplash('1768776182433-eff58e44d66d'), alt: 'Pastel rosa de dos pisos con lazo' },
  stationery: { ...unsplash('1633037773384-27d7ac0491e7'), alt: 'Invitación de boda con flores y cinta' },
  stationeryLinen: { ...unsplash('1741893043659-ca8b82a8b637'), alt: 'Papelería de boda sobre tela de lino' },
  candleTable: { ...unsplash('1536392706976-e486e2ba97af'), alt: 'Mesa larga con velas y flores para la cena' },
  gardenTable: { ...unsplash('1519225421980-715cb0215aed'), alt: 'Mesa de banquete decorada con flores al aire libre' },
}
