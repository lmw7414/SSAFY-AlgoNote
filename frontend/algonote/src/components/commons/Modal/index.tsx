import ReactDom from 'react-dom'
import { SimpleButton } from '../Buttons/Button'
import style from './Modal.module.scss'

export interface ModalProps {
  onClose: () => void
  code?: string
  children: React.ReactNode
}

const Modal = ({ onClose, code, children }: ModalProps) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('코드가 복사되었어요!')
      onClose()
    } catch (err) {
      console.log('클립보드 복사에 실패했습니다.', err)
    }
  }

  return ReactDom.createPortal(
    <div className={style.container}>
      <div className={style.children}>
        <div> {children}</div>
        <div className={style.closeButtonSection}>
          <SimpleButton
            text="복사"
            style={{
              fontWeight: '500',
              width: '4rem',
              height: '2rem',
              fontFamily: 'Pretendard',
              marginRight: '0.5rem', // 버튼 간격 조정
            }}
            onClick={() => copyToClipboard(code ?? '')}
          />
          <SimpleButton
            text="닫기"
            style={{
              background: '#ffffff',
              color: '#3c87fe',
              border: '1.5px solid #3c87fe',
              fontWeight: '500',
              width: '4rem',
              height: '2rem',
              fontFamily: 'Pretendard',
            }}
            onClick={onClose}
          />
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  )
}

export default Modal
