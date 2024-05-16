import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import BookMarkSVG from '@public/images/bookmark.svg'
import BookMarkOffSVG from '@public/images/bookmark_off.svg'
import HeartOffSVG from '@public/images/heart.svg'
import HeartSVG from '@public/images/redHeart.svg'
import { bookmarkButtonApi } from '@/apis/bookmarkAxios'
import likeApi from '@/apis/likeAxios'
import { deleteNote, getNoteDetail } from '@/apis/note-detailAxios'

import {
  createReviewApi,
  deleteReviewApi,
  readReviewApi,
  updateReviewApi,
} from '@/apis/reviewAxios'
import myInfo from '@/apis/user-infoAxios'
import { SimpleButton } from '@/components/commons/Buttons/Button'
import ImageToggle from '@/components/commons/Buttons/ImageToggle'
import style from '@/pages/note/note.module.scss'
import useNoteStore from '@/stores/note-store'

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

interface UserInfo {
  memberId: number
  email: string
  nickname: string
  profileImg: string
}

const Note = () => {
  const router = useRouter()
  const { id } = router.query
  const [noteDetail, setNoteDetail] = useState<NoteData>()
  const [reviews, setReviews] = useState<ReviewProps>()
  const [comment, setComment] = useState<string>('')
  const [newComment, setNewComment] = useState<string>('')
  const [markIsOff, setMarkIsOff] = useState(false)
  const [likeIsOff, setLikeIsOff] = useState(false)
  const [userDetails, setUserDetails] = useState<UserInfo | null>(null)
  const [updateId, setUpdateId] = useState<number | null>(null)
  const [updating, setUpdating] = useState(false)
  const { setSelectedNoteData } = useNoteStore()

  const handleBookmark = async () => {
    const response = await bookmarkButtonApi(id as string)
    setMarkIsOff(response.data.bookmarked)
  }

  const handleLike = async () => {
    const response = await likeApi(id as string)
    if (response.status === 200) {
      setLikeIsOff(response.data.hearted)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        try {
          console.log('노트 상세보기 요청')
          const noteResponse = await getNoteDetail(id as string)
          console.log('노트 상세보기 응답:', noteResponse.data)
          setNoteDetail(noteResponse.data)
          setMarkIsOff(noteResponse.data.bookmarked)
          setLikeIsOff(noteResponse.data.hearted)

          console.log('리뷰 조회 요청')
          const reviewResponse = await readReviewApi(id as string)
          console.log('리뷰 조회 성공:', reviewResponse)
          setReviews(reviewResponse)
        } catch (error) {
          console.error('데이터 가져오기 실패:', error)
        }
      }
    }
    const fetchMyInfo = async () => {
      try {
        const response = await myInfo()
        // API 응답을 상태에 저장하기 전에 형식이 맞는지 확인
        if (response && typeof response === 'object') {
          setUserDetails(response.data)
        }
      } catch (error) {
        console.error('내 정보 가져오기 실패:', error)
      }
    }
    fetchData()
    fetchMyInfo()
  }, [])

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

  const updateReview = async (reviewId: number, content: string) => {
    try {
      console.log('리뷰수정 요청')
      await updateReviewApi(id as string, reviewId, content) // 리뷰조회 API 호출
      console.log('리뷰수정 성공!')
      // 리뷰수정 성공 후 필요한 작업 수행
      fetchReviews()
      setComment('')
      setUpdating(false)
      setNewComment('')
      setUpdateId(null)
    } catch (e) {
      console.error('리뷰수정 실패:', e)
      // 리뷰수정 실패 처리
    }
  }

  const updateCall = (newValue: number) => {
    setUpdateId(newValue)
    setUpdating(true)
  }

  const handleComment = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setComment(newValue)
  }

  const handleNewComment = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setNewComment(newValue)
  }

  // 노트 수정
  const handleReviseNote = () => {
    setSelectedNoteData(noteDetail || null)
    router.push('/revisenote')
  }

  // 노트 삭제
  const handleDeleteNote = () => {
    deleteNote(Number(noteDetail?.noteId))
    router.push(`/mynote`)
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
        <SimpleButton
          text="수정하기"
          onClick={handleReviseNote}
          style={{
            width: '6rem',
            height: '2.5rem',
            border: 'none',
            fontFamily: 'Pretendard',
          }}
        />
        <SimpleButton
          text="삭제하기"
          onClick={handleDeleteNote}
          style={{
            width: '6rem',
            height: '2.5rem',
            background: '#fb4444',
            border: 'none',
            fontFamily: 'Pretendard',
          }}
        />
        <ImageToggle
          isOff={markIsOff}
          onClick={() => handleBookmark()}
          offImg={BookMarkSVG}
          onImg={BookMarkOffSVG}
          width="30px"
        />
      </div>
      <div>
        <ImageToggle
          isOff={likeIsOff}
          onClick={() => handleLike()}
          offImg={HeartSVG}
          onImg={HeartOffSVG}
          width="30px"
        />
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

      <div className={style.reviewsContainer}>
        <h2>리뷰 목록</h2>
        <hr />
        {reviews?.map((review) => (
          <div className={style.reviewContainer} key={review.reviewId}>
            <Image
              src={review.member.profileImg} // 이미지 경로
              alt="profile-image"
              width={60}
              height={80}
            />
            <p>작성자: {review.member.nickname}</p>
            <h4>
              {review.startLine}-{review.endLine} line
            </h4>
            {review.reviewId === updateId ? (
              <input
                type="newComment"
                placeholder="리뷰 작성"
                value={newComment}
                onChange={handleNewComment}
                className={style.reviewInput}
              />
            ) : (
              <p>내용: {review.content}</p>
            )}

            {review.member.memberId === userDetails?.memberId && (
              <>
                {updating && review.reviewId === updateId ? (
                  <SimpleButton
                    text="확인"
                    style={{
                      backgroundColor: 'orange',
                      border: 'none',
                      marginBottom: '0.4rem',
                    }}
                    onClick={() => updateReview(review.reviewId, newComment)}
                  />
                ) : (
                  <SimpleButton
                    text="리뷰 수정하기"
                    style={{ marginBottom: '0.4rem' }}
                    onClick={() => updateCall(review.reviewId)}
                  />
                )}

                <SimpleButton
                  text="리뷰 삭제"
                  onClick={() => deleteReview(review.reviewId)}
                />
              </>
            )}

            <hr />
          </div>
        ))}
        <div className={style.reviewBottom}>
          <input
            type="comment"
            placeholder="리뷰 작성"
            value={comment}
            onChange={handleComment}
            className={style.reviewInput}
          />
          <SimpleButton
            text="댓글 작성"
            onClick={() => createReview(1, 3, comment)}
          />
        </div>
      </div>
      <div />
    </div>
  )
}

export default Note
