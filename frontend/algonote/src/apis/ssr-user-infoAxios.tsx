import axios from 'axios'

const myInfo = async (memberId: string, token: string) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/members?memberId=${memberId}`
  const config = { headers: { Authorization: `Bearer ${token}` } }

  return axios
    .get(url, config)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}

export default myInfo
