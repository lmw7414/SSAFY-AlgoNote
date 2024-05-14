import ReactMarkdown from 'react-markdown'
import s from './GptChatMessage.module.scss'
// import useNoteStore from '@/stores/note-store'

interface MessageProps {
  message: string | null
}

const GptChatMessage = ({ message }: MessageProps) => {
  return (
    <div className={s.wrapper}>
      <ReactMarkdown>{message}</ReactMarkdown>
    </div>
  )
}
export default GptChatMessage
