'use client'

import { useState } from 'react'
import styles from './bookmark.module.scss'
import Notes from '@/components/commons/Bookmark/Note'
import { FilterButton } from '@/components/commons/Buttons/Button'
import SearchInput from '@/components/commons/SearchInput'

interface FilterSectionProps {
  title: string
  items: string[]
  itemKey: string
}

const tier = ['브론즈', '실버', '골드', '플레티넘', '다이아', '루비'] //
const category = ['구현', '그리디', '그래프', '플래티넘', 'DP', '자료구조'] // note.title

const FilterSection = ({ title, items, itemKey }: FilterSectionProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (item: string) => {
    if (activeFilters.includes(item)) {
      // 활성화 상태이면 비활성화
      setActiveFilters(activeFilters.filter((filter) => filter !== item))
    } else {
      setActiveFilters([...activeFilters, item])
    }
  }

  return (
    <div className={styles.bookmark}>
      <div>{title}</div>
      <div className={styles.filterButton}>
        {items.map((item, index) => {
          const tierKey = `${itemKey}-${index}`
          return (
            <div key={tierKey}>
              <FilterButton
                text={item}
                onClick={() => toggleFilter(item)}
                className="search"
                active={activeFilters.includes(item)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Bookmark = () => {
  return (
    <div className={styles.frame}>
      <SearchInput />
      <FilterSection title="티어" items={tier} itemKey="tier" />
      <FilterSection title="유형" items={category} itemKey="category" />
      <div className={styles.division_line} />
      <Notes />
    </div>
  )
}

export default Bookmark
