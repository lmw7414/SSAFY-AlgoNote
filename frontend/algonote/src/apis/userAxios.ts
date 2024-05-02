import { setCookie } from '@/utils/cookie'
import { axiosApi } from '@/utils/instance'

const loginApi = async (email: string, password: string) => {
  console.log('loginApi call')
  return axiosApi()
    .post('/api/auth/login', { email, password })
    .then((response) => {
      setCookie('access_token', response.headers.token, 1) // 1일의 만료기간
      return response
      // console.log('loginApi response: ', response)
    })
}

const signUpApi = async (email: string, password: string, nickname: string) => {
  console.log('signUpApi call')
  return axiosApi()
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

const emailDupCheckApi = async (email: string) => {
  return axiosApi()
    .post('/api/auth/email-dupcheck', { email })
    .then((response) => !response.data.duplicated)
    .catch((e) => {
      console.log(e.message)
    })
}

const sendAuthCodeApi = async (email: string) => {
  return axiosApi().post('/api/auth/verification-requests', { email })
}

const checkAuthCodeApi = async (email: string, authCode: string) => {
  return axiosApi()
    .post('/api/auth/verification', { email, authCode })
    .then((response) => response.data.authenticated)
    .catch((e) => {
      console.log(e.message)
    })
}

const nicknameDupCheckApi = async (nickname: string) => {
  return axiosApi()
    .post('/api/auth/nickname-dupcheck', { nickname })
    .then((response) => !response.data.duplicated)
    .catch((e) => {
      console.log(e.message)
    })
}

export {
  loginApi,
  signUpApi,
  emailDupCheckApi,
  sendAuthCodeApi,
  checkAuthCodeApi,
  nicknameDupCheckApi,
}
