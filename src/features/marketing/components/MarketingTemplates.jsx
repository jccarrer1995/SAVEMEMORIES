import { Link } from 'react-router-dom'
import { TEMPLATES } from '../data/siteContent.js'
import { MarketingSection } from './MarketingSection.jsx'

export function MarketingTemplates() {
  return (
    <MarketingSection id="plantillas" kicker="Estilos" title="Plantillas para cada celebración">
      <div className="grid gap-5 md:grid-cols-3">
        {TEMPLATES.map((template) => (
          <article key={template.id} className="marketing-card marketing-template-card rounded-2xl p-6">
            <div className={`marketing-template-badge ${template.available ? 'is-live' : ''}`}>
              {template.available ? 'Demo disponible' : 'Próximamente'}
            </div>
            <h3 className="marketing-serif mt-4 text-2xl text-[#6b3f2a]">{template.name}</h3>
            <p className="marketing-muted mt-3 text-sm leading-relaxed">{template.description}</p>
            {template.available && template.demoPath ? (
              <Link to={template.demoPath} className="marketing-link mt-6 inline-block text-sm font-medium">
                Ver demo →
              </Link>
            ) : (
              <p className="marketing-muted mt-6 text-xs italic">Disponible en próximas etapas</p>
            )}
          </article>
        ))}
      </div>
    </MarketingSection>
  )
}
