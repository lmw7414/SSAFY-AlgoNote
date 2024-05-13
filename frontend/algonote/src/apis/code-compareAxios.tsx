import { axiosAuthApi } from '@/utils/instance'

interface ComplexityProps {
  sourceCode: string
}

interface ExecuteDataProps extends ComplexityProps {
  language: string
  inputData: string
  expectedOutput: string
}

const executeCode = async ({
  language,
  sourceCode,
  inputData,
  expectedOutput,
}: ExecuteDataProps) => {
  const apiUrl = `/api/codes/analyze?lang=${language}`
  const data = { sourceCode, inputData, expectedOutput }

  try {
    const response = await axiosAuthApi().post(apiUrl, data)
    return response.data
  } catch (error) {
    throw error
  }
}

const getComplexityCode = async ({ sourceCode }: ComplexityProps) => {
  const apiUrl = '/api/code/gpt'

  try {
    const response = await axiosAuthApi().post(apiUrl, sourceCode)
    return response
  } catch (error) {
    throw error
  }
}

export { executeCode, getComplexityCode }
