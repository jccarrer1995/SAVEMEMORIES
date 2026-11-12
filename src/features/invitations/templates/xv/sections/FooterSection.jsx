import { useInvitationProject } from '../../../core/hooks/useInvitationProject.js'
import { GoldDust, Reveal } from '../components/Effects.jsx'
import { Flourish, Tiara } from '../components/Ornaments.jsx'

export function FooterSection() {
  const project = useInvitationProject()
  const initial = (project.iniciales || project.novia || 'XV').trim().slice(0, 2)

  return (
    <footer className="xv-section xv-night xv-footer">
      <GoldDust density={24} />
      <Reveal className="xv-footer-inner">
        <span className="xv-monogram">
          <Tiara className="xv-monogram-tiara" animate={false} />
          <span>{initial}</span>
        </span>
        <p className="xv-footer-thanks">Gracias por ser parte de mi historia</p>
        <Flourish className="xv-gold-light" width={180} />
        <p className="xv-signature xv-signature--light">{project.novia}</p>
        <p className="xv-footer-credit">Invitación digital · SAVEMEMORIES</p>
      </Reveal>
    </footer>
  )
}
