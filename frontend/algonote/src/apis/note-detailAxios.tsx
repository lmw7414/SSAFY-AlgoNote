import axios from 'axios'
import { getCookie } from '@/utils/cookie'
import { axiosAuthApi } from '@/utils/instance'

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

const modifyNote = async (noteId: number, tit: string, con: string) => {
  const apiUrl = `/api/notes/${noteId}`

  try {
    await axiosAuthApi()
      .patch(apiUrl, {
        title: tit,
        content: con,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('수정 성공')
          return true
        }
        return false
      })
  } catch (e) {
    console.log('노트 수정 실패')

    console.error(e)
  }
  return false
}

const deleteNote = async (noteId: number) => {
  const apiUrl = `api/notes/${noteId}`

  try {
    await axiosAuthApi()
      .delete(apiUrl)
      .then((res) => {
        if (res.status === 200) {
          console.log('노트 삭제 성공')
        }
      })
  } catch (e) {
    console.log('노트 삭제 실패')
    console.log(e)
  }
}

export { getNoteDetail, modifyNote, deleteNote }
