import { useEffect, useState } from 'react'
import { fetchGuestLink } from '../../../../lib/firebase/guestLinkStore.js'

/**
 * @param {string | undefined} projectId
 * @param {string | undefined} linkCode
 */
export function useGuestLinkValidation(projectId, linkCode) {
  const [loading, setLoading] = useState(Boolean(linkCode))
  const [guestInvite, setGuestInvite] = useState(
    /** @type {import('../types/invitationProject.js').GuestInvite | null} */ (null),
  )
  const [error, setError] = useState('')

  useEffect(() => {
    if (!linkCode || !projectId) {
      setLoading(false)
      setGuestInvite(null)
      setError('')
      return
    }

    let cancelled = false
    setLoading(true)
    setGuestInvite(null)
    setError('')

    fetchGuestLink(projectId, linkCode)
      .then((record) => {
        if (cancelled) return
        if (!record || !record.active) {
          setError('Este enlace no es válido o fue desactivado.')
          return
        }
        if (record.cupos < 1) {
          setError('Este enlace no tiene cupos disponibles.')
          return
        }
        setGuestInvite({
          nombre: record.guestLabel,
          cupos: record.cupos,
          linkCode: record.id,
        })
      })
      .catch(() => {
        if (!cancelled) setError('No se pudo validar el enlace. Intenta más tarde.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [projectId, linkCode])

  return { loading, guestInvite, error }
}
