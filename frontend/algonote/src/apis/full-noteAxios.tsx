import { axiosAuthApi } from '@/utils/instance'

const getFullNote = async () => {
  const apiUrl = `/api/notes/all`

  try {
    const response = await axiosAuthApi().get(apiUrl)
    return response.data
  } catch (error) {
    throw error
  }
}

export default getFullNote
