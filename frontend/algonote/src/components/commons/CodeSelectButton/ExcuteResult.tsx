import { useEffect, useState } from 'react'
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

interface ButtonType {
  isDisabled: boolean
  alertText: string
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
  const [inputValue, setInputValue] = useState<ButtonType>({
    isDisabled: false,
    alertText: '',
  })

  const [correctColor, incorrectColor] = ['#3c87fe', '#fb4444']

  useEffect(() => {
    if (inputData.length === 0 || expectedOutput.length === 0) {
      setInputValue({
        isDisabled: true,
        alertText: '상단에 입출력 데이터를 넣어주세요',
      })
    } else if (codes[0].length === 1 && codes[1].length === 1) {
      setInputValue({
        isDisabled: true,
        alertText: '비교할 코드를 넣어주세요',
      })
    } else {
      setInputValue({ isDisabled: false, alertText: '' })
    }
  }, [inputData, expectedOutput, codes])

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

      setExecuteResult(results.map((result) => result[0]))
      setComplexityResult(results.map((result) => result[1]))
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error)
    }
  }

  return (
    <div>
      <div className={style.executeButton}>
        <div className={style.alert}>{inputValue.alertText}</div>
        <div>
          <SimpleButton
            text="코드 실행하기"
            onClick={handleCodeExecute}
            isDisabled={inputValue.isDisabled}
            style={{ width: '10rem', height: '3rem' }}
          />
        </div>
      </div>
      <div className={style.resultBox}>
        {executeResult.map(
          (result, index) =>
            codes[index] !== ' ' && ( // eslint-disable-next-line react/no-array-index-key
              <div key={index} className={style.result}>
                <div>
                  <p className={style.title}>실행 결과</p>
                  <p
                    style={{
                      color: result.isCorrect ? correctColor : incorrectColor,
                      fontWeight: 600,
                      marginBottom: '1rem',
                    }}
                  >
                    {JSON.stringify(result.isCorrect)
                      ? '맞았습니다'
                      : '틀렸습니다'}
                  </p>
                  <p>
                    <strong>출력 | </strong> {JSON.stringify(result.output)}
                  </p>
                  <p>
                    <strong>실행 시간 | </strong>
                    {result.executionTime !== null
                      ? JSON.stringify(result.executionTime)
                      : '계산 불가'}
                  </p>
                  <p>
                    <strong>메모리 | </strong>
                    {result.memoryUsage !== null
                      ? JSON.stringify(result.memoryUsage)
                      : '계산 불가'}
                  </p>
                </div>
                <div>
                  <p>
                    {JSON.stringify(complexityResult[index].timeComplexity)}
                  </p>
                  <p>
                    {JSON.stringify(complexityResult[index].spaceComplexity)}
                  </p>
                </div>
              </div>
            ),
        )}
        {executeResult.map((result, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={style.result}>
            <div>
              <p className={style.title}>실행 결과</p>
              <p
                style={{
                  color:
                    result.isCorrect === true ? correctColor : incorrectColor,
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                {JSON.stringify(result.isCorrect) === 'true'
                  ? '맞았습니다'
                  : '틀렸습니다'}
              </p>
              <p>
                <strong>출력 | </strong> {JSON.stringify(result.output)}
              </p>
              <p>
                <strong>실행 시간 | </strong>
                {JSON.stringify(result.executionTime)}
              </p>
              <p>
                <strong>메모리 | </strong> {JSON.stringify(result.memoryUsage)}
              </p>
            </div>
            <div>
              <p>{JSON.stringify(complexityResult[index].timeComplexity)}</p>
              <p>{JSON.stringify(complexityResult[index].spaceComplexity)}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default ExecuteResult
