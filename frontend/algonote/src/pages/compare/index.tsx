import { useState, useEffect } from 'react'
import style from './compare.module.scss'
import { getAllMySolvedList } from '@/apis/problemAxios'
import CodeView from '@/components/commons/CodeView'
import Modal from '@/components/commons/Modal'
import cStyle from '@/components/commons/Modal/Modal.module.scss'
import TierImg from '@/components/commons/Tier'

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

const ComparePage = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
  const [myProblems, setMyProblems] = useState<ProblemData[]>([])
  const [detailProblems, setDetailProblems] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllMySolvedList()
      setMyProblems(response)
    }

    fetchData()
  }, [])

  const handleDetailProblems = () => {
    setDetailProblems(true)
  }

  return (
    <div className={style.container}>
      <div>코드를 비교하세요</div>
      <div className={style.element}>
        <div>
          <CodeView setIsModalOpened={setIsModalOpened} />
        </div>
        <div>
          <CodeView setIsModalOpened={setIsModalOpened} />
        </div>
      </div>
      <div>
        {isModalOpened && (
          <Modal onClose={() => setIsModalOpened(false)}>
            {detailProblems === true ? (
              <div />
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
                      onClick={() => setDetailProblems(true)}
                      onKeyDown={() => handleDetailProblems()}
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
