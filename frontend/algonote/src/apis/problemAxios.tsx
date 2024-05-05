import axios from 'axios'

const getProblemById = async (problemId: number) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/problems/search-id?id=${problemId}`

  try {
    const response = await axios.get(apiUrl)
    return response.data
  } catch (error) {
    throw error
  }
}

export default getProblemById
