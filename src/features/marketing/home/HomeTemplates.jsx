import { Link } from 'react-router-dom'
import { TEMPLATES } from '../data/siteContent.js'
import { ArrowIcon, Photo, Reveal, SplitText } from './HomeMotion.jsx'
import { IMAGES } from './homeMedia.js'

const TEMPLATE_IMAGES = {
  boda: IMAGES.palmCouple,
  xv: IMAGES.quince,
  baby: IMAGES.babyBear,
}

export function HomeTemplates() {
  return (
    <section id="plantillas" className="sm-section">
      <div className="sm-container">
        <div className="sm-section-head sm-section-head--split">
          <div>
            <Reveal>
              <p className="sm-eyebrow">
                <span className="sm-dot" /> Estilos
              </p>
            </Reveal>
            <h2 className="sm-display sm-h2">
              <SplitText text="Plantillas para *cada* celebración." inView />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="sm-lead sm-lead--narrow">
              Sobre animado, cuenta regresiva, galería, mapa y confirmación. Elige una base y la
              vestimos con tus colores, fotos y música.
            </p>
          </Reveal>
        </div>

        <div className="sm-templates">
          {TEMPLATES.map((template, index) => {
            const image = TEMPLATE_IMAGES[template.id] ?? IMAGES.heroCouple
            const content = (
              <>
                <div className="sm-template-media">
                  <Photo img={image} sizes="(min-width: 1024px) 30vw, 90vw" />
                  <span className={`sm-template-badge ${template.available ? 'is-live' : ''}`}>
                    {template.available ? 'Demo disponible' : 'Próximamente'}
                  </span>
                </div>
                <div className="sm-template-body">
                  <div className="sm-template-title">
                    <span className="sm-template-index">0{index + 1}</span>
                    <h3 className="sm-display">{template.name}</h3>
                    {template.available ? (
                      <span className="sm-template-arrow" aria-hidden>
                        <ArrowIcon />
                      </span>
                    ) : null}
                  </div>
                  <p>{template.description}</p>
                </div>
              </>
            )

            return (
              <Reveal key={template.id} delay={index * 0.1} className="sm-template-cell">
                {template.available && template.demoPath ? (
                  <Link to={template.demoPath} className="sm-template" aria-label={`Ver demo de ${template.name}`}>
                    {content}
                  </Link>
                ) : (
                  <div className="sm-template is-soon">{content}</div>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
