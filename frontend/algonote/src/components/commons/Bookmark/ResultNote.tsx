'use client'

import redHeart from '@public/images/redHeart.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import type { Notes } from '@/stores/search-store'
import { handleDetailNote, handleKeyPress } from './Note'
import styles from './Note.module.scss'
import TierImg from '@/components/commons/Tier'
import useFilterStore from '@/stores/filter-store'
import { useSearchResult } from '@/stores/search-store'

const tagFiltering = (filteredNotes: Notes[], compareCategory: string[]) => {
  return filteredNotes.filter((note) =>
    note.tags.some((tag) => compareCategory.includes(tag)),
  )
}

const ResultNote = () => {
  const { searchResult, isSearched } = useSearchResult()
  const { categories } = useFilterStore()
  const router = useRouter()

  let filteredNotes =
    router.asPath === '/bookmark'
      ? searchResult.notes.filter((it) => it.bookmarked)
      : searchResult.notes

  // 필터링 버튼으로 한번 더 필터링
  if (categories.length !== 0) {
    filteredNotes = tagFiltering(filteredNotes, categories)
  }

  return (
    <div className={styles.frame}>
      {filteredNotes.length === 0 && isSearched ? (
        <div className={styles.noResults}>아직 저장된 노트가 없어요!</div>
      ) : (
        filteredNotes.map((it) => {
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
                    {router.asPath === '/search' && (
                      <div className={styles.heart}>
                        <Image
                          src={redHeart}
                          alt="좋아요 개수"
                          width={25}
                          height={22}
                        />
                        {it.heartCnt}
                      </div>
                    )}
                    <div className={styles.nickname}>{it.memberNickname}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default ResultNote
