import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import s from './MarkdownEditor.module.scss'
import { SimpleButton } from '@/components/commons/Buttons/Button'
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

const handleClickButton = () => {
  console.log('버튼 클릭')
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
          <div className={s.buttonSection}>
            <Link href="/">
              <div className={s.exitButtonSec}>
                <Image
                  src="/images/back.png"
                  alt="logo"
                  width={25}
                  height={25}
                />
                <button className={s.exitButton} type="button">
                  나가기
                </button>
              </div>
            </Link>

            <SimpleButton
              text="저장하기"
              onClick={handleClickButton}
              style={{
                width: '6.5rem',
                height: '2.4rem',
                borderRadius: '6px',
                fontWeight: '600',
              }}
            />
          </div>
        </div>
      </div>
      <div className={s.previewSection}>
        <div className={s.previewTitleSection}>{currentTab?.title}</div>

        <ReactMarkdown
          components={{
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
            // 단일 줄 코드를 위한 커스텀 'code' 컴포넌트
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
              return <li {...props} />
            },
            ul: ({ node, ...props }) => {
              return <ul {...props} />
            },
          }}
        >
          {applyMarkdownEnter(currentTab?.content || '')}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default MarkdownEditor
