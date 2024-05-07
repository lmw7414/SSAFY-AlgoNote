import { axiosAuthApi } from '@/utils/instance'

const readReviewApi = async (noteId: string) => {
  // console.log('리뷰조회api:', noteId)
  return axiosAuthApi()
    .get(`/api/notes/${noteId}/reviews`)
    .then((response) => response.data)
    .catch((error) => {
      console.log('리뷰조회 api 실패', error)
    })
}

const createReviewApi = async (
  noteId: string,
  startLine: number,
  endLine: number,
  content: string,
) => {
  console.log('createReviewApi call')
  return axiosAuthApi().post(`/api/notes/${noteId}/reviews`, {
    startLine,
    endLine,
    content,
  })
}

const deleteReviewApi = async (noteId: string, reviewId: number) => {
  console.log('createReviewApi call')
  return axiosAuthApi().delete(`/api/notes/${noteId}/reviews/${reviewId}`)
}

const updateReviewApi = async (
  noteId: string,
  reviewId: number,
  content: string,
) => {
  return axiosAuthApi().patch(`/api/notes/${noteId}/reviews/${reviewId}`, {
    content,
  })
}
export { readReviewApi, createReviewApi, deleteReviewApi, updateReviewApi }
