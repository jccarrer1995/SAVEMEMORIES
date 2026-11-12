import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { Reveal } from '../components/Effects.jsx'
import { Flourish } from '../components/Ornaments.jsx'

/** padres.novio = padres de la quinceañera · padres.novia = padrinos. */
export function FamilySection() {
  const project = useInvitationProject()
  const padres = project.padres?.novio ?? []
  const padrinos = project.padres?.novia ?? []
  if (padres.length === 0 && padrinos.length === 0) return null

  const groups = [
    { id: 'padres', title: 'Mis padres', names: padres },
    { id: 'padrinos', title: 'Mis padrinos', names: padrinos },
  ].filter((group) => group.names.length > 0)

  return (
    <section className="xv-section xv-family">
      <Reveal>
        <p className="xv-kicker">Con la bendición de Dios</p>
        <h2 className="xv-title">
          y el amor <em>de mi familia</em>
        </h2>
      </Reveal>

      <div className="xv-family-grid">
        {groups.map((group, index) => (
          <Reveal key={group.id} delay={0.15 + index * 0.15} className="xv-family-group">
            <p className="xv-family-label">{group.title}</p>
            <ul>
              {group.names.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Flourish className="xv-gold" />
    </section>
  )
}
