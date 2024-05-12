'use client'

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
import '@mdxeditor/editor/style.css'

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

const Editor = () => {
  return (
    <MDXEditor
      onChange={console.log}
      placeholder="당신의 풀이를 기록해보세요..."
      markdown=""
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
