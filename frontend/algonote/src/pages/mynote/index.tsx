import { useEffect, useState } from 'react'
import s from './mynote.module.scss'
import getMyNote from '@/apis/mynote'
import FilterSection from '@/components/commons/Buttons/FilterSection'
import Folder from '@/components/commons/Folder'
import useFilterStore from '@/stores/filter-store'

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
  tier: number
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

const tagFiltering = (myNotes: ProblemData, compareCategory: string[]) => {
  return {
    ...myNotes,
    problems: myNotes.problems.filter((note) =>
      note.problem.tags.some((tag) => compareCategory.includes(tag)),
    ),
  }
}

const tierFiltering = (filteredMyNotes: ProblemData, tiers: number[]) => {
  return {
    ...filteredMyNotes,
    problems: filteredMyNotes.problems.filter((note) =>
      tiers.includes(note.problem.tier),
    ),
  }
}

const MyNote = () => {
  const [myNotes, setMyNotes] = useState<ProblemData>({
    problemCount: 0,
    problems: [],
  })
  const [filteredMyNotes, setFilteredMyNotes] = useState<ProblemData>({
    problemCount: 0,
    problems: [],
  })
  const { tiers, categories } = useFilterStore()

  useEffect(() => {
    const fetchMyNote = async () => {
      const response = await getMyNote()
      if (response) {
        setMyNotes(response.data)
        setFilteredMyNotes(response.data)
      }
    }

    fetchMyNote()
  }, [])

  useEffect(() => {
    if (categories.length === 0 && tiers.length === 0) {
      setFilteredMyNotes(myNotes)
    } else if (tiers.length === 0) {
      const tagFilteredNotes = tagFiltering(myNotes, categories)
      setFilteredMyNotes(tagFilteredNotes)
    } else if (categories.length === 0) {
      const tierFilteredNotes = tierFiltering(myNotes, tiers)
      setFilteredMyNotes(tierFilteredNotes)
    } else {
      const tagFilteredNotes = tagFiltering(myNotes, categories)
      const tierFilteredNotes = tierFiltering(tagFilteredNotes, tiers)
      setFilteredMyNotes(tierFilteredNotes)
    }
  }, [tiers, categories, myNotes])

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.headerSentence}>
          <p className={s.headerBold}>
            내가 작성한 노트를 한 눈에 모아서 살펴보세요
          </p>
        </div>
        <div className={s.headerSentence}>
          <p className={s.contentLight} id="math_theory">
            작성한 노트가 문제별로 폴더화 돼있어요. 캐러셀을 넘기면 같은 문제에
            작성한 다른 노트들을 볼 수 있어요.
          </p>
        </div>
      </div>
      <div className={s.filterButton}>
        <FilterSection title="티어" items={tier} itemKey="tier" />
        <FilterSection title="유형" items={category} itemKey="category" />
      </div>
      <hr className={s.divide} />
      <div className={s.contents}>
        <div className={s.folderContainer}>
          {filteredMyNotes &&
            filteredMyNotes.problems.map((problem) => (
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
