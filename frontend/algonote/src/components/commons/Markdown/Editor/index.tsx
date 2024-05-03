import React, { ChangeEvent } from 'react' // React와 ChangeEvent를 import합니다.
import { useMarkdown } from '../MarkdownProvider' // useMarkdown 훅을 import합니다.
import s from './Editor.module.scss'

const Editor: React.FC = () => {
  const [markdown, setMarkdown] = useMarkdown()

  // 이벤트의 타입을 ChangeEvent<HTMLTextAreaElement>로 지정합니다.
  const updateMarkdown = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    setMarkdown(value)
  }

  return (
    <div className={s.editorWrap}>
      <textarea
        className={s.editor}
        value={markdown}
        onChange={updateMarkdown}
      />
    </div>
  )
}

export default Editor
