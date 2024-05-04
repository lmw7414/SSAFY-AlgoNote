import axios from 'axios'
import useUserInfo from '@/stores/user-store'

const getMyNote = async () => {
  const { userInfo } = useUserInfo.getState()

  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/notes?memberId=${userInfo.memberId}`

  try {
    const response = await axios.get(apiUrl)
    return response
  } catch (error) {
    throw error
  }
}

export default getMyNote
