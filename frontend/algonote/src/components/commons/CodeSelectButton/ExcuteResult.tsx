import { executeCode, getComplexityCode } from '@/apis/code-compareAxios'
import { SimpleButton } from '@/components/commons/Buttons/Button'

interface ComplexityProps {
  sourceCode: string
}

interface ExecuteDataProps extends ComplexityProps {
  language: string
  inputData: string
  expectedOutput: string
}

const handleCodeExcute = async (props: ExecuteDataProps) => {
  const { language, ...codeInfoProps } = props
  const response = await executeCode({
    language,
    ...codeInfoProps,
  })

  return response
}

const ExcuteResult = (props: ExecuteDataProps) => {
  ;<SimpleButton text="코드 실행" onClick={() => handleCodeExcute(props)} />

  return (
    <div>
      <div />
    </div>
  )
}

export default ExcuteResult
