import { useEffect, useState } from 'react'
import s from './mynote.module.scss'
import getMyNote from '@/apis/mynote'
import Folder from '@/components/commons/Folder'

export interface Notes {
  noteId: number
  noteTitle: string
  heartCnt: number
  hearted: boolean
  createdAt: string
  modifiedAt: string
}

interface Problems {
  noteCount: number
  problemId: number
  tier: string
  notes: Notes[]
}

interface ProblemData {
  problemCount: number
  problems: Problems[]
}

const MyNote = () => {
  const [myNotes, setMyNotes] = useState<ProblemData>()

  useEffect(() => {
    const fetchMyNote = async () => {
      const response = await getMyNote()
      if (response) {
        setMyNotes(response.data)
      }
    }

    fetchMyNote()
  }, [])

  return (
    <div className={s.container}>
      <div className={s.contents}>
        <div className={s.folderContainer}>
          {myNotes &&
            myNotes.problems.map((problem) => (
              <Folder
                key={problem.problemId}
                tier={problem.tier}
                problemId={problem.problemId}
                problemTitle={problem.tier}
                notes={problem.notes}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default MyNote
