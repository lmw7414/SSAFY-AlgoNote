import axios from 'axios'

const myInfo = async (memberId: number) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/member?memberId=${memberId}`
  return axios
    .get(url)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}

export default myInfo
