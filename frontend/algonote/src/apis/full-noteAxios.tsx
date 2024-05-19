import { axiosAuthApi } from '@/utils/instance'

const getFullNote = async (page: number, size: number) => {
  const apiUrl = `/api/notes/all?page=${page}&size=${size}&sort=string`

  try {
    const response = await axiosAuthApi().get(apiUrl)
    return response.data
  } catch (error) {
    throw error
  }
}

export default getFullNote
