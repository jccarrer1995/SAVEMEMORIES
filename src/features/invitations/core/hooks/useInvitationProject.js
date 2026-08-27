import { useContext } from 'react'
import { InvitationProjectContext } from '../context/InvitationProjectContext.jsx'

export function useInvitationProject() {
  const project = useContext(InvitationProjectContext)
  if (!project) {
    throw new Error('useInvitationProject debe usarse dentro de InvitationProjectProvider.')
  }
  return project
}
