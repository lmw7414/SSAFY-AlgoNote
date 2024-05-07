import ReactMarkdown from 'react-markdown'
import s from './MarkdownEditor.module.scss'
import NoteContent from '@/pages/notecontent'
import useNoteStore from '@/stores/note-store'

interface Tab {
  title: string | undefined
  content: string
  idx: number
}

interface MarkdownEditorProps {
  currentTab: Tab
}

const MarkdownEditor = ({ currentTab }: MarkdownEditorProps) => {
  const { curSelectedIdx, updateTab } = useNoteStore()
  const handleTitle = (e: { target: { value: string } }) => {
    updateTab(curSelectedIdx, {
      title: e.target.value,
      content: currentTab.content,
    })
  }

  const applyMarkdownEnter = (text: string) => {
    return text
      .split('\n')
      .map((line, index, array) => {
        // 현재 줄이 비어있고 바로 다음 줄도 비어있다면, Markdown의 빈 줄 규칙에 따라 처리
        if (line === '' && array[index + 1] === '') {
          return '\n'
        }
        // 그 외의 경우에는 Markdown의 줄바꿈 규칙 적용 (끝에 공백 두 개 추가)
        return `${line.trimEnd()}  `
      })
      .join('\n')
  }

  return (
    <div id="editor" className={s.wrapper}>
      <div className={s.inputSection}>
        <input
          placeholder="제목을 입력하세요"
          value={currentTab?.title}
          onChange={handleTitle}
        />
        <hr />
        <div className={s.content}>
          <NoteContent />
        </div>
      </div>
      <div className={s.previewSection}>
        <div className={s.previewTitleSection}>{currentTab?.title}</div>

        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => <p className={s.markdownP} {...props} />,
            h1: ({ node, ...props }) => (
              <p className={s.markdownH1} {...props} />
            ),
            h2: ({ node, ...props }) => (
              <p className={s.markdownH2} {...props} />
            ),
            h3: ({ node, ...props }) => (
              <p className={s.markdownH3} {...props} />
            ),
            h4: ({ node, ...props }) => (
              <p className={s.markdownH4} {...props} />
            ),
            h5: ({ node, ...props }) => (
              <p className={s.markdownH5} {...props} />
            ),
            pre: ({ node, ...props }) => (
              <pre className={s.markdownPre} {...props} />
            ),
            code: ({ node, ...props }) =>
              props.className ? (
                <code className={s.markdownCode} {...props} />
              ) : (
                <code className={s.markdownInlineCode} {...props} />
              ),
            li: ({ node, ...props }) => <li {...props} />,
            ul: ({ node, ...props }) => <ul {...props} />,
          }}
        >
          {applyMarkdownEnter(currentTab?.content || '')}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default MarkdownEditor
