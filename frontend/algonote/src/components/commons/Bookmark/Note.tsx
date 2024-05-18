import { useState, useEffect } from 'react'
import { NextRouter, useRouter } from 'next/router'
import styles from './Note.module.scss'
import { bookmarkListApi } from '@/apis/bookmarkAxios'
import TierImg from '@/components/commons/Tier'
import useFilterStore from '@/stores/filter-store'

interface Note {
  id: number
  title: string
  heartCnt: number
}

interface Problem {
  id: number
  title: string
  tier: number
  tags: string[]
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

const tagFiltering = (bookmarks: Bookmark[], compareCategory: string[]) => {
  return bookmarks.filter((note) =>
    note.problem.tags.some((tag) => compareCategory.includes(tag)),
  )
}

const tierFiltering = (filteredNotes: Bookmark[], tiers: number[]) => {
  return filteredNotes.filter((note) => tiers.includes(note.problem.tier))
}

const Notes = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([])
  const { tiers, categories } = useFilterStore()

  const router = useRouter()

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await bookmarkListApi()
        setBookmarks(response.data)
        setFilteredBookmarks(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchBookmarks()
  }, [])

  useEffect(() => {
    if (categories.length === 0 && tiers.length === 0) {
      setFilteredBookmarks(bookmarks)
    } else if (tiers.length === 0) {
      const tagFilteredNotes = tagFiltering(bookmarks, categories)
      setFilteredBookmarks(tagFilteredNotes)
    } else if (categories.length === 0) {
      const tierFilteredNotes = tierFiltering(bookmarks, tiers)
      setFilteredBookmarks(tierFilteredNotes)
    } else {
      const tagFilteredNotes = tagFiltering(bookmarks, categories)
      const tierFilteredNotes = tierFiltering(tagFilteredNotes, tiers)
      setFilteredBookmarks(tierFilteredNotes)
    }
  }, [tiers, categories, bookmarks])

  return (
    <div className={styles.frame}>
      {filteredBookmarks.map((it, index: number) => {
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
                <div className={styles.countNickname}>
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
