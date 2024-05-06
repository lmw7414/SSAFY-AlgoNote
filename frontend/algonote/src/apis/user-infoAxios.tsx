import axios from 'axios'
import { getCookie } from '@/utils/cookie'

const myInfo = async () => {
  const memberId = getCookie('memberId')
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/members?memberId=${memberId}`
  const token = getCookie('access_token')
  const config = { headers: { Authorization: `Bearer ${token}` } }

  return axios
    .get(url, config)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}

export default myInfo
