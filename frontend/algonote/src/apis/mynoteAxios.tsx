import axios from 'axios'
import { getCookie } from '@/utils/cookie'

const getMyNote = async () => {
  const memberId = getCookie('memberId')
  const token = getCookie('access_token')
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/notes?memberId=${memberId}`

  try {
    const response = await axios.get(apiUrl, config)
    return response
  } catch (error) {
    throw error
  }
}

export default getMyNote
