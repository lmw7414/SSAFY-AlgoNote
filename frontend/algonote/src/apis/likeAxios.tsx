import { axiosAuthApi } from '@/utils/instance'

const likeApi = async (noteId: string) => {
  const apiUrl = `/api/notes/${noteId}/hearts`

  try {
    const response = await axiosAuthApi().post(apiUrl)
    return response
  } catch (error) {
    throw error
  }
}

export default likeApi
