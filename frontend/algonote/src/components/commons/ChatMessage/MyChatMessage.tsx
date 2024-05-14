import s from './MyChatMessage.module.scss'
// import useNoteStore from '@/stores/note-store'

interface MessageProps {
  message: string
}

const MyChatMessage = ({ message }: MessageProps) => {
  return <div className={s.wrapper}>{message}</div>
}

export default MyChatMessage
