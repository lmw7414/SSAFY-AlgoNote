import ReactDom from 'react-dom'
import style from './Modal.module.scss'

export interface ModalProps {
  code?: string
  children: React.ReactNode
}

const NoteModal = ({ children }: ModalProps) => {
  return ReactDom.createPortal(
    <div className={style.container}>
      <div className={style.children}>
        <div> {children}</div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  )
}

export default NoteModal
