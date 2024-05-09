import { useState, useEffect } from 'react'
// import HeartOffSVG from '@public/images/heart.svg'
// import HeartSVG from '@public/images/redHeart.svg'
import { NextRouter, useRouter } from 'next/router'
import styles from './Note.module.scss'
import { bookmarkListApi } from '@/apis/bookmarkAxios'
import TierImg from '@/components/commons/Tier'
// import likeAxios from '@/apis/likeAxios'
// import ImageToggle from '@/components/commons/Buttons/ImageToggle'

interface Note {
  id: number
  title: string
  heartCnt: number
}

interface Problem {
  id: number
  title: string
  tier: number
}

interface Member {
  id: number
  nickname: string
}

interface Bookmark {
  note: Note
  problem: Problem
  member: Member
}

export const handleDetailNote = (noteId: number, router: NextRouter) => {
  router.push(`/note/${noteId}`)
}

export const handleKeyPress = (
  e: React.KeyboardEvent<HTMLDivElement>,
  noteId: number,
  router: NextRouter,
) => {
  if (e.key === 'Enter') {
    handleDetailNote(noteId, router)
  }
}

const Notes = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  // const [heartIsOff, setHeartIsOff] = useState<boolean[]>([])

  const router = useRouter()

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await bookmarkListApi()
        setBookmarks(response.data)
        // setHeartIsOff(response.data.map(() => true)) // 모든 하트를 꺼진 상태로 초기화
      } catch (err) {
        console.log(err)
      }
    }

    fetchBookmarks()
  }, [])

  // const handleHeartState = async (index: number, id: number) => {
  //   const response = await likeAxios(id)

  //   const newHeartState = [...heartIsOff]
  //   newHeartState[index] = response.data.hearted
  //   setHeartIsOff(newHeartState)

  //   // hearCnt 증가

  //   const updatedBookmarks = bookmarks.map(async (bookmark, idx) => {
  //     if (index === idx) {
  //       const newHeartCount = newHeartState[index]
  //         ? bookmark.note.heartCnt + 1
  //         : bookmark.note.heartCnt - 1
  //       return {
  //         ...bookmark,
  //         note: { ...bookmark.note, heartCnt: newHeartCount },
  //       }
  //     }
  //     return bookmark
  //   })
  //   const resolvedBookmarks = await Promise.all(updatedBookmarks)
  //   setBookmarks(resolvedBookmarks)
  // }

  return (
    <div className={styles.frame}>
      {bookmarks.map((it, index: number) => {
        const key = `${it.problem.title}-${index}`

        return (
          <div
            key={key}
            className={styles.note}
            onClick={() => handleDetailNote(it.note.id, router)}
            onKeyDown={(e) => handleKeyPress(e, it.note.id, router)}
            role="button"
            tabIndex={0}
          >
            <div className={styles.content}>
              <div className={styles.problem}>
                <div className={styles.tierImage}>
                  <TierImg tier={it.problem.tier} />
                </div>
                <div className={styles.problemTitle}>{it.problem.title}</div>
              </div>
              <div className={styles.note_title}>{it.note.title}</div>
              <div className={styles.details}>
                {/* <ImageToggle
                  isOff={heartIsOff[index]}
                  onClick={() => handleHeartState(index, it.note.id)}
                  offImg={HeartOffSVG}
                  onImg={HeartSVG}
                  width="1.6rem"
                  height="1.6rem"
                /> */}
                <div className={styles.countNickname}>
                  {/* <div>{it.note.heartCnt}</div> */}
                  <div className={styles.nickname}>{it.member.nickname}</div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Notes
