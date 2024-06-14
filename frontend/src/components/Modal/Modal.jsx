import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './modal.module.scss'

const Modal = ({
  isOpen,
  children,
  body,
  title,
  onClose,
  header,
  footer,
  disabled = false,
  onSubmit,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const modalRef = useRef(null)
  const [showModal, setShowModal] = useState(isOpen)
  const modalBody = useRef(null)

  const containerElement = useMemo(() => document.getElementById('modal'), [])

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }

    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 400)
  }, [disabled, onClose])

  useEffect(() => {
    const modalContainer = document.getElementById('modal')

    if (isOpen) {
      document.documentElement.classList.add('lock')
    } else {
      if (!modalContainer || modalContainer.children.length === 0) {
        document.documentElement.classList.remove('lock')
      }
    }

    return () => {
      if (!modalContainer || modalContainer.children.length === 0) {
        document.documentElement.classList.remove('lock')
      }
    }
  }, [isOpen])

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return
    }

    onSubmit()
  }, [onSubmit, disabled])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return
    }

    secondaryAction()
  }, [secondaryAction, disabled])

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className={styles.modal}>
      <div
        className={`${styles.backdrop} ${
          showModal ? styles.backdrop_open : styles.backdrop_close
        }`}
        ref={modalRef}
        onClick={handleClose}
      ></div>

      <div
        onClick={event => {
          event.stopPropagation()
        }}
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-headline'
        className={`${styles.content} 
          ${showModal ? styles.content_open : styles.content_close}`}
      >
        <div className={styles.close}>
          <button onClick={handleClose} className={styles.close__button}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
            >
              <path
                d='M5 6.13323L1.36944 9.76379C1.21196 9.92126 1.02309 10 0.802827 10C0.582568 10 0.393695 9.92126 0.23621 9.76379C0.0787367 9.6063 0 9.41743 0 9.19717C0 8.97691 0.0787367 8.78804 0.23621 8.63055L3.86677 5L0.23621 1.36944C0.0787367 1.21196 0 1.02309 0 0.802828C0 0.582568 0.0787367 0.393696 0.23621 0.23621C0.393695 0.078737 0.582568 0 0.802827 0C1.02309 0 1.21196 0.078737 1.36944 0.23621L5 3.86677L8.63055 0.23621C8.78804 0.078737 8.97691 0 9.19717 0C9.41743 0 9.6063 0.078737 9.76379 0.23621C9.92126 0.393696 10 0.582568 10 0.802828C10 1.02309 9.92126 1.21196 9.76379 1.36944L6.13323 5L9.76379 8.63055C9.92126 8.78804 10 8.97691 10 9.19717C10 9.41743 9.92126 9.6063 9.76379 9.76379C9.6063 9.92126 9.41743 10 9.19717 10C8.97691 10 8.78804 9.92126 8.63055 9.76379L5 6.13323Z'
                fill='currentColor'
              />
            </svg>
          </button>
        </div>

        {title && (
          <div className={styles.header}>
            <h2>{title}</h2>
          </div>
        )}

        <div ref={modalBody} className={styles.body}>
          {body ? body : children}
        </div>

        {(actionLabel || secondaryActionLabel || footer) && (
          <div className={styles.footer}>
            <div className='flex w-full flex-row items-center gap-4'>
              {actionLabel && (
                <button
                  disabled={disabled}
                  onClick={handleSubmit}
                  className='btn-primary px-5 disabled:cursor-not-allowed disabled:opacity-60'
                >
                  {actionLabel}
                </button>
              )}
              {secondaryAction && secondaryActionLabel && (
                <button
                  disabled={disabled}
                  onClick={handleSecondaryAction}
                  className='btn-secondary px-5 disabled:cursor-not-allowed disabled:opacity-60'
                >
                  {secondaryActionLabel}
                </button>
              )}
            </div>
            {footer}
          </div>
        )}
      </div>
    </div>,
    containerElement
  )
}

export default Modal
