import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import getNoteDetail from '@/apis/note-detailAxios'
import style from '@/pages/note/note.module.scss'

interface Member {
  memberId: number
  nickname: string
}

interface Problem {
  id: number
  title: string
  tier: number
  acceptUserCount: number
  averageTries: number
  tags: string[]
}

interface NoteData {
  noteId: number
  member: Member
  problem: Problem
  noteTitle: string
  content: string
  heartCnt: number
  hearted: boolean
  createdAt: Date
  modifiedAt: Date
}

const Note = () => {
  const router = useRouter()
  const { id } = router.query
  const [noteDetail, setNoteDetail] = useState<NoteData>()

  useEffect(() => {
    const fetchNoteDetail = async () => {
      const response = await getNoteDetail(id as string)
      if (response) {
        console.log('노트 상세보기 응답', response.data)
        setNoteDetail(response.data)
      }
    }

    fetchNoteDetail()
  }, [])

  return (
    <div className={style.frame}>
      <div>제목 : {noteDetail?.noteTitle}</div>
      <div>
        태그:
        {noteDetail?.problem.tags.map((tag) => <div key={tag}>{tag}</div>)}
      </div>
      <div>
        작성자:
        {noteDetail}
      </div>
    </div>
  )
}

export default Note
