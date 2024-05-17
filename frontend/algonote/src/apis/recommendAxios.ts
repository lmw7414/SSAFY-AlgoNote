import { axiosAuthApi } from '@/utils/instance'

const recommendApi = (
  tag: string,
  page: number,
  size: number,
  memberId: string | null,
) => {
  return axiosAuthApi()
    .get(
      `/python/recommend?memberId=${memberId}&tag=${tag}&page=${page}&size=${size}`,
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log('문제 추천 조회 실패:', tag, error)
    })
}
// `/api/recommend/${tag}?page=${page}&size=${size}`
export default recommendApi
