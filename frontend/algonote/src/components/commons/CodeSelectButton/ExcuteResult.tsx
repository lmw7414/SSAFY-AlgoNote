import { useState } from 'react'
import style from './ExcuteResult.module.scss'
import { executeCode, getComplexityCode } from '@/apis/code-compareAxios'
import { SimpleButton } from '@/components/commons/Buttons/Button'

interface ComplexityProps {
  codes: string[]
}

interface ExecuteDataProps extends ComplexityProps {
  language: string
  inputData: string
  expectedOutput: string
}

interface ExecuteResultType {
  output: string
  executionTime: number
  memoryUsage: number
  isCorrect: boolean
}

interface ComplexityResultType {
  timeComplexity: string
  spaceComplexity: string
}

const ExecuteResult = ({
  language,
  inputData,
  expectedOutput,
  codes,
}: ExecuteDataProps) => {
  const [executeResult, setExecuteResult] = useState<ExecuteResultType[]>([])
  const [complexityResult, setComplexityResult] = useState<
    ComplexityResultType[]
  >([])

  const handleCodeExecute = async () => {
    try {
      const results = await Promise.all(
        codes.map((code) =>
          Promise.all([
            executeCode({
              language,
              sourceCode: code,
              inputData,
              expectedOutput,
            }),
            getComplexityCode({ sourceCode: code }),
          ]),
        ),
      )

      console.log('results', results)

      setExecuteResult(results.map((result) => result[0]))
      setComplexityResult(results.map((result) => result[1]))
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error)
    }
  }

  return (
    <div>
      <SimpleButton text="코드 실행" onClick={handleCodeExecute} />
      <div className={style.result}>
        {executeResult.map((result, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            실행 결과 {index + 1}: {JSON.stringify(result)}
          </div>
        ))}
        {complexityResult.map((result, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            복잡도 결과 {index + 1}: {JSON.stringify(result)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExecuteResult
