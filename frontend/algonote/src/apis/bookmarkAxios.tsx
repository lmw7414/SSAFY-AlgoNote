import axios from 'axios'
import { getCookie } from '@/utils/cookie'

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

export default bookmarkListApi
