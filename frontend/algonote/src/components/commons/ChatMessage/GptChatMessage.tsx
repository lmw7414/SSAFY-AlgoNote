import s from './GptChatMessage.module.scss'
// import useNoteStore from '@/stores/note-store'

interface MessageProps {
  message: string
}

const GptChatMessage = ({ message }: MessageProps) => {
  return <div className={s.wrapper}>{message}</div>
}
export default GptChatMessage
