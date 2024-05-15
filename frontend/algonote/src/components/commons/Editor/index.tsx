import {
  UndoRedo,
  BoldItalicUnderlineToggles,
  InsertCodeBlock,
  ListsToggle,
  ChangeCodeMirrorLanguage,
  SandpackConfig,
  sandpackPlugin,
  ConditionalContents,
  ShowSandpackInfo,
  InsertSandpack,
} from '@mdxeditor/editor'
import useNoteStore from '@/stores/note-store'
import '@mdxeditor/editor/style.css'
import { useState, useEffect } from 'react'

const {
  MDXEditor,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
} = await import('@mdxeditor/editor')

const Editor = () => {
  const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

  const simpleSandpackConfig: SandpackConfig = {
    defaultPreset: 'react',
    presets: [
      {
        label: 'React',
        name: 'react',
        meta: 'live react',
        sandpackTemplate: 'react',
        sandpackTheme: 'light',
        snippetFileName: '/App.js',
        snippetLanguage: 'jsx',
        initialSnippetContent: defaultSnippetContent,
      },
    ],
  }

  const { tabs, curSelectedIdx, updateTab } = useNoteStore()
  const currentTab = tabs.find((tab) => tab.idx === curSelectedIdx)

  const handleContent = (val: string) => {
    console.log('입력값: ', val)

    updateTab(curSelectedIdx, {
      title: currentTab?.title ?? '',
      content: val,
    })
  }

  const [content, setContent] = useState(currentTab?.content ?? '')
  useEffect(() => {
    console.log('tab 업데이트 ')

    setContent(() => currentTab?.content ?? '')
  }, [currentTab?.content, tabs])

  return (
    <MDXEditor
      key={curSelectedIdx}
      onChange={(e) => {
        handleContent(e)
      }}
      placeholder="당신의 풀이를 기록해보세요..."
      markdown={currentTab?.content ?? ''}
      plugins={[
        codeBlockPlugin({ defaultCodeBlockLanguage: 'python' }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
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
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === 'codeblock',
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  when: (editor) => editor?.editorType === 'sandpack',
                  contents: () => <ShowSandpackInfo />,
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <InsertCodeBlock />
                      <InsertSandpack />
                      <ListsToggle />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
    />
  )
}

export default Editor
