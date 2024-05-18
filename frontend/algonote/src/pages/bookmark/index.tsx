'use client'

import { useEffect } from 'react'
import style from './bookmark.module.scss'
import Notes from '@/components/commons/Bookmark/Note'
import ResultNote from '@/components/commons/Bookmark/ResultNote'
import FilterSection from '@/components/commons/Buttons/FilterSection'
import SearchInput from '@/components/commons/SearchInput'
import { useSearchResult } from '@/stores/search-store'

const tier = ['브론즈', '실버', '골드', '플레티넘', '다이아', '루비']
const category = [
  '구현',
  '문자열',
  '그래프',
  '수학 및 이론',
  '전략 및 최적화',
  '자료구조',
]

const Bookmark = () => {
  const { isSearched, resetSearch } = useSearchResult()

  useEffect(() => {
    resetSearch()
  }, [])

  return (
    <div className={style.frame}>
      <div className={style.header}>
        <div className={style.headerSentence}>
          <p className={style.headerBold}>북마크한 노트를 확인해보세요</p>
        </div>
        <div className={style.headerSentence}>
          <p className={style.contentLight}>
            다시 보고 싶은 노트를 북마크할 수 있어요.
          </p>
        </div>
      </div>
      <div className={style.content}>
        <SearchInput />
        <FilterSection title="티어" items={tier} itemKey="tier" />
        <FilterSection title="유형" items={category} itemKey="category" />
        <div className={style.division_line} />
        {isSearched ? <ResultNote /> : <Notes />}
      </div>
    </div>
  )
}

export default Bookmark
