import axios from 'axios'
import useUserInfo from '@/stores/user-store'

const bookmarkListApi = async () => {
  const { userInfo } = useUserInfo.getState()

  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmarks?memberId=${userInfo.memberId}`

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
