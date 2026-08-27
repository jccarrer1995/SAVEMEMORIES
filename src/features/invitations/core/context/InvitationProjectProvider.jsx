import { useMemo } from 'react'
import { InvitationProjectContext } from './InvitationProjectContext.jsx'

/**
 * @param {{ project: import('../types/invitationProject.js').InvitationProjectConfig, children: import('react').ReactNode }} props
 */
export function InvitationProjectProvider({ project, children }) {
  const value = useMemo(() => project, [project])
  return (
    <InvitationProjectContext.Provider value={value}>{children}</InvitationProjectContext.Provider>
  )
}
