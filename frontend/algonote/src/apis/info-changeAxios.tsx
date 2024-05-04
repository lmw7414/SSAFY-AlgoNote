import axios from 'axios'
import { getCookie } from '@/utils/cookie'

interface ChangeProps {
  nickname: string | null
  profileImg: string | null
}

const change = async ({ nickname, profileImg }: ChangeProps) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/member/update`
  const token = getCookie('access_token')
  const data = { nickname, profileImg }
  const config = { headers: { Authorization: `Bearer ${token}` } }

  return axios.put(url, data, config).then((response) => {
    try {
      console.log('정보수정 응답', response)
      return response
    } catch (error) {
      throw error
    }
  })
}

export default change
