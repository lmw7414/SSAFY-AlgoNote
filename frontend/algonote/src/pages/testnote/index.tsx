import s from './testnote.module.scss'
import Editor from '@/components/commons/Markdown/Editor'
import MainLayout from '@/components/commons/Markdown/MainLayout'
import MarkdownProvider from '@/components/commons/Markdown/MarkdownProvider'
import Preview from '@/components/commons/Markdown/Preview'

const TestNote = () => {
  return (
    <div className={s.wrapper}>
      <MarkdownProvider>
        <MainLayout>
          <MainLayout.Column>
            <Editor />
          </MainLayout.Column>
          <MainLayout.Column>
            <Preview />
          </MainLayout.Column>
        </MainLayout>
      </MarkdownProvider>
    </div>
  )
}

export default TestNote
