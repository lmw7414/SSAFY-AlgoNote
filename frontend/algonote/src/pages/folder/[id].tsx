import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import s from './folder.module.scss'
import NoteList from './NoteList'
import getMyNote from '@/apis/mynoteAxios'
import TierImg from '@/components/commons/Tier'

interface ProblemData {
  id: number
  title: string
  tier: number
}

interface Problem {
  noteCount: number
  notes: Note[]
  problem: ProblemData
}

interface Note {
  noteId: number
  noteTitle: string
  heartCnt: number
  hearted: boolean
  createdAt: string
  modifiedAt: string
}

const FolderPage = () => {
  const [notesData, setNotesData] = useState<Note[]>()
  const [tier, setTier] = useState(0)
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyNote()
        console.log('data:', response.data)
        const { problems } = response.data
        console.log(problems)
        const problem = problems.find(
          (prob: Problem) => prob.problem.id === Number(id),
        )

        if (problem) {
          setNotesData(problem.notes)
          setTier(problem.problem.tier)
          setTitle(problem.problem.title)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const goNoteDetail = (noteId: number) => {
    // notes 배열을 JSON 문자열로 변환
    router.push(`/note/${noteId}`)
  }

  const hi = () => {
    console.log()
  }
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.headerSentence}>
          <p className={s.headerBold}>
            한 문제에 작성한 여러 개의 노트를 모아서 보여드려요.
          </p>
        </div>
        <div className={s.headerSentence}>
          <p className={s.contentLight} id="math_theory">
            같은 문제를 다양한 방식으로 풀이한 뒤 노트로 기록하면 알고리즘 실력
            향상에 큰 도움이 될 거에요!
          </p>
        </div>
      </div>
      <div className={s.content}>
        <div className={s.problemCont}>
          {loading ? (
            <p>loading...</p>
          ) : (
            <>
              <TierImg tier={tier} />
              <p>백준 {id}</p>
              <p className={s.title}>{title}</p>
              <p>문제에 작성한 노트들</p>
            </>
          )}
        </div>
        <hr className={s.divide} />
        <div className={s.notesCont}>
          {loading ? (
            <p>loading...</p>
          ) : (
            <div>
              {notesData?.map((note, number) => (
                <div
                  key={note.noteId}
                  onClick={() => goNoteDetail(note.noteId)}
                  onKeyDown={hi}
                  role="presentation"
                  className={s.noteCont}
                >
                  <NoteList
                    idx={number}
                    title={note.noteTitle}
                    date={note.modifiedAt}
                    heartCnt={note.heartCnt}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FolderPage
