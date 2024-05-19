import {
  MDXEditor,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { useState, useEffect } from 'react'

interface EditorInNoteDetailProps {
  content: string
}

const EditorInNoteDetail = ({ content }: EditorInNoteDetailProps) => {
  const [noteContent, setNoteContent] = useState(content)

  useEffect(() => {
    console.log('컨텐츠 업데이트', content)
    setNoteContent(() => content)
  }, [content])

  useEffect(() => {
    console.log('노트 컨텐츠 업데이트')
  }, [noteContent])

  return (
    <MDXEditor
      key={noteContent}
      readOnly
      placeholder=""
      markdown={noteContent}
      plugins={[
        codeBlockPlugin({ defaultCodeBlockLanguage: 'python' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: 'JavaScript',
            css: 'CSS',
            python: 'Python',
            java: 'Java',
          },
        }),
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  )
}

export default EditorInNoteDetail
