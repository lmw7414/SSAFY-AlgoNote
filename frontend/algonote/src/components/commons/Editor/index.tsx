import { useEffect } from 'react'
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
  MDXEditor,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor'
import useNoteStore from '@/stores/note-store'
import '@mdxeditor/editor/style.css'

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

  const { tabs, curSelectedIdx, updateTab, selectedNoteData } = useNoteStore()
  const currentTab = tabs.find((tab) => tab.idx === curSelectedIdx)

  const handleContent = (val: string) => {
    console.log('입력값: ', val)

    // 상태 업데이트를 동기적으로 처리
    updateTab(curSelectedIdx, {
      title: currentTab?.title ?? '',
      content: val,
    })
  }

  useEffect(() => {
    console.log('tab 업데이트 ')
  }, [currentTab?.content, tabs])

  return (
    <MDXEditor
      key={curSelectedIdx}
      onChange={(val) => {
        handleContent(val)
      }}
      placeholder="당신의 풀이를 기록해보세요..."
      markdown={
        selectedNoteData === null
          ? currentTab?.content ?? ''
          : selectedNoteData.content
      }
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
