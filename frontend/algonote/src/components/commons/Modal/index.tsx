import ReactDom from 'react-dom'
import style from './DefaultModal.module.scss'

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ onClose, children }: ModalProps) => {
  return ReactDom.createPortal(
    <div className={style.container}>
      <div className={style.children}>
        <div> {children}</div>
        <div>
          <button type="button" onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  )
}

export default Modal
