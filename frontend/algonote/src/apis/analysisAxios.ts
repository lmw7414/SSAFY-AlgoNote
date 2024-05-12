import { axiosAuthApi } from '@/utils/instance'

const getUserRecordApi = async () => {
  return axiosAuthApi()
    .get('/api/problems/problem-note-count')
    .then((response) => response.data)
    .catch((error) => console.log('문제별 노트개수 조회 실패:', error))
}

const getRecentSolvedApi = async () => {
  return axiosAuthApi()
    .get('/api/problems/analysis')
    .then((response) => response.data)
    .catch((error) => console.log(error))
}

export { getUserRecordApi, getRecentSolvedApi }
