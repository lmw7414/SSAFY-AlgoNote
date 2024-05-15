import { useState, useEffect, KeyboardEvent } from 'react'
import style from './compare.module.scss'
import { getAllMySolvedList } from '@/apis/problemAxios'
import CodeView from '@/components/commons/CodeView'
import Modal from '@/components/commons/Modal'
import cStyle from '@/components/commons/Modal/Modal.module.scss'
import SubmissionList from '@/components/commons/Modal/SubmissionList'
import TierImg from '@/components/commons/Tier'
import useCodeInfo from '@/stores/code-store'

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

export interface DetailProblemType {
  modalStatus: boolean
  problemId: number
}

const ComparePage = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
  const [myProblems, setMyProblems] = useState<ProblemData[]>([])
  const [detailProblems, setDetailProblems] = useState<DetailProblemType>({
    modalStatus: false,
    problemId: 0,
  })
  const codes = useCodeInfo((state) => state.codes)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllMySolvedList()
      setMyProblems(response)
    }

    fetchData()
  }, [])

  const handleDetailProblems = (
    e: KeyboardEvent<HTMLDivElement>,
    problemId: number,
  ) => {
    if (e.key === 'Enter') {
      setDetailProblems({ modalStatus: true, problemId })
    }
  }

  return (
    <div className={style.container}>
      <div>코드를 비교하세요</div>
      <div>
        <div className={style.element}>
          {codes.map((code, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <CodeView
                setIsModalOpened={setIsModalOpened}
                code={code}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        {isModalOpened && (
          <Modal
            onClose={() => {
              setIsModalOpened(false)
              setDetailProblems({ modalStatus: false, problemId: 0 })
            }}
          >
            {detailProblems.modalStatus === true ? (
              <div>
                <SubmissionList
                  problemId={detailProblems.problemId}
                  setIsModalOpened={setIsModalOpened}
                  setDetailProblems={setDetailProblems}
                />
              </div>
            ) : (
              <div>
                <div className={cStyle.title}>가져올 코드를 선택하세요</div>
                <div className={cStyle.content}>
                  {myProblems.map((it) => (
                    <div
                      role="button"
                      tabIndex={0}
                      key={it.problem.id}
                      className={cStyle.problem}
                      onClick={() =>
                        setDetailProblems({
                          modalStatus: true,
                          problemId: it.problem.id,
                        })
                      }
                      onKeyDown={(e) => handleDetailProblems(e, it.problem.id)}
                    >
                      <div>{it.problem.title}</div>
                      <div>
                        <TierImg tier={it.problem.tier} />
                      </div>
                      <div>{it.problem.tags}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Modal>
        )}
      </div>
    </div>
  )
}

export default ComparePage
