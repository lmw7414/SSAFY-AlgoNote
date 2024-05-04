import axios from 'axios'
import { getCookie } from '@/utils/cookie'

const likeAxios = (noteId: number) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/notes/${noteId}/hearts`
  const token = getCookie('access_token')
  const config = { headers: { Authorization: `Bearer ${token}` } }

  return axios.post(url, null, config).then((response) => {
    return response
  })
}

export default likeAxios
