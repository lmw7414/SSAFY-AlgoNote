import { axiosAuthApi } from '@/utils/instance'

const getSearchApi = async (keyword: string, page: number) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/full-text?keyword=${keyword}&page=${page}`

  try {
    const response = await axiosAuthApi().get(apiUrl)
    return response
  } catch (error) {
    throw error
  }
}

export default getSearchApi
