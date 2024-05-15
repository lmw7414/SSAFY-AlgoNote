import { useEffect } from 'react'
import s from './Popup.module.scss'

interface PopupProps {
  content: string
  onClose: () => void
}
const Popup = ({ content, onClose }: PopupProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose() // 5초 후에 알림 팝업을 자동으로 닫기 위해 onClose 함수 호출
    }, 5000)

    return () => {
      clearTimeout(timeout) // 컴포넌트가 언마운트될 때 타임아웃 해제
    }
  }, [])
  return (
    <div className={s.container}>
      <p>{content}</p>
    </div>
  )
}
export default Popup
