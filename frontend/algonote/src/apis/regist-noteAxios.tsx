import { getCookie } from '@/utils/cookie'
import { axiosAuthApi } from '@/utils/instance'

// 노트 등록 (현재 임시 문제 번호값 넣어놓은 상태 )
const registNote = async (
  problemId: number,
  title: string,
  content: string,
) => {
  try {
    if (title !== '' || content !== '') {
      await axiosAuthApi()
        .post(`/api/notes`, {
          problemId,
          title,
          content,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log('노트 저장 성공')

            return 'success'
          }
          console.log('노트 저장 실패')
          return 'fail'
        })
    } else {
      console.log('제목 또는 내용 입력 안함')
    }
  } catch (e) {
    console.log(e)
  }
  return 'fail'
}

const tempRegistNote = async (
  problemId: number,
  title: string,
  content: string,
) => {
  try {
    await axiosAuthApi()
      .post(`/api/notes/temp`, {
        problemId,
        title,
        content,
      })
      .then((res) => {
        console.log('임시저장 response: ', res.data)

        return res.data
      })
  } catch (e) {
    console.log(e)
  }
}

// 제출 번호로 제출 이력 조회 (로그인 후 노트 작성 페이지 진입 시 호출, 현재 임시 번호 넣어놓음)
const getSubmissionList = async (problemId: number) => {
  try {
    const memberId = getCookie('memberId')

    return await axiosAuthApi()
      .get(`/api/submissions?memberId=${memberId}&problemId=${problemId}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          return res.data
        }
        return []
      })
  } catch (e) {
    console.log(e)
    return []
  }
}

// 문제에 대한 임시저장 노트 조회
const getTempSavedNote = async (problemId: number) => {
  try {
    return await axiosAuthApi()
      .get(`/api/notes/temp?problemId=${problemId}`)
      .then((res) => {
        console.log('임시 저장 노트 목록 조회', res.data)
        return res.data
      })
  } catch (e) {
    console.log(e)
    return []
  }
}

export { registNote, tempRegistNote, getSubmissionList, getTempSavedNote }
