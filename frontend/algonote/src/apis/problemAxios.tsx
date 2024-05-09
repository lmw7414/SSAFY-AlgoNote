import { getCookie } from '@/utils/cookie'
import axios from 'axios'

const getAllMySolvedList = async () => {
  const token = getCookie('access_token')
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/problems/solved`

  try {
    const response = await axios.get(apiUrl, config)

    if (response.status === 200) {
      return response.data.content
    }
    console.log('내가 푼 전체 문제 조회 실패')
    return []
  } catch (e) {
    console.log('API 통신 에러 발생:', e)
    return []
  }
}

const getProblemById = async (problemId: number) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/problems/search-id?id=${problemId}`

  try {
    const response = await axios.get(apiUrl)
    return response.data
  } catch (error) {
    throw error
  }
}

export { getProblemById, getAllMySolvedList }
