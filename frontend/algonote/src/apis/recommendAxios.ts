import { axiosAuthApi } from '@/utils/instance'

const recommendApi = (tag: string, page: number, size: number) => {
  return axiosAuthApi()
    .get(`/api/recommend/${tag}?page=${page}&size=${size}`)
    .then((response) => response.data.content)
    .catch((error) => {
      console.log('문제 추천 조회 실패:', tag, error)
    })
}

export default recommendApi
