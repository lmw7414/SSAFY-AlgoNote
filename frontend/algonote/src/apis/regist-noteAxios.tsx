import { getCookie } from '@/utils/cookie'
import { axiosAuthApi } from '@/utils/instance'

// 노트 등록 (현재 임시 문제 번호값 넣어놓은 상태 )
const registNote = async (
  problemId: number,
  title: string,
  content: string,
) => {
  try {
    await axiosAuthApi()
      .post(`/api/notes`, {
        problemId,
        title,
        content,
      })
      .then((res) => {
        console.log(res)
      })
  } catch (e) {
    console.log(e)
  }
}

// 제출 번호로 제출 이력 조회 (로그인 후 노트 작성 페이지 진입 시 호출, 현재 임시 번호 넣어놓음)
const getSubmissionListByMemberIdAndProblemId = async (problemId: number) => {
  try {
    const memberId = getCookie('memberId')

    return await axiosAuthApi()
      .get(`/api/submissions?memberId=${memberId}&problemId=${problemId}`)
      .then((res) => {
        console.log(res.data)
        return res.data
      })
  } catch (e) {
    console.log(e)
    return []
  }
}

export { registNote, getSubmissionListByMemberIdAndProblemId }
