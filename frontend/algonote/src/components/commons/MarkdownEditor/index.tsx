import ReactMarkdown from 'react-markdown'
import s from './MarkdownEditor.module.scss'
import TestNote2 from '@/pages/testnote2'
import useNoteStore from '@/stores/note-store'

const MarkdownEditor = () => {
  const { content } = useNoteStore()
  const { title, setTitle } = useNoteStore()
  // const [title, setTitle] = useState('')

  const handleTitle = (e: { target: { value: string } }) => {
    setTitle(e.target.value)
    console.log(title)
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
          value={title}
          onChange={handleTitle}
        />
        <div className={s.content}>
          <TestNote2 />
        </div>
      </div>
      <div className={s.previewSection}>
        <div className={s.previewTitleSection}>{title}</div>

        <ReactMarkdown
          components={{
            // p 태그에 대한 커스텀 렌더링 정의
            p: ({ node, ...props }) => (
              <p style={{ marginBottom: '1em' }} {...props} />
            ),
            h1: ({ node, ...props }) => (
              <p
                style={{
                  marginBottom: '1.5em',
                  fontWeight: 'bold',
                  fontSize: '2em',
                }}
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <p
                style={{
                  marginBottom: '1em',
                  fontWeight: 'bold',
                  fontSize: '1.5em',
                }}
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <p
                style={{
                  marginBottom: '1em',
                  fontWeight: 'bold',
                  fontSize: '1.17em',
                }}
                {...props}
              />
            ),
            h4: ({ node, ...props }) => (
              <p
                style={{
                  marginBottom: '1em',
                  fontWeight: 'bold',
                  fontSize: '1em',
                }}
                {...props}
              />
            ),
            h5: ({ node, ...props }) => (
              <p
                style={{
                  marginBottom: '1em',
                  fontWeight: 'bold',
                  fontSize: '0.83em',
                }}
                {...props}
              />
            ),
            li: ({ node, ...props }) => {
              // 'children'을 직접 렌더링하기 위해 '...props'를 사용
              return <li {...props} />
            },
            // 리스트를 위한 커스텀 'ul' 컴포넌트 (필요한 경우)
            ul: ({ node, ...props }) => {
              return <ul {...props} />
            },
          }}
        >
          {applyMarkdownEnter(content)}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default MarkdownEditor
