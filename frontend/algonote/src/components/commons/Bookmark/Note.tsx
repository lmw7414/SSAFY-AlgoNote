import { useState, useEffect } from 'react'
import HeartOffSVG from '@public/images/heart.svg'
import HeartSVG from '@public/images/redHeart.svg'
import Tier from '@public/images/tier.svg'
import Image from 'next/image'
import styles from './Note.module.scss'
import bookmarkListApi from '@/apis/bookmarkAxios'
import ImageToggle from '@/components/commons/Buttons/ImageToggle'

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

const Notes = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [heartIsOff, setHeartIsOff] = useState<boolean[]>([])

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await bookmarkListApi()
        setBookmarks(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchBookmarks()

    if (bookmarks.length > 0) {
      setHeartIsOff(bookmarks.map(() => true))
    }
  }, [])

  const handleHeartState = (index: number) => {
    const newHeartState = [...heartIsOff]
    newHeartState[index] = !heartIsOff[index]
    setHeartIsOff(newHeartState)

    // hearCnt 증가

    const updatedDummy = bookmarks.map((bookmark, idx) => {
      if (index === idx) {
        if (heartIsOff[index]) {
          return {
            ...bookmark,
            note: { ...bookmark.note, heartCnt: bookmark.note.heartCnt + 1 },
          }
        }

        return {
          ...bookmark,
          note: { ...bookmark.note, heartCnt: bookmark.note.heartCnt - 1 },
        }
      }
      return bookmark
    })
    setBookmarks(updatedDummy)
  }

  return (
    <div className={styles.frame}>
      {bookmarks.map((it, index: number) => {
        const key = `${it.problem.title}-${index}`

        return (
          <div key={key} className={styles.note}>
            <div className={styles.content}>
              <div className={styles.problem}>
                <div className={styles.tierImage}>
                  <Image src={Tier} alt="티어" />
                </div>
                <div className={styles.problemTitle}>{it.problem.title}</div>
              </div>
              <div className={styles.note_title}>{it.note.title}</div>
              <div className={styles.details}>
                <ImageToggle
                  isOff={heartIsOff[index]}
                  onClick={() => handleHeartState(index)}
                  offImg={HeartOffSVG}
                  onImg={HeartSVG}
                  width="1.6rem"
                  height="1.6rem"
                />
                <div className={styles.countNickname}>
                  <div>{it.note.heartCnt}</div>
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
