import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import getNoteDetail from '@/apis/note-detailAxios'
import {
  createReviewApi,
  deleteReviewApi,
  readReviewApi,
} from '@/apis/reviewAxios'
import { SimpleButton } from '@/components/commons/Buttons/Button'
import style from '@/pages/note/note.module.scss'

interface Member {
  memberId: number
  nickname: string
  profileImg: string
}

interface Problem {
  id: number
  title: string
  tier: number
  acceptUserCount: number
  averageTries: number
  tags: string[]
}

interface NoteData {
  noteId: number
  member: Member
  problem: Problem
  noteTitle: string
  content: string
  heartCnt: number
  hearted: boolean
  createdAt: string
  modifiedAt: string
}

// Review에 대한 정보를 나타내는 인터페이스
interface Review {
  reviewId: number
  member: Member
  startLine: number
  endLine: number
  content: string
  createdAt: string // ISO 형식의 날짜 문자열
  modifiedAt: string // ISO 형식의 날짜 문자열
}

// Review[] 형태의 배열을 나타내는 인터페이스
interface ReviewProps extends Array<Review> {}

const Note = () => {
  const router = useRouter()
  const { id } = router.query
  const [noteDetail, setNoteDetail] = useState<NoteData>()
  const [reviews, setReviews] = useState<ReviewProps>()
  const [comment, setComment] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        try {
          console.log('노트 상세보기 요청')
          const noteResponse = await getNoteDetail(id as string)
          console.log('노트 상세보기 응답:', noteResponse.data)
          setNoteDetail(noteResponse.data)

          console.log('리뷰 조회 요청')
          const reviewResponse = await readReviewApi(id as string)
          console.log('리뷰 조회 성공:', reviewResponse)
          setReviews(reviewResponse)
        } catch (error) {
          console.error('데이터 가져오기 실패:', error)
        }
      }
    }
    fetchData()
  }, [id])

  const fetchReviews = async () => {
    try {
      console.log('댓글 다시 조회 요청')
      const reviewResponse = await readReviewApi(id as string)
      console.log('댓글 다시 조회 성공:', reviewResponse)
      setReviews(reviewResponse)
    } catch (error) {
      console.error('댓글 다시 조회 실패:', error)
    }
  }

  const deleteReview = async (reviewId: number) => {
    try {
      console.log('리뷰삭제 요청')
      await deleteReviewApi(id as string, reviewId) // 리뷰조회 API 호출
      console.log('리뷰삭제 성공!')
      // 리뷰삭제 성공 후 필요한 작업 수행 (예: 페이지 이동 등)
      fetchReviews()
    } catch (e) {
      console.error('리뷰조회 실패:', e)

      // 리뷰삭제 실패 처리
    }
  }

  const createReview = async (
    startLine: number,
    endLine: number,
    content: string,
  ) => {
    try {
      console.log('리뷰생성 요청')
      await createReviewApi(id as string, startLine, endLine, content) // 리뷰조회 API 호출
      console.log('리뷰생성 성공!')
      // 리뷰생성 성공 후 필요한 작업 수행
      fetchReviews()
      setComment('')
    } catch (e) {
      console.error('리뷰생성 실패:', e)

      // 리뷰생성 실패 처리
    }
  }

  const handleComment = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setComment(newValue)
  }

  return (
    <div className={style.frame}>
      <div>제목 : {noteDetail?.noteTitle}</div>
      <div>
        문제 정보:
        <div>
          {noteDetail?.problem.id}
          {noteDetail?.problem.title}
          티어{noteDetail?.problem.tier}
          시도횟수{noteDetail?.problem.averageTries}푼 사람
          {noteDetail?.problem.acceptUserCount}
        </div>
      </div>
      <div>
        태그:
        {noteDetail?.problem.tags.map((tag) => <div key={tag}>{tag}</div>)}
      </div>
      <div>
        작성자:
        {noteDetail?.member.nickname}
      </div>
      <div>
        내용:
        {noteDetail?.content}
      </div>
      <div>
        좋아요 수:
        {noteDetail?.heartCnt}
      </div>
      <div>{noteDetail?.hearted ? '좋아요 했음' : '좋아요 안했음'}</div>
      <div>작성일: {noteDetail?.createdAt}</div>
      <div>수정일: {noteDetail?.modifiedAt}</div>

      <div>
        <h2>댓글 목록</h2>
        {reviews?.map((review) => (
          <div key={review.reviewId}>
            <Image
              src={review.member.profileImg} // 이미지 경로
              alt="profile-image"
              width={120}
              height={80}
            />
            {/* <img src={review.profileImg} alt="" /> */}
            <p>작성자: {review.member.nickname}</p>
            <h4>
              {review.startLine}-{review.endLine} line
            </h4>
            <p>내용: {review.content}</p>
            <SimpleButton
              text="댓글 삭제"
              onClick={() => deleteReview(review.reviewId)}
            />
            <hr />
          </div>
        ))}
        <div>
          <input
            type="comment"
            placeholder="리뷰 작성"
            value={comment}
            onChange={handleComment}
          />
        </div>
        <SimpleButton
          text="댓글 작성"
          onClick={() => createReview(1, 3, comment)}
        />
      </div>
      <div />
    </div>
  )
}

export default Note