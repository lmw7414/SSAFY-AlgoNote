import { useEffect, useState } from 'react'
import { SimpleButton } from '../Buttons/Button'
import WrapperComponent from './WrapperComponent'
import { getSubmissionList } from '@/apis/regist-noteAxios'
import SubmitListTitle from '@/components/commons/SubmitListTitle'
import style from '@/pages/writenote/writenote.module.scss'
import useCodeInfo from '@/stores/code-store'

interface SubmissionHistory {
  code: string
  language: string
  length: number
  memorySize: number
  result: string
  runningTime: number
  submissionId: number
  submissionTime: string
}

interface SubmissionListProps {
  problemId: number
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  setDetailProblems: React.Dispatch<React.SetStateAction<DetailProblemType>>
}

interface DetailProblemType {
  modalStatus: boolean
  problemId: number
}

const SubmissionList = ({
  problemId,
  setIsModalOpened,
  setDetailProblems,
}: SubmissionListProps) => {
  const [submission, setSubmission] = useState<SubmissionHistory[]>([])
  const [selectedCode, setSelectedCode] = useState('')
  const currentDate = new Date()
  let resultColor = ''
  const [correctColor, incorrectColor] = ['#3c87fe', '#fb4444']

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSubmissionList(problemId)
        setSubmission(response)
      } catch (error) {
        throw error
      }
    }

    fetchData()
  }, [problemId])

  const handleCodeClick = (code: string) => {
    setSelectedCode(code)
  }

  const handleCodeEnter = (
    e: React.KeyboardEvent<HTMLDivElement>,
    code: string,
  ) => {
    if (e.key === 'Enter') {
      setSelectedCode(code)
    }
  }

  // 업로드 버튼 클릭시 코드 저장하고 모달 닫음, 세부 정보 모달도 닫음
  const handleUploadCode = (code: string) => {
    const { updateCodes, updateIndex } = useCodeInfo.getState()
    console.log('업로드 버튼 클릭, 인덱스, 코드', updateIndex, code)
    updateCodes(updateIndex, code)
    setIsModalOpened(false)
    setDetailProblems({ modalStatus: false, problemId: 0 })
  }

  return (
    <div>
      <div className={style.detailModal}>
        <div className={style.submitListBox} style={{ width: '25rem' }}>
          <div className={style.submitListTitle}>
            <SubmitListTitle />
          </div>
          <div className={style.submitList}>
            {submission.map((sb) => {
              const timeDiff =
                currentDate.getTime() - new Date(sb.submissionTime).getTime()

              const seconds = Math.floor(timeDiff / 1000)
              const minutes = Math.floor(seconds / 60)
              const hours = Math.floor(minutes / 60)
              const days = Math.floor(hours / 24)
              const months = Math.floor(days / 30)

              // 제출 시간 설정
              let submissionTime
              if (days > 30) {
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

              // result 색상 설정
              resultColor =
                sb.result === '맞았습니다!!' ? correctColor : incorrectColor

              return (
                <WrapperComponent
                  key={sb.submissionId}
                  number={sb.submissionId}
                  result={sb.result}
                  lang={sb.language}
                  codeLength={sb.length}
                  submitTime={submissionTime}
                  resultColor={resultColor}
                  code={sb.code}
                  onClick={() => handleCodeClick(sb.code)}
                  onKeyDown={(e) => handleCodeEnter(e, sb.code)}
                />
              )
            })}
          </div>
        </div>
        <div className={style.selectedCode}>
          {selectedCode && <div>{selectedCode}</div>}
        </div>
      </div>
      <div>
        <SimpleButton
          text="업로드"
          style={{ width: '5rem', height: '2.5rem' }}
          onClick={() => handleUploadCode(selectedCode)}
        />
      </div>
    </div>
  )
}

export default SubmissionList
