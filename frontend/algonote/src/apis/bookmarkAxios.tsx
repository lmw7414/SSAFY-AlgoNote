import axios from 'axios'
import useUserInfo from '@/stores/user-store'

const bookmarkListApi = async () => {
  const { userInfo } = useUserInfo.getState()
  console.log('api', process.env.NEXT_PUBLIC_BASE_URL)
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmarks?memberId=${userInfo.memberId}`

  return axios
    .get(apiUrl)
    .then((response) => {
      console.log('오잉', response)

      return response
    })
    .catch((error) => {
      throw error
    })
}

export default bookmarkListApi
