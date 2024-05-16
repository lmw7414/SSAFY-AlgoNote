import { CSSTransition } from 'react-transition-group'
import ChatBot from '../ChatBot'
import st from '../ChatBot/ChatBot.module.scss'
import s from './MarkdownEditor.module.scss'
import NoteContent from '@/pages/notecontent'
import useNoteStore from '@/stores/note-store'
import { useState } from 'react'

interface Tab {
  title: string | undefined
  content: string
  idx: number
}

interface MarkdownEditorProps {
  currentTab: Tab
  gptSectionStyle: React.CSSProperties
  chatBotState: boolean
  showChatBotState: boolean
}

const MarkdownEditor = ({
  currentTab,
  gptSectionStyle,
  chatBotState,
  showChatBotState,
}: MarkdownEditorProps) => {
  const { curSelectedIdx, updateTab, selectedNoteData, setModifiedTitle } =
    useNoteStore()
  const [tmpTitle, setTmpTitle] = useState(selectedNoteData?.noteTitle)

  const handleTitle = async (e: { target: { value: string } }) => {
    updateTab(curSelectedIdx, {
      title: e.target.value,
      content: currentTab.content,
    })

    setTmpTitle(() => e.target.value)
    setModifiedTitle(tmpTitle ?? '')
  }

  return (
    <div id="editor" className={s.wrapper}>
      <div className={s.inputSection}>
        <input
          placeholder="제목을 입력하세요"
          value={selectedNoteData === null ? currentTab?.title : tmpTitle}
          onChange={handleTitle}
        />
        <div className={s.content}>
          <NoteContent />
        </div>
      </div>
      <div className={s.previewSection} style={gptSectionStyle}>
        {chatBotState ? (
          <CSSTransition
            in={showChatBotState}
            timeout={1000}
            classNames={{
              enter: st.chatEnter,
              enterActive: st.chatEnterActive,
              exit: st.chatExit,
              exitActive: st.chatExitActive,
            }}
            unmountOnExit
          >
            <ChatBot />
          </CSSTransition>
        ) : null}
      </div>
    </div>
  )
}

export default MarkdownEditor
