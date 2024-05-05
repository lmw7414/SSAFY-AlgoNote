import { markdown } from '@codemirror/lang-markdown'
import { EditorView } from '@codemirror/view'
import CodeMirror from '@uiw/react-codemirror'
import useNoteStore from '@/stores/note-store'

const TestNote2 = () => {
  const { content, setContent } = useNoteStore()
  const handleContent = (value: string) => {
    const transformedValue = value.replace(/- /g, '· ')
    setContent(transformedValue)
    console.log(content)

    setContent(value)
  }

  return (
    <CodeMirror
      value={content}
      width="100%"
      height="500px"
      extensions={[markdown()]}
      onChange={handleContent}
      theme={EditorView.theme({
        '&': {
          color: 'black',
          backgroundColor: 'white',
        },
        '.cm-content': {
          caretColor: 'black',
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '1rem',
          lineHeight: '1.5',
        },

        '&.cm-focused': {
          outline: 'none', // 포커스 시 나타나는 점선 테두리 제거
        },
        '&.cm-focused .cm-cursor': { borderLeftColor: 'black' },
        '&.cm-focused .cm-selectionBackground, ::selection': {
          backgroundColor: '#d9d9d9',
        },
        '.cm-gutters': {
          display: 'none', // 줄 번호 숨기기
        },
        '.cm-line': {
          backgroundColor: 'white', // 줄마다 파란색 표시 제거
        },
        '.cm-link': {
          color: '#065fd4',
          textDecoration: 'underline',
        },
        '.cm-strong': {
          fontWeight: 'bold',
        },
        '.cm-emphasis': {
          fontStyle: 'italic',
        },
        '.cm-placeholder': {
          color: '#adb5bd',
        },
        '::-webkit-scrollbar': {
          width: '4px',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#ced4da',
          borderRadius: '4px',
        },
      })}
    />
  )
}

export default TestNote2
