import { useEffect } from 'react'
import s from './SavedNote.module.scss'
import useNoteStore from '@/stores/note-store'

interface SavedNoteProps {
  noteId: number
  noteTitle: string
  content: string
  savedTime: string
}

const SavedNote = ({
  noteId,
  noteTitle,
  content,
  savedTime,
}: SavedNoteProps) => {
  const { curSelectedIdx, updateTab, flag } = useNoteStore()
  const handleClickTempNote = (tit: string, con: string) => {
    console.log('임시 저장된 노트 클릭')

    updateTab(curSelectedIdx, { title: tit, content: con })
  }

  useEffect(() => {}, [flag])

  return (
    <button
      key={noteId}
      type="button"
      onClick={() => handleClickTempNote(noteTitle, content)}
    >
      <div className={s.tempNoteItem}>
        <span>{noteTitle}</span>
        <span>{savedTime}</span>
      </div>
    </button>
  )
}

export default SavedNote
