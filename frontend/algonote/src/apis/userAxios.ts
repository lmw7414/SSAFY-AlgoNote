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
  const local = axiosApi()
  return local
    .post('/api/auth/signup', { email, password })
    .then((response) => {
      console.log('signUpApi response: ', response)
      return response
    })
    .catch((error) => {
      console.error()
      console.log(error)
    })
}

export { signUpApi, loginApi }
