import dynamic from 'next/dynamic'
import { useRef } from 'react'
import * as monaco from 'monaco-editor'

const MonacoEditor = dynamic(() => import('react-monaco-editor'), {
  ssr: false,
})

const CodeEditor = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  const editorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    console.log('Editor is mounted:', editor)
    editorRef.current = editor
    // 에디터가 마운트되면 수행할 작업을 여기에 추가하세요.
  }

  return (
    <MonacoEditor
      width="800px"
      height="400px"
      language="javascript"
      editorDidMount={editorDidMount}
      value="// 여기에 코드를 입력하세요."
    />
  )
}

export default CodeEditor
