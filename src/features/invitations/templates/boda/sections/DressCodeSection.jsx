import { publicUrl } from '../../../core/utils/publicUrl.js'
import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { FadeInOnScroll } from '../components/FadeInOnScroll.jsx'
import { OliveSectionDecor } from '../components/OliveSectionDecor.jsx'

const DRESS_CODE_ART = publicUrl('/boda/vestimenta-formal-sin-fondo.png')

const DRESS_CODE_FALLBACK = {
  estilo: 'Elegante',
  mujeres: 'Vestido largo',
  mujeresEvitar:
    'Les agradecemos evitar el uso de colores derivados del blanco y rojo.',
  hombres: 'Terno formal, corbata y zapatos',
  hombresEvitar: 'Les agradecemos evitar colores gris y blanco.',
}

/**
 * @param {string | undefined} value
 * @param {string} fallback
 */
function dressText(value, fallback) {
  const text = typeof value === 'string' ? value.trim() : ''
  return text || fallback
}

export function DressCodeSection() {
  const project = useInvitationProject()
  const dress = project.dressCode ?? {}
  const estilo = dressText(dress.estilo, DRESS_CODE_FALLBACK.estilo)
  const mujeres = dressText(dress.mujeres, DRESS_CODE_FALLBACK.mujeres)
  const mujeresEvitar = dressText(dress.mujeresEvitar, DRESS_CODE_FALLBACK.mujeresEvitar)
  const hombres = dressText(dress.hombres, DRESS_CODE_FALLBACK.hombres)
  const hombresEvitar = dressText(dress.hombresEvitar, DRESS_CODE_FALLBACK.hombresEvitar)

  return (
    <section className="boda-cream relative overflow-hidden px-0 py-4">
      <FadeInOnScroll className="boda-section-content mx-6">
        <div className="boda-olive-panel relative overflow-hidden px-6 py-10 text-center">
          <OliveSectionDecor flowers={['tl']} branches={['br']} />
          <div className="relative z-[1]">
            <h2 className="boda-dress-kicker">
              Código de
              <br />
              vestimenta
            </h2>
            <p className="boda-dress-style">{estilo}</p>
            <img className="boda-dress-art" src={DRESS_CODE_ART} alt="" />
            <div className="boda-dress-block">
              <p>
                <strong>Mujeres:</strong> {mujeres}
              </p>
              <p>{mujeresEvitar}</p>
            </div>
            <div className="boda-dress-block">
              <p>
                <strong>Hombres:</strong> {hombres}
              </p>
              <p>{hombresEvitar}</p>
            </div>
          </div>
        </div>
      </FadeInOnScroll>
    </section>
  )
}
