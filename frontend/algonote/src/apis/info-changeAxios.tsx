import axios from 'axios'
import { getCookie } from '@/utils/cookie'

interface ChangeProps {
  nickname: string | null
}

const nameChange = async ({ nickname }: ChangeProps) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/members/nicknames`
  const token = getCookie('access_token')
  const data = { nickname }
  const config = { headers: { Authorization: `Bearer ${token}` } }

  try {
    const response = axios.patch(url, data, config)
    console.log('닉네임 수정 응답', response)
    return await response
  } catch (error) {
    throw error
  }
}

export default nameChange
