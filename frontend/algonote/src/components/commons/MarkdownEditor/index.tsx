import ReactMarkdown from 'react-markdown'
import s from './MarkdownEditor.module.scss'
import TestNote2 from '@/pages/testnote2'
import useNoteStore from '@/stores/note-store'

const MarkdownEditor = () => {
  // 전역으로 하면 안됨
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
        <hr />
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
                  marginTop: '2em',
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
            // 코드 블록을 위한 커스텀 'pre' 컴포넌트
            pre: ({ node, ...props }) => (
              <pre
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: '1rem',
                  background: '#f6f8fa',
                  padding: '15px',
                  borderRadius: '10px',
                  overflowX: 'auto',
                  marginBottom: '1rem',
                }}
                {...props}
              />
            ),
            // 단일 줄 코드를 위한 커스텀 'code' 컴포넌트 (이미 정의되어 있음)
            code: ({ node, ...props }) => {
              // 'className' 속성이 있을 경우, 코드 블록으로 처리
              if (props.className) {
                return (
                  <code
                    style={{
                      display: 'block', // 블록 요소로 처리
                      fontFamily: 'Pretendard',
                      fontSize: '1rem',
                      padding: '4px',
                      borderRadius: '5px',
                    }}
                    {...props}
                  />
                )
              }
              // 일반 코드 (단일 줄)에 대한 처리
              return (
                <code
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: '1rem',
                    background: '#f6f8fa',
                    padding: '4px',
                    borderRadius: '5px',
                    marginRight: '0.3rem',
                  }}
                  {...props}
                />
              )
            },
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
