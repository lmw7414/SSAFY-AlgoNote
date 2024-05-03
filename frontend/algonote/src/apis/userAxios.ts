import { setCookie } from '@/utils/cookie'
import { axiosApi } from '@/utils/instance'

const signUpApi = async (email: string, password: string, nickname: string) => {
  console.log('signUpApi call')
  const local = axiosApi()
  return local
    .post('/api/auth/signup', { email, password, nickname })
    .then((response) => {
      console.log('signUpApi response: ', response)
      return response
    })
    .catch((error) => {
      console.error()
      console.log(error)
    })
}

const loginApi = async (email: string, password: string) => {
  console.log('loginApi call')
  return axiosApi()
    .post('/api/auth/login', { email, password })
    .then((response) => {
      console.log(`response: ${response.data.data}`)
      setCookie('access_token', response.headers.token, 1) // 1일의 만료기간
      // console.log('loginApi response: ', response)
    })
}

export { signUpApi, loginApi }
