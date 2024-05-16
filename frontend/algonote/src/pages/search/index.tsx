'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { FilterButton } from '@/components/commons/Buttons/Button'
import SearchInput from '@/components/commons/SearchInput'
import styles from '@/pages/bookmark/bookmark.module.scss'
import useSearchResult from '@/stores/search-store'

interface FilterSectionProps {
  title: string
  items: string[]
  itemKey: string
}

// 동적 임포트 설정
const DynamicResultNote = dynamic(
  () => import('@/components/commons/Bookmark/ResultNote'),
  {
    ssr: false, // 서버 사이드 렌더링 비활성화
  },
)

const tier = ['브론즈', '실버', '골드', '플레티넘', '다이아', '루비'] //
const category = ['구현', '그리디', '그래프', '플래티넘', 'DP', '자료구조'] // note.title

const FilterSection = ({ title, items, itemKey }: FilterSectionProps) => {
  return (
    <div className={styles.bookmark}>
      <div>{title}</div>
      <div className={styles.filterButton}>
        {items.map((it, index) => {
          const tierKey = `${itemKey}-${index}`
          return (
            <div key={tierKey}>
              <FilterButton
                text={it}
                onClick={() => console.log('눌렸음')}
                className="search"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const NoteSearch = () => {
  const { resetSearch } = useSearchResult()

  useEffect(() => {
    resetSearch()
  }, [])

  return (
    <div className={styles.frame}>
      <SearchInput />
      <FilterSection title="티어" items={tier} itemKey="tier" />
      <FilterSection title="유형" items={category} itemKey="category" />
      <div className={styles.division_line} />
      <DynamicResultNote />
    </div>
  )
}

export default NoteSearch
