import axios, { AxiosInstance } from 'axios'
import { setCookie, eraseCookie, getCookie } from './cookie'

const api = process.env.NEXT_PUBLIC_BASE_URL

const expireToken = () => {
  window.alert('로그인이 만료되었습니다. 다시 로그인 해주세요')
  eraseCookie('access_token')
  localStorage.removeItem('access_token')
  window.location.href = '/login'
}

const axiosAuthApi = () => {
  console.log('axiosAuthApi call')
  const accessToken = getCookie('access_token')
  const instance = axios.create({
    baseURL: api,
    headers: { Authorization: `Bearer ${accessToken}` },
    timeout: 10000,
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const {
        config,
        // response: { status },
      } = error
      // console.log(error.response.data)
      // console.log(error.response)
      // console.log(status)
      if (error.response?.status === 401) {
        if (error.response?.data.actionRequired === 'REFRESH_TOKEN') {
          const originRequest = config
          axiosAuthApi()
            .put('/api/auth/token-renew')
            .then((response) => {
              const newAccessToken = response.data.data
              console.log('리프레시')
              console.log(response)
              setCookie('access_token', newAccessToken, 1)
              localStorage.access_token = newAccessToken
              originRequest.headers.Authorization = `Bearer ${newAccessToken}`
              return axios(originRequest)
            })
            .catch((e) => {
              expireToken()
              console.error(e)
            })
        } else {
          expireToken()
        }
      }
    },
  )

  return instance
}

const axiosApi = (): AxiosInstance => {
  console.log('axiosApi call')
  const instance = axios.create({
    baseURL: api,
    timeout: 5000,
  })
  return instance
}

export { expireToken, axiosAuthApi, axiosApi }
