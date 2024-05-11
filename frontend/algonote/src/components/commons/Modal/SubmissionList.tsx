import { getSubmissionList } from '@/apis/regist-noteAxios'

const SubmissionList = async (noteId: number) => {
  const response = await getSubmissionList()
}

export default SubmissionList
