import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import s from './testnote.module.scss'
import MarkdownEditor from '@/components/commons/MarkdownEditor'

const TestNote = () => {
  return (
    <div className={s.wrapper}>
      <MarkdownEditor />
    </div>
  )
}

export default TestNote
