import axios from 'axios'
import { getCookie } from '@/utils/cookie'

const nameChange = async (nickname: string) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/members/nicknames`
  const token = getCookie('access_token')
  const data = nickname
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios.patch(url, data, config)
    console.log('닉네임 수정 응답', response)
    return response
  } catch (error) {
    throw error
  }
}

const imageChange = async (file: File) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/members/profileImgs`
  const token = getCookie('access_token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  const form = new FormData()
  form.append('profileImg', file)

  console.log('폼데이터로 변경', form)

  try {
    const response = await axios.patch(url, form, config)
    return response
  } catch (error) {
    throw error
  }
}

export { nameChange, imageChange }
