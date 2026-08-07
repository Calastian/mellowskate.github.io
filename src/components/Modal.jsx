import { useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from '@phosphor-icons/react'

export default function Modal({ isOpen, onClose, src, title = '' }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-black/75"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[95vw] max-w-[1400px] h-[90vh] rounded-xl border border-border bg-surface shadow-2xl overflow-hidden"
          >
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              {title && (
                <span className="text-xs font-mono text-text-muted bg-surface-alt/90 backdrop-blur px-2.5 py-1 rounded-md border border-border">
                  {title}
                </span>
              )}
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-alt/90 backdrop-blur border border-border text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors duration-200"
                aria-label="Close"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            <iframe
              src={src}
              title={title || 'Project preview'}
              sandbox="allow-scripts allow-same-origin allow-forms"
              className="w-full h-full border-none"
              loading="lazy"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
