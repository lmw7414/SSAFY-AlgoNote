import ReactMarkdown from 'react-markdown'
import { useMarkdown } from '../MarkdownProvider/index'
import s from './Preview.module.scss'

const Preview = () => {
  const [markdown] = useMarkdown()

  return (
    <div className={s.Preview}>
      <div className={s.previewScroll}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  )
}

export default Preview
