'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import styles from './search.module.scss'
import getFullNote from '@/apis/full-noteAxios'
import FilterSection from '@/components/commons/Buttons/FilterSection'
import SearchInput from '@/components/commons/SearchInput'
import { useSearchResult } from '@/stores/search-store'

// 동적 임포트 설정
const DynamicResultNote = dynamic(
  () => import('@/components/commons/Bookmark/ResultNote'),
  {
    ssr: false, // 서버 사이드 렌더링 비활성화
  },
)

const tier = ['브론즈', '실버', '골드', '플레티넘', '다이아', '루비']
const category = [
  '구현',
  '문자열',
  '그래프',
  '수학 및 이론',
  '전략 및 최적화',
  '자료구조',
]

const NoteSearch = () => {
  const { resetSearch, setSearchResult } = useSearchResult()

  useEffect(() => {
    resetSearch()
    const fetchData = async () => {
      const response = await getFullNote()
      setSearchResult(response)
    }

    fetchData()
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
