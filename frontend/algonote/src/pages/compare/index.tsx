import { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued'
import style from './compare.module.scss'
import { getAllMySolvedList } from '@/apis/problemAxios'
import CodeSelectButton from '@/components/commons/CodeSelectButton'
import ExecuteResult from '@/components/commons/CodeSelectButton/ExcuteResult'
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
  const [language, setLanguage] = useState<string>('java')
  const [inputData, setInputData] = useState<string>('')
  const [expectedOutput, setExpectedOutput] = useState<string>('')

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

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value)
  }

  const handleOutputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpectedOutput(event.target.value)
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.headerSentence}>
          <p className={style.headerBold}>코드를 비교해보세요</p>
        </div>
        <div className={style.headerSentence}>
          <p className={style.contentLight}>
            더 효율적인 코드를 확인할 수 있어요.
          </p>
        </div>
      </div>
      <div className={style.element}>
        <div>
          <div className={style.insertBox}>
             <select value={language} onChange={handleLanguageChange} className={style.insert}>
                 <option value="java">Java</option>
                 <option value="py">Python</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
              </select>
              <input
                type="text"
                placeholder="입력 데이터"
                value={inputData}
                onChange={handleInputChange}
                className={style.insert}
              />
              <input
                type="text"
                placeholder="예상 출력 결과"
                value={expectedOutput}
                onChange={handleOutputChange}
                className={style.insert}
              />
          </div>
        <div className={style.compareButtons}>
          <div className={style.compareButton}>
            <CodeSelectButton setIsModalOpened={setIsModalOpened} index={0} />
          </div>
          <div className={style.compareButton}>
            <CodeSelectButton setIsModalOpened={setIsModalOpened} index={1} />
          </div>
        </div>
        <div className={style.codeView}>
          <ReactDiffViewer
            oldValue={codes[0]}
            newValue={codes[1]}
            compareMethod={DiffMethod.WORDS}
          />
        </div>
        <div>
          <ExecuteResult
            language={language}
            inputData={inputData}
            expectedOutput={expectedOutput}
            codes={[codes[0], codes[1]]}
          />
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
      </div></div>
      
    </div>
  )
}

export default ComparePage
