import { useEffect, useState } from 'react'
import s from './solvedproblems.module.scss'
import { getAllMySolvedList } from '@/apis/problemAxios'
import QuestionList from '@/components/commons/QuestionList'
import QuestionListTitle from '@/components/commons/QuestionListTitle'

interface Problem {
  id: number
  title: string
  tier: number
  tags: string[]
}

interface ProblemData {
  problem: Problem
  complete: string
  uploadDate: Date
}

const SolvedProblems = () => {
  const currentDate = new Date()
  const [mySolvedList, setMySolvedList] = useState<ProblemData[]>([])
  // const { setSelectedNoteData } = useNoteStore()

  useEffect(() => {
    getAllMySolvedList().then((res) => {
      console.log('mySolvedList: ', res)
      setMySolvedList(res)
      // setSelectedNoteData(null)
    })
  }, [])

  return (
    <div className={s.main}>
      <div className={s.header}>
        <div className={s.headerSentence}>
          <p className={s.headerBold}>오답노트를 작성해보세요</p>
        </div>
        <div className={s.headerSentence}>
          <p className={s.contentLight}>
            내가 풀었던 문제들의 풀이 방법을 기록해보세요.
          </p>
        </div>
      </div>
      <div className={s.wrapper}>
        <QuestionListTitle />

        {mySolvedList.map((p) => {
          const timeDiff =
            currentDate.getTime() - new Date(p.uploadDate).getTime()

          const seconds = Math.floor(timeDiff / 1000)
          const minutes = Math.floor(seconds / 60)
          const hours = Math.floor(minutes / 60)
          const days = Math.floor(hours / 24)
          const months = Math.floor(days / 30)
          const years = Math.floor(months / 12)

          // 제출 시간 설정
          let submissionTime
          if (months > 11) {
            submissionTime = `${years}년 전`
          } else if (days > 30) {
            submissionTime = `${months}달 전`
          } else if (days > 0) {
            submissionTime = `${days}일 전`
          } else if (hours > 0) {
            submissionTime = `${hours}시간 전`
          } else if (minutes > 0) {
            submissionTime = `${minutes}분 전`
          } else {
            submissionTime = '방금 전'
          }

          return (
            <div key={p.problem.id}>
              <QuestionList
                id={p.problem.id}
                title={p.problem.title}
                tier={p.problem.tier}
                tags={p.problem.tags}
                complete={p.complete}
                time={submissionTime}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SolvedProblems
