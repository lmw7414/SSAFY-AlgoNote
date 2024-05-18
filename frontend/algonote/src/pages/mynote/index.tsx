import { useEffect, useState } from 'react'
import s from './mynote.module.scss'
import getMyNote from '@/apis/mynote'
import FilterSection from '@/components/commons/Buttons/FilterSection'
import Folder from '@/components/commons/Folder'

interface Notes {
  noteId: number
  noteTitle: string
  heartCnt: number
  hearted: boolean
  createdAt: string
  modifiedAt: string
}

interface Problem {
  id: number
  title: string
  tier: string
  acceptUserCount: number
  averageTries: number
  tags: string[]
}

interface Problems {
  noteCount: number
  problem: Problem
  notes: Notes[]
}

interface ProblemData {
  problemCount: number
  problems: Problems[]
}

const tier = ['브론즈', '실버', '골드', '플레티넘', '다이아', '루비']
const category = [
  '구현',
  '문자열',
  '그래프',
  '수학 및 이론',
  '전략 및 최적화',
  '자료구조',
]

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
        <div className={s.filterButton}>
          <FilterSection title="티어" items={tier} itemKey="tier" />
          <FilterSection title="유형" items={category} itemKey="category" />
        </div>
        <div className={s.folderContainer}>
          {myNotes &&
            myNotes.problems.map((problem) => (
              <Folder
                key={problem.problem.id}
                tier={problem.problem.tier}
                problemId={problem.problem.id}
                problemTitle={problem.problem.title}
                notes={problem.notes}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default MyNote
