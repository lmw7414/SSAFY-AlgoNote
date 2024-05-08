import { axiosAuthApi } from '@/utils/instance'

const registNote = async (problemId: number, title: string, number: string) => {
  return axiosAuthApi().post(`/api/notes`, {
    problemId,
    title,
    number,
  })
}

export default registNote
