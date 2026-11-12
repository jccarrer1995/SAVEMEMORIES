import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { describeFilters, hasActiveFilters } from '../utils/mesaSimulationModel.js'

const EASE = [0.22, 1, 0.36, 1]

function PrinterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 9V4h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7 14h10v6H7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * @param {{
 *   groups: import('../../admin/utils/guestLinkTableHelpers.js').MesaGuestGroup[],
 *   tones: Record<string, string>,
 *   filters: import('../utils/mesaSimulationModel.js').MesaFilters,
 *   event?: { title: string, subtitle?: string, fileName: string },
 *   disabled?: boolean,
 * }} props
 */
export function PrintMesasButton({ groups, tones, filters, event, disabled }) {
  const [state, setState] = useState(/** @type {'idle' | 'loading' | 'ready' | 'error'} */ ('idle'))
  const [url, setUrl] = useState('')
  const urlRef = useRef('')

  const fileName = `${event?.fileName || 'mesas'}${hasActiveFilters(filters) ? '-filtrado' : ''}.pdf`
  const canPreviewInline = typeof navigator !== 'undefined' && navigator.pdfViewerEnabled !== false
  const isOpen = state !== 'idle'

  const close = useCallback(() => {
    setState('idle')
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    urlRef.current = ''
    setUrl('')
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (keyEvent) => keyEvent.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  useEffect(() => () => urlRef.current && URL.revokeObjectURL(urlRef.current), [])

  async function generate() {
    setState('loading')
    try {
      const [{ pdf }, { MesasPdfDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./MesasPdfDocument.jsx'),
      ])
      const blob = await pdf(
        <MesasPdfDocument
          groups={groups}
          tones={tones}
          title={event?.title || 'Distribución de mesas'}
          subtitle={event?.subtitle}
          filterLabel={describeFilters(filters)}
        />,
      ).toBlob()
      const objectUrl = URL.createObjectURL(blob)
      urlRef.current = objectUrl
      setUrl(objectUrl)
      setState('ready')
    } catch (error) {
      console.error('No se pudo generar el PDF de mesas', error)
      setState('error')
    }
  }

  return (
    <>
      <button type="button" className="msim-print" onClick={generate} disabled={disabled || state === 'loading'}>
        <PrinterIcon />
        Imprimir mesas
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              className="msim-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Vista previa del PDF de mesas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(clickEvent) => clickEvent.target === clickEvent.currentTarget && close()}
            >
              <motion.div
                className="msim-modal-card"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <header className="msim-modal-head">
                  <div>
                    <p className="msim-modal-kicker">Vista previa</p>
                    <p className="msim-modal-title">{fileName}</p>
                  </div>
                  <div className="msim-modal-actions">
                    {state === 'ready' ? (
                      <a className="msim-print is-ghost" href={url} download={fileName}>
                        Descargar
                      </a>
                    ) : null}
                    <button type="button" className="msim-modal-close" onClick={close} aria-label="Cerrar">
                      <span aria-hidden />
                    </button>
                  </div>
                </header>

                <div className="msim-modal-body">
                  {state === 'loading' ? (
                    <div className="msim-modal-status">
                      <span className="msim-spinner" aria-hidden />
                      <p>Preparando tu PDF…</p>
                    </div>
                  ) : null}
                  {state === 'error' ? (
                    <div className="msim-modal-status">
                      <p>No se pudo generar el PDF. Inténtalo de nuevo.</p>
                      <button type="button" className="msim-print" onClick={generate}>
                        Reintentar
                      </button>
                    </div>
                  ) : null}
                  {state === 'ready' && canPreviewInline ? (
                    <iframe className="msim-modal-frame" src={url} title="PDF de mesas" />
                  ) : null}
                  {state === 'ready' && !canPreviewInline ? (
                    <div className="msim-modal-status">
                      <p>Tu PDF está listo.</p>
                      <div className="msim-modal-actions">
                        <a className="msim-print" href={url} target="_blank" rel="noreferrer">
                          Abrir PDF
                        </a>
                        <a className="msim-print is-ghost" href={url} download={fileName}>
                          Descargar
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
