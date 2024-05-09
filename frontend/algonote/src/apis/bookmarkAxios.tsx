import axios from 'axios'
import { getCookie } from '@/utils/cookie'
import { axiosAuthApi } from '@/utils/instance'

const bookmarkListApi = async () => {
  const memberId = getCookie('memberId')

  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmarks?memberId=${memberId}`

  return axios
    .get(apiUrl)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}

const bookmarkButtonApi = async (noteId: string) => {
  const apiUrl = `/api/notes/${noteId}/bookmarks`

  try {
    const response = await axiosAuthApi().post(apiUrl)
    console.log('북마크 버튼 응답', response)
    return response
  } catch (error) {
    throw error
  }
}

export { bookmarkListApi, bookmarkButtonApi }
