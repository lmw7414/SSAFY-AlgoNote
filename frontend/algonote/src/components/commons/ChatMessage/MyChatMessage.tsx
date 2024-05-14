import ReactMarkdown from 'react-markdown'
import s from './MyChatMessage.module.scss'

interface MessageProps {
  message: string
}

const MyChatMessage = ({ message }: MessageProps) => {
  return (
    <div className={s.wrapper}>
      <ReactMarkdown>{message}</ReactMarkdown>
    </div>
  )
}

export default MyChatMessage
