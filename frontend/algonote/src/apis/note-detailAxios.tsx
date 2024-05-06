import axios from 'axios'
import { getCookie } from '@/utils/cookie'

const getNoteDetail = (noteId: string) => {
  const token = getCookie('access_token')
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/notes/${noteId}`

  return axios
    .get(url, config)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}

export default getNoteDetail
