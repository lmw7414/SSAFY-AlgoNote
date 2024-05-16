'use client'

import { useRouter } from 'next/router'
import { handleDetailNote, handleKeyPress } from './Note'
import styles from './Note.module.scss'
import TierImg from '@/components/commons/Tier'
import useSearchResult from '@/stores/search-store'

const ResultNote = () => {
  const { searchResult } = useSearchResult()
  const router = useRouter()

  const filteredNotes =
    router.asPath === '/bookmark'
      ? searchResult.notes.filter((it) => it.bookmarked)
      : searchResult.notes

  console.log('필터링 노트', filteredNotes)
  return (
    <div className={styles.frame}>
      {filteredNotes.map((it) => {
        return (
          <div
            key={it.noteId}
            className={styles.note}
            onClick={() => handleDetailNote(it.noteId, router)}
            onKeyDown={(e) => handleKeyPress(e, it.noteId, router)}
            role="button"
            tabIndex={0}
          >
            <div className={styles.content}>
              <div className={styles.problem}>
                <div className={styles.tierImage}>
                  <TierImg tier={it.problemTier} />
                </div>
                <div className={styles.problemTitle}>{it.problemTitle}</div>
              </div>
              <div className={styles.note_title}>{it.noteTitle}</div>
              <div className={styles.details}>
                <div className={styles.countNickname}>
                  <div>{it.heartCnt}</div>
                  <div className={styles.nickname}>{it.memberNickname}</div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ResultNote
