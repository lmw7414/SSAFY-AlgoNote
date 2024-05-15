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

interface ButtonType{
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
  const [inputValue, setInputValue]=useState<ButtonType>({isDisabled: false, alertText: ""});


  useEffect(()=>{
    if(inputData.length===0 || expectedOutput.length===0){
      setInputValue({isDisabled: true, alertText: "상단에 입출력 데이터를 넣어주세요"});
    }
    else{
      setInputValue({isDisabled: false, alertText: ""});
    }
  },[inputData, expectedOutput])


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
        <div className={style.alert}>
          {inputValue.alertText}
        </div>
        <div>
           <SimpleButton text="코드 실행하기" onClick={handleCodeExecute} isDisabled={inputValue.isDisabled} style={{width: "10rem", height: "3rem"}}/>
        </div>
      </div>
      <div className={style.resultBox}>
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
