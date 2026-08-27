import { useEffect, useState } from 'react'
import { loadPublicProject, loadProjectForResponses } from '../services/projectLoader.js'

/**
 * @param {string} projectId
 * @param {'public' | 'responses'} mode
 */
export function useProjectLoader(projectId, mode = 'public') {
  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState(/** @type {import('../types/invitationProject.js').RegisteredProject | null} */ (null))

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setProject(null)

    const loader = mode === 'responses' ? loadProjectForResponses : loadPublicProject

    loader(projectId)
      .then((result) => {
        if (!cancelled) setProject(result)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [projectId, mode])

  return { loading, project }
}
